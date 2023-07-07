import { db } from "firebase-app/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthorBox = ({ userId = "" }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  useEffect(() => {
    async function fetchUserData() {
      const colRef = doc(db, "users", userId);
      const docSnap = await getDoc(colRef);
      setUserData(docSnap.data());
    }
    fetchUserData();
  }, [userId]);

  if (!userId) return;
  return (
    <div className="author dark:!bg-gray-800">
      <div
        className="author-image dark:border dark:border-gray-800 cursor-pointer"
        onClick={() => navigate(`/author/${userData?.username}`)}
      >
        <img
          src={userData?.avatar}
          alt={userData?.image_name}
          title={userData?.image_name}
        />
      </div>
      <div className="author-content">
        <h3
          className="author-name dark:text-white cursor-pointer"
          onClick={() => navigate(`/author/${userData?.username}`)}
        >
          {userData?.fullname || "User"}
        </h3>
        <p className="author-desc dark:text-darkTextA0">
          {userData?.description ||
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit.Dignissimos non animi porro voluptates quibusdam optio nullaquis nihil ipsa error delectus temporibus nesciunt, nam officiis adipisci suscipit voluptate eum totam!"}
        </p>
      </div>
    </div>
  );
};

export default AuthorBox;
