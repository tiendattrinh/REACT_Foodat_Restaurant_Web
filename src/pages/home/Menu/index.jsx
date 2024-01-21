import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./Menu.module.scss";
import classNames from "classnames/bind";
import Product from "./product";


const cx = classNames.bind(styles);
function Menu() {
    const [dataMenu, setDataMenu] = useState([]);
    const [dataProduct, setDataProduct] = useState([]);
    const [dataProductFilter, setDataProductFilter] = useState([]);
    const [dataFilter, setDataFilter] = useState(null);

    ///API du lieu menu
    useEffect(() => {
        // Define the API endpoint you want to fetch data from
        const apiUrl = 'http://localhost:3001/api/loaihang';

        // Make the API call using Axios
        axios.get(apiUrl)
            .then(response => {
                // Handle successful response
                setDataMenu(response.data.data[0]);
            })
            .catch(error => {
                // Handle error
                console.error('Error fetching data:', error);
            });
    }, []);

    ///API du lieu san pham
    useEffect(() => {
        // Define the API endpoint you want to fetch data from
        const apiUrl = 'http://localhost:3001/api/sanpham';

        // Make the API call using Axios
        axios.get(apiUrl)
            .then(response => {
                // Handle successful response
                setDataProduct(response.data.data[0]);
            })
            .catch(error => {
                // Handle error
                console.error('Error fetching data:', error);
            });
    }, []);
    //   console.log(dataProduct);

    const handleClickLoaiHang = (tenLoaiHang) => {
        setDataFilter(tenLoaiHang);
    }

    useEffect(() => {
        // Define the API endpoint you want to fetch data from
        const apiUrl = `http://localhost:3001/api/sanpham/${dataFilter}`;

        // Make the API call using Axios
        axios.get(apiUrl)
            .then(response => {
                // Handle successful response
                setDataProductFilter(response.data.data);
            })
            .catch(error => {
                // Handle error
                console.error('Error fetching data:', error);
            });
    }, [dataFilter]);

    return (
        <section
            className={cx("our-menu", "repeat-img")} id="menu">
            <div className={cx("sec-wp", "edit-background")}>
                <div className={cx("container", "edit-bg")}>
                    <div className={cx("row")}>
                        <div className={cx("col-lg-12", "edit-bg")}>
                            <div className={cx("sec-title", "text-center", "mb-3")}>
                                <h2 className={cx("h2-title", "edit-menutt")}>Foodat Restaurant</h2>
                            </div>
                        </div>
                    </div>
                    <div className={cx("menu-tab-wp")}>
                        <div className={cx("row")}>
                            <div className={cx("col-lg-12", "m-auto")}>
                                <div className={cx("menu-tab", "text-center")}>
                                    <ul className={cx("filters")}>
                                        {/* <div className={cx("filter-active")}></div> */}
                                        <li className={cx("filter")} onClick={() => handleClickLoaiHang(null)} data-filter=".all, .breakfast, .lunch, .dinner">
                                            Tất cả
                                        </li>
                                        {dataMenu.map((data, index) => (
                                            <li className={cx("filter")} data-filter=".breakfast" onClick={() => handleClickLoaiHang(data.id)} key={index}>
                                                {data.ten}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx("menu-list-row")}>
                        <div className={cx("row", "g-xxl-5", "bydefault_show")} id="menu-dish">
                            {dataFilter === null ? dataProduct.map((data, index) => (
                                <Product
                                    key={index}
                                    id={data.id}
                                    ten={data.ten}
                                    mota={data.mota}
                                    tenLoai={data.tenLoaiHang}
                                    gia={data.dongia.toLocaleString()}
                                    img={data.hinhanh}
                                    tinhtrang={data.tinhtrang}
                                />
                            )) : dataProductFilter.map((data, index) => (
                                <Product
                                    key={index}
                                    id={data.id}
                                    ten={data.ten}
                                    mota={data.mota}
                                    tenLoai={data.tenLoaiHang}
                                    gia={data.dongia.toLocaleString()}
                                    img={data.hinhanh}
                                    tinhtrang={data.tinhtrang}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}

export default Menu;