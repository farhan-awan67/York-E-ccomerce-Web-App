import { createContext } from "react";


export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const devlivery_fee = "10";
  const value = {
    currency,
    devlivery_fee
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
