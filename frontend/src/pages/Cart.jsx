import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/shopContext";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";
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
      <CartTotal />
    </div>
  );
};

export default Cart;
