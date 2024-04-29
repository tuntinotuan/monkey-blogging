import { IconLongArrowLeft, IconLongArrowRight } from "components/icon";
import Layout from "components/layout/Layout";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import PostItem from "module/post/PostItem";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { postStatus } from "utils/constants";

const BLOG_PER_PAGE = 1;

const BlogPage = () => {
  const [postList, setPostList] = useState([]);
  const [currentDoc, setCurrentdoc] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPostCalled, setTotalPostCalled] = useState(0);
  const [temporarily, setTemporarily] = useState(0);
  const handleLoadOlderPosts = async () => {
    console.log(
      totalPostCalled &&
        postList[postList.length - 1] ===
          totalPostCalled[totalPostCalled.length - 1]
    );
    // if (
    //   !totalPostCalled &&
    //   postList[postList.length - 1] !==
    //     totalPostCalled[totalPostCalled.length - 1]
    // ) {
    const colRef = collection(db, "posts");
    const next = query(
      colRef,
      limit(BLOG_PER_PAGE),
      startAfter(currentDoc),
      where("status", "==", postStatus.APPROVED)
    );
    onSnapshot(next, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setPostList(results);
      if (!totalPostCalled) {
        setTotalPostCalled([...postList, ...results]);
      } else {
        setTotalPostCalled([...totalPostCalled, ...results]);
      }
    });
    const documentSnapshots = await getDocs(next);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setCurrentdoc(lastVisible);
    // } else {
    //   console.log("Call api");
    // }
  };
  const handleLoadNewerPosts = async () => {
    // const arr = ["Apple", "Orange", "Banana", "Watermelon", "Cherry"];
    // const arr1 = ["Apple", "Orange", "Banana", "Cherry"];
    // console.log(arr[arr.length - 1] === arr1[arr1.length - 1]);
    // const changeArr = arr.splice(arr.length - 3, 3);
    // const getLastArr = arr.splice(arr.length - 2, 2);
    // console.log("arr", arr);
    // console.log("changeArr", changeArr);
    // console.log("getLastArr", getLastArr);
    const clonePostCalled = temporarily || [...totalPostCalled];
    const arrLength = clonePostCalled.length - 1;
    const cutPost = clonePostCalled.splice(
      postList.length === BLOG_PER_PAGE
        ? arrLength + 1 - BLOG_PER_PAGE
        : arrLength + 1 - postList.length,
      BLOG_PER_PAGE
    );
    const getNewestPost =
      clonePostCalled.length <= BLOG_PER_PAGE
        ? clonePostCalled
        : clonePostCalled.slice(arrLength - BLOG_PER_PAGE);
    setTemporarily(clonePostCalled);
    setPostList(getNewestPost);
    setTotal(temporarily);
    console.log("temporarily", temporarily);
    console.log("cutPost", cutPost);
    console.log("clonePostCalled", clonePostCalled);
  };
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
      onSnapshot(
        query(colRef, where("status", "==", postStatus.APPROVED)),
        (snapshot) => {
          setTotal(snapshot.size);
        }
      );
      const documentSnapshots = await getDocs(newRef);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      setCurrentdoc(lastVisible);
    }
    fetchPostData();
  }, []);

  return (
    <Layout>
      <div className="container">
        <div className="grid grid-cols-3 gap-10 mb-10">
          {postList.length > 0 &&
            postList.map((post) => (
              <PostItem data={post} key={post.id}></PostItem>
            ))}
        </div>
        <div className="pagination text-white flex items-center justify-between mb-5">
          <div
            className={`inline-flex gap-2 cursor-pointer ${
              total === totalPostCalled.length ? "opacity-0 invisible" : ""
            }`}
            onClick={handleLoadOlderPosts}
          >
            <IconLongArrowLeft></IconLongArrowLeft>Older Posts
          </div>
          {`|`}
          <div
            className={`inline-flex gap-2 cursor-pointer ${
              total > totalPostCalled ? "opacity-0 invisible" : ""
            }`}
            onClick={handleLoadNewerPosts}
          >
            Newer Posts<IconLongArrowRight></IconLongArrowRight>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;
