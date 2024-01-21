import styles from "./Footer.module.scss";
import classNames from "classnames/bind";


const cx = classNames.bind(styles);

function Footer() {
    return (
        <>
            <footer className={cx("container-footer")} id="contact">
                <div className={cx("second-footer")}>
                    <div className={cx("cover-footer")}>
                        <div className={cx("left-footer")}>
                            <div className={cx("footer-logo")}>
                                <div className={cx("logo")}>
                                    <a href="/">
                                        <img src="src/assets/logofoodat.png" />
                                    </a>
                                </div>
                            </div>
                            <div className={cx("text-page")}>
                                <p>Tinh hoa ẩm thực, bùng lên hương vị tuyệt đỉnh món ăn Việt.
                                    Cảm ơn bạn đã ghé thăm và hẹn gặp lại bạn sắp tới!!</p>
                            </div>
                            <div className={cx("icon-page")}>
                                <li><a href="https://twitter.com/"><i className={cx("fab fa-twitter")}></i></a></li>
                                <li><a href="https://www.facebook.com/"><i className={cx("fab fa-facebook")}></i></a></li>
                                <li><a href="https://www.youtube.com/"><i className={cx("fab fa-youtube")}></i></a></li>
                                <li><a href="https://www.instagram.com/"><i className={cx("fab fa-instagram")}></i></a></li>
                            </div>
                        </div>

                        <div className={cx("right-footer")}>
                            <div className={cx("cover-right-footer")}>
                                <div className={cx("footer-table-thongtin")}>
                                    <h3 className={cx("h3-title")}>Địa chỉ</h3>
                                    <ul>
                                        <li><i className={cx("fas fa-map-marker-alt")}></i>  180 Cao Lỗ, quận 8, TP.HCM</li>
                                        <li><i className={cx("fas fa-phone")}></i>  0909234567</li>
                                        <li><i className={cx("fas fa-envelope")}></i>  foodat@gmail.com</li>
                                    </ul>
                                </div>
                                <div className={cx("footer-table-lienket")}>
                                    <h3 className={cx("h3-title")}>Liên kết</h3>
                                    <ul className={cx("column-2")}>
                                        <li><i className="fas fa-chevron-right"></i><a href="/">  Trang chủ</a></li>
                                        <li><i className={cx("fas fa-chevron-right")}></i><a href="#menu">  Thực đơn</a></li>
                                        <li><i className={cx("fas fa-chevron-right")}></i><a href="/news" target="_blank">  Nhà hàng</a></li>
                                        <li><i className={cx("fas fa-chevron-right")}></i><a href="#chef">  Đầu bếp</a></li>
                                        <li><i className={cx("fas fa-chevron-right")}></i><a href="#about">  Cẩm nang</a></li>
                                    </ul>
                                </div>
                                <div className={cx("footer-table-congty")}>
                                    <h3 className={cx("h3-title")}>Nhà hàng</h3>
                                    <ul>
                                        <li>Food &amp; TienDat</li>
                                        <li>Foodat restaurant</li>
                                        <li>Bắt đầu - 2001</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </div >
            </footer >

            {/* <footer className={cx("site-footer")} id="contact">
                <div className={cx("top-footer section")}>
                    <div className={cx("sec-wp")}>
                        <div className={cx("container")}>
                            <div className={cx("row")}>
                                <div className={cx("col-lg-4")}>
                                    <div className={cx("footer-info")}>
                                        <div className={cx("footer-logo")}>
                                            <a href="index.html">
                                                <img src="src/assets/logofoodat.png" />
                                            </a>
                                        </div>
                                        <p>Tinh hoa ẩm thực, bùng lên hương vị tuyệt đỉnh món ăn Việt.
                                            Cảm ơn bạn đã ghé thăm và hẹn gặp lại bạn sắp tới!!</p>
                                        <div className={cx("social-icon")}>
                                            <ul>
                                                <li><a href="https://twitter.com/"><i class="fas fa-yin-yang"></i></a></li>
                                                <li><a href="https://www.facebook.com/"><i className={cx("fab fa-facebook")}></i></a></li>
                                                <li><a href="https://www.youtube.com/"><i className={cx("fab fa-youtube")}></i></a></li>
                                                <li><a href="https://www.instagram.com/"><i className={cx("fab fa-instagram")}></i></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx("col-lg-7 test")}>
                                    <div className={cx("footer-flex-box")}>
                                        <div className={cx("footer-table-info")}>
                                            <h3 className={cx("h3-title")}>Địa chỉ</h3>
                                            <ul>
                                                <li><i className={cx("fas fa-map-marker-alt")}></i>  180 Cao Lỗ, quận 8, TP.HCM</li>
                                                <li><i className={cx("fas fa-phone")}></i>  0346262925</li>
                                                <li><i className={cx("fas fa-envelope")}></i>  foodat@gmail.com</li>
                                            </ul>
                                        </div>
                                        <div className={cx("footer-menu")}>
                                            <div className='edit-cl2'>
                                                <h3 className={cx("h3-title")}>Liên kết</h3>
                                                <ul className={cx("column-2")}>
                                                    <li><i className={cx("fas fa-chevron-right")}></i><a href="#home">  Trang chủ</a></li>
                                                    <li><i className={cx("fas fa-chevron-right")}></i><a href="#menu">  Thực đơn</a></li>
                                                    <li><i className={cx("fas fa-chevron-right")}></i><a href="#about">  Nhà hàng</a></li>
                                                    <li><i className={cx("fas fa-chevron-right")}></i><a href="#gallery">  Đầu bếp</a></li>
                                                    <li><i className={cx("fas fa-chevron-right")}></i><a href="#blog">  Đặt bàn</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className={cx("footer-menu")}>
                                            <h3 className={cx("h3-title")}>Công ty</h3>
                                            <ul>
                                                <li><a href="#">Food &amp; TienDat</a></li>
                                                <li><a href="#">Foodat restaurant</a></li>
                                                <li><a href="#">Since - 2001</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer> */}
        </>
    );
}

export default Footer;