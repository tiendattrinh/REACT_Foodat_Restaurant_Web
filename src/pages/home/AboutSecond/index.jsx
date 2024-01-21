import styles from "../home.module.scss";
import classNames from "classnames/bind";
import "./about.scss"

function AboutSecond() {
    return (
        <>
            <section id="about">
                <div className='section-about'>
                    <div className='section-content'>
                        <div className='content-left'>
                            <h2>Sushi - Món ngon Nhật Bản</h2>
                            <p>
                                Sushi, một biểu tượng của ẩm thực Nhật Bản, không chỉ là một món ăn ngon miệng mà còn là một tác phẩm nghệ thuật tinh tế. Hấp dẫn từ cái nhìn đầu tiên bởi sự sắp xếp tỉ mỉ và màu sắc phối hợp, sushi đã trở thành một trong những món ăn được ưa chuộng trên khắp thế giới.</p>
                            <p>
                                Hương vị của sushi không chỉ đến từ những thành phần chính, mà còn từ cách nước giấm pha chế kèm theo muối và đường, tạo nên hương vị giòn, chua ngọt đặc trưng. Đối với những người yêu thích ẩm thực, việc thưởng thức sushi không chỉ là việc thưởng thức một bữa ăn ngon miệng, mà còn là trải nghiệm văn hóa độc đáo, nơi mà mỗi cuộn sushi là một tác phẩm nghệ thuật riêng biệt.</p>
                        </div>
                        <div className='content-right'>
                            <div className="right-image">
                                <img src="src/assets/about/sushi.png" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="about">
                <div className='section-about-down'>
                    <div className='section-content-down'>
                        <div className='content-image-down'>
                            <img src="src/assets/about/pizza.png" />
                        </div>
                        <div className='content-right-down'>
                            <div className="content-right-down">
                                <h2>Pizza - Biểu tượng nước Ý</h2>
                                <p>
                                    Pizza, một biểu tượng của ẩm thực Ý, là một món ăn vô cùng phổ biến trên khắp thế giới. Với hương vị đa dạng, đồng thời sự sáng tạo không ngừng trong cách làm và phục vụ, pizza đã trở thành một đặc sản thơm ngon và thu hút mọi đối tượng ẩm thực.</p>
                                <p>
                                    Nền ẩm thực pizza bắt nguồn từ thành phố Napoli, Ý, và từ đó đã lan tỏa ra khắp thế giới với nhiều biến thể và phong cách khác nhau.
                                    Bí mật thành công của một chiếc pizza ngon nằm ở những nguyên liệu chất lượng cao: từ lớp vỏ pizza mỏng và giòn, đến sốt cà chua thơm ngon, và tất nhiên, lớp phô mai béo ngậy. Đối với những người yêu thích, việc chọn lựa những loại nhân như pepperoni, thịt gà, rau củ hoặc hải sản sẽ là một phần quan trọng để tạo nên hương vị độc đáo của mỗi chiếc pizza.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default AboutSecond;