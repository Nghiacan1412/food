import React, { useContext, useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);
  const itemCount = cartItems[id] || 0;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0); // Lưu trạng thái đánh giá

  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const handleAddToCart = () => {
    addToCart(id);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(id);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleRating = (value) => {
    setRating(value); // Cập nhật số sao được chọn
  };

  return (
    <>
      <div className={`food-item ${isModalOpen ? "blur-background" : ""}`}>
        <div className="food-item-img-container">
          <img
            className="food-item-image"
            src={url + "/images/" + image}
            alt={name}
            onClick={handleOpenModal}
          />

          {itemCount === 0 ? (
            <img
              className="add"
              onClick={handleAddToCart}
              src={assets.add_icon_white}
              alt="Thêm vào giỏ hàng"
            />
          ) : (
            <div className="food-item-counter">
              <img
                onClick={handleRemoveFromCart}
                src={assets.remove_icon_red}
                alt="Giảm số lượng"
              />
              <p>{itemCount}</p>
              <img
                onClick={handleAddToCart}
                src={assets.add_icon_green}
                alt="Tăng số lượng"
              />
            </div>
          )}
        </div>
        <div className="food-item-info">
          <div className="food-item-name-rating">
            <p>{name}</p>
          </div>
          <p className="food-item-desc">{description}</p>
          <p className="food-item-price">{formatPrice(price)}</p>

          {/* Phần đánh giá */}
          <div className="food-item-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= rating ? "filled" : ""}`}
                onClick={() => handleRating(star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <img
            className="modal-image"
            src={url + "/images/" + image}
            alt={name}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default FoodItem;
