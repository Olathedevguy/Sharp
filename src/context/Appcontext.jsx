import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useContext, useEffect, useState, createContext } from "react";
import { db, storage } from "../config/Firebase";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

// Step 1: Create the GlobalContext
export const GlobalContext = createContext();

// Step 2: Create the GlobalProvider component
 export const GlobalProvider = ({ children }) => {
  const [loadingState, setLoadingState] = useState(false);
  const [userList, setUserList] = useState([]);
  const userCollectionRef = collection(db, "users");
  const [authSuccess, setAuthSuccess]  = useState(false)

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

  const itemsCollectionRef = collection(db, "shopItems");

  const [isLoading, setIsLoading] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState(0);
  const [itemDesc, setItemDesc] = useState("");
  const [imgUpload, setImgUpload] = useState(null);
  const [uploadList, setUploadItems] = useState([]);
  const [shoeType, setShoeType] = useState('')

  // Fetch items from Firestore
  const getUploadList = async () => {
    try {
      const data = await getDocs(itemsCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUploadItems(filteredData);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  // Upload image and text data
  const uploadAll = async () => {
    if (!imgUpload || !itemName || !itemPrice || !itemDesc) {
      alert("Please fill all fields and select an image!");
      return;
    }

    setIsLoading(true); // Show loading state

    const imageRef = ref(storage, `ItemImages/${imgUpload.name + v4()}`);
    try {
      // Upload the image and get its URL
      const snapshot = await uploadBytes(imageRef, imgUpload);
      const imageUrl = await getDownloadURL(snapshot.ref);

      // Save text data and image URL in Firestore
      const docRef = await addDoc(itemsCollectionRef, {
        name: itemName,
        price: itemPrice,
        description: itemDesc,
        imageUrl: imageUrl,
      });

      // Add the new item to the state for immediate rendering
      setUploadItems((prev) => [
        ...prev,
        {
          id: docRef.id,
          name: itemName,
          price: itemPrice,
          description: itemDesc,
          imageUrl: imageUrl,
        },
      ]);

      console.log("Item uploaded successfully!");
    } catch (error) {
      console.error("Error uploading item:", error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const deleteItem = async (itemId, imageUrl)=>{
    try {
      const docRef = doc(db, "  shopItems", itemId)
      await deleteDoc(docRef)

      const imageRef = ref(storage, imageUrl)
      await deleteObject(imageRef)

      setUploadItems((prev) => prev.filter((item) => item.id !== itemId));

      console.log('Item DELETED successfully')
    } catch (error) {
      console.error("Error  deleting item:", error  )
    }
  }

  // Fetch items on component mount
 
  useEffect(() => {
    getUserList();
    getUploadList();
  }, []);

 
  const value = {
    userList,
    loadingState,
    getUserList,
    getUploadList,
    uploadList,
    deleteItem,
    shoeType, setShoeType,
    authSuccess, setAuthSuccess
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
