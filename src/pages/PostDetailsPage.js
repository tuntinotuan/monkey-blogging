import Layout from "components/layout/Layout";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import PostCategory from "module/post/PostCategory";
import PostImage from "module/post/PostImage";
import PostMeta from "module/post/PostMeta";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PageNotFound from "./PageNotFound";
import parse from "html-react-parser";
import { AuthorBox } from "components/author";
import PostRelated from "module/post/PostRelated";

const PostDetailsPageStyles = styled.div`
  padding-bottom: 100px;
  .post {
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 40px;
      margin: 40px 0;
    }
    &-feature {
      width: 100%;
      max-width: 640px;
      height: 466px;
      border-radius: 20px;
    }
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 16px;
    }
    &-info {
      flex: 1;
    }
    &-content {
      max-width: 700px;
      margin: 80px auto;
    }
  }
  .author {
    margin-top: 40px;
    display: flex;
    border-radius: 20px;
    background-color: ${(props) => props.theme.grayF3};
    &-image {
      width: 200px;
      height: 200px;
      flex-shrink: 0;
      border-radius: 20px 0px 0px 20px;
    }
    &-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
    &-content {
      flex: 1;
      padding: 20px;
    }
    &-name {
      font-weight: bold;
      margin-bottom: 20px;
      font-size: 20px;
    }
    &-desc {
      font-size: 14px;
      line-height: 2;
    }
  }
`;

const PostDetailsPage = () => {
  const { slug } = useParams();
  const [postData, setPostData] = useState({});
  useEffect(() => {
    async function fetchPostData() {
      const colRef = query(collection(db, "posts"), where("slug", "==", slug));
      onSnapshot(colRef, (snapshot) => {
        snapshot.forEach((doc) => {
          doc.data() && setPostData(doc.data());
        });
      });
    }
    fetchPostData();
  }, [slug]);
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [slug]);

  const { user } = postData;
  if (!slug || !postData.title) return <PageNotFound></PageNotFound>;
  return (
    <PostDetailsPageStyles>
      <Layout>
        <div className="container">
          <div className="post-header">
            <PostImage
              url={postData?.image}
              className="post-feature"
            ></PostImage>
            <div className="post-info">
              <PostCategory className="mb-6" to={postData?.category?.slug}>
                {postData?.category?.name}
              </PostCategory>
              <h1 className="post-heading dark:text-white">
                {postData?.title}
              </h1>
              <PostMeta
                date={new Date(
                  postData?.createdAt?.seconds * 1000
                ).toLocaleDateString("vi-VI")}
                authName={user?.fullname}
                to={user?.username}
              ></PostMeta>
            </div>
          </div>
          <div className="post-content">
            <div className="entry-content">
              {parse(
                postData?.content || "<h2>Content is being Development</h2>"
              )}
            </div>
            {/* <div className="entry-content">
              <h2>Chương 1</h2>
              <p>
                Gastronomy atmosphere set aside. Slice butternut cooking home.
                Delicious romantic undisturbed raw platter will meld. Thick
                Skewers skillet natural, smoker soy sauce wait roux. slices Food
                qualities braise chicken cuts bowl through slices butternut
                snack. Tender meat juicy dinners. One-pot low heat plenty of
                time adobo fat raw soften fruit. sweet renders bone-in marrow
                richness kitchen, fricassee basted pork shoulder. Delicious
                butternut squash hunk. Flavor centerpiece plate, delicious ribs
                bone-in meat, excess chef end. sweet effortlessly pork, low heat
                smoker soy sauce flavor meat, rice fruit fruit. Romantic
                fall-off-the-bone butternut chuck rice burgers. renders aromatic
                enjoyment, then slices taco. Minutes undisturbed cuisine lunch
                magnificent mustard curry. Juicy share baking sheet pork. Meals
                ramen rarities selection, raw pastries richness magnificent
                atmosphere. Sweet soften dinners, cover mustard infused skillet,
                Skewers on culinary experience.
              </p>

              <p>
                Juicy meatballs brisket slammin' baked shoulder. Juicy smoker
                soy sauce burgers brisket. polenta mustard hunk greens. Wine
                technique snack skewers chuck excess. Oil heat slowly. slices
                natural delicious, set aside magic tbsp skillet, bay leaves
                brown centerpiece. fruit soften edges frond slices onion snack
                pork steem on wines excess technique cup; Cover smoker soy sauce
                fruit snack. Sweet one-dozen scrape delicious, non sheet raw
                crunch mustard. Minutes clever slotted tongs scrape, brown steem
                undisturbed rice.
              </p>

              <p>
                Food qualities braise chicken cuts bowl through slices butternut
                snack. Tender meat juicy dinners. One-pot low heat plenty of
                time adobo fat raw soften fruit. sweet renders bone-in marrow
                richness kitchen, fricassee basted pork shoulder. Delicious
                butternut squash hunk. Flavor centerpiece plate, delicious ribs
                bone-in meat, excess chef end. sweet effortlessly pork, low heat
                smoker soy sauce flavor meat, rice fruit fruit. Romantic
                fall-off-the-bone butternut chuck rice burgers.
              </p>
              <figure>
                <img
                  src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
                  alt=""
                />
                <figcaption>
                  Gastronomy atmosphere set aside. Slice butternut cooking home.
                </figcaption>
              </figure>
              <h2>Chương 2</h2>
              <p>
                Gastronomy atmosphere set aside. Slice butternut cooking home.
                Delicious romantic undisturbed raw platter will meld. Thick
                Skewers skillet natural, smoker soy sauce wait roux. slices Food
                qualities braise chicken cuts bowl through slices butternut
                snack. Tender meat juicy dinners. One-pot low heat plenty of
                time adobo fat raw soften fruit. sweet renders bone-in marrow
                richness kitchen, fricassee basted pork shoulder. Delicious
                butternut squash hunk. Flavor centerpiece plate, delicious ribs
                bone-in meat, excess chef end. sweet effortlessly pork, low heat
                smoker soy sauce flavor meat, rice fruit fruit. Romantic
                fall-off-the-bone butternut chuck rice burgers. renders aromatic
                enjoyment, then slices taco. Minutes undisturbed cuisine lunch
                magnificent mustard curry. Juicy share baking sheet pork. Meals
                ramen rarities selection, raw pastries richness magnificent
                atmosphere. Sweet soften dinners, cover mustard infused skillet,
                Skewers on culinary experience.
              </p>
            </div> */}
            <AuthorBox userId={user?.id}></AuthorBox>
          </div>
          <div className="post-related">
            <PostRelated
              categoryId={postData?.category?.id}
              postCurrentTitle={postData?.title}
            ></PostRelated>
          </div>
        </div>
      </Layout>
    </PostDetailsPageStyles>
  );
};

export default PostDetailsPage;
