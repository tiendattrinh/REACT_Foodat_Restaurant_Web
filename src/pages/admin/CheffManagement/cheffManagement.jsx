import {
    DeleteOutlined,
    EditOutlined,
    HomeOutlined,
    PlusOutlined,
    ShoppingOutlined
} from '@ant-design/icons';
import { PageHeader } from '@ant-design/pro-layout';
import {
    BackTop, Breadcrumb,
    Button,
    Col,
    Form,
    Input,
    Modal, Popconfirm,
    Row,
    Space,
    Spin,
    Table,
    notification,
} from 'antd';
import { useEffect, useState } from 'react';
import cheffManagementApi from "../../../Api/cheffManagementApi";
import "./cheffManagement.css";
import uploadFileApi from '../../../Api/uploadFileApi';


const CheffManagement = () => {

    const [category, setCategory] = useState([]);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const [id, setId] = useState();
    const [file, setUploadFile] = useState();

    const showModal = () => {
        setOpenModalCreate(true);
    };

    const handleOkUser = async (values) => {
        setLoading(true);
        // eslint-disable-next-line no-useless-catch
        try {
            const categoryList = {
                "ten": values.ten,
                "mota": values.mota,
                "lienketyt": values.lienketyt,
                "lienketfb": values.lienketfb,
                "lienketig": values.lienketig,
                "hinhanh": file
            }
            return cheffManagementApi.createCheffManagement(categoryList).then(response => {
                if (response.message === "Asset with the same name already exists") {
                    notification["error"]({
                        message: `Thông báo`,
                        description:
                            'Tên đầu bếp không được trùng',
                    });
                    setLoading(false);
                    return;
                }
                if (response === undefined) {
                    notification["error"]({
                        message: `Thông báo`,
                        description:
                            'Tạo đầu bếp thất bại',
                    });
                }
                else {
                    notification["success"]({
                        message: `Thông báo`,
                        description:
                            'Tạo đầu bếp thành công',
                    });
                    setOpenModalCreate(false);
                    handleCategoryList();
                }
            })

        } catch (error) {
            throw error;
        }
    }

    const handleUpdateCategory = async (values) => {
        setLoading(true);
        // eslint-disable-next-line no-useless-catch
        try {
            const categoryList = {
                "ten": values.ten,
                "mota": values.mota,
                "lienketyt": values.lienketyt,
                "lienketfb": values.lienketfb,
                "lienketig": values.lienketig,
                "hinhanh": file
            }
            return cheffManagementApi.updateCheffManagement(categoryList, id).then(response => {
                if (response.message === "Asset with the same name already exists") {
                    notification["error"]({
                        message: `Thông báo`,
                        description:
                            'Tên đầu bếp không được trùng',
                    });
                    setLoading(false);
                    return;
                }

                if (response === undefined) {
                    notification["error"]({
                        message: `Thông báo`,
                        description:
                            'Chỉnh sửa đầu bếp thất bại',
                    });
                }
                else {
                    notification["success"]({
                        message: `Thông báo`,
                        description:
                            'Chỉnh sửa đầu bếp thành công',
                    });
                    handleCategoryList();
                    setOpenModalUpdate(false);
                }
            })

        } catch (error) {
            throw error;
        }
    }

    const handleCancel = (type) => {
        if (type === "create") {
            setOpenModalCreate(false);
        } else {
            setOpenModalUpdate(false)
        }
        console.log('Clicked cancel button');
    };

    const handleCategoryList = async () => {
        try {
            await cheffManagementApi.listCheffManagement().then((res) => {
                setCategory(res[0]);
                setLoading(false);
            });

        } catch (error) {
            console.log('Failed to fetch event list:' + error);
        }
    }

    const handleDeleteCategory = async (id) => {
        setLoading(true);
        try {
            await cheffManagementApi.deleteCheffManagement(id).then(response => {
                if (response.message === "Cannot delete the asset because it is referenced in another process or event.") {
                    notification["error"]({
                        message: `Thông báo`,
                        description:
                            "Không thể xóa đầu bếp vì nó đã được sử dụng trong một sự kiện hoặc quá trình khác.",

                    });
                    setLoading(false);
                    return;
                }
                if (response === undefined) {
                    notification["error"]({
                        message: `Thông báo`,
                        description:
                            'Xóa đầu bếp thất bại',

                    });
                    setLoading(false);
                }
                else {
                    notification["success"]({
                        message: `Thông báo`,
                        description:
                            'Xóa đầu bếp thành công',

                    });
                    handleCategoryList();
                    setLoading(false);
                }
            }
            );

        } catch (error) {
            console.log('Failed to fetch event list:' + error);
        }
    }

    const handleEditCategory = (id) => {
        setOpenModalUpdate(true);
        (async () => {
            // eslint-disable-next-line no-useless-catch
            try {
                const response = await cheffManagementApi.getDetailCheffManagement(id);
                setId(id);
                form2.setFieldsValue({
                    ten: response[0].ten,
                    mota: response[0].mota,
                    lienketyt: response[0].lienketyt,
                    lienketfb: response[0].lienketfb,
                    lienketig: response[0].lienketig,
                });
                console.log(form2);
                setLoading(false);
            } catch (error) {
                throw error;
            }
        })();
    }

    const handleFilter = async (name) => {
        try {
            const res = await cheffManagementApi.searchCheffManagement(name);
            setCategory(res[0]);
        } catch (error) {
            console.log('search to fetch category list:' + error);
        }
    }

    const columns = [
        {
            title: 'ID',
            key: 'index',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Ảnh',
            dataIndex: 'hinhanh',
            key: 'hinhanh',
            render: (hinhanh) => <img src={hinhanh} style={{ height: 80 }} />,
            width: '10%'
        },
        {
            title: 'Tên',
            dataIndex: 'ten',
            key: 'ten',
        },
        {
            title: 'Mô tả',
            dataIndex: 'mota',
            key: 'mota',
        },
        {
            title: 'Liên kết Facebook',
            dataIndex: 'lienketfb',
            key: 'lienketfb',
            render: (text) => <a href={text}>Xem</a>,
        },
        {
            title: 'Liên kết Instagram',
            dataIndex: 'lienketig',
            key: 'lienketig',
            render: (text) => <a href={text}>Xem</a>,
        },
        {
            title: 'Liên kết Youtube',
            dataIndex: 'lienketyt',
            key: 'lienketyt',
            render: (text) => <a href={text}>Xem</a>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <div>
                    <Row>
                        <Button
                            size="small"
                            icon={<EditOutlined />}
                            style={{ width: 150, borderRadius: 15, height: 30 }}
                            onClick={() => handleEditCategory(record.id)}
                        >{"Chỉnh sửa"}
                        </Button>
                        <div
                            style={{ marginLeft: 6 }}>
                            <Popconfirm
                                title="Bạn có chắc chắn xóa đầu bếp này?"
                                onConfirm={() => handleDeleteCategory(record.id)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button
                                    size="small"
                                    icon={<DeleteOutlined />}
                                    style={{ width: 150, borderRadius: 15, height: 30 }}
                                >{"Xóa"}
                                </Button>
                            </Popconfirm>
                        </div>
                    </Row>
                </div >
            ),
        },
    ];

    const handleChangehinhanh = async (e) => {
        setLoading(true);
        const response = await uploadFileApi.uploadFile(e);
        if (response) {
            setUploadFile(response);
        }
        setLoading(false);
    }

    useEffect(() => {
        (async () => {
            try {
                await cheffManagementApi.listCheffManagement().then((res) => {
                    console.log(res);
                    setCategory(res[0]);
                    setLoading(false);
                });
            } catch (error) {
                console.log('Failed to fetch category list:' + error);
            }
        })();
    }, [])
    return (
        <div>
            <Spin spinning={loading}>
                <div className='container-home'>
                    <div style={{ marginTop: 20 }}>
                        <Breadcrumb>
                            <Breadcrumb.Item href="">
                                <HomeOutlined />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href="">
                                <ShoppingOutlined />
                                <span>Quản lý đầu bếp</span>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>

                    <div style={{ marginTop: 20 }}>
                        <div id="my__event_container__list">
                            <PageHeader
                                subTitle=""
                                style={{ fontSize: 14 }}
                            >
                                <Row>
                                    <Col span="18">
                                        <Input
                                            placeholder="Tìm kiếm theo tên"
                                            allowClear
                                            onChange={handleFilter}
                                            style={{ width: 300 }}
                                        />
                                    </Col>
                                    <Col span="6">
                                        <Row justify="end">
                                            <Space>

                                                <Button onClick={showModal} icon={<PlusOutlined />} style={{ marginLeft: 10 }} >Tạo đầu bếp</Button>
                                            </Space>
                                        </Row>
                                    </Col>
                                </Row>
                            </PageHeader>
                        </div>
                    </div>

                    <div style={{ marginTop: 30 }}>
                        <Table columns={columns} pagination={{ position: ['bottomCenter'] }} dataSource={category} />
                    </div>
                </div>

                <Modal
                    title="Tạo đầu bếp mới"
                    visible={openModalCreate}
                    style={{ top: 100 }}
                    onOk={() => {
                        form
                            .validateFields()
                            .then((values) => {
                                form.resetFields();
                                handleOkUser(values);
                            })
                            .catch((info) => {
                                console.log('Validate Failed:', info);
                            });
                    }}
                    onCancel={() => handleCancel("create")}
                    okText="Hoàn thành"
                    cancelText="Hủy"
                    width={600}
                >
                    <Form
                        form={form}
                        name="eventCreate"
                        layout="vertical"
                        initialValues={{
                            residence: ['zhejiang', 'hangzhou', 'xihu'],
                            prefix: '86',
                        }}
                        scrollToFirstError
                    >
                        <Spin spinning={loading}>

                            <Form.Item
                                name="ten"
                                label="Tên"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tên!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <Input placeholder="Tên" />
                            </Form.Item>
                            <Form.Item
                                name="mota"
                                label="Mô tả"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mô tả!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <Input placeholder="Mô tả" />
                            </Form.Item>

                            <Form.Item
                                name="lienketyt"
                                label="Liên kết YouTube"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập liên kết YouTube!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <Input placeholder="Liên kết YouTube" />
                            </Form.Item>

                            <Form.Item
                                name="lienketfb"
                                label="Liên kết Facebook"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập liên kết Facebook!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <Input placeholder="Liên kết Facebook" />
                            </Form.Item>

                            <Form.Item
                                name="lienketig"
                                label="Liên kết Instagram"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập liên kết Instagram!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <Input placeholder="Liên kết Instagram" />
                            </Form.Item>


                            <Form.Item
                                name="hinhanh"
                                label="Chọn ảnh"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn ảnh!',
                                    },
                                ]}
                            >
                                <input
                                    type="file"
                                    accept="hinhanh/*"
                                    onChange={handleChangehinhanh}
                                    id="avatar"
                                    name="file"
                                />
                            </Form.Item>
                        </Spin>
                    </Form>
                </Modal>

                <Modal
                    title="Chỉnh sửa đầu bếp"
                    visible={openModalUpdate}
                    style={{ top: 100 }}
                    onOk={() => {
                        form2
                            .validateFields()
                            .then((values) => {
                                form2.resetFields();
                                handleUpdateCategory(values);
                            })
                            .catch((info) => {
                                console.log('Validate Failed:', info);
                            });
                    }}
                    onCancel={handleCancel}
                    okText="Hoàn thành"
                    cancelText="Hủy"
                    width={600}
                >
                    <Form
                        form={form2}
                        name="eventCreate"
                        layout="vertical"
                        initialValues={{
                            residence: ['zhejiang', 'hangzhou', 'xihu'],
                            prefix: '86',
                        }}
                        scrollToFirstError
                    >
                        <Spin spinning={loading}>
                            <Form.Item
                                name="ten"
                                label="Tên"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tên!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <Input placeholder="Tên" />
                            </Form.Item>
                            <Form.Item
                                name="mota"
                                label="Mô tả"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mô tả!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <Input placeholder="Mô tả" />
                            </Form.Item>

                            <Form.Item
                                name="lienketyt"
                                label="Liên kết YouTube"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập liên kết YouTube!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <Input placeholder="Liên kết YouTube" />
                            </Form.Item>

                            <Form.Item
                                name="lienketfb"
                                label="Liên kết Facebook"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập liên kết Facebook!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <Input placeholder="Liên kết Facebook" />
                            </Form.Item>

                            <Form.Item
                                name="lienketig"
                                label="Liên kết Instagram"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập liên kết Instagram!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <Input placeholder="Liên kết Instagram" />
                            </Form.Item>


                            <Form.Item
                                name="hinhanh"
                                label="Chọn ảnh"
                            >
                                <input
                                    type="file"
                                    accept="hinhanh/*"
                                    onChange={handleChangehinhanh}
                                    id="avatar"
                                    name="file"
                                />
                            </Form.Item>
                        </Spin>
                    </Form>
                </Modal>
            </Spin>
        </div >
    )
}

export default CheffManagement;