import { HomeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { BackTop, Breadcrumb, Spin } from 'antd';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import promotionManagementApi from "../../../Api/promotionManagementApi";
import "./orderDetail.css";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const OrderDetail = () => {
    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    var componentRef = useRef(null);
    const handlepdf = () => {
        const input = componentRef.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save('HoaDonNhaHang.pdf')
        })
    }

    useEffect(() => {

        (async () => {
            try {
                await promotionManagementApi.getDetailOrder(id).then((res) => {
                    console.log(res);
                    setOrder(res.orderDetails);
                    setLoading(false);
                });
            } catch (error) {
                console.log('Failed to fetch event list:' + error);
            }
        })();
    }, [])

    return (
        <div>
            <Spin spinning={loading}>
                <div className='container'>
                    <div style={{ marginTop: 20 }}>
                        <Breadcrumb>
                            <Breadcrumb.Item href="#">
                                <HomeOutlined />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href="#">
                                <ShoppingCartOutlined />
                                <span>Chi tiết đơn hàng</span>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className="order-details" ref={componentRef}>
                        <h2>Chi tiết hóa đơn</h2>
                        {order.map((item, index) => (
                            <div key={index} className="order-info">
                                <p>
                                    <strong>Mã hóa đơn:</strong> {item.mahoadon}
                                </p>
                                <p>
                                    <strong>Mã sản phẩm:</strong> {item.masanpham}
                                </p>
                                <p>
                                    <strong>Tên sản phẩm:</strong> {item.ten}
                                </p>
                                <p>
                                    <strong>Mô tả sản phẩm:</strong> {item.mota}
                                </p>
                                <p>
                                    <strong>Số lượng:</strong> {item.soluong}
                                </p>
                                {item.dongia === item.gia ?
                                    <p>
                                        <strong>Giá gốc:</strong> {item.dongia}
                                    </p>
                                    :
                                    <div>
                                        <p>
                                            <strong>Giá gốc:</strong> {item.dongia}
                                        </p>
                                        <p>
                                            <strong>Giá khuyến mãi:</strong> {item.gia}
                                        </p>
                                    </div>
                                }
                                <p>
                                    <strong>Tổng:</strong> {item.tong}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div><button className="export-button" onClick={handlepdf}>Xuất hóa đơn</button></div>
                </div>
            </Spin>
        </div >
    )
}

export default OrderDetail;