import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import { useContext } from "react";

const UserDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const user = location.state?.user; // Get passed user data

  return (
    <div className="max-w-lg bg-white shadow-md rounded-lg p-6 mt-10 ml-15 border">
    <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4">User Details</h2>
    <p className="text-gray-600 text-sm">User ID: <span className="font-medium">{id}</span></p>

    {user ? (
      <div className="mt-4 flex items-center gap-4">
        {/* User Image */}
        <img 
          src={user.image || "https://via.placeholder.com/100"} 
          alt="User" 
          className="w-24 h-24 rounded-full border-2 border-gray-300 shadow-sm"
        />

        {/* User Info */}
        <div>
          <p className="text-lg font-semibold text-gray-700">{user.name}</p>
          <p className="text-gray-600"><b>Contact:</b> {user.contact}</p>
          <p className="text-gray-600"><b>Address:</b> {user.address}</p>
        </div>
      </div>
    ) : (
      <p className="text-red-500 mt-4">User data not available</p>
    )}
  </div>
  );

  // const { id } = useParams();

  // return (
  //   <div>
  //     <h2>User Details</h2>
  //     <p>User ID: {id}</p>
  //     <p>No backend is available yet to fetch user details.</p>
  //   </div>
  // );


  



};

export default UserDetails;
