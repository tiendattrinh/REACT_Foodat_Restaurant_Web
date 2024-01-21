import { CheckCircleOutlined, CopyOutlined, HomeOutlined, StopOutlined, UserOutlined } from '@ant-design/icons';
import { PageHeader } from '@ant-design/pro-layout';
import { BackTop, Breadcrumb, Button, Card, Col, Form, Input, Modal, Popconfirm, Row, Select, Space, Spin, Table, Tag, message, notification } from 'antd';
import { useEffect, useState } from 'react';
import axiosClient from '../../../Api/axiosClient';
import userApi from "../../../Api/userApi";
import "./accountManagement.css";

const { Option } = Select;

const AccountManagement = () => {

    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [selectedInput, setSelectedInput] = useState();
    const [form] = Form.useForm();


    const titleCase = (str) => {
        var splitStr = str?.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            // You do not need to check if i is larger than splitStr length, as your for does that for you
            // Assign it back to the array
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        // Directly return the joined string
        return splitStr.join(' ');
    }

    const columns = [
        {
            title: 'STT',
            dataIndex: 'id',
            key: 'index',
            render: (value, item, index) => (
                (page - 1) * 10 + (index + 1)
            ),
        },
        {
            title: 'Mã KH',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tên',
            dataIndex: 'ten',
            key: 'ten',
            render: (text) => (
                <Space size="middle">
                    {
                        <p style={{ margin: 0 }}>{titleCase(text)}</p>
                    }

                </Space>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'gmail',
            key: 'gmail',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'sdt',
            key: 'sdt',
        },
        {
            title: 'Giới tính',
            dataIndex: 'gioitinh',
            key: 'gioitinh',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'diachi',
            key: 'diachi',
        },
        // {
        //     title: 'Role',
        //     dataIndex: 'maphanquyen',
        //     key: 'maphanquyen',
        //     width: '12%',
        //     render: (text) => (
        //         <Space size="middle">
        //             {
        //                 text == "1" ?
        //                     <Tag color="blue" key={text} style={{ width: 100, textAlign: "center" }} icon={<CopyOutlined />}>
        //                         Người dùng
        //                     </Tag> : text == "2" ?
        //                         <Tag color="green" key={text} style={{ width: 100, textAlign: "center" }} icon={<CheckCircleOutlined />}>
        //                             Admin
        //                         </Tag> : null
        //             }
        //         </Space>
        //     ),
        // },

        {
            title: 'Trạng thái',
            dataIndex: 'matrangthai',
            key: 'matrangthai',
            render: (text) => (
                <Space size="middle">
                    {

                        text == "1" ?
                            <Tag color="green" key={text} style={{ width: 80, textAlign: "center" }}>
                                Hoạt động
                            </Tag>

                            : <Tag color="default" key={text} style={{ width: 80, textAlign: "center" }}>
                                Ngưng
                            </Tag>
                    }

                </Space>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <div>
                    <Row>
                        {record.matrangthai !== 1 ? <Popconfirm
                            title="Bạn muốn mở chặn tài khoản này?"
                            onConfirm={() => handleUnBanAccount(record)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button
                                size="small"
                                icon={<CheckCircleOutlined />}
                                style={{ width: 160, borderRadius: 15, height: 30 }}
                            >{"Mở chặn tài khoản"}
                            </Button>
                        </Popconfirm> : <Popconfirm
                            title="Bạn muốn chặn tài khoản này?"
                            onConfirm={() => handleBanAccount(record)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button
                                size="small"
                                icon={<StopOutlined />}
                                style={{ width: 160, borderRadius: 15, height: 30 }}
                            >{"Chặn tài khoản"}
                            </Button>
                        </Popconfirm>}
                    </Row>

                </div >
            ),
        },
    ];

    const handleListUser = async () => {
        try {
            const response = await userApi.listUserByAdmin();
            console.log(response);
            setUser(response[0]);
            setLoading(false);
        } catch (error) {
            console.log('Failed to fetch event list:' + error);
        }
    }

    const handleUnBanAccount = async (data) => {
        const params = {
            "matrangthai": 1
        }
        try {
            await userApi.unBanAccount(params, data.id).then(response => {
                if (response.message === "Email already exists") {
                    notification["error"]({
                        message: `Thông báo`,
                        description:
                            'Mở khóa thất bại',

                    });
                }
                else {
                    notification["success"]({
                        message: `Thông báo`,
                        description:
                            'Mở khóa thành công',

                    });
                    handleListUser();
                }
            }
            );

        } catch (error) {
            console.log('Failed to fetch event list:' + error);
        }
    }

    const handleBanAccount = async (data) => {
        console.log(data);
        const params = {
            "matrangthai": 2
        }
        try {
            await userApi.banAccount(params, data.id).then(response => {
                if (response === undefined) {
                    notification["error"]({
                        message: `Thông báo`,
                        description:
                            'Chặn thất bại',

                    });
                }
                else {
                    notification["success"]({
                        message: `Thông báo`,
                        description:
                            'Chặn thành công',

                    });
                    handleListUser();
                }
            }
            );

        } catch (error) {
            console.log('Failed to fetch event list:' + error);
        }
    }

    const handleFilterEmail = async (email) => {
        try {
            const response = await userApi.searchUser(email);
            setUser(response[0]);
        } catch (error) {
            console.log('search to fetch user list:' + error);
        }
    }

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const accountCreate = async (values) => {
        // eslint-disable-next-line no-useless-catch
        try {
            const formatData = {
                "username": values.name,
                "email": values.email,
                "phone": values.phone,
                "password": values.password,
                "role": values.role,
                "status": "actived"
            }
            await axiosClient.post("/user", formatData)
                .then(response => {
                    console.log(response)
                    if (response == "User already exists") {
                        return message.error('Tài khoản đã tổn tại');
                    } else
                        if (response.message == "Validation failed: Email has already been taken") {
                            message.error('Email has already been taken');
                        } else
                            if (response.message == "Validation failed: Phone has already been taken") {
                                message.error('Validation failed: Phone has already been taken');
                            } else
                                if (response == undefined) {
                                    notification["error"]({
                                        message: `Thông báo`,
                                        description:
                                            'Tạo tài khoản thất bại',

                                    });
                                }
                                else {
                                    notification["success"]({
                                        message: `Thông báo`,
                                        description:
                                            'Tạo tài khoản thành công',
                                    });
                                    form.resetFields();
                                    handleList();
                                    history.push("/account-management");
                                }
                }
                );

            setIsModalVisible(false);

        } catch (error) {
            throw error;
        }
        setTimeout(function () {
            setLoading(false);
        }, 1000);
    }

    const CancelCreateRecruitment = () => {
        form.resetFields();
        history.push("/account-management");
    }

    const handleList = () => {
        (async () => {
            try {
                const response = await userApi.listUserByAdmin();
                console.log(response);
                setUser(response[0]);
                setLoading(false);
            } catch (error) {
                console.log('Failed to fetch user list:' + error);
            }
        })();
    }

    useEffect(() => {
        handleList();
        window.scrollTo(0, 0);

    }, [])
    return (
        <div>
            <Spin spinning={loading}>
                <div style={{ marginTop: 20, marginLeft: 24 }}>
                    <Breadcrumb>
                        <Breadcrumb.Item href="">
                            <HomeOutlined />
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href="">
                            <UserOutlined />
                            <span>Quản lý tài khoản</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div id="account">
                    <div id="account_container">
                        <PageHeader
                            subTitle=""
                            style={{ fontSize: 14, paddingTop: 20, paddingBottom: 20 }}
                        >
                            <Row>
                                <Col span="12">
                                    <Input
                                        placeholder="Tìm kiếm theo tên"
                                        allowClear
                                        style={{ width: 300 }}
                                        onChange={handleFilterEmail}
                                        value={selectedInput}
                                    />
                                </Col>
                                <Col span="12">
                                    <Row justify="end">
                                    </Row>
                                </Col>
                            </Row>

                        </PageHeader>
                    </div>
                </div>
                <div style={{ marginTop: 20, marginRight: 5 }}>
                    <div id="account">
                        <div id="account_container">
                            <Card title="Quản lý tài khoản" bordered={false} >
                                <Table columns={columns} dataSource={user} pagination={{ position: ['bottomCenter'] }}
                                />
                            </Card>
                        </div>
                    </div>
                </div>
                <Modal
                    title="Thêm tài khoản"
                    visible={isModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <Form
                        form={form}
                        onFinish={accountCreate}
                        name="accountCreate"
                        layout="vertical"
                        initialValues={{
                            residence: ['zhejiang', 'hangzhou', 'xihu'],
                            prefix: '86',
                        }}
                        scrollToFirstError
                    >
                        <Form.Item
                            name="name"
                            label="Tên"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên!',
                                },
                                { max: 100, message: 'Tên tối đa 100 ký tự' },
                                { min: 5, message: 'Tên ít nhất 5 ký tự' },
                            ]
                            }
                            style={{ marginBottom: 10 }}
                        >
                            <Input placeholder="Tên" />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label="Email"
                            hasFeedback
                            rules={[
                                {
                                    type: 'email',
                                    message: 'Email không hợp lệ!',
                                },
                                {
                                    required: true,
                                    message: 'Vui lòng nhập email!',
                                },
                            ]}
                            style={{ marginBottom: 10 }}
                        >
                            <Input placeholder="Email" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Mật khẩu"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập password!',
                                },
                                { max: 20, message: 'Mật khẩu tối đa 20 ký tự' },
                                { min: 6, message: 'Mật khẩu ít nhất 5 ký tự' },
                            ]
                            }
                            style={{ marginBottom: 10 }}
                        >
                            <Input.Password placeholder="Mật khẩu" />
                        </Form.Item>

                        <Form.Item
                            name="phone"
                            label="Số điện thoại"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập số điện thoại!',
                                },
                                {
                                    pattern: /^[0-9]{10}$/,
                                    message: "Số điện thoại phải có 10 chữ số và chỉ chứa số",
                                },
                            ]}
                            style={{ marginBottom: 10 }}
                        >

                            <Input placeholder="Số điện thoại" />
                        </Form.Item>

                        <Form.Item
                            name="role"
                            label="Phân quyền"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn phân quyền!',
                                },
                            ]}
                            style={{ marginBottom: 10 }}
                        >
                            <Select placeholder="Chọn phân quyền">
                                <Option value="1">Người dùng</Option>
                                <Option value="2">Admin</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item >
                            <Button style={{ background: "#FF8000", color: '#FFFFFF', float: 'right', marginTop: 20, marginLeft: 8 }} htmlType="submit">
                                Hoàn thành
                            </Button>
                            <Button style={{ background: "#FF8000", color: '#FFFFFF', float: 'right', marginTop: 20 }} onClick={CancelCreateRecruitment}>
                                Hủy
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </Spin>
        </div>
    )
}

export default AccountManagement;