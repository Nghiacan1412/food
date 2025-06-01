import React, { useEffect, useState, useMemo } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // Thêm state cho từ khóa tìm kiếm
  const itemsPerPage = 5; // Số lượng món ăn trên mỗi trang

  // Fetch danh sách món ăn
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Không thể tải danh sách món ăn!");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi tải danh sách!");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // Lọc danh sách món ăn dựa trên từ khóa tìm kiếm
  const filteredList = useMemo(() => {
    return list.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [list, searchTerm]);

  // Tính toán danh sách món ăn hiển thị
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredList.slice(startIndex, endIndex);
  }, [filteredList, currentPage]);

  // Tính tổng số trang
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);

  // Hàm xử lý chuyển trang
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Render các nút phân trang
  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5; // Số nút hiển thị tối đa (không tính Prev/Next)

    // Nút Prev
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-btn nav-btn"
      >
        &larr; Prev
      </button>
    );

    // Hiển thị các nút số trang
    if (totalPages <= maxVisibleButtons) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`pagination-btn ${currentPage === i ? "active" : ""}`}
          >
            {i}
          </button>
        );
      }
    } else {
      const showLeftEllipsis = currentPage > 3;
      const showRightEllipsis = currentPage < totalPages - 2;

      // Trang đầu
      buttons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={`pagination-btn ${currentPage === 1 ? "active" : ""}`}
        >
          1
        </button>
      );

      // Dấu "..." bên trái
      if (showLeftEllipsis) {
        buttons.push(
          <button key="ellipsis1" className="pagination-btn ellipsis" disabled>
            ...
          </button>
        );
      }

      // Các trang giữa
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`pagination-btn ${currentPage === i ? "active" : ""}`}
          >
            {i}
          </button>
        );
      }

      // Dấu "..." bên phải
      if (showRightEllipsis) {
        buttons.push(
          <button key="ellipsis2" className="pagination-btn ellipsis" disabled>
            ...
          </button>
        );
      }

      // Trang cuối
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`pagination-btn ${
            currentPage === totalPages ? "active" : ""
          }`}
        >
          {totalPages}
        </button>
      );
    }

    // Nút Next
    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-btn nav-btn"
      >
        Next &rarr;
      </button>
    );

    return buttons;
  };

  return (
    <div className="list add flex-col">
      <h2>Danh sách món ăn</h2>

      {/* Tìm kiếm */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Tìm kiếm món..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="list-table">
        <div className="list-table-format title">
          <b>Hình ảnh</b>
          <b>Tên</b>
          <b>Phân loại</b>
          <b>Giá</b>
          <b>Hoạt động</b>
        </div>
        {currentItems.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt=""></img>
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(item.price)}
              </p>
              <p onClick={() => removeFood(item._id)} className="cursor">
                X
              </p>
            </div>
          );
        })}
      </div>

      {/* Phân trang */}
      <div className="pagination">{renderPaginationButtons()}</div>
    </div>
  );
};

export default List;
