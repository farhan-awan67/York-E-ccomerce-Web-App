import { createContext } from "react";
import { products } from "../assets/frontend_assets/assets";


export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const devlivery_fee = "10";
  const value = {
    currency,
    devlivery_fee,
    products,
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
