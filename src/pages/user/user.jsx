import React, { useState, useEffect } from 'react';
import './user.scss';
import { Link } from 'react-router-dom';
import { updateUserApi, userListApi } from '../../Api';
import { userOrderApi } from '../../Api';
import userListLike from './section/listlike';


function User() {
    const handleLogout = () => {
        const confirmation = window.confirm("Bạn có chắc chắn muốn đăng xuất?");
        if (confirmation) {
            // Xóa thông tin người dùng từ localStorage
            localStorage.removeItem("name");
            localStorage.removeItem("id");

            // Chuyển hướng về trang chủ
            history.push('/');
        }
    }

    const [userInfo, setUserInfo] = useState({
        id: '',
        ten: localStorage.getItem('name'),
        tendem: localStorage.getItem('tendem'),
        gmail: localStorage.getItem('gmail'),
        diachi: localStorage.getItem('diachi'),
        sdt: localStorage.getItem('sdt'),
        gioitinh: localStorage.getItem('gioitinh')
    });



    const [orderCount, setOrderCount] = useState(0); // State để lưu số đơn hàng
    // Hàm này sẽ chạy khi component được tạo ra
    useEffect(() => {
        // Thực hiện gọi API để lấy thông tin đơn hàng
        const fetchOrderCount = async () => {
            try {
                const userId = localStorage.getItem('id');
                const orderData = await userOrderApi(userId);
                // Lấy số lượng đơn hàng từ đối tượng orderData
                const count = orderData.length;
                setOrderCount(count);
            } catch (error) {
                console.error('Error fetching user orders:', error);
            }
        };

        fetchOrderCount();
    }, []);

    const [totalSpending, setTotalSpending] = useState(0); // State để lưu tổng chi tiêu

    useEffect(() => {
        // Thực hiện gọi API để lấy thông tin đơn hàng
        const fetchOrderData = async () => {
            try {
                const userId = localStorage.getItem('id');
                const orderData = await userOrderApi(userId);

                // Tính tổng chi tiêu từ đối tượng orderData
                const total = orderData.reduce((acc, order) => acc + order.tongtien, 0);
                setTotalSpending(total);
            } catch (error) {
                console.error('Error fetching user orders:', error);
            }
        };

        fetchOrderData();
    }, []); // Thêm mảng rỗng để đảm bảo useEffect chỉ chạy 1 lần sau khi component được mount


    useEffect(() => {
        // Lấy thông tin từ localStorage
        const ten = localStorage.getItem('name');
        const tendem = localStorage.getItem('tendem');
        const gmail = localStorage.getItem('gmail');
        const diachi = localStorage.getItem('diachi');
        const sdt = localStorage.getItem('sdt');
        const gioitinh = localStorage.getItem('gioitinh');
        const id = localStorage.getItem('id');

        // Cập nhật state object
        setUserInfo({
            id: id || "",
            ten: ten || "",
            tendem: tendem || "",
            gmail: gmail || "",
            diachi: diachi || "",
            sdt: sdt || "",
            gioitinh: gioitinh || ""
        });
    }, []);

    useEffect(() => {
        // Cập nhật localStorage khi userInfo thay đổi
        localStorage.setItem("name", userInfo.ten);
        localStorage.setItem("tendem", userInfo.tendem);
        //localStorage.setItem("gmail", userInfo.gmail);
        localStorage.setItem("sdt", userInfo.sdt);
        localStorage.setItem("diachi", userInfo.diachi);
        localStorage.setItem("gioitinh", userInfo.gioitinh);


    }, [userInfo]);

    const handleUpdateProfile = async () => {
        try {
            await updateUserApi(userInfo);
            alert('Thông tin người dùng đã được cập nhật thành công');
        } catch (error) {
            console.error('Lỗi khi cập nhật thông tin người dùng:', error.message);
            alert('Đã xảy ra lỗi khi cập nhật thông tin người dùng');
        }
    };


    return (
        <div className='user-container'>
            <div className='user-background'>
                <div className='user-type'>

                    <div className='user-body'>
                        <div className='left-menu-user'>
                            <div className='user-header'>
                                <h5>TRANG KHÁCH HÀNG</h5>
                            </div>
                            <section id="option-menu">
                                <div className='menu'>
                                    <i class="fas fa-user-circle"></i>
                                    <Link to="/user"><span className='text'>   Thông tin tài khoản</span></Link>
                                </div>
                                <div className='menu'>
                                    <i class="fas fa-chart-bar"></i>
                                    <Link to="/user/order"><span className='text'>   Danh sách đơn hàng</span></Link>
                                </div>
                                <div className='menu'>
                                    <i class="far fa-list-alt"></i>
                                    <Link to="/user/listlike"><span className='text'>   Danh sách yêu thích</span></Link>
                                </div>

                                <div class="footer-menu-user">
                                    <div className='menu'>
                                        <div className='horver-menu-footer'>
                                            <div onClick={handleLogout}><p>Đăng xuất</p></div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div className='right-menu-user'>
                            <div class="box-info-user">
                                <div className='s1'>
                                    <i class="fas fa-user-cog"></i>
                                    <span className="text">
                                        <h4>{userInfo.ten}</h4>
                                        <h5>Xin chào !!</h5>
                                    </span>
                                </div>
                                <div className='s2'>
                                    <i class="fas fa-clipboard-list"></i>
                                    <span class="text">
                                        <h3>{orderCount}</h3>
                                        <p>Đơn hàng</p>
                                    </span>
                                </div>
                                <div className='s3'>
                                    <i class="fas fa-cart-arrow-down"></i>
                                    <span class="text">
                                        <h3>{totalSpending.toLocaleString()}đ</h3>
                                        <p>Tổng chi tiêu</p>
                                    </span>
                                </div>
                            </div>

                            <div className='edit-user-info'>
                                <div className='info'>
                                    <div className='header-info'>Tài khoản</div>
                                    <div className='input1'>
                                        <div className='input-info'>
                                            <label>Email:</label>
                                            <input className='form-control' type='gmail' readOnly
                                                value={userInfo.gmail !== "null" ? userInfo.gmail : "Chưa có thông tin"}
                                                onChange={(event) => setUserInfo({ ...userInfo, gmail: event.target.value })}
                                            />
                                        </div>
                                        <div className='input-info'>
                                            <label>Tên:</label>
                                            <input className='form-control' type='text'
                                                value={userInfo.ten !== "null" ? userInfo.ten : "Chưa có thông tin"}
                                                onChange={(event) => setUserInfo({ ...userInfo, ten: event.target.value })}
                                            />
                                        </div>
                                        <div className='input-info'>
                                            <label>Tên đệm:</label>
                                            <input className='form-control' type='text'
                                                value={userInfo.tendem !== "null" ? userInfo.tendem : "Chưa có thông tin"}
                                                onChange={(event) => setUserInfo({ ...userInfo, tendem: event.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className='input2'>
                                        <div className='input-info'>
                                            <label>Số điện thoại:</label>
                                            <input className='form-control' type='text'
                                                value={userInfo.sdt !== "null" ? userInfo.sdt : "Chưa có thông tin"}
                                                onChange={(event) => setUserInfo({ ...userInfo, sdt: event.target.value })}
                                            />
                                        </div>
                                        <div className='input-info'>
                                            <label>Địa chỉ:</label>
                                            <input className='form-control' type='text'
                                                value={userInfo.diachi !== "null" ? userInfo.diachi : "Chưa có thông tin"}
                                                onChange={(event) => setUserInfo({ ...userInfo, diachi: event.target.value })}
                                            />
                                        </div>
                                        <div className='edit-gender'>
                                            <label>Giới tính: </label>
                                            <select name="gioitinh" value={userInfo.gioitinh} onChange={(event) => setUserInfo({ ...userInfo, gioitinh: event.target.value })}>
                                                <option value="Nam">Nam</option>
                                                <option value="Nữ">Nữ</option>
                                                <option value="Khác">Khác</option>
                                            </select>
                                        </div>
                                        <div className='input-info-button'>
                                            <button className='btn-save-info' onClick={handleUpdateProfile}>Lưu</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default User;