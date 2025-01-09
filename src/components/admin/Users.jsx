import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import { db } from "../../config/Firebase";
import { collection, getDocs } from "firebase/firestore";
import { InfinitySpin } from "react-loader-spinner";

const Users = () => {
  const [loadingState, setLoadingState] = useState(false);
  const [userList, setUserList] = useState([]);
  const userCollectionRef = collection(db, "users");

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
      console.error(error);
    }
    setLoadingState(false);
  };

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col w-full px-4">
        {loadingState ? (
          <div className="flex items-center justify-center mt-20">
            <InfinitySpin
              visible={true}
              width="120"
              color="#000000"
              ariaLabel="infinity-spin-loading"
            />
            <p className="ml-4">Fetching user data...</p>
          </div>
        ) : (
          <div className="mt-10 w-full">
            {/* Total Users */}
            <h2 className="text-2xl font-bold text-center mb-6">
              Total Users: {userList.length}
            </h2>

            {/* User Table */}
            <div className="overflow-x-auto rounded-lg shadow-lg">
              <table className="min-w-full bg-white border border-gray-300">
                {/* Table Header */}
                <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  <tr>
                    <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                      Username
                    </th>
                    <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                      User ID
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {userList.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-100 transition-colors">
                      <td className="py-4 px-6 text-sm text-gray-800">
                        {user.email || "N/A"}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-800">
                        {user.uid || "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
