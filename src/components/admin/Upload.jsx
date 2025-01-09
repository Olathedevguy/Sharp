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
  const [itemPrice, setItemPrice] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [imgUpload, setImgUpload] = useState(null);
  const [uploadList, setUploadItems] = useState([]);
  const [imgPreview, setImgPreview] = useState(null);
  const [show, setShow] = useState(false);

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
        price: parseFloat(itemPrice),
        description: itemDesc,
        imageUrl: imageUrl,
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
      setIsLoading(false); // Reset loading state
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

  // Fetch items on component mount
  useEffect(() => {
    getUploadList();
  }, []);

  return (
    <div className="flex gap-9">
      <SideBar />
      <div className="flex flex-col w-full p-4">
        {/* Image Preview */}
        {imgPreview && (
          <div className="w-40 h-40 border border-gray-300 rounded-lg overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={imgPreview}
              alt="image preview"
            />
          </div>
        )}
<div className="flex flex-col w-[1200px] p-8 bg-white rounded-lg shadow-lg ">
  {/* Form for uploading items */}
  <div className="flex flex-col items-center gap-6 mb-8 p-6 bg-gray-50 rounded-lg shadow-sm">
    <h2 className="text-xl font-semibold text-gray-800">Upload New Product</h2>
    <input
      className="w-full md:w-1/2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      type="file"
      onChange={handleImgChange}
    />
    <input
      className="w-full md:w-1/2 border border-gray-300 rounded-lg p-3 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
      type="text"
      placeholder="Enter the product name"
      value={itemName}
      onChange={(e) => setItemName(e.target.value)}
    />
    <textarea
      className="w-full md:w-1/2 border border-gray-300 rounded-lg p-3 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Enter product description"
      value={itemDesc}
      onChange={(e) => setItemDesc(e.target.value)}
      rows="4"
    />
    <input
      className="w-full md:w-1/2 border border-gray-300 rounded-lg p-3 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
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

  {/* Display uploaded items */}
<div className="mt-6 mb-4">
  <h2 className="text-xl font-semibold text-gray-800 ">
    Uploaded Items
  </h2>
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {uploadList.map((item) => (
      <div
        key={item.id}
        className="bg-gray-50 border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
      >
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-40 object-cover mb-4 rounded-lg"
        />
        <h2 className="font-bold text-lg text-center mb-2 text-gray-800">
          {item.name}
        </h2>
        <p className="text-gray-600 text-sm text-center mb-2">
          {show
            ? item.description.slice(0, 75) + "..."
            : item.description}
          <span
            onClick={() => setShow(!show)}
            className="underline cursor-pointer text-blue-500 ml-2"
          >
            show more
          </span>
        </p>
        <p className="text-green-600 font-semibold text-center text-lg">
          ${item.price.toFixed(2)}
        </p>
      </div>
    ))}
  </div>
</div>
</div>
    </div>
  );
};

export default Upload;
