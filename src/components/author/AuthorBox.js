import { db } from "firebase-app/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const AuthorBox = ({ userId = "" }) => {
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
    <div className="author">
      <div className="author-image">
        <img
          src={userData?.avatar}
          alt={userData?.image_name}
          title={userData?.image_name}
        />
      </div>
      <div className="author-content">
        <h3 className="author-name">{userData?.fullname}</h3>
        <p className="author-desc">
          {userData?.description ||
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit.Dignissimos non animi porro voluptates quibusdam optio nullaquis nihil ipsa error delectus temporibus nesciunt, nam officiis adipisci suscipit voluptate eum totam!"}
        </p>
      </div>
    </div>
  );
};

export default AuthorBox;
