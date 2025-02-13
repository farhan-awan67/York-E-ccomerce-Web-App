import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/shopContext";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
const Cart = () => {
  const { products, cartItem, currency, updateCartQuantity } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    //getting product with product id
    for (let productId in cartItem) {
      //getting sizes of that specific product
      for (let size in cartItem[productId]) {
        if (cartItem[productId][size] > 0) {
          tempData.push({
            _id: productId,
            size,
            quantity: cartItem[productId][size],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItem]);

  return (
    <div className="border-t pt-14">
      {/* title */}
      <div>
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      {/*cart products */}
      <div>
        {cartData &&
          cartData.map((item, idx) => {
            const productData = products.find(
              (product) => product._id === item._id
            );

            return (
              <div
                key={idx}
                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
              >
                <div className="flex items-start gap-6">
                  <img
                    className="w-16 sm:w-20"
                    src={productData.image[0]}
                    alt=""
                  />
                  <div>
                    <p class="text-xs sm:text-lg font-medium">
                      {productData.name}
                    </p>
                    <div class="flex items-center gap-5 mt-2">
                      <p>
                        {currency}
                        {productData.price}
                      </p>
                      <p class="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                        {item.size}
                      </p>
                    </div>
                  </div>
                </div>
                <input
                  onChange={(e) =>
                    e.target.value === "" || e.target.value === "0"
                      ? null
                      : updateCartQuantity(
                          item._id,
                          item.size,
                          Number(e.target.value)
                        )
                  }
                  class="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                  type="number"
                  min="1"
                />
                <img
                  onClick={() => updateCartQuantity(item._id, item.size, 0)}
                  className="w-4 mr-4 sm:w-5 cursor-pointer"
                  src={assets.bin_icon}
                  alt=""
                />
              </div>
            );
          })}
      </div>

      {/* chechkout */}
      <div class="flex justify-end my-20">
        <div class="w-full sm:w-[450px]">
          <div class="w-full">
            <div class="text-2xl">
              {/* <div class="inline-flex gap-2 items-center mb-3">
                <p class="text-gray-500">
                  CART <span class="text-gray-700 font-medium">TOTALS</span>
                </p>
                <p class="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
              </div> */}
              <Title text1={"CART "} text2={"TOTALS"} />
            </div>
            <div class="flex flex-col gap-2 mt-2 text-sm">
              <div class="flex justify-between">
                <p>Subtotal</p>
                <p>$ 38.00</p>
              </div>
              <hr />
              <div class="flex justify-between">
                <p>Shipping Fee</p>
                <p>$ 10.00</p>
              </div>
              <hr />
              <div class="flex justify-between">
                <b>Total</b>
                <b>$ 48.00</b>
              </div>
            </div>
          </div>
          <div class=" w-full text-end">
            <button class="bg-black text-white text-sm my-8 px-8 py-3">
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
