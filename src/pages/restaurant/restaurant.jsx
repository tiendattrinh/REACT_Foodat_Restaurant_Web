import React from 'react';
import './restaurant.scss';

function restaurant() {
    return (
        <>
            <div className='section-book'>
                <div className='title'><h2>Đặt bàn với chúng tôi</h2></div>
                <div className='book-container'>
                    <div className='book-body-left'>
                        <form action="">
                            <div>
                                <span><h3>Chào mừng quý khách đến với Foodat</h3></span>
                            </div>
                            <div>
                                <span>Foodat tự hào với không gian thoải mái và hiện đại. Quý khách sẽ được thưởng thức những bữa ăn nhanh tuyệt vời trong bối cảnh thoải mái và sạch sẽ.
                                </span>
                            </div>
                            <div>
                                <span>Chúng tôi đã tối ưu hóa quy trình đặt hàng và giao dịch. Hệ thống đặt hàng nhanh chóng và dễ sử dụng của chúng tôi sẽ giúp quý khách tiết kiệm thời gian và có được bữa ăn ngon lành ngay tại chỗ hoặc tận nhà. Đồng thời, chúng tôi cũng cung cấp các ưu đãi và chương trình khuyến mãi hấp dẫn, đảm bảo rằng mọi giao dịch của quý khách đều là trải nghiệm tích cực.
                                </span>
                            </div>
                            <div>
                                <span>Với Foodat, chúng tôi không chỉ cung cấp thực phẩm nhanh chóng, mà còn là điểm đến của sự tiện lợi và hài lòng. Hãy đến và trải nghiệm sự khác biệt với chúng tôi ngay hôm nay!</span>
                            </div>
                            {/* <div>
                                <input type="text" className="form-text" placeholder="Tên bạn" />
                            </div>
                            <div>
                                <input type="text" className="form-text" placeholder="Số điện thoại" />
                            </div>
                            <div>
                                <input type="email" className="form-text" placeholder="Email của bạn" />
                            </div>
                            <div>
                                <select className="form-text">
                                    <option value="" disabled="" selected="">
                                        Bạn đi mấy người?
                                    </option>
                                    <option value="">1 người</option>
                                    <option value="">2 người</option>
                                    <option value="">3 người</option>
                                    <option value="">Trên 4 người</option>
                                </select>

                            </div>
                            <div className='box-date-time'>
                                <input type="date" className="form-text dtime" />
                                <input type='time' className="form-text ttime" />
                            </div>
                            <div>
                                <button className='btn-book'>Đặt ngay</button>
                            </div> */}
                        </form>
                    </div>
                    <div className='book-body-right'>

                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.9459979853514!2d106.67781657330947!3d10.738645559892996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fac4c2ec679%3A0x1b72da582829a169!2zMTgwIMSQLiBDYW8gTOG7lywgUGjGsOG7nW5nIDQsIFF14bqtbiA4LCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1700122428999!5m2!1svi!2s" width="500" height="300"></iframe>

                    </div>
                </div>
            </div>
        </>
    );
}

export default restaurant;