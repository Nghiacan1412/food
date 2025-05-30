// import React, { useContext, useState } from "react";
// import "./Cart.css";
// import { StoreContext } from "../../context/StoreContext";
// import { useNavigate } from "react-router-dom";

// const Cart = () => {
//   const { cartItems, food_list, removeFromCart } = useContext(StoreContext);
//   const navigate = useNavigate();
//   const [promoCode, setPromoCode] = useState("");

//   // Hàm tính tổng tiền giỏ hàng
//   const getTotalCartAmount = () => {
//     if (!food_list || !cartItems) return 0;
//     return food_list.reduce((total, item) => {
//       if (cartItems[item._id] > 0) {
//         return total + item.price * cartItems[item._id];
//       }
//       return total;
//     }, 0);
//   };

//   // Kiểm tra nếu giỏ hàng trống
//   const isCartEmpty =
//     !food_list?.length || !food_list.some((item) => cartItems?.[item._id] > 0);

//   // Xử lý khi gửi mã khuyến mãi
//   const handlePromoCodeSubmit = () => {
//     if (promoCode) {
//       alert(`Đã áp dụng mã: ${promoCode}`);
//       // Thêm logic xử lý mã khuyến mãi ở đây
//     } else {
//       alert("Vui lòng nhập mã khuyến mãi!");
//     }
//   };

//   // Hàm định dạng giá tiền theo VND
//   const formatPrice = (price) => {
//     return price.toLocaleString("vi-VN", {
//       style: "currency",
//       currency: "VND",
//     });
//   };

//   if (isCartEmpty) {
//     return <div className="cart">Thêm món đi chớ chứ bấm zô xem làm gì !!</div>;
//   }

//   return (
//     <div className="cart">
//       <div className="cart-items">
//         <div className="cart-items-title">
//           <p>Mặt hàng</p>
//           <p>Chi tiết</p>
//           <p>Giá tiền</p>
//           <p>Số lượng</p>
//           <p>Tổng tiền</p>
//           <p>Xoá</p>
//         </div>
//         {food_list?.map((item) => {
//           if (cartItems?.[item._id] > 0) {
//             return (
//               <div key={item._id} className="cart-items-item">
//                 <img
//                   src={item.image || "đường_dẫn_hình_mặc_định.jpg"}
//                   alt={item.name}
//                 />
//                 <p>{item.name}</p>
//                 <p>{formatPrice(item.price)}</p> {/* Định dạng giá tiền VND */}
//                 <p>{cartItems[item._id]}</p>
//                 <p>{formatPrice(item.price * cartItems[item._id])}</p>{" "}
//                 {/* Định dạng tổng tiền VND */}
//                 <p onClick={() => removeFromCart(item._id)} className="cross">
//                   x
//                 </p>
//               </div>
//             );
//           }
//           return null;
//         })}
//       </div>
//       <div className="cart-bottom">
//         <div className="cart-total">
//           <h2>Tổng giỏ hàng</h2>
//           <div className="cart-total-details">
//             <p>Phí giao hàng</p>
//             <p>{formatPrice(10000)}</p> {/* Phí giao hàng 10,000 VND */}
//           </div>
//           <div className="cart-total-details">
//             <b>Tổng cộng:</b>
//             <b>{formatPrice(getTotalCartAmount() + 10000)}</b>{" "}
//             {/* Tổng tiền với phí 10,000 VND */}
//           </div>
//           <button onClick={() => navigate("/order")}>
//             TIẾN HÀNH THANH TOÁN
//           </button>
//         </div>
//         <div className="cart-promocode">
//           <div>
//             <p>Nhập mã khuyến mãi</p>
//             <div className="cart-promocode-input">
//               <input
//                 type="text"
//                 placeholder="Mã khuyến mãi"
//                 value={promoCode}
//                 onChange={(e) => setPromoCode(e.target.value)}
//               />
//               <button onClick={handlePromoCodeSubmit}>Gửi</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;

