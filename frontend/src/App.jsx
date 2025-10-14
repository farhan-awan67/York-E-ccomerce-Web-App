import Header from "./components/Header";
import Footer from "./components/Footer";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home";
import Login from "../src/pages/Login";
import Orders from "../src/pages/Orders";
import PlaceOrder from "../src/pages/PlaceOrder";
import Product from "../src/pages/Product";
import Cart from "../src/pages/Cart";
import Collection from "../src/pages/Collection";
import About from "../src/pages/About";
import Contact from "../src/pages/Contact";
import SearchBar from "./components/SearchBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from "./pages/Verify";
import ChatBot from "./components/ChatBot";

function App() {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />
      <Header />
      <SearchBar />
      <ChatBot />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/verify" element={<Verify />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
