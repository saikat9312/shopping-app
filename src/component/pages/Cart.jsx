import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import CartItem from "../organisms/CartItem";
import Alert from "../molecules/Alert";
import { CartContext } from "../../context/CartContext";

const CartStyles = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  .Cart {
    margin-top: 1rem;
  }
  h5 {
    height: 15%;
    margin: 0 0 5px 0;
    text-align: left;
  }
  img {
    height: 30%;
  }
  p {
    height: 45%;
    text-align: left;
    font-size: 13px;
    line-height: 1.2;
    padding: 1rem;
    background-color: lightGray;
  }
  .checkoutButton {
    margin: 1rem 0;
    button {
      margin-bottom: 1rem;
      display: flex;
      justify-content: space-between;
    }
    img {
      height: 15px;
    }
  }
  .EmptyCart {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  @media only screen and (min-width: 600px) {
    .checkoutButton {
      display: flex;
      justify-content: space-between;
      margin: 2% 0;
      button {
        width: 24rem;
      }
    }
    .EmptyCart {
      button {
        width: 24rem;
      }
    }
  }
`;

const TitleStyle = styled.h4`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 1px 5px 1px #e2e2e2;
  margin: 0;
  padding: 1%;
`;

const LowestPriceAd = styled.div`
  display: flex;
  align-items: center;
  box-shadow: 0px 1px 5px 1px #e2e2e2;
  padding: 1%;
  img {
    margin: 0% 4%;
  }
`;

const Cart = () => {
  const { total, cartItems, itemCount, clearCart, checkout, handleCheckout } =
    useContext(CartContext);

  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState({});

  const checkoutHandler = () => {
    (async function getProducts() {
      const data = await fetch("./api/checkout/index.post.json").then((res) =>
        res.json()
      );
      handleCheckout();
      setAlertData({ type: data.response, message: data.responseMessage });
      setShowAlert(true);
    })();
  };

  return (
    <CartStyles>
      {showAlert && (
        <Alert
          {...alertData}
          showAlert={showAlert}
          setAlert={(flag) => setShowAlert(flag)}
        />
      )}
      <div className="Cart">
        <div className="CartItems">
          {cartItems.length > 0 ? (
            <>
              <TitleStyle>
                My Cart ({itemCount} {itemCount > 1 ? "items" : "item"})
              </TitleStyle>
              {cartItems.map((product) => (
                <CartItem key={product.id} product={product} />
              ))}
              <LowestPriceAd>
                <img src="./lowest-price.png" alt="Lowest Price Logo"></img>
                <span>You won't find it cheaper anywhere</span>
              </LowestPriceAd>
            </>
          ) : (
            <div className="EmptyCart">
              <h2>No item in your cart</h2>
              <h4>Your favourite items are just a click away</h4>
              <Link to="/products">
                <button>Start Shopping</button>
              </Link>
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="checkoutButton">
            <button onClick={clearCart}>Clear</button>
            <button onClick={checkoutHandler}>
              Proceed to Checkout
              <span>
                Rs.{total} {" >"}
              </span>
            </button>
          </div>
        )}
      </div>
    </CartStyles>
  );
};

export default Cart;
