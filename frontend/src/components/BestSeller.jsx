import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { ShopContext } from "../context/shopContext";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSellerProducts, setBestSellerProduct] = useState([]);

  //fetching best seller products
  useEffect(() => {
    //filtering
    const bestSeller = products.filter((item) => item.bestseller);
    //setting in state
    setBestSellerProduct(bestSeller.slice(0,5));
  }, []);
  return (
    <div className="flex flex-col justify-between items-center gap-2 my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"BEST"} text2={"SELLER"} />
        <p className="text-center text-sm font-medium text-gray-700">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the.
        </p>
      </div>

      {/* rendering products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSellerProducts.map((item, idx) => {
          // Swap item and idx
          return (
            <ProductItem
              key={item._id} // Use item._id as the key
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image[0]} // Assuming item.image is an array and you want the first image
            />
          );
        })}
      </div>
    </div>
  );
};

export default BestSeller;
