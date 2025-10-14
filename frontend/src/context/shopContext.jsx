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
  const [messages, setMessages] = useState([]);

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

  const chatBot = async (updatedMessages) => {
    const productsCopy = products.slice();
    const productSummary = productsCopy
      .map(
        (p, i) =>
          `${i + 1}. ${p.name} - Category: ${p.category}, Price: $${p.price}`
      )
      .join("\n");

    setLoading(true);

    try {
      const res = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "mistralai/mistral-7b-instruct",
          messages: [
            {
              role: "system",
              content: `You are a helpful shopping assistant for the York ecommerce site.
If a user says "hello", respond with a short friendly greeting.
Match product inquiries with the provided product list. The product list includes categories such as "Men", "Women", and "Kids (Girls)".
💡 Important:
- If someone says "boys", assume they mean "Men" or "Kids (Boys)".
- If they say "girls", assume "Kids (Girls)".
- If they say "ladies" or "women", assume "Women".
- If the category isn't directly mentioned in the product list, suggest similar available ones.
Always help by showing matching products from the list.
If no products match, politely inform and suggest alternatives.
Keep responses clear, concise, and friendly.
Format the matching products as a numbered list, with each product on its own line, including product name, category, and price.
Example response format:
Here are the boys' products under $150:
1. Men Round Neck Pure Cotton T-shirt - Category: Men, Price: $110
2. Men Tapered Fit Flat-Front Trousers - Category: Men, Price: $110
3. Men Round Neck Pure Cotton T-shirt - Category: Men, Price: $120

Would you like more details on any of these? 😊

Product list:
${productSummary}


`,
            },
            ...updatedMessages,
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:5173",
          },
        }
      );

      const reply = res.data.choices?.[0]?.message;

      if (reply?.content?.trim()) {
        setMessages((prev) => [...prev, reply]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Hi there! 👋 How can I help you today?",
          },
        ]);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
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
    chatBot,
    messages,
    setMessages,
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
