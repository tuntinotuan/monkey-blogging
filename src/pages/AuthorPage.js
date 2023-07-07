import Heading from "components/layout/Heading";
import Layout from "components/layout/Layout";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import PostItem from "module/post/PostItem";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const AuthorPage = () => {
  const { slug } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchAuthor() {
      const q = query(
        collection(db, "posts"),
        where("user.username", "==", slug)
      );
      onSnapshot(q, (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });
        setData(results);
      });
    }
    fetchAuthor();
  }, [slug]);
  return (
    <div>
      <Layout>
        <div className="container">
          <Heading>
            Danh mục của{" "}
            <span className="text-darkPrimary font-bold">{slug}</span>
          </Heading>
          <div className="grid-layout grid-layout--primary">
            {data.length > 0 &&
              data.map((item) => (
                <PostItem key={item.id} data={item}></PostItem>
              ))}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default AuthorPage;
