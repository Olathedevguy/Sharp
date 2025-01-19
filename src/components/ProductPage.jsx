import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../config/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { RingLoader } from "react-spinners";
import BackButton from "./BackButton";
import { ShoppingCart } from "lucide-react";
import Footer from "./Footer";

const ProductPage = () => {
  const { id } = useParams(); // Extract id from URL
  const [product, setProduct] = useState(null);

  const formatNumberWithCommas =(number)=> {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "shopItems", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct(docSnap.data());
        } else {
          console.error("No such Product Found");
        }
      } catch (error) {
        console.error("Error Fetching Product Details", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product)
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <RingLoader size={50} color="#4A90E2" />
        <p className="text-gray-500">Loading Product Details...</p>
      </div>
    );

  return (
    <>
    <div className="px-6 py-10 lg:px-20 max-w-7xl mx-auto">
      <BackButton />
      <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-start pt-10">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full max-w-sm h-[300px] object-cover rounded-lg shadow-lg"
        />

        <div className="space-y-4">
          <p className="text-2xl font-bold">{product.name}</p>
          <p className="text-sm text-gray-500 capitalize">{product.filter}</p>
          <p className="text-base text-gray-700">{product.description}</p>
          <p className="text-xl font-semibold text-green-600">₦{formatNumberWithCommas(product.price)}</p>

          <button className="flex items-center gap-2 px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition duration-300">
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default ProductPage;
