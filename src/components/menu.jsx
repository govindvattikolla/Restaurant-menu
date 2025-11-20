import React, { useState, useEffect } from "react";
import menuData from "../items.json";
import "./menu.css";
import logo from "../assets/image.png";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Menu() {
  const { addToCart } = useCart();

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const categories = ["All", ...menuData.menu.map((cat) => cat.category)];
  const allItems = menuData.menu.flatMap((cat) => cat.items);

  let itemsToShow =
    activeCategory === "All"
      ? allItems
      : menuData.menu.find((c) => c.category === activeCategory)?.items || [];

  // Apply Search
  if (searchText.trim() !== "") {
    const keyword = searchText.toLowerCase();
    itemsToShow = itemsToShow.filter((item) =>
      item.name.toLowerCase().includes(keyword)
    );
  }

  // Pagination
  const totalPages = Math.ceil(itemsToShow.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = itemsToShow.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchText]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div className="menu-container">
      {/* Header */}
      <div className="menu-header">
        <img src={logo} alt="logo" />

        <input
          type="text"
          className={`menu-search ${showSearch ? "show" : ""}`}
          placeholder="Search for items..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <button
          className="mobile-search-icon"
          onClick={() => setShowSearch(!showSearch)}
        >
          🔍︎
        </button>

        <Link to="/cart" className="cart-icon">🛒</Link>
      </div>

      {/* Tabs */}
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

      {/* Main Grid */}
      <div className="menu-grid">
        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <div key={item.id} className="menu-card">

              <Link to={`/item/${item.id}`}>
                <img src={item.image} alt={item.name} className="menu-img" />
              </Link>

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

      {/* Pagination */}
      {itemsToShow.length > itemsPerPage && (
        <div className="pagination">
          <button
            className="page-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            ◀ Prev
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`page-number ${
                currentPage === index + 1 ? "active" : ""
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className="page-btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            ▶ Next
          </button>
        </div>
      )}

      {/* Feedback Button */}
      <div className="feedback-wrapper">
        <a
          href="https://www.google.com/maps/place/Vemparaju+Gari+Vantillu/"
          target="_blank"
          className="feedback-btn"
        >
          Drop Your Feedback
        </a>
      </div>
    </div>
  );
}
