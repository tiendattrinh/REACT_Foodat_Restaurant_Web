import {
    ContactsTwoTone,
    DashboardOutlined,
    HddTwoTone,
    HomeOutlined,
    ShopTwoTone,
    ShoppingTwoTone
} from '@ant-design/icons';
import {
    BackTop,
    Breadcrumb,
    Card,
    Col,
    Row,
    Spin,
    Select
} from 'antd';
import { useEffect, useState } from 'react';
import dashBoardApi from "../../../Api/dashBoardApi";
import "./dashBoard.css";


const DashBoard = () => {
    //const { Option } = Select;
    const [statisticList, setStatisticList] = useState([]);
    const [dashboardTotalRevenue, setDashboardTotalRevenue] = useState([]);
    const [dashboardTopProducts, setDashboardTopProducts] = useState([]);
    const [dashboardTotalUser, setDashboardTotalUser] = useState([]);
    //const [dashboardTotalMonth, setStatisticMonth] = useState([]);

    // Thêm state để lưu trữ tháng được chọn
    //const [selectedMonth, setSelectedMonth] = useState(1);

    useEffect(() => {
        (async () => {
            try {
                await dashBoardApi.getAssetStatistics().then((res) => {
                    setStatisticList(res.total_orders);
                });

                // await dashBoardApi.getStatisticsMonth().then((res) => {
                //     setStatisticMonth(res.total_month);
                // });

                await dashBoardApi.getDashboardTopProducts().then((res) => {
                    setDashboardTopProducts(res.total_products);
                });

                await dashBoardApi.getDashboardTotalRevenue().then((res) => {
                    setDashboardTotalRevenue(res.total_revenue);
                });

                await dashBoardApi.getDashboardTotalUsers().then((res) => {
                    setDashboardTotalUser(res.total_users);
                });

                // Reload the page once the data fetching is completed

                if (localStorage.getItem("reload") != 1) {
                    window.location.reload();
                    localStorage.setItem("reload", 1);
                }

            } catch (error) {
                console.log('Failed to fetch event list:' + error);
            }
        })();
    }, []);

    // const handleMonthChange = async (selectedMonth) => {
    //     try {
    //         // Gán tháng đã chọn vào state
    //         setSelectedMonth(selectedMonth);

    //         // Gọi lại các hàm thống kê với tháng đã chọn
    //         await dashBoardApi.getDashboardTotalOrders(selectedMonth).then((res) => {
    //             setStatisticList(res.total_orders);
    //         });

    //         await dashBoardApi.getDashboardTopProducts(selectedMonth).then((res) => {
    //             setDashboardTopProducts(res.total_products);
    //         });

    //         await dashBoardApi.getDashboardTotalRevenue(selectedMonth).then((res) => {
    //             setDashboardTotalRevenue(res.total_revenue);
    //         });

    //         await dashBoardApi.getDashboardTotalUsers(selectedMonth).then((res) => {
    //             setDashboardTotalUser(res.total_users);
    //         });
    //     } catch (error) {
    //         console.log('Failed to fetch data:' + error);
    //     }
    // };

    return (
        <div>
            <Spin spinning={false}>
                <div className='container'>
                    <div style={{ marginTop: 20 }}>
                        <Breadcrumb>
                            <Breadcrumb.Item href="">
                                <HomeOutlined />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href="">
                                <DashboardOutlined />
                                <span>Trang chủ</span>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <Row gutter={12} style={{ marginTop: 20 }}>
                        <Col span={6}>
                            <Card className="card_total" bordered={false}>
                                <div className='card_number'>
                                    <div>
                                        <div className='number_total'>{dashboardTotalUser}</div>
                                        <div className='title_total'>Số thành viên</div>
                                    </div>
                                    <div>
                                        <ContactsTwoTone style={{ fontSize: 48 }} />
                                    </div>
                                </div>

                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card className="card_total" bordered={false}>
                                <div className='card_number'>
                                    <div>
                                        <div className='number_total'>{dashboardTopProducts}</div>
                                        <div className='title_total'>Số sản phẩm</div>
                                    </div>
                                    <div>
                                        <ShopTwoTone style={{ fontSize: 48 }} />
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card className="card_total" bordered={false}>
                                <div className='card_number'>
                                    <div>
                                        <div className='number_total'>
                                            {parseFloat(dashboardTotalRevenue).toLocaleString('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND'
                                            })}
                                        </div>
                                        <div className='title_total'>Tổng doanh thu</div>
                                    </div>
                                    <div>
                                        <HddTwoTone style={{ fontSize: 48 }} />
                                    </div>
                                </div>

                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card className="card_total" bordered={false}>
                                <div className='card_number'>
                                    <div>
                                        <div className='number_total'>{statisticList}</div>
                                        <div className='title_total'>Số đơn hàng</div>
                                    </div>
                                    <div>
                                        <ShoppingTwoTone style={{ fontSize: 48 }} />
                                    </div>
                                </div>

                            </Card>
                        </Col>
                    </Row>

                    {/* <Row gutter={12} style={{ marginTop: 20 }}>
                        <Col span={12}>
                            <Card className="card_total" bordered={false}>
                                <div className='card_number'>
                                    <div>
                                        <div className='number_total'>{dashboardTotalMonth}</div>
                                        <div className='title_total'>Tổng theo tháng</div>
                                    </div>
                                    <div>
                                        <ContactsTwoTone style={{ fontSize: 48 }} />
                                    </div>
                                </div> */}

                    {/* Thêm dropdown cho chọn tháng */}
                    {/* <Select defaultValue="1" style={{ width: 120 }} onChange={handleMonthChange}>
                                    {/* Tạo danh sách lựa chọn cho 12 tháng */}
                    {/* {[...Array(12).keys()].map(month => ( <Option key={month + 1} value={month + 1}>{`Tháng ${month + 1}`}</Option>))} */}
                    {/* </Select>

                            </Card>
                        </Col>
                    </Row> */}
                </div>
            </Spin>
        </div >
    )
}

export default DashBoard;