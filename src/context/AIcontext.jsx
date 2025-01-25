import { createContext, useState } from "react";
import run from "../gemini";

export const AIContext = createContext()

export const AIProvider = ({children})=>{

    const [res, setRes] = useState("")

    // const convertAsterisksToBoldText = (text)=>{
    //     return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    //   }

    const sendQuery = async (prompt) => {
        const answer = await run(prompt);
        // console.log("Answer from run:", answer); // Debug log
        return answer;
      };
      
    // sendQuery('what is react js')

const value ={
    sendQuery,
    res, 
}

return(
    <AIContext.Provider value={value}>
        {children}
    </AIContext.Provider>
)
}
