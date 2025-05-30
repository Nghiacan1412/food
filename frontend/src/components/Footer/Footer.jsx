import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets/frontend_assets/assets";

const Footer = () => {
  // Tách slogan thành mảng để áp dụng hiệu ứng wave
  const sloganWords = ["CHỌN", "MÓN", "NGAY"];

  return (
    <footer className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img
            src={assets.logo}
            alt="NghiaFood Logo"
            className="footer-logo"
            loading="lazy"
          />
          <div className="footer-slogan">
            {sloganWords.map((word, index) => (
              <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
                {word}
              </span>
            ))}
          </div>
          <div className="footer-social-icons">
            <a
              href="https://www.facebook.com/profile.php?id=100032978714575"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Theo dõi chúng mình trên Facebook"
            >
              <img
                src={assets.facebook_icon}
                alt="Facebook"
                className="social-icon"
                loading="lazy"
              />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Theo dõi chúng mình trên Twitter"
            >
              <img
                src={assets.twitter_icon}
                alt="Twitter"
                className="social-icon"
                loading="lazy"
              />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Kết nối với chúng mình trên LinkedIn"
            >
              <img
                src={assets.linkedin_icon}
                alt="LinkedIn"
                className="social-icon"
                loading="lazy"
              />
            </a>
          </div>
        </div>
        <div className="footer-content-center">
          <h2 className="footer-title">VỀ CHÚNG MÌNH</h2>
          <ul>
            <li>
              <a href="/">Trang chủ</a>
            </li>
            <li>
              <a href="/about">Giới thiệu nè</a>
            </li>
            <li>
              <a href="/delivery">Giao hàng nhanh</a>
            </li>
            <li>
              <a href="/privacy-policy">Bảo mật thông tin</a>
            </li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2 className="footer-title">LIÊN HỆ NGAY</h2>
          <ul>
            <li>
              <a href="tel:+0332462054" aria-label="Gọi cho chúng mình">
                0332462054
              </a>
            </li>
            <li>
              <a
                href="mailto:Mrnghia@gmail.com"
                aria-label="Gửi email cho chúng mình"
              >
                Mrnghia@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <hr className="footer-divider" />
      <p className="footer-copyright">© 2025 Mr.Nghia - Chill & Meow Meow</p>
    </footer>
  );
};

export default Footer;
