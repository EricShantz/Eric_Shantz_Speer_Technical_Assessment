import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const UseAppContext = () => {
    return useContext(AppContext)
}

export const ContextProvider = ({children}) =>{
    const [isLoading, setIsLoading] = useState(false)

    const toggleLoader = () => {
      setIsLoading((prevLoading) => !prevLoading);
    };   
    
    return (
    <AppContext.Provider value={{ isLoading, setIsLoading, toggleLoader }}>
      {children}
    </AppContext.Provider>
  );
}