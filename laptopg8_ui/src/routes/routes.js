import config from "~/config";

// Layouts
import { HeaderOnly } from "~/Layouts";
// Pages
import Home from "~/pages/Home";
import Profile from "~/pages/Profile";
import Products from "~/pages/Products";
import ProductDetail from "~/pages/ProductDetail";
import Articles from "~/pages/Articles";
import AricleDetail from "~/pages/ArticleDetail";
import Orders from "~/pages/Orders";
import Cart from "~/pages/Cart";
import Login from "~/pages/Login";
import Signup from "~/pages/Signup";
import Search from "~/pages/Search";

// Public routes
const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.profile, component: Profile, layout: HeaderOnly },
  { path: config.routes.products, component: Products },
  {
    path: config.routes.productDetail,
    component: ProductDetail,
    layout: HeaderOnly,
  },
  { path: config.routes.orders, component: Orders, layout: HeaderOnly },
  { path: config.routes.articles, component: Articles, layout: HeaderOnly },
  {
    path: config.routes.articleDetail,
    component: AricleDetail,
    layout: HeaderOnly,
  },
  { path: config.routes.articlesList, component: Articles, layout: HeaderOnly },
  { path: config.routes.cart, component: Cart, layout: HeaderOnly },
  { path: config.routes.login, component: Login, layout: HeaderOnly },
  { path: config.routes.signup, component: Signup, layout: HeaderOnly },
  { path: config.routes.search, component: Search, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
