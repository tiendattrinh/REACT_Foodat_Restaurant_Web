import { useSelector } from "react-redux";
import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import { cartListSelectors } from "../../../pages/redux/selector";
import { useNavigate } from "react-router-dom";


const cx = classNames.bind(styles);

function Header() {
  //const cartList = useSelector(cartListSelectors);
  const name = localStorage.getItem("name");
  const cartArr = useSelector((state) => state.cartArr);
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmation = window.confirm("Bạn có chắc chắn muốn đăng xuất?");
    if (confirmation) {
      localStorage.removeItem("name");
      localStorage.removeItem("tendem");
      localStorage.removeItem("gmail");
      localStorage.removeItem("sdt");
      localStorage.removeItem("diachi");
      localStorage.removeItem("gioitinh");
      localStorage.removeItem("id");
      navigate('/')
    }
  }
  const handleUser = () => {
    navigate('/user')
  }

  const handleSearch = (keyword) => {
    // Xử lý tìm kiếm và chuyển hướng đến đường dẫn tương ứng
    navigate(`/${keyword}`);
  };

  const totalQuantity = cartArr.reduce((total, product) => total + product.quantity, 0);
  return (
    <>
      <div className={cx("home-header-container")}>
        <div className={cx("home-header-content")}>
          <div className={cx("left-content")}>
            <div className={cx("header-logo")}></div>
          </div>
          <div className={cx("center-content")}>
            <div className={cx("child-content")}>
              <div>
                <a href="/">
                  <b>Trang chủ</b>
                </a>
              </div>
            </div>
            <div className={cx("child-content")}>
              <div>
                <b><a href="#menu">Thực đơn</a></b>
              </div>
            </div>
            <div className={cx("dropdown")}>
              <button className={cx("edit-btn-restaurant")}>
                <b>
                  Nhà hàng <i class="fa-solid fa-chevron-down"></i>
                </b>
              </button>
              <div className={cx("content")}>
                <a href="/news" target="_blank">
                  Tin tức
                </a>
                <a href="/restaurant" target="_blank">
                  Thông tin
                </a>
              </div>
            </div>
            <div className={cx("child-content")}>
              <div>
                <b><a href="#chef">Đầu bếp</a></b>
              </div>
            </div>
            <div className={cx("child-content")}>
              <div>
                <b><a href="#about">Cẩm nang</a></b>
              </div>
            </div>
          </div>
          <div className={cx("right-content")}>
            <div className={cx("search-btn")}>
              <form
                className={cx("header-search-form")}
                onSubmit={(e) => {
                  e.preventDefault();
                  const searchKeyword = e.target.elements.searchInput.value;
                  if (searchKeyword.trim() !== "") {
                    // Xử lý tìm kiếm và chuyển hướng đến đường dẫn tương ứng
                    navigate(`/${searchKeyword}`);
                  }
                }}
              >
                <input
                  type="search"
                  className={cx("form-input")}
                  placeholder="Tìm kiếm..."
                  name="searchInput"
                />
                <button className={cx("button-search")} type="submit">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </form>
            </div>
            <div className={cx("btn-cart")}>
              <a href="/cart">
                <i className={cx("fas fa-shopping-cart")}></i>
                <span className={cx("cart-number")}>{totalQuantity}</span>
              </a>
            </div>
            {name ? (
              <div className={cx("bnt-sign-up")}>
                <div className={cx("btn-cart")}><i onClick={handleUser} class="fas fa-user-check" title={name}></i></div>
                {/* <p>{name}!</p> */}
                <div className={cx("btn-cart")}><p onClick={handleLogout}><i class="fas fa-sign-out-alt" title="Đăng xuất"></i></p></div>

              </div>
            ) : (
              <div className={cx("btn-cart")}>
                <a href="/login">
                  <i className={cx("fas fa-user")}></i>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
