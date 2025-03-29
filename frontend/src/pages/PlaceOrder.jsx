import React, { useContext, useMemo, useState } from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/shopContext";
import { toast } from "react-toastify";
import axios from "axios";

const PlaceOrder = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const {
    navigate,
    token,
    products,
    cartItem,
    setCartItem,
    getCartTotalAmount,
    devlivery_fee,
  } = useContext(ShopContext);
  const [method, setMethod] = useState("cod");
  const [error, setError] = useState({});
  const totalAmount = useMemo(() => getCartTotalAmount(), [cartItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm(data);
    if (!isValid) {
      return;
    }

    try {
      let orderItem = [];

      for (const productId in cartItem) {
        for (const size in cartItem[productId]) {
          if (cartItem[productId][size] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === productId)
            );
            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = cartItem[productId][size];
              orderItem.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        items: orderItem,
        address: data,
        amount: totalAmount + Number(devlivery_fee),
      };

      switch (method) {
        case "cod":
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/order/place`,
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            setCartItem({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const validateConfig = {
    firstName: [{ message: "firstname is required", required: true }],
    lastName: [{ message: "lastname is required", required: true }],
    email: [{ message: "email is required", required: true }],
    street: [{ message: "street is required", required: true }],
    city: [{ message: "city is required", required: true }],
    state: [{ message: "state is required", required: true }],
    zipcode: [{ message: "zipcode is required", required: true }],
    country: [{ message: "country is required", required: true }],
    phone: [{ message: "phone is required", required: true }],
  };

  const validateForm = (data) => {
    const errors = {};
    let valid = true;
    Object.entries(data).forEach(([key, value]) => {
      validateConfig[key].some((rule) => {
        if (!value && rule.required) {
          toast.error(rule.message);
          valid = false;
        }
      });
    });
    console.log(errors);
    setError(errors);
    return valid;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* left */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            name="firstName"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First name"
            value={data.firstName}
            onChange={handleChange}
          />
          <input
            name="lastName"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last name"
            value={data.lastName}
            onChange={handleChange}
          />
        </div>
        <input
          name="email"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email address"
          value={data.email}
          onChange={handleChange}
        />
        <input
          name="street"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street"
          value={data.street}
          onChange={handleChange}
        />
        <div className="flex gap-3">
          <input
            name="city"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
            value={data.city}
            onChange={handleChange}
          />
          <input
            name="state"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
            value={data.state}
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-3">
          <input
            name="zipcode"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="Zipcode"
            value={data.zipcode}
            onChange={handleChange}
          />
          <input
            name="country"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
            value={data.country}
            onChange={handleChange}
          />
        </div>
        <input
          name="phone"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="number"
          placeholder="Phone"
          value={data.phone}
          onChange={handleChange}
        />
      </div>

      {/* right */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <div className="w-full">
            <div className="text-2xl">
              <div className="inline-flex gap-2 items-center mb-3">
                <p className="text-gray-500">
                  CART <span className="text-gray-700 font-medium">TOTALS</span>
                </p>
                <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-2 text-sm">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>$ {totalAmount}.00</p>
              </div>
              <hr />
              <div className="flex justify-between">
                <p>Shipping Fee</p>
                <p>$ 10.00</p>
              </div>
              <hr />
              <div className="flex justify-between">
                <b>Total</b>
                <b>$ {totalAmount + Number(devlivery_fee)}.00</b>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <div className="inline-flex gap-2 items-center mb-3">
            <p className="text-gray-500">
              PAYMENT <span className="text-gray-700 font-medium">METHOD</span>
            </p>
            <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
          </div>
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div>
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-400" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              // onClick={() => navigate("/orders")}
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
