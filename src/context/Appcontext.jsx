import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useContext, useEffect, useState, createContext } from "react";
import { db, storage } from "../config/Firebase";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';

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

const [cartItems, setCartItems] = useState([])
const cartCollectionRef =collection(db, "carts")
const [userId, setUserId] = useState(null)

useEffect(()=>{
  const auth = getAuth()
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserId(user.uid); // Sets the authenticated user's ID
    } else {
      setUserId(null); // Resets the userId when the user logs out
    }
  });

  return () => unsubscribe();
})

const fetchCartItems = async () => {
  if (!userId) return;

  try {
    const data = await getDocs(cartCollectionRef);
    const filteredCartItems = data.docs
      .map((doc) => ({ ...doc.data(), id: doc.id }))
      .filter((item) => item.userId === userId);

    setCartItems(filteredCartItems);
  } catch (error) {
    console.error("Error fetching cart items:", error);
  }
};

  //add to cart
  const addToCart = async (item)=>{
    if(!userId) {
      alert('You must be logged in to add ')
      
      return;
}
    try {
      setIsLoading(true)
      await addDoc(cartCollectionRef, {
        userId,
        item,
        quantity: 1,
        addAt: new Date()
      })

      setCartItems((prev)=>[...prev, {userId, item, quantity: 1, addedAt: new Date()}])

      // alert('Item added to cart successfully')
      toast.success('Add to cart successfully')
    } catch (error) {
      // alert('error, item not added to cart', error)
    }
  }

  const removeFromCart = async (cartItemId) => {
    try {
      const docRef = doc(db, "carts", cartItemId);
      await deleteDoc(docRef);

      // Update local state
      setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));

      toast.success("Removed successfully!");
    } catch (error) {
      toast.error("Error removing from cart:");
    }
  };
 
  useEffect(() => {
    getUserList();
    getUploadList();
  }, []);

  useEffect(()=>{
    fetchCartItems()
  },[userId])


 
  const value = {
    userList,
    loadingState,
    getUserList,
    getUploadList,
    uploadList,
    deleteItem,
    shoeType, setShoeType,
    authSuccess, setAuthSuccess,
    userId,
    cartItems,
    addToCart,
    removeFromCart,
    fetchCartItems,
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
