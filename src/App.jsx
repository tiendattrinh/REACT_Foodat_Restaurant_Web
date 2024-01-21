import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./router";
import DefaultLayout from "./Layout/DefaultLayout";
import AdminLayout from "./Layout/AdminLayout";

function App() {
  // Lấy giá trị từ localStorage
  const userRole = localStorage.getItem('role');
  
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            {routes.map((route, index) => {
              const Layout = userRole === 'admin' ? AdminLayout : DefaultLayout;
              const Page = route.component;

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
