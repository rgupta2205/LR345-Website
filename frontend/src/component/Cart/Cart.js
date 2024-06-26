import React, { Fragment, useState } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";

const Cart = ({ history }) => {
  const dispatch = useDispatch();
  const { cartItems,shippingInfo } = useSelector((state) => state.cart);


  // const increaseQuantity = (id, quantity, stock) => {
  //   const newQty = quantity + 1;
  //   if (stock <= quantity) {
  //     return;
  //   }
  //   dispatch(addItemsToCart(id, newQty));
  // };

  // const decreaseQuantity = (id, quantity) => {
  //   const newQty = quantity - 1;
  //   if (1 >= quantity) {
  //     return;
  //   }
  //   dispatch(addItemsToCart(id, newQty));
  // };

  const deleteCartItems = (id,item) => {
    dispatch(removeItemsFromCart(id,item));
  };

  const checkoutHandler = () => {
    // history.push("/login?redirect=shipping");    
    history.push("/shipping");
  };

  return (
    <Fragment>
      {/* {JSON.stringify(cartItems)} */}
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>No Product in Your Cart</Typography>
          <Link to="/home">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                  <div className="cartInput">
                    {/* <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button> */}
                    <input type="number" value={item.quantity} readOnly />
                    {/* <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button> */}
                  </div>
                  {/* <p className="cartSubtotal">{`$${
                    item.price * item.quantity
                  }`}</p> */}
                   <p className="cartSubtotal">{`$0`}</p>
                </div>
              ))}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                {/* <p>{`$${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p> */}
                 <p>{`$0`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Check Out</button>
              </div>
            </div>
          </div>
         
        </Fragment>
       
      )}
    </Fragment>
  );
};

export default Cart;
