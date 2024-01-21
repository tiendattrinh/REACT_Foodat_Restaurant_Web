import {
  EditOutlined,
  HomeOutlined,
  ShoppingOutlined,
  EyeOutlined
} from '@ant-design/icons';
import { PageHeader } from '@ant-design/pro-layout';
import {
  BackTop, Breadcrumb,
  Button,
  Col,
  Input,
  Row,
  Space,
  Spin,
  Table,
  notification,
  Form,
  Modal,
  Select,
  Tag
} from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import billManagementApi from "../../../Api/billManagementApi";
import "./billManagement.css";
import axiosClient from '../../../Api/axiosClient';
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const BillManagement = () => {

  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const navigateTo = useNavigate();

  const [id, setId] = useState();
  const [form2] = Form.useForm();

  const handleFilter = async (name) => {
    try {
      const res = await billManagementApi.searchbillManagement(name);
      setCategory(res.results);
    } catch (error) {
      console.log('search to fetch category list:' + error);
    }
  }

  const handleUpdateOrder = async (values) => {
    console.log(values);
    setLoading(true);
    // eslint-disable-next-line no-useless-catch
    try {
      const categoryList = {
        "trangthai": values.status
      }
      await axiosClient.put("/hoadonAdmin/" + id + "/updateTrangthai", categoryList).then(response => {
        if (response === undefined) {
          notification["error"]({
            message: `Thông báo`,
            description:
              'Cập nhật thất bại',
          });
        }
        else {
          notification["success"]({
            message: `Thông báo`,
            description:
              'Cập nhật thành công',
          });
          setOpenModalUpdate(false);
          handleCategoryList();
        }
      })
      setLoading(false);

    } catch (error) {
      throw error;
    }
  }

  const handleCategoryList = async () => {
    try {
      await billManagementApi.listbillManagement().then((res) => {
        console.log(res);
        setCategory(res.hoadons);
        setLoading(false);
      });
    } catch (error) {
      console.log('Failed to fetch event list:' + error);
    }
  }

  const handleEditOrder = (id) => {
    setOpenModalUpdate(true);
    (async () => {
      // eslint-disable-next-line no-useless-catch
      try {
        const response = await billManagementApi.getDetailbillManagement(id);
        console.log(response);
        setId(id);
        form2.setFieldsValue({
          status: response.status,
          address: response.address,
          description: response.description,
          orderTotal: response.orderTotal,
          products: response.products,
          user: response.user,
          billing: response.billing,
        });
        console.log(form2);
        setLoading(false);
      } catch (error) {
        throw error;
      }
    })();
  }

  const handleViewOrder = (orderId) => {
    navigateTo(`/order-details/${orderId}`);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Họ tên',
      dataIndex: 'hoten',
      key: 'hoten',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'diachi',
      key: 'diachi',
    },
    {
      title: 'Quận',
      dataIndex: 'quan',
      key: 'quan',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'sdt',
      key: 'sdt',
    },
    {
      title: 'Ghi chú',
      dataIndex: 'ghichu',
      key: 'ghichu',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangthai',
      key: 'trangthai',
      render: (slugs) => (
        <span >
          {slugs === "Đã hủy" ? <Tag style={{ width: 95, textAlign: "center" }} color="red">Đã hủy</Tag> : slugs === "Đang vận chuyển" ? <Tag style={{ width: 95, textAlign: "center" }} color="geekblue" key={slugs}>
            Vận chuyển
          </Tag> : slugs === "Đã giao" ? <Tag color="green" style={{ width: 95, textAlign: "center" }}>Đã giao</Tag> : <Tag color="blue" style={{ width: 95, textAlign: "center" }}>Đợi xác nhận</Tag>}
        </span>
      ),
    },
    {
      title: 'Ngày đặt hàng',
      dataIndex: 'ngaydathang',
      key: 'ngaydathang',
      render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    // {
    //   title: 'Mã thanh toán',
    //   dataIndex: 'mathanhtoan',
    //   key: 'mathanhtoan',
    // },
    // {
    //   title: 'Mã vận chuyển',
    //   dataIndex: 'mavanchuyen',
    //   key: 'mavanchuyen',
    // },
    // {
    //   title: 'Mã khách hàng',
    //   dataIndex: 'makhachhang',
    //   key: 'makhachhang',
    // },
    {
      title: 'Tổng tiền',
      dataIndex: 'tongtien',
      key: 'tongtien',
      render: (text, record) => {
        // Định dạng số theo format tiền Việt Nam
        const formattedCost = Number(record.tongtien).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        return formattedCost;
      },
    },


    // {
    //   title: 'Ngày tạo',
    //   dataIndex: 'created_at',
    //   key: 'created_at',
    //   render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    // },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <div>
          <Row>
            <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>

              <Button
                size="small"
                icon={<EyeOutlined />}
                style={{ width: 150, borderRadius: 15, height: 30 }}
                onClick={() => handleViewOrder(record.id)}
              >
                Xem
              </Button>
              <Button
                size="small"
                icon={<EditOutlined />}
                style={{ width: 150, borderRadius: 15, height: 30 }}
                onClick={() => handleEditOrder(record.id)}

              >
                {"Xác nhận đơn"}
              </Button>
            </div>
          </Row>
        </div>
      ),
    },
  ];

  const [openModalCreate, setOpenModalCreate] = useState(false);

  const handleCancel = (type) => {
    if (type === "create") {
      setOpenModalCreate(false);
    } else {
      setOpenModalUpdate(false)
    }
    console.log('Clicked cancel button');
  };

  useEffect(() => {
    (async () => {
      try {
        await billManagementApi.listbillManagement().then((res) => {
          console.log(res);
          setCategory(res.hoadons);
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
                <span>Quản lý hóa đơn </span>
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
                        {/* <Button onClick={showModal} icon={<PlusOutlined />} style={{ marginLeft: 10 }} >Tạo hóa đơn </Button> */}
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
          title="Cập nhật đơn hàng"
          visible={openModalUpdate}
          style={{ top: 100 }}
          onOk={() => {
            form2
              .validateFields()
              .then((values) => {
                form2.resetFields();
                handleUpdateOrder(values);
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
            <Form.Item
              name="status"
              label="Trạng thái"
              rules={[
                {
                  required: true,
                  message: 'Please input your sender name!',
                },
              ]}
              style={{ marginBottom: 10 }}
            >
              <Select >
                <Option value="Đã giao">Đã giao</Option>
                <Option value="Đang vận chuyển">Đang vận chuyển</Option>
                <Option value="Đợi xác nhận">Đợi xác nhận</Option>
                <Option value="Đã hủy">Đã hủy</Option>
              </Select>
            </Form.Item>

          </Form>
        </Modal>
      </Spin>
    </div >
  )
}

export default BillManagement;