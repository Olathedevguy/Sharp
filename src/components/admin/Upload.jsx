import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db, storage } from "../../config/Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const Upload = () => {
  const itemsCollectionRef = collection(db, "shopItems");

  const [isLoading, setIsLoading] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState(0);
  const [itemDesc, setItemDesc] = useState("");
  const [imgUpload, setImgUpload] = useState(null);
  const [uploadList, setUploadItems] = useState([]);

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
  

  // Fetch items on component mount
  useEffect(() => {
    getUploadList();
  }, []);

  return (
    <div className="flex gap-9">
      <SideBar />
      <div className="flex flex-col w-full p-4">
        {/* Form for uploading items */}
        <div className="flex flex-col justify-center gap-4 mb-8">
          <input
            className="border border-black"
            type="file"
            onChange={(e) => setImgUpload(e.target.files[0])}
          />
          <input
            className="border border-black text-center"
            type="text"
            placeholder="Enter the product name"
            onChange={(e) => setItemName(e.target.value)}
          />
          <input
            className="border border-black text-center"
            type="text"
            placeholder="Enter product description"
            onChange={(e) => setItemDesc(e.target.value)}
          />
          <input
            className="border border-black text-center"
            type="number"
            placeholder="Enter product price"
            onChange={(e) => setItemPrice(Number(e.target.value))}
          />
          <button
            className="border border-black bg-black text-white px-8 py-2"
            onClick={uploadAll}
            disabled={isLoading}
          >
            {isLoading ? "Uploading..." : "Upload"}
          </button>
        </div>

        {/* Display uploaded items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {uploadList.map((item) => (
            <div
              key={item.id}
              className="border border-gray-300 rounded-lg p-4 flex flex-col items-center"
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-40 object-cover mb-4"
              />
              <h2 className="font-bold text-lg">{item.name}</h2>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-green-500 font-semibold">${item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Upload;
