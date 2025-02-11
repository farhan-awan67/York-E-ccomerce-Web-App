import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/shopContext";
import { assets } from "../assets/frontend_assets/assets";

const Product = () => {
  const { productId } = useParams();
  const { products, currency } = useContext(ShopContext);
  const [oneProduct, setOneProduct] = useState(false);
  const [image, setImage] = useState();
  const fetchProduct = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setOneProduct(item);
        setImage(item.image[0]);
      }
    });
  };

  console.log(oneProduct);

  useEffect(() => {
    fetchProduct();
  }, [products, productId]);
  return (
    <div className="flex justify-between flex-col sm:flex-row gap-12 my-7">
      {/* left */}
      <div className="flex gap-2 justify-between flex-col-reverse sm:flex-row w-1/2">
        <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
          {oneProduct.image &&
            oneProduct.image.map((item, idx) => {
              return (
                <img
                  onClick={() => setImage(item)}
                  src={item}
                  key={idx}
                  className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                  alt=""
                />
              );
            })}
        </div>
        <div className="w-full sm:w-[80%]">
          <img className="w-full h-auto" src={oneProduct.image} alt="" />
        </div>
      </div>

      {/* right */}
      <div className="flex flex-col w-1/2">
        <h1 className="font-medium text-2xl mt-2">{oneProduct.name}</h1>
        <div className=" flex items-center gap-1 mt-2">
          <img src={assets.star_icon} className="w-3 5" alt="" />
          <img src={assets.star_icon} className="w-3 5" alt="" />
          <img src={assets.star_icon} className="w-3 5" alt="" />
          <img src={assets.star_icon} className="w-3 5" alt="" />
          <img src={assets.star_icon} className="w-3 5" alt="" />
          <p className="pl-2">(122)</p>
        </div>
        <p className="mt-5 text-3xl font-medium">
          {currency}
          {oneProduct.price}
        </p>
        <p className="mt-5 text-gray-500 md:w-4/5">{oneProduct.description}</p>
        <div className="flex flex-col gap-4 my-8">
          <p className="text-[16px]">Select Size</p>
          <div className="flex gap-2">
            {oneProduct.sizes &&
              oneProduct.sizes.map((item, idx) => {
                return (
                  <button key={idx} className="border py-2 px-4 bg-gray-100 ">
                    {item}
                  </button>
                );
              })}
          </div>
        </div>
        <button className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">
          ADD TO CART
        </button>
        <hr class="mt-8 sm:w-4/5" />
        <div class="text-sm text-gray-500 mt-5 flex flex-col gap-1">
          <p>100% Original product.</p>
          <p>Cash on delivery is available on this product.</p>
          <p>Easy return and exchange policy within 7 days.</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
