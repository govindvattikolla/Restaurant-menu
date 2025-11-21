import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import menuData from "../items.json";
import "./ItemPage.css";
import { useCart } from "../context/CartContext";

export default function ItemPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [showPopup, setShowPopup] = useState(false);

  // Find item by ID
  const item =
    menuData.menu.flatMap((cat) => cat.items).find(
      (itm) => String(itm.id) === id
    );

  if (!item) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "40px" }}>
        Item Not Found
      </h2>
    );
  }

  return (
    <div className="item-page">
      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      {/* Image */}
      <img src={item.image} alt={item.name} className="item-image" />

      {/* Content */}
      <div className="item-content">
        <h1 className="item-title">{item.name}</h1>

        <p className="item-description">
          {item.description || "Freshly prepared with the best ingredients."}
        </p>

        <div className="item-info">
          <span>⏱ {item.timeMinutes} min</span>
          <span>⭐ {item.rating}</span>
        </div>

        <p className="item-price">₹{item.price}</p>

        {/* Add to Cart */}
        <button
          className="add-cart-btn"
          onClick={() => {
            addToCart(item);
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 2500);
          }}
        >
          Add to Cart
        </button>
      </div>

      {/* Bottom Popup */}
      {showPopup && (
        <div className="cart-popup">
          <span>✔ {item.name} added to cart</span>

          <button
            className="goto-cart-btn"
            onClick={() => navigate("/cart")}
          >
            Go to Cart
          </button>
        </div>
      )}
    </div>
  );
}
