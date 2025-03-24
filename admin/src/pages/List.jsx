import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { currency } from "../App";

const List = () => {
  const [list, setLsit] = useState([]);

  const getList = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/product/products`
      );
      if (response.data.success) {
        setLsit(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <p className="mb-2">All Products List</p>

      <div className="flex flex-col gap-2">
        {/* list table title */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* products */}
        {list &&
          list.map((item) => {
            return (
              <div
                key={item._id}
                className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
              >
                <img className="w-12" src={item.image[0]} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>
                  {currency}
                  {item.price}
                </p>
                <p className="text-right md:text-center cursor-pointer text-lg">
                  X
                </p>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default List;
