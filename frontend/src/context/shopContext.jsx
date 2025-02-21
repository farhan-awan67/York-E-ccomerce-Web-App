import { createContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom"

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const currency = "$";
  const devlivery_fee = "10";
  const [cartItem, setCartItem] = useState({});
  const navigate = useNavigate();

  const addToCart = async (productId, size) => {
    let cartData = structuredClone(cartItem);

    //preventing from add to cart
    if (!size) {
      toast.error("please select size");
      return;
    }

    if (cartData[productId]) {
      if (cartData[productId][size]) {
        cartData[productId][size] += 1;
      } else {
        cartData[productId][size] = 1;
      }
    } else {
      cartData[productId] = {};
      cartData[productId][size] = 1;
    }
    setCartItem(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;

    for (let productId in cartItem) {
      for (let size in cartItem[productId]) {
        try {
          if (cartItem[productId][size]) {
            totalCount += cartItem[productId][size];
            console.log(cartItem[productId][size]);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalCount;
  };

  const updateCartQuantity = async (itemId, size, quantity) => {
    const cartData = structuredClone(cartItem);

    cartData[itemId][size] = quantity;
    setCartItem(cartData);
  };

  //cart total
  const getCartTotalAmount = () => {
    let totalAmount = 0;
    for (const productId in cartItem) {
      const totalInfo = products.find((product) => productId === product._id);
      for (const size in cartItem[productId]) {
        totalAmount += totalInfo.price * cartItem[productId][size];
      }
    }
    console.log(totalAmount);
    return totalAmount;
  };

  const value = {
    currency,
    devlivery_fee,
    products,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    addToCart,
    setCartItem,
    cartItem,
    getCartCount,
    updateCartQuantity,
    getCartTotalAmount,
    navigate,
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
