import Heading from "components/layout/Heading";
import Layout from "components/layout/Layout";
import { LoadingSpinner } from "components/loading";
import { NotFoundData } from "components/notfound";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import PostItem from "module/post/PostItem";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const SearchPage = () => {
  const [params] = useSearchParams();
  const keywordSearch = params.get("keyword");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchSearchData() {
      setLoading(true);
      try {
        const colRef = collection(db, "posts");
        const queries = query(
          colRef,
          where("title", ">=", keywordSearch),
          where("title", "<=", keywordSearch + "utf8")
        );
        onSnapshot(queries, (snapshot) => {
          let results = [];
          snapshot.forEach((doc) => {
            results.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setData(results);
          setLoading(false);
        });
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    fetchSearchData();
  }, [keywordSearch]);

  return (
    <Layout>
      <div className="container">
        <Heading>Tìm kiếm bài viết</Heading>
        {loading && (
          <div className="flex items-center justify-center">
            <LoadingSpinner borderColor="#2EBAC1"></LoadingSpinner>
          </div>
        )}
        {data.length > 0 ? (
          <div className="grid-layout grid-layout--primary">
            {data.length > 0 &&
              data.map((item) => (
                <PostItem key={item.id} data={item}></PostItem>
              ))}
          </div>
        ) : (
          <NotFoundData size="big"></NotFoundData>
        )}
      </div>
    </Layout>
  );
};

export default SearchPage;
