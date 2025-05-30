// import React, { useContext, useState } from "react";
// import "./PlaceOrder.css";
// import { StoreContext } from "../../context/StoreContext";

// const PlaceOrder = () => {
//   const { getTotalCartAmount, token, food_list, cartItems, url } =
//     useContext(StoreContext);

//   // State để lưu giá trị các trường
//   const [formData, setFormData] = useState({
//     fullName: "",
//     gender: "",
//     phone: "",
//     address: "",
//     email: "",
//     country: "",
//     city: "",
//     status: "",
//     zipCode: "",
//   });

//   const onChangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setFormData((data) => ({ ...data, [name]: value }));
//   };

//   // Hàm định dạng giá tiền theo VND
//   const formatPrice = (price) => {
//     return price.toLocaleString("vi-VN", {
//       style: "currency",
//       currency: "VND",
//     });
//   };

//   // Xử lý thay đổi giá trị các trường
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((data) => ({
//       ...data,
//       [name]: value,
//     }));
//   };

//   // Xử lý submit form
//   const palceOrder = (e) => {
//     e.dataentDefault();
//     // Kiểm tra các trường bắt buộc
//     const requiredFields = [
//       "fullName",
//       "gender",
//       "phone",
//       "address",
//       "email",
//       "country",
//     ];
//     const missingFields = requiredFields.filter((field) => !formData[field]);

//     if (missingFields.length > 0) {
//       alert("Vui lòng điền đầy đủ các trường bắt buộc!");
//       return;
//     }

//     // Nếu tất cả trường bắt buộc đã được điền, tiến hành xử lý
//     // alert("Đặt hàng thành công! Meo meo cảm ơn bạn! 🐾");
//     // Thêm logic gửi dữ liệu form ở đây nếu cần
//   };

//   return (
//     <form className="place-order" onSubmit={palceOrder}>
//       <div className="place-order-left">
//         <p className="title">Thông tin</p>
//         <div className="multi-fields">
//           <input
//             type="text"
//             name="fullName"
//             placeholder="Họ và tên *"
//             value={formData.fullName}
//             onChange={onChangeHandler}
//             required
//           />
//           <select
//             name="gender"
//             value={formData.gender}
//             onChange={handleChange}
//             required
//           >
//             <option value="" disabled>
//               Giới tính *
//             </option>
//             <option value="Nam">Nam</option>
//             <option value="Nữ">Nữ</option>
//             <option value="Khác">Khác</option>
//           </select>
//         </div>
//         <input
//           type="email"
//           name="email"
//           placeholder="Email *"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="address"
//           placeholder="Địa chỉ *"
//           value={formData.address}
//           onChange={handleChange}
//           required
//         />
//         <div className="multi-fields">
//           <input
//             type="text"
//             name="city"
//             placeholder="Thành Phố"
//             value={formData.city}
//             onChange={handleChange}
//           />
//           <select name="status" value={formData.status} onChange={handleChange}>
//             <option value="" disabled>
//               Tình trạng
//             </option>
//             <option value="Độc thân">Độc thân</option>
//             <option value="Kết hôn">Kết hôn</option>
//           </select>
//         </div>
//         <div className="multi-fields">
//           <input
//             type="text"
//             name="zipCode"
//             placeholder="Mã code"
//             value={formData.zipCode}
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             name="country"
//             placeholder="Quốc gia *"
//             value={formData.country}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <input
//           type="text"
//           name="phone"
//           placeholder="Điện thoại *"
//           value={formData.phone}
//           onChange={handleChange}
//           required
//         />
//       </div>

//       <div className="place-order-right">
//         <div className="cart-total">
//           <h2>Tổng giỏ hàng</h2>
//           <div className="cart-total-details">
//             <p>Phí giao hàng</p>
//             <p>{formatPrice(10000)}</p>
//           </div>
//           <div className="cart-total-details">
//             <b>Tổng cộng:</b>
//             <b>{formatPrice(getTotalCartAmount() + 10000)}</b>
//           </div>
//           <button type="submit">TIẾN HÀNH THANH TOÁN</button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default PlaceOrder;

import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);

  const [data, setData] = useState({
    fullName: "",
    gender: "",
    phone: "",
    address: "",
    email: "",
    country: "",
    city: "",
    status: "",
    zipCode: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Bạn chưa đăng nhập!");
      return;
    }

    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = {
          ...item,
          quantity: cartItems[item._id],
        };
        orderItems.push(itemInfo);
      }
    });

    try {
      const response = await axios.post(
        "http://localhost:4000/api/order/place",
        {
          items: orderItems,
          amount: getTotalCartAmount() + 10000,
          address: data.address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        window.location.href = response.data.session_url;
      } else {
        alert("Đặt hàng thất bại: " + response.data.message);
      }
    } catch (error) {
      console.error("Lỗi đặt hàng:", error);
      alert("Token không hợp lệ hoặc chưa đăng nhập.");
    }
  };

  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  // const placeOrder = (e) => {
  //   e.dataDefault();

  //   const requiredFields = [
  //     "fullName",
  //     "gender",
  //     "phone",
  //     "address",
  //     "email",
  //     "country",
  //   ];
  //   const missingFields = requiredFields.filter((field) => !data[field]);

  //   if (missingFields.length > 0) {
  //     alert("Vui lòng điền đầy đủ các trường bắt buộc!");
  //     return;
  //   }

  //   // Xử lý logic đặt hàng tại đây
  //   alert("Đặt hàng thành công!");
  // };

  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Thông tin</p>
        <div className="multi-fields">
          <input
            type="text"
            name="fullName"
            placeholder="Họ và tên *"
            value={data.fullName}
            onChange={onChangeHandler}
            required
          />
          <select
            name="gender"
            value={data.gender}
            onChange={onChangeHandler}
            required
          >
            <option value="" disabled>
              Giới tính *
            </option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Khác">Khác</option>
          </select>
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email *"
          value={data.email}
          onChange={onChangeHandler}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Địa chỉ *"
          value={data.address}
          onChange={onChangeHandler}
          required
        />
        <div className="multi-fields">
          <input
            type="text"
            name="city"
            placeholder="Thành phố"
            value={data.city}
            onChange={onChangeHandler}
          />
          <select name="status" value={data.status} onChange={onChangeHandler}>
            <option value="" disabled>
              Tình trạng
            </option>
            <option value="Độc thân">Độc thân</option>
            <option value="Kết hôn">Kết hôn</option>
          </select>
        </div>
        <div className="multi-fields">
          <input
            type="text"
            name="zipCode"
            placeholder="Mã code"
            value={data.zipCode}
            onChange={onChangeHandler}
          />
          <input
            type="text"
            name="country"
            placeholder="Quốc gia *"
            value={data.country}
            onChange={onChangeHandler}
            required
          />
        </div>
        <input
          type="text"
          name="phone"
          placeholder="Điện thoại *"
          value={data.phone}
          onChange={onChangeHandler}
          required
        />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Tổng giỏ hàng</h2>
          <div className="cart-total-details">
            <p>Phí giao hàng</p>
            <p>{formatPrice(10000)}</p>
          </div>
          <div className="cart-total-details">
            <b>Tổng cộng:</b>
            <b>{formatPrice(getTotalCartAmount() + 10000)}</b>
          </div>
          <button type="submit">TIẾN HÀNH THANH TOÁN</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
