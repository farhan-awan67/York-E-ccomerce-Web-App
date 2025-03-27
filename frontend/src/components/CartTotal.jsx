import React, { useContext } from "react";
import { ShopContext } from "../context/shopContext";
import Title from "./Title";
import { useNavigate } from "react-router-dom";

const CartTotal = () => {
  const { currency, devlivery_fee, getCartTotalAmount } =
    useContext(ShopContext);
  const navigate = useNavigate();    

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
                {currency} {getCartTotalAmount()}.00
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
                {currency} {getCartTotalAmount() + devlivery_fee}
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
