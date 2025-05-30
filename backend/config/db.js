import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://nghiadinh1416:0332462054Nghia@cluster0.dekvlx7.mongodb.net/food-app"
    )
    .then(() => console.log("DB Connected"));
};
