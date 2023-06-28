import Heading from "components/layout/Heading";
import React from "react";
import { Fragment } from "react";
import PostItem from "./PostItem";
import { useEffect } from "react";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useState } from "react";

const PostRelated = ({ categoryId, postCurrentTitle }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchCategoryRelated() {
      const q = query(
        collection(db, "posts"),
        where("category.id", "==", categoryId)
      );
      onSnapshot(q, (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });
        setData(results);
      });
    }
    fetchCategoryRelated();
  }, [categoryId, postCurrentTitle]);
  return (
    <Fragment>
      <Heading>Bài viết liên quan</Heading>
      <div className="grid-layout grid-layout--primary">
        {data.length > 0 &&
          data.map((item) => <PostItem key={item.id} data={item}></PostItem>)}
      </div>
    </Fragment>
  );
};

export default PostRelated;
