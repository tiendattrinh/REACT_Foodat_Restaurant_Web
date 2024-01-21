import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function userListLike() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [dataProduct, setDataProduct] = useState([]);

    const handleLogout = () => {
        const confirmation = window.confirm("Bạn có chắc chắn muốn đăng xuất?");
        if (confirmation) {
            localStorage.removeItem("name");
            localStorage.removeItem("id");
            history.push('/');
        }
    }

    const handleList = () => {
        const idUser = localStorage.getItem("id");

        // Define the API endpoint you want to fetch data from
        const apiUrl = 'http://localhost:3001/api/favorites/customer/' + idUser;

        // Make the API call using Axios
        axios.get(apiUrl)
            .then(response => {
                // Handle successful response
                setDataProduct(response.data[0]);
            })
            .catch(error => {
                // Handle error
                console.error('Error fetching data:', error);
            });
    }

    ///API du lieu san pham
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        handleList();
    }, []);
    //   console.log(dataProduct);

    const handleRemoveFavorite = (masanpham) => {
        const confirmation = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi danh sách yêu thích?");
        if (confirmation) {
            const idUser = localStorage.getItem("id");

            // Define the API endpoint you want to fetch data from
            const apiUrl = 'http://localhost:3001/api/favorites/remove/' + masanpham + "/" + idUser;

            // Make the API call using Axios
            axios.delete(apiUrl)
                .then(response => {
                    // Handle successful response
                    console.log(response.data);
                    // alert("Xóa thành công")
                    handleList();

                })
                .catch(error => {
                    // Handle error
                    console.error('Error fetching data:', error);
                });
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
                                    <a href="#"><span className='text'>   Danh sách yêu thích</span></a>
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


                        <div className='user-function'>
                            <div className="cart-container">
                                <div className="left-container">
                                    <div className="title-left-sp">
                                    </div>
                                    <table className="table table-striped">
                                        <thead>
                                            <tr><th scope="col">STT</th>
                                                <th scope="col">Ảnh</th>
                                                <th scope="col">Tên món</th>
                                                <th scope="col">Mô tả</th>
                                                <th scope="col">Giá</th>
                                                <th scope="col">Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dataProduct.map((product, index) => (
                                                <tr key={product.id}>
                                                    <td>{index + 1}</td>
                                                    <td><img src={product.hinhanh} alt={product.ten} width="50" height="50" /></td>
                                                    <td>{product.tenSanPham}</td>
                                                    <td>{product.mota}</td>
                                                    <td>{product.dongia}</td>
                                                    <td>
                                                        <button className="btn-xoa-list" onClick={() => handleRemoveFavorite(product.masanpham)}>
                                                            Xóa
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default userListLike;