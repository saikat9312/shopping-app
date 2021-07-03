import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import HomeItem from '../component/HomeItem';

const HomeStyles = styled.div`
  margin: 3rem;
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
  const [itemData, setItemData] = React.useState([]);
  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  React.useEffect(() => {
    (async function getImage() {
      const data = await fetch('http://localhost:5000/banners').then((res) =>
        res.json()
      );
      setCarouselData(data);
    })();

    (async function getItem() {
      const data = await fetch('http://localhost:5000/categories').then((res) =>
        res.json()
      );
      setItemData(data);
    })();
  }, []);

  return (
    <HomeStyles className='Home'>
      <Slider {...settings}>
        {carouselData.map((item) => (
          <img
            key={item.id}
            src={`..${item.bannerImageUrl}`}
            alt={item.bannerImageAlt}
          />
        ))}
      </Slider>

      {itemData.map(
        (item) => item.enabled && <HomeItem key={item.id} item={item} />
      )}
    </HomeStyles>
  );
}
