import { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/shopContext";
import ProductItem from "../components/ProductItem";

const LatestSec = () => {
  const { products } = useContext(ShopContext);
  const [latestProduct, setLatestProduct] = useState([]);
  useEffect(() => {
    setLatestProduct(products.slice(0, 10));
  }, [products]);
  return (
    <div className="flex flex-col justify-between items-center gap-2 my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <p className="text-center text-sm font-medium text-gray-700">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the.
        </p>
      </div>

      {/* rendering products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProduct.map((item, idx) => {
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

export default LatestSec;
