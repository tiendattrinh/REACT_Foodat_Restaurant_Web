import { useDispatch } from "react-redux";
import styles from "../Menu.module.scss";
import classNames from "classnames/bind";
import { addCart } from "../../../redux/actions/actions";
import axios from "axios";
const cx = classNames.bind(styles);


// eslint-disable-next-line react/prop-types
function Product({ id, ten, tenLoai, gia, giagoc, mota, img, tinhtrang }) {
  const dispath = useDispatch()


  const handleCart = () => {
    dispath(addCart({
      id: id,
      ten: ten,
      mota: mota,
      dongia: gia,
      quantity: 1,
      image: img,
      tinhtrang: tinhtrang
    }))
  }

  const addFavorite = () => {
    // Define the API endpoint you want to fetch data from
    const apiUrl = 'http://localhost:3001/api/favorites';
    const idUser = localStorage.getItem("id");

    // Data to be sent in the POST request
    const postData = {
      ten: ten,
      makhachhang: idUser,
      masanpham: id
    };

    // Make the API call using Axios
    axios.post(apiUrl, postData)
      .then(response => {
        console.log(response);
        if (response.data.message == "Sản phẩm đã tồn tại trong danh sách yêu thích.") {
          alert("Sản phẩm đã tồn tại trong danh sách yêu thích.")
        } else {

          // Handle successful response
          alert("Thêm yêu thích thành công");
        }
      })
      .catch(error => {
        // Handle error
        console.error('Error fetching data:', error);
      });
  }


  return (
    <div
      className={cx("col-lg-4", " col-sm-6", "dish-box-wp", "breakfast")}
      data-cat="breakfast">
      <div className={cx("dish-box", "text-center")}>
        <div className={cx("dist-img")}>
          <img src={img} alt='Hinh' />
        </div>
        <div className={cx("dish-rating")}>
          {/* 4.3 */}
          {giagoc}
        </div>
        <div className={cx("dish-title")}>
          <h3 className={cx("h3-title")}>{ten}</h3>
          {/* <p>80 calories</p> */}
        </div>
        {/* <div className={cx("dish-info")}>
          <ul>
            <li>
              <p>Loại</p>
              <b>{tenLoai}</b>
            </li>
            <li>
              <p>Mô tả</p>
              <b>{mota}</b>
            </li>
          </ul>
        </div> */}
        <div className={cx("dist-bottom-row")}>
          <ul>
            <li>
              <b>Vnd.{gia}</b>
            </li>
            <li>
              <div>{tinhtrang === "Còn hàng" && (
                <div>
                  <button className={cx("dish-add-btn")} onClick={handleCart}><i className="fa-solid fa-plus"></i></button>
                </div>
              )}

              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Product;
