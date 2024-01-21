import Footer from "./footer/footer";
import Header from "./header/header";
import Sidebar from "./sidebar/sidebar";
import { Layout } from 'antd';
const { Content } = Layout;

// eslint-disable-next-line react/prop-types
function AdminLayout({ children }) {
  return (
    <div>
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar />
        <Layout >
          <Header />
          <Content style={{ marginLeft: 230, width: 'calc(100% - 230px)', marginTop: 55 }}>
            <div>
              <div style={{ width: '100%', marginLeft: 10, marginTop: 30 }}>{children}</div>
            </div>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </div>
  );
}

export default AdminLayout;