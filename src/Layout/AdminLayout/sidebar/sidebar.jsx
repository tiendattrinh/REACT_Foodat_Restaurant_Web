import { ContainerOutlined, DashboardOutlined, SolutionOutlined, FileDoneOutlined, FileTextOutlined, ShoppingOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import "./sidebar.css";

const { Sider } = Layout;

function Sidebar() {
  const location = useLocation();
  const [user, setUser] = useState([]);
  const navigateTo = useNavigate();

  const menuSidebarAdmin = [
    {
      key: "dash-board",
      title: "Trang chủ",
      link: "/dash-board",
      icon: <DashboardOutlined />
    },
    {
      key: "account-management",
      title: "Quản Lý Tài Khoản",
      link: "/account-management",
      icon: <UserOutlined />
    },
    {
      key: "asset-list",
      title: "Quản lý danh mục",
      link: "/asset-list",
      icon: <ShoppingOutlined />
    },
    {
      key: "asset-management",
      title: "Quản lý sản phẩm",
      link: "/asset-management",
      icon: <ContainerOutlined />
    },
    {
      key: "chef-management",
      title: "Quản lý đầu bếp",
      link: "/chef-management",
      icon: <FileTextOutlined />
    },
    {
      key: "bill-management",
      title: "Quản lý hóa đơn",
      link: "/bill-management",
      icon: <FileDoneOutlined />
    },
    {
      key: "promotion-management",
      title: "Quản lý khuyến mãi",
      link: "/promotion-management",
      icon: <SolutionOutlined />
    },
  ];

  useEffect(() => {
    const user = {
      "role": "isAdmin"
    }
    setUser(user);
  }, []);

  const navigateLink = (link) => {
    navigateTo(link);
  }

  const handleLogout = () => {
    localStorage.clear();
    navigateTo("/");
    window.location.reload();
  };

  return (
    <Sider
      className={'ant-layout-sider-trigger'}
      width={230}
      style={{
        position: "fixed",
        top: 65,
        height: 'calc(100% - 60px)',
        left: 0,
        padding: 0,
        zIndex: 1,
        marginTop: 0,
        boxShadow: " 0 1px 4px -1px rgb(0 0 0 / 15%)",
        overflowY: 'auto',
        background: '#FFFFFF'
      }}
    >
      <Menu
        mode="inline"
        selectedKeys={location.pathname.split("/")}
        defaultOpenKeys={['account']}
        style={{ height: '100%', borderRight: 0, backgroundColor: "#FFFFFF" }}
        theme='light'
      >

        {user.role === "isAdmin" ? (
          menuSidebarAdmin.map((map) => (
            <Menu.Item
              key={map.key}
              icon={map.icon}
              className="customeClass"
              onClick={() => navigateLink(map.link)}
            >
              {map.title}
            </Menu.Item>
          ))
        ) : null}

        {/* Logout button */}
        <Menu.Item
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          className="customeClass"
        >
          Đăng xuất
        </Menu.Item>

      </Menu>
    </Sider>
  );
}

export default Sidebar;
