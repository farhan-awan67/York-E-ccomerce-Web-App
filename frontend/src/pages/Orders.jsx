import React, { useContext } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/shopContext";

const Orders = () => {
  const { products, currency } = useContext(ShopContext);
  return (
    <div class="border-t pt-16">
      <div class="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div>
        {products.slice(1, 4).map((item, idx) => {
          return (
            <div
              key={idx}
              class="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div class="flex items-start gap-6 text-sm">
                <img class="w-16 sm:w-20" src={item.image[0]} alt="" />
                <div>
                  <p class="sm:text-base font-medium">{item.name}</p>
                  <div class="flex items-center gap-3 mt-1 text-base text-gray-700">
                    <p>
                      {currency}{item.price}
                    </p>
                    <p>Quantity: 1</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p class="mt-1">
                    Date: <span class=" text-gray-400">Fri Feb 21 2025</span>
                  </p>
                  <p class="mt-1">
                    Payment: <span class=" text-gray-400">COD</span>
                  </p>
                </div>
              </div>
              <div class="md:w-1/2 flex justify-between">
                <div class="flex items-center gap-2">
                  <p class="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p class="text-sm md:text-base">Order Placed</p>
                </div>
                <button class="border px-4 py-2 text-sm font-medium rounded-sm">
                  Track Order
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
