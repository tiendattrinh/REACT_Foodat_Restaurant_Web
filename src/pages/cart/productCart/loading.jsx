import React, { useState, useEffect } from "react";
import ClimbingBoxLoader from "react-spinners/ClipLoader";
import styles from "./ProductCart.module.scss";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function Loading() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const handleHome = () => {
        window.location.href = "/";
    }
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <div className={cx("loading")}>
            <div className={cx("back-ground")}>
                {loading ? (
                    <div className={cx("loader-container")}>
                        <ClimbingBoxLoader color={"orange"} loading={loading} size={100} />
                        <h3>Đang tải...</h3>
                    </div>
                ) : (
                    <div>
                        <i class="far fa-check-circle"></i>
                        <h3>Đã nhận đơn hàng của bạn</h3>
                        <button onClick={handleHome}>Quay lại Trang Chủ</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Loading;
