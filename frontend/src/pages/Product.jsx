import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/shopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, setCartItem, cartItem } =
    useContext(ShopContext);
  const [oneProduct, setOneProduct] = useState(false);
  const [image, setImage] = useState();
  const [size, setSize] = useState(null);

  const fetchProduct = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setOneProduct(item);
        setImage(item.image[0]);
      }
    });
  };

  useEffect(() => {
    fetchProduct();
  }, [products, productId]);
  return (
    <>
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
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>

        {/* right */}
        <div className="flex flex-col w-full sm:w-1/2">
          <h1 className="font-medium text-2xl mt-2 ">{oneProduct.name}</h1>
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
          <p className="mt-5 text-gray-500 md:w-4/5">
            {oneProduct.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p className="text-[16px]">Select Size</p>
            <div className="flex gap-2">
              {oneProduct.sizes &&
                oneProduct.sizes.map((item, idx) => {
                  return (
                    <button
                      onClick={() => setSize(item)}
                      key={idx}
                      className={`border py-2 px-4 bg-gray-100 ${
                        size === item ? "border-orange-400" : ""
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
            </div>
          </div>
          <div>
            <button
              onClick={() => addToCart(oneProduct._id, size)}
              className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 inline-block"
            >
              ADD TO CART
            </button>
          </div>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* description and reviews */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>

        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence. E-commerce
            websites have gained immense popularity due to their convenience,
            accessibility, and the global reach they offer.
          </p>
          <p>
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors). Each product usually has its own
            dedicated page with relevant information.
          </p>
        </div>
      </div>

      {/* related products */}
      <RelatedProducts
        category={oneProduct.category}
        subCategory={oneProduct.subCategory}
      />
    </>
  );
};

export default Product;
