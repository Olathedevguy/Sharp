import { collection, getDocs } from "firebase/firestore";
import { useContext, useEffect, useState, createContext } from "react";
import { db } from "../config/Firebase";

// Step 1: Create the GlobalContext
export const GlobalContext = createContext();

// Step 2: Create the GlobalProvider component
 export const GlobalProvider = ({ children }) => {
  const [loadingState, setLoadingState] = useState(false);
  const [userList, setUserList] = useState([]);
  const userCollectionRef = collection(db, "users");

  // Function to fetch the user list
  const getUserList = async () => {
    setLoadingState(true);
    try {
      const data = await getDocs(userCollectionRef);
      const filteredData = data.docs.map((user) => ({
        ...user.data(),
        id: user.id,
      }));
      setUserList(filteredData);
    } catch (error) {
      console.error("Error fetching user list:", error);
    } finally {
      setLoadingState(false);
    }
  };

 
  useEffect(() => {
    getUserList();
  }, []);

 
  const value = {
    userList,
    loadingState,
    getUserList,
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};

//Create the useGlobal hook
// export const useGlobal = () => {
//   const context = useContext(GlobalContext);
//   if (!context) {
//     throw new Error("useGlobal must be used within a GlobalProvider");
//   }
//   return context;
// };
