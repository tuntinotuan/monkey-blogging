import Heading from "components/layout/Heading";
import Layout from "components/layout/Layout";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import PostItem from "module/post/PostItem";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const CagetoryPageStyles = styled.div``;

const CagetoryPage = () => {
  const { slug } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchCategoryRelated() {
      const q = query(
        collection(db, "posts"),
        where("category.slug", "==", slug)
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
  }, [slug]);
  return (
    <CagetoryPageStyles>
      <Layout>
        <div className="container">
          <Heading>{`Danh mục ${slug}`}</Heading>
          <div className="grid-layout grid-layout--primary">
            {data.length > 0 &&
              data.map((item) => (
                <PostItem key={item.id} data={item}></PostItem>
              ))}
          </div>
        </div>
      </Layout>
    </CagetoryPageStyles>
  );
};

export default CagetoryPage;
