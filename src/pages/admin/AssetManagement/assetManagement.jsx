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
    Select,
    InputNumber
} from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import assetManagementApi from "../../../Api/assetManagementApi";
import "./assetManagement.css";
import assetCategoryApi from '../../../Api/assetCategoryApi';
import uploadFileApi from '../../../Api/uploadFileApi';
import promotionManagementApi from '../../../Api/promotionManagementApi';

const { Option } = Select;

const AssetManagement = () => {

    const [category, setCategory] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [promotionList, setPromotionList] = useState([]);

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
                "mota": values.mota,
                "ten": values.ten,
                "hinhanh": file,
                "dongia": values.dongia,
                "tinhtrang": values.tinhtrang,
                "maloaihang": values.maloaihang,
                "madanhsachyeuthich": values.madanhsachyeuthich,
            }
            return assetManagementApi.createAssetManagement(categoryList).then(response => {
                if (response.message === "Asset with the same name already exists") {
                    notification["error"]({
                        message: `Thông báo`,
                        description:
                            'Tên sản phẩm không được trùng',
                    });
                    setLoading(false);
                    return;
                }
                if (response === undefined) {
                    notification["error"]({
                        message: `Thông báo`,
                        description:
                            'Tạo sản phẩm thất bại',
                    });
                }
                else {
                    notification["success"]({
                        message: `Thông báo`,
                        description:
                            'Tạo sản phẩm thành công',
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
                "mota": values.mota,
                "ten": values.ten,
                "hinhanh": file,
                "dongia": values.dongia,
                "tinhtrang": values.tinhtrang,
                "maloaihang": values.maloaihang,
                "madanhsachyeuthich": values.madanhsachyeuthich,
                "makhuyenmai": values.makhuyenmai
            }
            return assetManagementApi.updateAssetManagement(categoryList, id).then(response => {
                if (response.message === "Asset with the same name already exists") {
                    notification["error"]({
                        message: `Thông báo`,
                        description:
                            'Tên sản phẩm không được trùng',
                    });
                    setLoading(false);
                    return;
                }

                if (response === undefined) {
                    notification["error"]({
                        message: `Thông báo`,
                        description:
                            'Chỉnh sửa sản phẩm thất bại',
                    });
                }
                else {
                    notification["success"]({
                        message: `Thông báo`,
                        description:
                            'Chỉnh sửa sản phẩm thành công',
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
            await assetManagementApi.listAssetManagement().then((res) => {
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
            await assetManagementApi.deleteAssetManagement(id).then(response => {
                if (response.message === "Cannot delete the asset because it is referenced in another process or event.") {
                    notification["error"]({
                        message: `Thông báo`,
                        description:
                            "Không thể xóa sản phẩm vì nó đã được sử dụng trong một sự kiện hoặc quá trình khác.",

                    });
                    setLoading(false);
                    return;
                }
                if (response === undefined) {
                    notification["error"]({
                        message: `Thông báo`,
                        description:
                            'Xóa sản phẩm thất bại',

                    });
                    setLoading(false);
                }
                else {
                    notification["success"]({
                        message: `Thông báo`,
                        description:
                            'Xóa sản phẩm thành công',

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
                const response = await assetManagementApi.getDetailAssetManagement(id);
                setId(id);
                form2.setFieldsValue({
                    mota: response[0].mota,
                    ten: response[0].ten,
                    dongia: response[0].dongia,
                    tinhtrang: response[0].tinhtrang,
                    soluong: response[0].soluong,
                    maloaihang: response[0].maloaihang,
                    madanhsachyeuthich: response[0].madanhsachyeuthich,
                    makhuyenmai: response[0].makhuyenmai
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
            const res = await assetManagementApi.searchAssetManagement(name);
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
            render: (image) => <img src={image} style={{ height: 80 }} />,
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
            title: 'Giá trị',
            dataIndex: 'dongia',
            key: 'dongia',
            render: (text, record) => {
                // Định dạng số theo format tiền Việt Nam
                const formattedCost = Number(record.dongia).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                return formattedCost;
            },
        },
        {
            title: 'Trạng thái',
            dataIndex: 'tinhtrang',
            key: 'tinhtrang',
        },
        {
            title: 'Loại Hàng',
            dataIndex: 'loaihang_ten',
            key: 'loaihang_ten',
        },
        {
            title: 'Đang khuyến mãi',
            dataIndex: 'phantramkhuyenmai',
            key: 'phantramkhuyenmai',
            render: (text) => text + "%",
        },
        {
            title: 'Thời gian bắt đầu',
            dataIndex: 'thoigianBD',
            key: 'thoigianBD',
            render: (text) => moment(text).format('YYYY-MM-DD'), // Định dạng ngày tháng

        },
        {
            title: 'Thời gian kết thúc',
            dataIndex: 'thoigianKT',
            key: 'thoigianKT',
            render: (text) => moment(text).format('YYYY-MM-DD'), // Định dạng ngày tháng

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
                            style={{ marginLeft: 10 }}>
                            <Popconfirm
                                title="Bạn có chắc chắn xóa sản phẩm này?"
                                onConfirm={() => handleDeleteCategory(record.id)}
                                okText="Yes"
                                cancelText="No"
                            >
                                {/* <Button
                                    size="small"
                                    icon={<DeleteOutlined />}
                                    style={{ width: 150, borderRadius: 15, height: 30 }}
                                >{"Xóa"}
                                </Button> */}
                            </Popconfirm>
                        </div>
                    </Row>
                </div >
            ),
        },
    ];


    const handleChangeImage = async (e) => {
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
                await assetManagementApi.listAssetManagement().then((res) => {
                    console.log(res);
                    setCategory(res[0]);
                    setLoading(false);
                });

                await assetCategoryApi.listAssetCategories().then((res) => {
                    console.log(res);
                    setCategoryList(res[0]);
                    setLoading(false);
                });

                await promotionManagementApi.listPromotionManagement().then((res) => {
                    console.log(res);
                    setPromotionList(res[0]);
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
                                <span>Quản lý sản phẩm</span>
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
                                                <Button onClick={showModal} icon={<PlusOutlined />} style={{ marginLeft: 10 }} >Tạo sản phẩm</Button>
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
                    title="Tạo sản phẩm mới"
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
                                name="dongia"
                                label="Đơn giá"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập đơn giá!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <InputNumber
                                    placeholder="Đơn giá"
                                    style={{ width: '100%' }}
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')} // Use dot as a thousand separator
                                    parser={(value) => value.replace(/\./g, '')} // Remove dots for parsing
                                />
                            </Form.Item>

                            <Form.Item
                                name="tinhtrang"
                                label="Tình trạng"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn tình trạng!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <Select placeholder="Chọn tình trạng">
                                    <Select.Option value="Còn hàng">Còn hàng</Select.Option>
                                    <Select.Option value="Hết món">Hết món</Select.Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="maloaihang"
                                label="Danh mục"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn danh mục!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <Select placeholder="Chọn danh mục">
                                    {categoryList.map(category => (
                                        <Option key={category.id} value={category.id}>
                                            {category.ten}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="hinhanh"
                                label="Ảnh"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn ảnh!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleChangeImage}
                                    id="avatar"
                                    name="file"
                                />
                            </Form.Item>

                        </Spin>
                    </Form>
                </Modal>

                <Modal
                    title="Chỉnh sửa sản phẩm"
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
                                name="dongia"
                                label="Đơn giá"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập đơn giá!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <InputNumber
                                    placeholder="Đơn giá"
                                    style={{ width: '100%' }}
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')} // Use dot as a thousand separator
                                    parser={(value) => value.replace(/\./g, '')} // Remove dots for parsing
                                />
                            </Form.Item>

                            <Form.Item
                                name="tinhtrang"
                                label="Tình trạng"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn tình trạng!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <Select placeholder="Chọn tình trạng">
                                    <Select.Option value="Còn hàng">Còn hàng</Select.Option>
                                    <Select.Option value="Hết món">Hết món</Select.Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="maloaihang"
                                label="Danh mục"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn danh mục!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <Select placeholder="Chọn danh mục">
                                    {categoryList.map(category => (
                                        <Option key={category.id} value={category.id}>
                                            {category.ten}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="makhuyenmai"
                                label="Chiến dịch khuyến mãi"
                                // rules={[
                                //     {
                                //         required: true,
                                //         message: 'Vui lòng chọn chiến dịch khuyến mãi!',
                                //     },
                                // ]}
                                style={{ marginBottom: 10 }}
                            >
                                <Select placeholder="Chọn khuyến mãi">
                                    {promotionList.map(category => (
                                        <Option key={category.id} value={category.id}>
                                            {category.phantramkhuyenmai == 0 ? 'Không khuyến mãi' : category.phantramkhuyenmai}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="hinhanh"
                                label="Ảnh"
                                style={{ marginBottom: 10 }}
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleChangeImage}
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

export default AssetManagement;