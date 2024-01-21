import Footer from "./Footer";
import Header from "./Header";

// eslint-disable-next-line react/prop-types
function DefaultLayout({ children }) {
  return (
    <div>
      <Header />
      <div>
        <div style={{ width: '100%' }}>{children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;