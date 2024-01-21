
import Cart from "../pages/cart";
import loading from "../pages/cart/productCart/loading";
import HomePage from "../pages/home";
import Login from "../pages/login";
import news from "../pages/restaurant/news";
import restaurant from "../pages/restaurant/restaurant";
import Signup from "../pages/signup/signup";
import User from "../pages/user/user";
import userOrder from "../pages/user/section/userOrder";
import userListLike from "../pages/user/section/listlike";
import AccountManagement from "../pages/admin/AccountManagement/accountManagement";
import AssetManagement from "../pages/admin/AssetManagement/assetManagement";
import CheffManagement from "../pages/admin/CheffManagement/cheffManagement";
import AssetCategory from "../pages/admin/AssetCategory/assetCategory";
import DashBoard from "../pages/admin/DashBoard/dashBoard";
import BillManagement from "../pages/admin/BillManagement/billManagement";
import PromotionManagement from "../pages/admin/PromotionManagement/promotionManagement";
import OrderDetail from "../pages/admin/OrderDetail/orderDetail";



const routes = [
    { path: '/', component: HomePage },
    { path: '/login', component: Login, Layout: Login },
    { path: '/signup', component: Signup, Layout: Signup },
    { path: '/cart', component: Cart },
    { path: '/restaurant', component: restaurant },
    { path: '/news', component: news },
    { path: '/user', component: User },
    { path: '/user/order', component: userOrder },
    { path: '/user/order/payment', component: loading },
    { path: '/user/listlike', component: userListLike },
    { path: '/account-management', component: AccountManagement },
    { path: '/asset-management', component: AssetManagement },
    { path: '/chef-management', component: CheffManagement },
    { path: '/asset-list', component: AssetCategory },
    { path: '/dash-board', component: DashBoard },
    { path: '/bill-management', component: BillManagement },
    { path: '/promotion-management', component: PromotionManagement },
    { path: '/order-details/:id', component: OrderDetail },

]

export { routes };