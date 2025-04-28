import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const currency = "$";
  const devlivery_fee = "10";
  const [cartItem, setCartItem] = useState({});
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/product/products`
      );
      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

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

    if (token) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/cart/add`,
          {
            productId,
            size,
          },
          { headers: { token } }
        );
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;

    for (let productId in cartItem) {
      for (let size in cartItem[productId]) {
        try {
          if (cartItem[productId][size]) {
            totalCount += cartItem[productId][size];
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    }
    return totalCount;
  };

  const updateCartQuantity = async (itemId, size, quantity) => {
    const cartData = structuredClone(cartItem);

    cartData[itemId][size] = quantity;
    setCartItem(cartData);

    if (token) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/cart/update`,
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/get`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItem(response.data.cartData);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //cart total
  const getCartTotalAmount = () => {
    let totalAmount = 0;
    for (const productId in cartItem) {
      const totalInfo = products?.find((product) => productId === product._id);
      if (!totalInfo) continue; // ✅ Prevents undefined errors
      for (const size in cartItem[productId]) {
        try {
          if (cartItem[productId][size] > 0) {
            totalAmount += totalInfo.price * cartItem[productId][size];
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    }
    return totalAmount;
  };

  useEffect(() => {
    if (products.length === 0) {
      getProducts();
    }
  }, [products]);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, []);

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
    token,
    setToken,
    loading,
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
