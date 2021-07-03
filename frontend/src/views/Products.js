import React, { useContext } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { CategoryContext } from '../context/ProductCategoryContext';
import ProductItem from '../component/ProductItem';
import SideNav from '../component/SideNav';
import NavDropdown from '../component/NavDropdown';

const ProductStyles = styled.div`
  display: grid;
  gap: 2rem;
  @media only screen and (min-width: 600px) {
    grid-template-columns: repeat(3, 30%);
  }
  @media only screen and (min-width: 992px) {
    grid-template-columns: repeat(5, 18%);
    margin: 0 10%;
  }
  @media only screen and (min-width: 1200px) {
  }
`;

export default function Products() {
  const [productData, setProductData] = React.useState([]);
  const [filterData, setFilterData] = React.useState([]);
  const history = useHistory();
  const { categoryData } = useContext(CategoryContext);

  React.useEffect(() => {
    (async function getProducts() {
      const data = await fetch('http://localhost:5000/products').then((res) =>
        res.json()
      );
      setProductData(data);
      setFilterData(data);
    })();
  }, []);

  React.useEffect(() => {
    if (history.location.state !== undefined && productData !== []) {
      handleSelect(history.location.state);
    }
  }, [history.location.state, productData]);

  const handleSelect = (e) => {
    const filterName = e.target?.innerText ?? e;
    const filterObj = categoryData.filter((item) => filterName === item.name);
    const tempData =
      filterObj.length &&
      productData.filter((item) => item.category === filterObj[0].id);
    setFilterData(tempData);
  };

  return (
    <ProductStyles className='Products'>
      <SideNav
        itemNum={productData.length}
        handleSelect={handleSelect}
        categoryData={categoryData}
        selectedFilterVal={history.location.state}
      />
      {filterData.length ? (
        filterData.map((product) =>
          product.stock > 0 ? (
            <ProductItem key={product.id} product={product} />
          ) : null
        )
      ) : (
        <h3>No item available</h3>
      )}
    </ProductStyles>
  );
}
