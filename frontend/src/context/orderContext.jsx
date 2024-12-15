import { useState , useContext, createContext  } from "react";

export const OrderContext = createContext();

export const useOrderContext = () => {
    return useContext(OrderContext);
}

export const OrderContextProvider = ({children}) => {
    const [cartItems, setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [addresses, setAddresses] = useState([]);
    
    return <OrderContext.Provider value={{cartItems, setCartItems, subtotal, setSubtotal, discount, setDiscount, addresses, setAddresses}} >
        {children}
    </OrderContext.Provider>;
}