import Layout from "components/layout/Layout";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import PostItem from "module/post/PostItem";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { postStatus } from "utils/constants";

const BLOG_PER_PAGE = 9;

const BlogPage = () => {
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    async function fetchPostData() {
      const colRef = collection(db, "posts");
      const newRef = query(
        colRef,
        limit(BLOG_PER_PAGE),
        where("status", "==", postStatus.APPROVED)
      );
      onSnapshot(newRef, (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });
        setPostList(results);
      });
    }
    fetchPostData();
  }, []);

  return (
    <Layout>
      <div className="container grid grid-cols-3 gap-10 !mb-10">
        {postList.length > 0 &&
          postList.map((post) => <PostItem data={post}></PostItem>)}
      </div>
    </Layout>
  );
};

export default BlogPage;
