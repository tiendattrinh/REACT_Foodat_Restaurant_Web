import styles from "../home.module.scss";
import classNames from "classnames/bind";


const cx = classNames.bind(styles);

function About() {
    return (
        <>
            <section id="">
                <div className={cx('section-about')}>
                    <div className={cx('section-about-header')}>
                        ________
                    </div>
                    <div className={cx('section-about-content')}>
                        <div className={cx('content-left')}>
                            <iframe width="450" height="300" src="https://www.youtube.com/embed/V5w1OGknhlc" title="The Heavy Hitting Burger - Promo Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                        </div>
                        <div className={cx('content-right')}>
                            <h2>Câu chuyện Burger</h2>
                            <p style={{ marginTop: 10 }}>
                                Burger, không chỉ là một bữa ăn nhanh tiện, mà còn là một tác phẩm nghệ thuật ẩm thực. Đặc trưng bởi sự kết hợp hoàn hảo giữa bánh mềm mịn và nhân thịt bò xay thơm ngon.</p>
                            <p>
                                Những chiếc burger tại Foodat restaurant không chỉ đơn giản là bữa ăn, mà là câu chuyện về sự sáng tạo và đam mê ẩm thực hàng đầu giữa các nước.

                                Với mỗi miếng thịt thơm lừng và mỗi lớp rau sống tươi ngon, chúng tôi mang đến cho bạn không gian để thư giãn và thưởng thức từng giọt vị ngon
                                tại nhà hàng của chúng tôi!!</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default About;