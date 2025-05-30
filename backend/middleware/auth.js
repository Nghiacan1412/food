import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  // Lấy token từ header Authorization
  const token = req.headers.authorization?.replace("Bearer ", "");

  // Kiểm tra xem token có tồn tại không
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Không có token, hãy đăng nhập lại" });
  }

  try {
    // Giải mã token
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    // Gắn userId vào req để dùng trong controller
    req.userId = token_decode.id; // Hoặc req.user = token_decode tùy thiết kế
    next(); // Chuyển tiếp đến controller
  } catch (error) {
    console.log("Lỗi xác thực token:", error);
    return res
      .status(401)
      .json({ success: false, message: "Token không hợp lệ" });
  }
};

export default authMiddleware;
