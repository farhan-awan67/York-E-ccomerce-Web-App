import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { ShopContext } from "../context/shopContext";

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();

      if (category) {
        productsCopy = productsCopy.filter(
          (item) =>
            item.category?.trim().toLowerCase() ===
            category?.trim().toLowerCase()
        );
      }

      if (subCategory) {
        productsCopy = productsCopy.filter(
          (item) =>
            item.subCategory?.trim().toLowerCase() ===
            subCategory?.trim().toLowerCase()
        );
      }

      setRelatedProducts(productsCopy.slice(0, 5));
    }
  }, [products, category, subCategory]);

  return (
    <div className="my-24">
      {/* title */}
      <div className=" text-center text-3xl py-2">
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
      </div>

      {/* related prodcuts */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {relatedProducts.map &&
          relatedProducts.map((item) => {
            return (
              <ProductItem
                key={item._id}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            );
          })}
      </div>
    </div>
  );
};

export default RelatedProducts;
