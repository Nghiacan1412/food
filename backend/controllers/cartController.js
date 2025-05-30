import userModel from "../models/userModel.js";

// Add items to user cart
const addToCart = async (req, res) => {
  try {
    const { itemId } = req.body;
    const userId = req.userId; // Lấy từ authMiddleware

    if (!userId || !itemId) {
      return res
        .status(400)
        .json({ success: false, message: "Thiếu userId hoặc itemId" });
    }

    let userData = await userModel.findOne({ _id: userId });
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy user" });
    }

    let cartData = userData.cartData || {};
    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Đã thêm vào giỏ hàng" });
  } catch (error) {
    console.log("Lỗi trong addToCart:", error);
    res
      .status(500)
      .json({ success: false, message: error.message || "Lỗi server" });
  }
};

// Remove items from user cart
const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.body;
    const userId = req.userId; // Lấy từ authMiddleware

    if (!userId || !itemId) {
      return res
        .status(400)
        .json({ success: false, message: "Thiếu userId hoặc itemId" });
    }

    let userData = await userModel.findOne({ _id: userId });
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy user" });
    }

    let cartData = userData.cartData || {};
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] <= 0) {
        delete cartData[itemId]; // Xóa item nếu số lượng về 0
      }
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Item không có trong giỏ hàng" });
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Đã xóa khỏi giỏ hàng" });
  } catch (error) {
    console.log("Lỗi trong removeFromCart:", error);
    res
      .status(500)
      .json({ success: false, message: error.message || "Lỗi server" });
  }
};

// Fetch user cart data
const getCart = async (req, res) => {
  try {
    const userId = req.userId; // Lấy từ authMiddleware

    if (!userId) {
      return res.status(400).json({ success: false, message: "Thiếu userId" });
    }

    let userData = await userModel.findOne({ _id: userId });
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy user" });
    }

    const cartData = userData.cartData || {};
    res.json({ success: true, cartData });
  } catch (error) {
    console.log("Lỗi trong getCart:", error);
    res
      .status(500)
      .json({ success: false, message: error.message || "Lỗi server" });
  }
};

export { addToCart, removeFromCart, getCart };
