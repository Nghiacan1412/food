import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets/frontend_assets/assets.js";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Thực đơn hấp dẫn, boss đã duyệt ! meo</h1>
      <p className="explore-menu-text">
        "Thực đơn phong phú, món nào cũng ngon! Hãy để vị giác của bạn du hành
        qua thế giới ẩm thực siêu hấp dẫn nha! meo"
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              key={index}
              className="explore-menu-list-item"
            >
              <img
                className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt={item.menu_name}
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExploreMenu;
