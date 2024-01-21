import { useSelector } from "react-redux";
import { cartListSelectors } from "../redux/selector";
import ProductCart from "./productCart";
import { format } from "date-fns";

import styles from "../cart/productCart/ProductCart.module.scss";
import classNames from "classnames/bind";
import { useEffect, useLayoutEffect, useState } from "react";
import { createOrderApi } from "../../Api";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { REGISTER } from "redux-persist";
import axiosClient from "../../Api/axiosClient";

const cx = classNames.bind(styles);

function Cart() {
  const cartList = useSelector(cartListSelectors);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const paymentId = queryParams.get('paymentId');

  const idUser = localStorage.getItem("id") || undefined;
  let detailOrder = cartList.map((item) => ({
    id: item.id,
    soluong: item.quantity,
    gia: item.dongia.replace(",", ""),
    tong: (item.quantity * parseFloat(item.dongia.replace(",", ""))).toString(),
    ghichu: item.ghichu,
    mahoadon: "",
    masanpham: item.id,
  }));
  const totalAmount = detailOrder.reduce((total, item) => {
    // Convert 'tong' to a number and add it to the total

    return total + parseFloat(item.tong);
  }, 0);

  // Sử dụng totalAmount để cập nhật state order
  useEffect(() => {
    setOrder((prevOrder) => ({ ...prevOrder, tongtien: totalAmount }));
  }, [totalAmount]);

  const url = new URL(window.location.href);
  const partnerCode = url.searchParams.get("partnerCode") || null;
  const [order, setOrder] = useState({
    hoten: "",
    diachi: "",
    sdt: "",
    trangthai: "Đang xác nhận",
    ngaydathang: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    mathanhtoan: 1,
    mavanchuyen: 1,
    makhachhang: idUser,
    tongtien: totalAmount,
    details: detailOrder,
    ghichu: "",
    quan: "Quận 2",
  });

  console.log(order);

  useEffect(() => {
    // Optionally, you can update the order details when cartList changes
    setOrder((prevOrder) => ({ ...prevOrder, details: detailOrder }));
  }, [cartList]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({ ...prevOrder, [name]: value }));
  };

  const handleCreateOrder = async () => {
    try {
      if (idUser === undefined) {
        navigate("/login");
      }
      // Kiểm tra thông tin có sản phẩm trống hay không
      if (cartList.length === 0) {
        alert("Đơn hàng trống. Vui lòng thêm sản phẩm vào giỏ hàng trước khi đặt hàng.");
        return;
      }
      // Kiểm tra thông tin đơn hàng có trống trường nào không
      if (
        !order.hoten ||
        !order.sdt ||
        !order.diachi
      ) {
        alert("Vui lòng điền đầy đủ thông tin đơn hàng trước khi đặt hàng.");
        return;
      }
      const response = await createOrderApi(order);
      var isConfirmed = null; // Use createOrderApi function
      if (partnerCode == null) {
        isConfirmed = window.confirm("Bạn chắn chắc muốn đặt đơn hàng này?");
      }
      if (isConfirmed && response.success) {
        console.log("Order created successfully");
        console.log("Order ID:", response.id);
        localStorage.removeItem("persist:root");

        navigate("/user/order/payment");
        // Optionally, clear the cart or perform other actions
      } else {
        console.error("Failed to create order:", response.message);
      }
    } catch (error) {
      console.error("Error creating order:", error.message);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      if (partnerCode) {
        try {
          const hoten = localStorage.getItem("hoten");
          const diachi = localStorage.getItem("diachi");
          const sdt = localStorage.getItem("sdt");
          const ghichu = localStorage.getItem("ghichu");
          const quan = localStorage.getItem("quan");
          const tongtien = localStorage.getItem("tongtien");
          const details = localStorage.getItem("details");

          setOrder((prevOrder) => ({
            ...prevOrder,
            hoten: hoten || prevOrder.hoten,
            diachi: diachi || prevOrder.diachi,
            sdt: sdt || prevOrder.sdt,
            ghichu: ghichu || prevOrder.ghichu,
            quan: quan || prevOrder.quan,
            tongtien: tongtien || prevOrder.tongtien,
            details: details || prevOrder.details,
            mathanhtoan: 2,
          }));

          localStorage.removeItem("hoten");
          localStorage.removeItem("diachi");
          localStorage.removeItem("sdt");
          localStorage.removeItem("ghichu");
          localStorage.removeItem("quan");
          localStorage.removeItem("tongtien");
          localStorage.removeItem("details");
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();

    // Check if the order has all the required data before calling handleCreateOrder
  }, [partnerCode]);

  const handleModalConfirm = async () => {
    try {
      const queryParams = new URLSearchParams(window.location.search);
      const paymentId = queryParams.get('paymentId');
      // const token = queryParams.get('token');
      const PayerID = queryParams.get('PayerID');
      const token = localStorage.getItem("session_paypal");

      // Gọi API executePayment để thực hiện thanh toán
      const response = await axiosClient.get('/payment/executePayment', {
        params: {
          paymentId,
          token,
          PayerID,
        },
      });


    } catch (error) {
      console.error('Error executing payment:', error);
      // Xử lý lỗi
    }
  };


  useEffect(() => {
    if (paymentId) {
      handleModalConfirm();
    }
    if (
      order.hoten &&
      order.diachi &&
      order.sdt &&
      order.ghichu &&
      order.quan &&
      order.tongtien &&
      order.details &&
      order.mathanhtoan == 2
    ) {
      console.log(order.details);
      handleCreateOrder();
    }
  }, [order.details]);


  const handleMomo = async (event) => {
    try {
      if (idUser === undefined) {
        navigate("/login");
      }
      // Kiểm tra thông tin có sản phẩm trống hay không
      if (cartList.length === 0) {
        alert("Đơn hàng trống. Vui lòng thêm sản phẩm vào giỏ hàng trước khi đặt hàng.");
        return;
      }
      // Kiểm tra thông tin đơn hàng có trống trường nào không
      if (
        !order.hoten ||
        !order.sdt ||
        !order.diachi
      ) {
        alert("Vui lòng điền đầy đủ thông tin đơn hàng trước khi đặt hàng.");
        return;
      }

      var isConfirmed = null; // Use createOrderApi function
      if (partnerCode == null) {
        isConfirmed = window.confirm("Bạn chắn chắc muốn đặt đơn hàng này?");
      }
      const responset = await createOrderApi(order);
      event.preventDefault();
      const updatedOrder = {
        ...order,
        details: detailOrder,
      };

      const productPayment = {
        price: Number(updatedOrder.tongtien) / 23000,
        description: updatedOrder.ghichu,
        return_url: "http://localhost:5173" + location.pathname,
        cancel_url: "http://localhost:5173" + location.pathname
      };

      const response = await axios.post(
        "http://localhost:3001/api/payment/pay",
        productPayment

      );
      console.log(response.data);
      if (response.data) {
        // Lưu vào localStorage
        localStorage.setItem("hoten", updatedOrder.hoten);
        localStorage.setItem("diachi", updatedOrder.diachi);
        localStorage.setItem("sdt", updatedOrder.sdt);
        localStorage.setItem("ghichu", updatedOrder.ghichu);
        localStorage.setItem("quan", updatedOrder.quan);
        localStorage.setItem("tongtien", updatedOrder.tongtien);
        localStorage.setItem("details", JSON.stringify(updatedOrder.details));
        localStorage.setItem("session_paypal", response.data.accessToken)

        // Chuyển hướng sau khi lưu vào localStorage
        window.location.href = response.data.approvalUrl;
      }
      localStorage.removeItem("persist:root");

    } catch (error) {
      console.error("Error:", error);
    }
  };

  const tongtien = cartList.reduce((total, product) => {
    const dongia =
      product.dongia && typeof product.dongia === "string"
        ? parseFloat(product.dongia.replace(",", ""))
        : 0;
    return total + dongia * product.quantity;
  }, 0);

  return (
    <>
      <div className={cx("cart-container")}>
        <div className={cx("left-container")}>
          <div className={cx("title-left-sp")}>
            <h3 className={cx("title-cart")}>Chi tiết giỏ hàng</h3>
            <span>Tổng tiền: {tongtien.toLocaleString()}vnd</span>
          </div>
          <table className={cx("table table-striped")}>
            <thead>
              <tr>
                <th scope="col">Ảnh</th>
                <th scope="col">Tên món</th>
                <th scope="col">Giá</th>
                <th scope="col">Số Lượng</th>
                <th scope="col">Thành tiền</th>
                <th scope="col">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {cartList.map((product, index) => {
                const dongia =
                  product.dongia && typeof product.dongia === "string"
                    ? parseFloat(product.dongia.replace(",", ""))
                    : 0;
                const tongTien = dongia * product.quantity;
                return (
                  <ProductCart
                    key={index}
                    id={product.id}
                    ten={product.ten}
                    gia={dongia}
                    quantity1={product.quantity}
                    tongTien={tongTien}
                    ghichu={product.ghichu}
                    image={product.image}
                  />
                );
              })}
            </tbody>
          </table>
        </div>

        <div className={cx("right-container")}>
          <form action="">
            <h3 className="title-cart">Thông tin đơn hàng</h3>
            <label htmlFor="firstName">*Họ tên:</label>
            <input
              type="text"
              id="firstName"
              name="hoten"
              placeholder="Nhập tên người nhận"
              required
              onChange={handleInputChange}
            />

            <label htmlFor="phone">*Số điện thoại:</label>
            <input
              type="telephone"
              id="phone"
              name="sdt"
              placeholder="Số điện thoại người nhận"
              required
              onChange={handleInputChange}
            />

            <div className={cx("edit-address-cart")}>
              <div className={cx("left-div-address")}>
                <label htmlFor="address">*Địa chỉ:</label>
                <input
                  type="text"
                  id="address"
                  name="diachi"
                  placeholder="Số nhà, tòa nhà, đường..."
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className={cx("edit-option")}>
                <label htmlFor="dropdown">*Quận (HCM):</label>
                <select id="dropdown" name="quan" onChange={handleInputChange}>
                  <option value="Quận 2">Quận 2</option>
                  <option value="Quận 5">Quận 5</option>
                  <option value="Quận 8">Quận 8</option>
                  <option value="Quận 10">Quận 10</option>
                  <option value="Bình Chánh">Bình Chánh</option>
                </select>
              </div>
            </div>

            <label htmlFor="note">Ghi chú:</label>
            <input
              type="text"
              id="note"
              name="ghichu"
              required
              onChange={handleInputChange}
              placeholder="Có thể để trống"
            />
            <div className={cx("btn-cart-option")}>
              <div className={cx("button-cash")}>
                <button type="button" onClick={handleCreateOrder}>
                  Thanh toán tiền mặt
                </button>
              </div>
              <div className={cx("button-momo")}>
                <button onClick={handleMomo}>Online thanh toán</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Cart;
