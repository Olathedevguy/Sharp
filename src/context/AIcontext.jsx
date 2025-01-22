import { createContext } from "react";

const AIContext = createContext()

export const AIProvider = ({children})=>{

const value ={
    
}

return(
    <AIContext.Provider value={value}>
        {children}
    </AIContext.Provider>
)
}
