import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Đăng ký");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Đăng nhập") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} action="" className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Đóng"
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Đăng nhập" ? (
            <></>
          ) : (
            <input
              name="name"
              onChange={onChangHandler}
              value={data.name}
              type="text"
              placeholder="Tên của bạn"
              required
            />
          )}
          <input
            name="email"
            onChange={onChangHandler}
            value={data.email}
            type="email"
            placeholder="Email của bạn"
            required
          />
          <input
            name="password"
            onChange={onChangHandler}
            value={data.password}
            type="password"
            placeholder="Mật khẩu"
            required
          />
        </div>
        <button type="submit">
          {currState === "Đăng ký" ? "Tạo tài khoản" : "Đăng nhập"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>Meo meo, đồng ý với điều khoản để tiếp tục nha</p>
        </div>
        {currState === "Đăng nhập" ? (
          <p>
            Chưa có tài khoản hả?{" "}
            <span onClick={() => setCurrState("Đăng ký")}>Đăng ký liền</span>
          </p>
        ) : (
          <p>
            Đã có tài khoản rồi đúng hem?{" "}
            <span onClick={() => setCurrState("Đăng nhập")}>Đăng nhập đi</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