import React, { useContext, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, url } =
    useContext(StoreContext);
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");

  // Hàm tính tổng tiền giỏ hàng
  const getTotalCartAmount = () => {
    if (!food_list || !cartItems) return 0;
    return food_list.reduce((total, item) => {
      if (cartItems[item._id] > 0) {
        return total + item.price * cartItems[item._id];
      }
      return total;
    }, 0);
  };

  // Hàm tính tổng số lượng sản phẩm
  const getTotalItems = () => {
    if (!cartItems) return 0;
    return Object.values(cartItems).reduce(
      (total, quantity) => total + quantity,
      0
    );
  };

  // Tính dự kiến thời gian giao hàng (30-45 phút từ thời điểm hiện tại)
  const getEstimatedDeliveryTime = () => {
    const now = new Date();
    const minTime = new Date(now.getTime() + 10 * 60000); // 10 phút sau
    const maxTime = new Date(now.getTime() + 20 * 60000); // 20 phút sau

    const formatTime = (date) => {
      let hours = date.getHours();
      let minutes = date.getMinutes();
      return `${hours < 10 ? "0" + hours : hours}:${
        minutes < 10 ? "0" + minutes : minutes
      }`;
    };

    return `${formatTime(minTime)} - ${formatTime(maxTime)}`;
  };

  // Kiểm tra nếu giỏ hàng trống
  const isCartEmpty =
    !food_list?.length || !food_list.some((item) => cartItems?.[item._id] > 0);

  // Xử lý khi gửi mã khuyến mãi
  const handlePromoCodeSubmit = () => {
    if (promoCode) {
      alert(`Đã áp dụng mã: ${promoCode}`);
      // Thêm logic xử lý mã khuyến mãi ở đây
    } else {
      alert("Vui lòng nhập mã khuyến mãi!");
    }
  };

  // Hàm định dạng giá tiền theo VND
  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  if (isCartEmpty) {
    return <div className="cart">Thêm món đi chớ chứ bấm zô xem làm gì !!</div>;
  }

  return (
    <div className="cart">
      <div className="cart-header">
        <h2>Giỏ hàng của bạn ({getTotalItems()} món)</h2>
      </div>

      <div className="cart-container">
        <div className="cart-items">
          <div className="cart-items-title">
            <p>Hình ảnh</p>
            <p>Sản phẩm</p>
            <p>Giá tiền</p>
            <p>Số lượng</p>
            <p>Tổng tiền</p>
            <p>Xoá</p>
          </div>
          {food_list?.map((item) => {
            if (cartItems?.[item._id] > 0) {
              return (
                <div key={item._id} className="cart-items-item">
                  <div className="item-image">
                    <img src={url + "/images/" + item.image} atl="" />
                  </div>
                  <p className="item-name">{item.name}</p>
                  <p className="item-price">{formatPrice(item.price)}</p>
                  <p className="item-quantity">{cartItems[item._id]}</p>
                  <p className="item-total">
                    {formatPrice(item.price * cartItems[item._id])}
                  </p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">
                    x
                  </p>
                </div>
              );
            }
            return null;
          })}
        </div>

        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Tổng giỏ hàng</h2>
            <div className="cart-total-details">
              <p>Số lượng sản phẩm:</p>
              <p>{getTotalItems()} món</p>
            </div>
            <div className="cart-total-details">
              <p>Tạm tính:</p>
              <p>{formatPrice(getTotalCartAmount())}</p>
            </div>
            <div className="cart-total-details">
              <p>Phí giao hàng:</p>
              <p>{formatPrice(10000)}</p>
            </div>
            <div className="cart-delivery-time">
              <p>Dự kiến thời gian giao hàng:</p>
              <p className="time">{getEstimatedDeliveryTime()}</p>
            </div>
            <div className="cart-total-details total">
              <b>Tổng cộng:</b>
              <b>{formatPrice(getTotalCartAmount() + 10000)}</b>
            </div>
            <button onClick={() => navigate("/order")} className="checkout-btn">
              TIẾN HÀNH THANH TOÁN
            </button>
          </div>

          <div className="cart-promocode">
            <div>
              <p>Nhập mã khuyến mãi</p>
              <div className="cart-promocode-input">
                <input
                  type="text"
                  placeholder="Mã khuyến mãi"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button onClick={handlePromoCodeSubmit}>Gửi</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
