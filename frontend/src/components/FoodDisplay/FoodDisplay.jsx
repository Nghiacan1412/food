import React, { useContext, useState, useMemo } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const itemsPerPage = 8;

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");

  // Lọc theo category + từ khóa
  const filteredFoodList = useMemo(() => {
    const byCategory =
      category === "All"
        ? food_list
        : food_list.filter((item) => item.category === category);

    return byCategory.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [food_list, category, searchQuery]);

  // Sắp xếp danh sách
  const sortedFoodList = useMemo(() => {
    const sorted = [...filteredFoodList];
    switch (sortOption) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    return sorted;
  }, [filteredFoodList, sortOption]);

  // Tính toán phân trang
  const totalPages = Math.ceil(sortedFoodList.length / itemsPerPage);
  const currentItems = sortedFoodList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Xử lý chuyển trang
  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    document
      .getElementById("food-display")
      .scrollIntoView({ behavior: "smooth" });
  };

  // Render nút phân trang
  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisible = 5;

    // Nút Prev
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-btn nav-btn"
      >
        &larr;
      </button>
    );

    // Nếu tổng trang ít, hiển thị hết
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`pagination-btn ${i === currentPage ? "active" : ""}`}
          >
            {i}
          </button>
        );
      }
    } else {
      // Trang đầu
      buttons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={`pagination-btn ${currentPage === 1 ? "active" : ""}`}
        >
          1
        </button>
      );

      const showLeftEllipsis = currentPage > 3;
      const showRightEllipsis = currentPage < totalPages - 2;

      if (showLeftEllipsis) {
        buttons.push(
          <button key="left-dots" className="pagination-btn ellipsis" disabled>
            ...
          </button>
        );
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`pagination-btn ${i === currentPage ? "active" : ""}`}
          >
            {i}
          </button>
        );
      }

      if (showRightEllipsis) {
        buttons.push(
          <button key="right-dots" className="pagination-btn ellipsis" disabled>
            ...
          </button>
        );
      }

      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`pagination-btn ${
            currentPage === totalPages ? "active" : ""
          }`}
        >
          {totalPages}
        </button>
      );
    }

    // Nút Next
    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-btn nav-btn"
      >
        &rarr;
      </button>
    );

    return buttons;
  };

  return (
    <div className="food-display" id="food-display">
      <h2>Nyaa~! Món nào cũng xịn, cạp liền kẻo lỡ nhen! meoo</h2>

      {/* Thanh tìm kiếm & sắp xếp */}
      <div className="controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Tìm kiếm món ăn..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="sort-bar">
          <label htmlFor="sort">Sắp xếp:</label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Mặc định</option>
            <option value="price-asc">Giá tăng dần</option>
            <option value="price-desc">Giá giảm dần</option>
            <option value="name-asc">Tên A-Z</option>
            <option value="name-desc">Tên Z-A</option>
          </select>
        </div>
      </div>

      {/* Danh sách món ăn */}
      <div
        className={`food-display-list ${
          currentItems.length === 1 ? "single-item" : ""
        }`}
      >
        {currentItems.length > 0 ? (
          currentItems.map((item, index) => (
            <FoodItem
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
              style={{ "--item-index": index }}
            />
          ))
        ) : (
          <div className="no-items">
            Không tìm thấy món ăn nào trong danh mục này!
          </div>
        )}
      </div>

      {/* Phân trang */}
      {totalPages > 1 && (
        <div className="pagination">{renderPaginationButtons()}</div>
      )}
    </div>
  );
};

export default FoodDisplay;
