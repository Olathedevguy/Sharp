import React, { useContext, useEffect, useState } from "react";
import SideBar from "./SideBar";
import { addDoc, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../../config/Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import BasicSelect from "./Select";
import { GlobalContext } from "../../context/Appcontext";
import { getAuth } from "firebase/auth";
import { ColorRing, FidgetSpinner } from "react-loader-spinner";
import { red } from "@mui/material/colors";

const Upload = () => {
  const itemsCollectionRef = collection(db, "shopItems");

  const [isLoading, setIsLoading] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [imgUpload, setImgUpload] = useState(null);
  const [uploadList, setUploadItems] = useState([]);
  const [imgPreview, setImgPreview] = useState(null);
  const [show, setShow] = useState(false);
  const { shoeType, setShoeType } = useContext(GlobalContext);
  const [isFetching, setIsFetching] = useState(true);

  const auth = getAuth();

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
    } finally {
      setIsFetching(false); // Set fetching to false when done
    }
  };

  // Upload image and text data
  const uploadAll = async () => {
    if (!imgUpload || !itemName || !itemPrice || !itemDesc || !shoeType) {
      alert("Please fill all fields, select a category, and upload an image!");
      return;
    }

    const userId = auth.currentUser?.uid;
    if (!userId) {
      alert("You must be logged in to upload items.");
      return;
    }

    setIsLoading(true);

    const imageRef = ref(storage, `ItemImages/${imgUpload.name + v4()}`);
    try {
      // Upload the image and get its URL
      const snapshot = await uploadBytes(imageRef, imgUpload);
      const imageUrl = await getDownloadURL(snapshot.ref);

      // Save text data and image URL in Firestore
      const docRef = await addDoc(itemsCollectionRef, {
        name: itemName,
        price: parseFloat(itemPrice),
        description: itemDesc,
        imageUrl: imageUrl,
        filter: shoeType,
        userId: userId, // Ensure this matches your Firestore rules
      });

      // Add the new item to the state for immediate rendering
      setUploadItems((prev) => [
        ...prev,
        {
          id: docRef.id,
          name: itemName,
          price: parseFloat(itemPrice),
          description: itemDesc,
          imageUrl: imageUrl,
          filter: shoeType,
        },
      ]);

      // Reset the form
      setItemName("");
      setItemPrice("");
      setItemDesc("");
      setImgUpload(null);
      setImgPreview(null);

      console.log("Item uploaded successfully!");
    } catch (error) {
      console.error("Error uploading item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    setImgUpload(file);
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImgPreview(previewUrl);
    } else {
      setImgPreview(null);
    }
  };

  const deleteItem = async (itemId) => {
    const itemDocRef = doc(db, "shopItems", itemId);

    try {
      // Delete the item from Firestore
      await deleteDoc(itemDocRef);

      // Remove the item from the state for immediate update
      setUploadItems((prev) => prev.filter((item) => item.id !== itemId));

      console.log("Item deleted successfully!");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Fetch items on component mount
  useEffect(() => {
    getUploadList();
  }, []);

  return (
    <div className="flex gap-9">
      <SideBar />
      <div className="flex flex-col w-full p-4">
        <div className="flex flex-col w-[1200px] p-8 bg-white rounded-lg shadow-lg">
          <div className="flex flex-col items-center gap-6 mb-8 p-6 bg-gray-50 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800">Upload New Product</h2>
            {imgPreview && (
              <div className="w-40 h-40 border border-gray-300 rounded-lg overflow-hidden">
                <img className="w-full h-full object-cover" src={imgPreview} alt="Preview" />
              </div>
            )}
            <input
              className="w-full md:w-1/2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="file"
              onChange={handleImgChange}
            />
            <input
              className="w-full md:w-1/2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Enter the product name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <textarea
              className="w-full md:w-1/2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product description"
              value={itemDesc}
              onChange={(e) => setItemDesc(e.target.value)}
              rows="4"
            />
            <BasicSelect shoeType={shoeType} setShoeType={setShoeType} />
            <input
              className="w-full md:w-1/2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="number"
              placeholder="Enter product price"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
            />
            <button
              className="w-full md:w-1/2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed"
              onClick={uploadAll}
              disabled={isLoading}
            >
              {isLoading ? "Uploading..." : "Upload"}
            </button>
          </div>

          <div className="flex md:flex-row flex-col justify-between mb-10">
            <p className="font-bold text-lg text-black">Uploaded Products</p>
            {isFetching ?<div className="flex items-center gap-2">
              <p><span className="loader"></span></p>
              <p className="text-sm">chillax, it&apos;s fetching bro...</p>
            </div> : ''}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {uploadList.map((item) => (
              <div
                key={item.id}
                className="bg-gray-50 border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <img src={item.imageUrl} alt={item.name} className="w-full h-40 object-cover mb-4 rounded-lg" />
                <h2 className="font-bold text-lg text-center mb-2 text-gray-800">{item.name}</h2>
                <p className="text-gray-600 text-sm text-center mb-2">
                  {show ? item.description : item.description.slice(0, 75) + "..."}
                  <span onClick={() => setShow(!show)} className="underline cursor-pointer text-blue-500 ml-2">
                    {show ? "show less" : "show more"}
                  </span>
                </p>
                <p className="text-sm text-center">Brand: {item.filter}</p>
                <p className="text-green-600 font-semibold text-center text-lg">${item.price.toFixed(2)}</p>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="w-full mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200 ease-in-out"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
