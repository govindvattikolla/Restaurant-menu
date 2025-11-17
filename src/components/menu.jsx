import React, { useState } from "react";
import menuData from "../items.json";
import "../App.css";
import logo from "../assets/image.png"


export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [showSearch, setShowSearch] = useState(false); // NEW

  const categories = ["All", ...menuData.menu.map((cat) => cat.category)];
  const allItems = menuData.menu.flatMap((cat) => cat.items);

  let itemsToShow =
    activeCategory === "All"
      ? allItems
      : menuData.menu.find((c) => c.category === activeCategory)?.items || [];

  if (searchText.trim() !== "") {
    const keyword = searchText.toLowerCase();
    itemsToShow = itemsToShow.filter((item) =>
      item.name.toLowerCase().includes(keyword)
    );
  }

  return (
    <div className="menu-container">

      <div className="menu-header">
        <img src={logo} alt="logo" srcset="" />

      <input
        type="text"
        className={`menu-search ${showSearch ? "show" : ""}`}
        placeholder="Search for items..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
        {/* Search Icon for Mobile */}
        <button
          className="mobile-search-icon"
          onClick={() => setShowSearch(!showSearch)}
        >
          🔍︎
        </button>
      </div>

      {/* Search Input (desktop always visible, mobile toggle) */}

      <div className="menu-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`menu-tab ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="menu-grid">
        {itemsToShow.length > 0 ? (
          itemsToShow.map((item) => (
            <div key={item.id} className="menu-card">
              <img src={item.image} alt={item.name} className="menu-img" />

              <div className="menu-card-body">
                <h3 className="menu-item-name">{item.name}</h3>

                <div className="menu-info-row">
                  <span className="menu-info">⏱ {item.timeMinutes} min</span>
                  <span className="menu-info">⭐ {item.rating}</span>
                </div>

                <p className="menu-price">₹{item.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No items found</p>
        )}
      </div>
    </div>
  );
}
