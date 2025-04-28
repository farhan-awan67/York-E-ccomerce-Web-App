import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/shopContext";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {
  const { token, navigate, setCartItem } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyStripe = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/order/verifyStripe`,
        { success, orderId },
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItem({});
        navigate("/orders");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    verifyStripe();
  }, [token]);
  return <div></div>;
};

export default Verify;
