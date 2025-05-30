// import orderModel from "../models/orderModel.js";
// import useModel from "../models/userModel.js";
// import { Stripe } from "stripe"; // Chỉ import Stripe

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Khởi tạo instance

// // placing user order for frontend
// const placeOrder = async (req, res) => {
//   try {
//     const newOrder = new orderModel({
//       userId: req.body.userId,
//       items: req.body.items,
//       amount: req.body.amount,
//       address: req.body.address,
//     });

//     await newOrder.save();
//     await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

//     const line_items = req.body.items.map((item) => ({
//       price_data: {
//         currency: "inr",
//         product_data: {
//           name: item.name,
//         },
//         unit_amount: item.price * 100 * 80,
//       },
//       quantity: item.quantity,
//     }));
//     line_items.push({
//       price_data: {
//         currency: "inr",
//         product_data: {
//           name: "Delivery Charges",
//         },
//         unit_amount: 2 * 100 * 80,
//       },
//       quantity: 1,
//     });

//     const session = await stripe.checkout.sessions.create({
//       line_items: line_items,
//       mode: "payment",
//       success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
//       cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
//     });

//     console.log("Stripe session created:", session.url); // Debug thêm

//     res.json({ success: true, session_url: session.url });
//   } catch (error) {
//     console.log("Error in placeOrder:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export { placeOrder };

import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Không tìm thấy userId từ token" });
    }

    const { items, amount, address } = req.body;
    if (!items || !amount || !address) {
      return res
        .status(400)
        .json({ success: false, message: "Thiếu thông tin bắt buộc" });
    }

    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    const line_items = items.map((item) => ({
      price_data: {
        currency: "vnd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    }));
    line_items.push({
      price_data: {
        currency: "vnd",
        product_data: {
          name: "Phí giao hàng",
        },
        unit_amount: 10000,
      },
      quantity: 1,
    });

    const frontend_url = "http://localhost:3000";
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log("Error in placeOrder:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { placeOrder };
