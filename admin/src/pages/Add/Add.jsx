import React, { useEffect, useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Việt Nam",
  });

  const onChangHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    const response = await axios.post(`${url}/api/food/add`, formData);
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Việt Nam",
      });
      setImage(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        {/* Upload Image */}
        <div className="add-img-upload flex-col">
          <p>Tải hình ảnh</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Upload"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>

        {/* Product Name */}
        <div className="add-product-name flex-col">
          <p>Tên sản phẩm</p>
          <input
            onChange={onChangHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
          />
        </div>

        {/* Product Description */}
        <div className="add-product-description flex-col">
          <p>Mô tả</p>
          <textarea
            onChange={onChangHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
            required
          ></textarea>
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Danh mục</p>
            <select
              name="category"
              value={data.category} // Thêm value để liên kết với data.category
              onChange={onChangHandler} // Thêm onChange để xử lý thay đổi khi người dùng chọn category
            >
              <option value="Việt Nam">Việt Nam</option>
              <option value="Trung Quốc">Trung Quốc</option>
              <option value="Nhật Bản">Nhật Bản</option>
              <option value="Hàn Quốc">Hàn Quốc</option>
              <option value="Thái Lan">Thái Lan</option>
              <option value="Ấn Độ">Ấn Độ</option>
              <option value="Philippines">Philippines</option>
              <option value="Indonesia">Indonesia</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Giá sản phẩm</p>
            <input
              onChange={onChangHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="20000"
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          Thêm
        </button>
      </form>
    </div>
  );
};

export default Add;
