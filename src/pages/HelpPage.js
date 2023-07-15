import Heading from "components/layout/Heading";
import Layout from "components/layout/Layout";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import Help from "module/help/Help";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { helpStatus } from "utils/constants";

const dataImgBelow = [
  {
    url: "https://images.unsplash.com/photo-1618218168350-6e7c81151b64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    title: "Return of the Ridleys",
  },
  {
    url: "https://images.unsplash.com/photo-1589652717406-1c69efaf1ff8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    title: "A friend indeed",
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1687721356197-868b0156a132?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1015&q=80",
    title: "Return of the Ridleys",
  },
];
const HelpPage = () => {
  const [helpData, setHelpData] = useState([]);
  console.log("data", helpData);
  useEffect(() => {
    async function fetchDataHelp() {
      const colRef = collection(db, "helps");
      const docQuery = query(
        colRef,
        where("status", "==", helpStatus.APPROVED)
      );
      onSnapshot(docQuery, (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setHelpData(results);
      });
    }
    fetchDataHelp();
  }, []);

  return (
    <Layout>
      <div className="container">
        <Heading>How can we help you?</Heading>
        {helpData &&
          helpData.map((data, index) => (
            <Help
              data={data}
              key={data.question}
              initialize={index === 0 && true}
            ></Help>
          ))}
        <div className="grid-layout my-10">
          {dataImgBelow &&
            dataImgBelow.map((item) => (
              <div className="h-[200px] rounded-lg shadow-md dark:bg-gray-800 dark:shadow-black bg-white">
                <img
                  src={item.url}
                  alt=""
                  className="w-full h-3/4 object-cover rounded-t-lg"
                />
                <div className="flex items-center justify-center h-1/4 dark:text-white font-semibold text-center">
                  {item.title}
                </div>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default HelpPage;
