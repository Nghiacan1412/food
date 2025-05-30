import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets/frontend_assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("menu");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  // Xử lý theo dõi scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("token");

    if (setToken) {
      setToken("");
    }

    console.log("Đã đăng xuất, chuyển hướng về trang chủ...");
    setTimeout(() => navigate("/"), 100);
  };

  const toggleMobileMenu = () => {
    setMobileMenuActive(!mobileMenuActive);
  };

  const closeMobileMenu = () => {
    setMobileMenuActive(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="logo" />
      </Link>
      <ul className={`navbar-menu ${mobileMenuActive ? "active" : ""}`}>
        <div className="mobile-menu-close" onClick={closeMobileMenu}>
          <img src={assets.close_icon || assets.logout_icon} alt="Đóng menu" />
        </div>
        <li>
          <Link
            to="/"
            onClick={() => {
              setMenu("home");
              closeMobileMenu();
              console.log("Clicked HOME, redirecting to /");
            }}
            className={menu === "home" ? "active" : ""}
          >
            TRANG CHỦ
          </Link>
        </li>
        <li>
          <a
            href="#explore-menu"
            onClick={() => {
              setMenu("menu");
              closeMobileMenu();
            }}
            className={menu === "menu" ? "active" : ""}
          >
            THỰC ĐƠN
          </a>
        </li>
        <li>
          <a
            href="#app-download"
            onClick={() => {
              setMenu("mobile-app");
              closeMobileMenu();
            }}
            className={menu === "mobile-app" ? "active" : ""}
          >
            TẢI APP
          </a>
        </li>
        <li>
          <a
            href="#footer"
            onClick={() => {
              setMenu("contact-us");
              closeMobileMenu();
            }}
            className={menu === "contact-us" ? "active" : ""}
          >
            THÔNG TIN
          </a>
        </li>
        {token && (
          <li className="mobile-only">
            <div className="mobile-button" onClick={logout}>
              <img src={assets.logout_icon} alt="" />
              <span>Đăng xuất</span>
            </div>
          </li>
        )}
      </ul>
      <div className="navbar-right">
        <img
          src={assets.search_icon}
          alt="Search"
          className="navbar-search-icon"
        />
        <div className="navbar-basket-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="Basket" />
          </Link>
          {getTotalCartAmount() > 0 && <div className="dot"></div>}
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Đăng ký</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_image} alt="" />
            <ul className="nav-profile-dropdown">
              <li>
                <Link to="/cart">
                  <img src={assets.bag_icon} alt="" />
                  <p>Giỏ hàng</p>
                </Link>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <p>Đăng xuất</p>
              </li>
            </ul>
          </div>
        )}
        <div className="navbar-mobile-toggle" onClick={toggleMobileMenu}>
          <div className={`hamburger ${mobileMenuActive ? "active" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      <div
        className={`overlay ${mobileMenuActive ? "active" : ""}`}
        onClick={closeMobileMenu}
      ></div>
    </nav>
  );
};

export default Navbar;
