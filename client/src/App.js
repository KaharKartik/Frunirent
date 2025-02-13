import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
} from "react-router-dom";
import Footer from "./components/home/Footer/Footer";
import FooterBottom from "./components/home/Footer/FooterBottom";
import Header from "./components/home/Header/Header";
import HeaderBottom from "./components/home/Header/HeaderBottom";
import SpecialCase from "./components/SpecialCase/SpecialCase";
import About from "./pages/About/About";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Journal from "./pages/Journal/Journal";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Shop from "./pages/Shop/Shop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Bot from "./bot.js";

const Layout = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        />
      <Header />
      <HeaderBottom />
      <SpecialCase />
      <ScrollRestoration />
      <Outlet />
      <Footer />
      <FooterBottom />
    </div>
  );
};
const user = JSON.parse(localStorage.getItem('FuriUser'))

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route>
      <Route path="/" element={<Layout />}>
        {/* ==================== Header Navlink Start here =================== */}
        <Route index element={user?<Home />:<SignIn/>}></Route>
        <Route path="/shop" element={user?<Shop />:<SignIn/>}></Route>
        <Route path="/about" element={user?<About />:<SignIn/>}></Route>
        <Route path="/contact" element={user?<Contact />:<SignIn/>}></Route>
        <Route path="/journal" element={user?<Journal />:<SignIn/>}></Route>
        {/* ==================== Header Navlink End here ===================== */}
        <Route path="/category/:category" element={user?<Offer />:<SignIn/>}></Route>
        <Route path="/product/:_id" element={user?<ProductDetails />:<SignIn/>}></Route>
        <Route path="/cart" element={user?<Cart />:<SignIn/>}></Route>
        <Route path="/paymentgateway" element={user?<Payment />:<SignIn/>}></Route>
      </Route>
      
      <Route path="/signup" element={user?<Home/>:<SignUp />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
    </Route>
{/* <Bot/> */}
    </>
  )
);

function App() {
  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
