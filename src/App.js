import logo from "./logo.svg";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "./App.css";
import { useState } from "react";
import Navbar from "./Components/Navbar";
import PizzaPage from "./Pages/ProductsPage/PizzaPage";
import { BrowserRouter, Route, Routes, Link, Switch } from "react-router-dom";
import CartPage from "./Pages/OrderAndCart/CartPage";
import LoginPage from "./Pages/AuthenticationPages/LoginPage";
import SignupPage from "./Pages/AuthenticationPages/SignupPage";
import OrderSuccessful from "./Pages/OrderAndCart/OrderSuccessful";
import OrderFailed from "./Pages/OrderAndCart/OrderFailed";
import DonationSuccessful from "./Pages/OrderAndCart/DonationSuccessful"; 
import DonationFailed from "./Pages/OrderAndCart/DonationFailed";
import OrderPage from "./Pages/OrderAndCart/OrderPage";
import FeedbackForm from "./Pages/InformationAndContactPages/Feedback";
import Footer from "./Components/Footer";
import StylishBlogPage from "./Pages/InformationAndContactPages/blog";
import { BlogPage } from "./Pages/InformationAndContactPages/BlogPage";
import Blogs from "./Pages/InformationAndContactPages/BlogData";
import ContactUs from "./Pages/InformationAndContactPages/ContactUs";
import AboutUsPage from "./Pages/InformationAndContactPages/AboutUs";
import QuestionsAndAnswers from "./Pages/InformationAndContactPages/QuestionsAndAnswers";
import Home from "./Pages/HomePage/Home";
import ForgetPasswordPage from "./Pages/AuthenticationPages/ForgotPassword";
import SignupAuthentication from "./Pages/AuthenticationPages/SignupAuthentication";
import NotFoundPage from "./Pages/ErrorPages/404NotFound";
import NotFoundAuthPage from "./Pages/ErrorPages/NotFoundAuth";
import AddrPage from "./Pages/AdressPage/AddrPage";
import Account from "./Pages/UserDropdown/Account";
import WishlistPage from "./Pages/UserDropdown/WishList";
import DonatePage from "./Pages/UserDropdown/Donate";
import TermsAndConditionsPage from "./Pages/UserDropdown/TermsAndConditions";
import HelpAndSupportPage from "./Pages/UserDropdown/HelpAndSupport";
import IndianMealsPage from "./Pages/ProductsPage/IndianMealsPage";
import BevaragesPage from "./Pages/ProductsPage/BevaragesPage";
import BurgerPage from "./Pages/ProductsPage/BurgerPage";
import SidesPage from "./Pages/ProductsPage/SidesPage";
import AdminApp from "./Pages/AdminDashboard/AdminApp";
import NotFoundPageAdmin from "./Pages/ErrorPages/AdminPageNotFound";
import Products from "./Pages/ProductsPage/Products";

function App() {
  const [key, setKey] = useState(0);

  const handleAdminDashboardClick = () => {
    setKey((prevKey) => prevKey + 1);
  };

  const shouldRenderNavbarAndFooter = () => {
    const currentPath = window.location.pathname;

    return !currentPath.startsWith('/admin-dashboard');

  };

 
  return (
    <div className="App">
      <BrowserRouter>
        {shouldRenderNavbarAndFooter() && <Navbar />}
        <Routes>
          <Route
            path="/FAQs"
            element={<QuestionsAndAnswers></QuestionsAndAnswers>}
          />
          <Route path="/admin-dashboard/*" element={<AdminApp  handleAdminDashboardClick = {handleAdminDashboardClick}></AdminApp>} />
          <Route path="/" element={<Home></Home>} />
          <Route path="/Pizzas" element={<PizzaPage></PizzaPage>} />
          <Route
            path="/indian-meals"
            element={<IndianMealsPage></IndianMealsPage>}
          />
          <Route path="/products/*" element={<Products></Products>} />
          <Route path="/bevarages" element={<BevaragesPage></BevaragesPage>} />
          <Route path="/burgers" element={<BurgerPage></BurgerPage>} />
          <Route path="/sides" element={<SidesPage></SidesPage>} />
          <Route path="/cart" element={<CartPage></CartPage>} />
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          <Route path="/signup" element={<SignupPage></SignupPage>}></Route>
          <Route
            path="/OrderSuccessful/:session_id"
            element={<OrderSuccessful ></OrderSuccessful>}
          ></Route>
          <Route
            path="/DonationSuccessful/:session_id"
            element={<DonationSuccessful></DonationSuccessful>}
          ></Route>
          <Route
            path="/OrderFailed/:session_id"
            element={<OrderFailed></OrderFailed>}
          ></Route>
           <Route
            path="/DonationFailed/:session_id"
            element={<DonationFailed></DonationFailed>}
          ></Route>
          <Route path="/orders" element={<OrderPage></OrderPage>}></Route>
          <Route
            path="/feedback"
            element={<FeedbackForm></FeedbackForm>}
          ></Route>
          <Route
            path="/blog"
            element={<StylishBlogPage></StylishBlogPage>}
          ></Route>
          <Route
            path="/blog/:blogId"
            element={<BlogPage blogs={Blogs}></BlogPage>}
          ></Route>
          <Route path="/contactus" element={<ContactUs></ContactUs>}></Route>
          <Route path="/aboutus" element={<AboutUsPage></AboutUsPage>}></Route>
          <Route
            path="/forgot-password"
            element={<ForgetPasswordPage></ForgetPasswordPage>}
          ></Route>
          <Route
            path="/signupAuth"
            element={<SignupAuthentication></SignupAuthentication>}
          ></Route>
          <Route
            path="/404"
            element={<NotFoundAuthPage></NotFoundAuthPage>}
          ></Route>
           <Route
            path="/not-found"
            element={<NotFoundPageAdmin></NotFoundPageAdmin>}
          ></Route>
          <Route path="/address" element={<AddrPage></AddrPage>}></Route>
          <Route path="/account" element={<Account></Account>}></Route>
          <Route
            path="/wishlist"
            element={<WishlistPage></WishlistPage>}
          ></Route>
          <Route path="/donate" element={<DonatePage></DonatePage>}></Route>
          <Route
            path="/help-and-support"
            element={<HelpAndSupportPage></HelpAndSupportPage>}
          ></Route>
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditionsPage></TermsAndConditionsPage>}
          ></Route>
          <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
        </Routes>
       {shouldRenderNavbarAndFooter() && <Footer></Footer>}
      </BrowserRouter>
    </div>
  );
}

export default App;
