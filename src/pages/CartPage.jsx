import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import "./cart.css";

export default function CartPage() {
  const { cart, removeFromCart, changeQty } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="cart-container">
        {/* Back Button */}
     
      <Link to="/" className="back-btn"> ← Back</Link>

      <h2 className="cart-title">Your Cart</h2>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <Link to="/" className="back-btn">Go to Menu</Link>
        </div>

      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} className="cart-img" />

                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <p className="cart-price">₹{item.price}</p>

                  <div className="qty-controls">
                    <button
                      onClick={() =>
                        changeQty(item.id, Math.max(1, item.qty - 1))
                      }
                    >
                      -
                    </button>

                    <span>{item.qty}</span>

                    <button onClick={() => changeQty(item.id, item.qty + 1)}>
                      +
                    </button>
                  </div>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Total: ₹{total}</h3>
            {/* <button className="checkout-btn">Checkout</button> */}
            <h5 >Than you visit again</h5>
          </div>
        </>
      )}
    </div>
  );
}
