import React, { useContext } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import HomeItem from "../organism/HomeItem";
import { CategoryContext } from "../../context/ProductCategoryContext";
import { useGetData } from "../../lib/hooks/useGetData";
import { CAROUSAL_SETTINGS } from "../../lib/constant";

const HomeStyles = styled.div`
  margin: 1rem;
  .Home img {
    height: 30px;
  }
  .slick-slider {
    box-shadow: 0px 8px 6px -6px #bbbbbb;
  }
  .slick-dots button {
    position: absolute;
    bottom: 22px;
  }
  @media only screen and (min-width: 600px) {
    margin: 2rem 10rem;
  }
  @media only screen and (min-width: 992px) {
  }
  @media only screen and (min-width: 1200px) {
  }
`;
export default function Home() {
  const [carouselData, setCarouselData] = React.useState([]);
  const { categoryData } = useContext(CategoryContext);
  const { loading, data, error } = useGetData("./api/banners/index.get.json");

  React.useEffect(() => {
    setCarouselData(data);
  }, [data]);

  return (
    <HomeStyles className="Home">
      <Slider {...CAROUSAL_SETTINGS}>
        {carouselData.map((item) => (
          <img
            key={item.id}
            src={`..${item.bannerImageUrl}`}
            alt={item.bannerImageAlt}
          />
        ))}
      </Slider>

      {categoryData.map(
        (item) => item.enabled && <HomeItem key={item.id} item={item} />
      )}
    </HomeStyles>
  );
}
