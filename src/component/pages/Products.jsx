import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { CategoryContext } from "../../context/ProductCategoryContext";
import ProductItem from "../organisms/ProductItem";
import SideNav from "../organisms/SideNav";
import Alert from "../molecules/Alert";
import { useGetData } from "../../lib/hooks/useGetData";

const ProductStyles = styled.div`
  display: grid;
  gap: 2rem;
  @media only screen and (min-width: 600px) {
    grid-template-columns: repeat(3, 30%);
  }
  @media only screen and (min-width: 992px) {
    grid-template-columns: repeat(5, 18%);
  }
`;

export default function Products() {
  const [productData, setProductData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState({});
  const { loading, data, error } = useGetData(
    "./api/getProducts/index.get.json"
  );

  const history = useHistory();
  const { categoryData } = useContext(CategoryContext);

  const handleSelect = (e) => {
    const filterName = e.target?.innerText ?? e;
    const filterObj = categoryData.filter((item) => filterName === item.name);
    const tempData =
      filterObj.length &&
      productData.filter((item) => item.category === filterObj[0].id);
    setFilterData(tempData);
  };
  const handleAlert = (type, message) => {
    setAlertData({ type, message });
    setShowAlert(true);
  };

  useEffect(() => {
    setProductData(data);
    setFilterData(data);
  }, [data]);

  useEffect(() => {
    if (history.location.state !== undefined) {
      handleSelect(history.location.state);
    }
  }, [history.location.state, productData]);

  return (
    <ProductStyles className="Products">
      {showAlert && (
        <Alert
          {...alertData}
          showAlert={showAlert}
          setAlert={(flag) => setShowAlert(flag)}
        />
      )}
      <SideNav
        itemNum={productData.length}
        handleSelect={handleSelect}
        categoryData={categoryData}
        selectedFilterVal={history.location.state}
      />
      {filterData.length ? (
        filterData.map((product) =>
          product.stock > 0 ? (
            <ProductItem
              key={product.id}
              product={product}
              handleAlert={handleAlert}
            />
          ) : null
        )
      ) : (
        <h3>No item available</h3>
      )}
    </ProductStyles>
  );
}
