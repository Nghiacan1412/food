import React from "react";
import "./Header.css";

const Header = () => {
  // Hàm xử lý cuộn mượt mà đến phần #explore-menu
  const handleScrollToMenu = () => {
    const menuSection = document.querySelector("#explore-menu");
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="header">
      <div className="header-contents">
        <h2>
          Bụng đói kêu meo? <br /> Gọi món cho mau no! meo~
        </h2>
        <p>
          Meo meo, cảm ơn các cậu đã chọn quán mình nha. Món ăn ngon, niềm vui
          nhiều, ăn là ghiền luôn đó nhe!
        </p>
        <button onClick={handleScrollToMenu}>
          <span>XEM MÓN</span>
          <span className="button-icon">✨</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
