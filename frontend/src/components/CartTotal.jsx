import React, { useContext, useEffect, useMemo } from "react";
import { ShopContext } from "../context/shopContext";
import Title from "./Title";
import { useNavigate } from "react-router-dom";

const CartTotal = () => {
  const { currency, devlivery_fee, getCartTotalAmount, cartItem } =
    useContext(ShopContext);
  const navigate = useNavigate();
  const totalAmount = useMemo(() => getCartTotalAmount(), [cartItem]);

  return (
    <div className="flex justify-end my-20">
      <div className="w-full sm:w-[450px]">
        <div className="w-full">
          <div className="text-2xl">
            <Title text1={"CART "} text2={"TOTALS"} />
          </div>
          <div className="flex flex-col gap-2 mt-2 text-sm">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>
                {currency} {totalAmount}.00
              </p>
            </div>
            <hr />
            <div className="flex justify-between">
              <p>Shipping Fee</p>
              <p>
                {currency} {devlivery_fee}.00
              </p>
            </div>
            <hr />
            <div className="flex justify-between">
              <b>Total</b>
              <b>
                {currency}{" "}
                {getCartTotalAmount() === 0
                  ? 0
                  : totalAmount + Number(devlivery_fee)+".00"}
              </b>
            </div>
          </div>
        </div>
        <div className=" w-full text-end">
          <button
            onClick={() => navigate("/place-order")}
            className="bg-black text-white text-sm my-8 px-8 py-3"
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
