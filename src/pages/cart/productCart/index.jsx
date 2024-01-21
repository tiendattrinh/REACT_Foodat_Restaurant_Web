import styles from "./ProductCart.module.scss";
import classNames from "classnames/bind";
import { useDispatch } from "react-redux";
import {
  deleteCart,
  increaseQty,
  decreaseQty,
} from "../../redux/actions/actions";

const cx = classNames.bind(styles);

// eslint-disable-next-line react/prop-types
function ProductCart({ id, ten, gia, quantity1, tongTien, image }) {
  const dispath = useDispatch();
  const handleDelete = () => {
    dispath(
      deleteCart({
        id: id,
        ten: ten,
        dongia: gia,
        quantity: 1,
      })
    );
  };
  const handleIncrease = () => {
    dispath(
      increaseQty({
        id: id,
        ten: ten,
        dongia: gia,
        quantity: 1,
      })
    );
  };
  const handleDecrease = () => {
    dispath(
      decreaseQty({
        id: id,
        ten: ten,
        dongia: gia,
        quantity: 1,
      })
    );
  };

  return (
    <>
      <tr>
        <th scope="row"><img src={image} alt="" className={cx("image-cart")} /></th>
        <td><p className={cx("content-dt")}>{ten}</p></td>
        <td><p className={cx("content-dt")}>{gia.toLocaleString()}</p></td>
        <td>
          <button onClick={handleDecrease} className={cx("content-text")} title="Giảm món">
            <i className={cx("fas fa-minus")}></i>
          </button>
          <span>{quantity1}</span>
          <button className={cx("content-text")} onClick={handleIncrease} title="Thêm món">
            <i className={cx("fas fa-plus")}></i>
          </button>
        </td>
        <td><p className={cx("content-dt")}>{tongTien.toLocaleString()}</p></td>
        <td>
          <span>
            <button onClick={handleDelete} className={cx("content-text")} title="Xóa món">
              <i className="fas fa-trash-alt"></i>
            </button>
          </span>
        </td>
      </tr>
    </>
  );
}

export default ProductCart;
