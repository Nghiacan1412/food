import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");

  const addToCart = async (itemId) => {
    try {
      console.log(`Đang thêm món ăn có ID: ${itemId} vào giỏ hàng`);

      if (!token) {
        console.error("Không có token, vui lòng đăng nhập lại");
        return;
      }

      const response = await axios.post(
        `${url}/api/cart/add`,
        { itemId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setCartItems((prev) => {
          const newCartItems = { ...prev };
          newCartItems[itemId] = (newCartItems[itemId] || 0) + 1;
          return newCartItems;
        });
        console.log("Thêm vào giỏ hàng thành công");
      } else {
        console.error("Lỗi từ server:", response.data.message);
      }
    } catch (error) {
      console.error(
        "Lỗi khi thêm vào giỏ hàng:",
        error.response?.data?.message || error.message
      );
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      console.log(`Đang giảm số lượng món ăn có ID: ${itemId}`);

      if (!token) {
        console.error("Không có token, vui lòng đăng nhập lại");
        return;
      }

      const response = await axios.post(
        `${url}/api/cart/remove`,
        { itemId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setCartItems((prev) => {
          if (!prev[itemId]) return prev;
          const newCartItems = { ...prev };
          newCartItems[itemId] = newCartItems[itemId] - 1;
          if (newCartItems[itemId] <= 0) {
            delete newCartItems[itemId];
          }
          return newCartItems;
        });
        console.log("Đã giảm số lượng món ăn trong giỏ hàng");
      } else {
        console.error("Lỗi từ server:", response.data.message);
      }
    } catch (error) {
      console.error(
        "Lỗi khi giảm số lượng món ăn:",
        error.response?.data?.message || error.message
      );
    }
  };

  const getTotalCartAmount = () => {
    if (!food_list || !cartItems) return 0;
    return food_list.reduce((total, item) => {
      if (cartItems[item._id] && cartItems[item._id] > 0) {
        return total + item.price * cartItems[item._id];
      }
      return total;
    }, 0);
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoodList(response.data.data); // Điều chỉnh tùy cấu trúc API
    } catch (error) {
      console.error("Lỗi khi lấy danh sách món ăn:", error);
    }
  };

  const fetchCartData = async () => {
    try {
      if (!token) return;
      const response = await axios.post(
        `${url}/api/cart/get`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData); // Đồng bộ giỏ hàng từ server
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu giỏ hàng:", error);
    }
  };

  useEffect(() => {
    // Gọi API khi component mount
    fetchFoodList();

    // Lấy token từ localStorage
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  useEffect(() => {
    // Đồng bộ giỏ hàng khi có token
    if (token) {
      fetchCartData();
    }
  }, [token]);

  useEffect(() => {
    console.log("Giỏ hàng hiện tại:", cartItems);
  }, [cartItems]);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
