import styles from "../home.module.scss";
import classNames from "classnames/bind";
import './banner.scss';


const cx = classNames.bind(styles);

function Banner() {
    return (
        <>
            <div className={cx("home-header-banner")}>
                <div className={cx("title1")}>
                    <div className={cx("titletop")}>FOODAT</div>
                    <div className={cx("titledown")}>RESTAURANT</div>
                </div>
                <div className={cx("title2")}>
                    <p>
                        Chào mừng bạn đến với nhà hàng của chúng tôi! Cùng trải nghiệm những
                        món ăn ngon đặc trưng cùng các đầu bếp đẳng cấp đến từ nhiều quốc gia khác nhau
                        với không gian sang trọng. Đặt món ngay để tận hưởng những bữa ăn thú vị!!
                    </p>
                </div>
                <div className={cx("search")}></div>
                <div className={cx("options")}>
                    <button>
                        <a href="#menu">Đặt món ngay</a>
                    </button>
                </div>
            </div>
        </>
    );
}

export default Banner;