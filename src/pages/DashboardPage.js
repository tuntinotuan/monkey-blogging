import { CardOverview, CardStatus } from "components/dashboard";
import StatusItem from "components/dashboard/StatusItem";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import DashboardHeading from "module/dashboard/DashboardHeading";
import DashboardMainItem from "module/dashboard/DashboardMainItem";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  categoryStatus,
  helpStatus,
  postStatus,
  userRole,
  userStatus,
} from "utils/constants";

const DashboardPage = () => {
  const [sizePost, setSize] = useState();
  const [approvedPost, setApproved] = useState();
  const [pendingPost, setPending] = useState();
  const [rejectPost, setReject] = useState();
  const [hotPost, setHot] = useState();

  const [sizeUser, setSizeUser] = useState();
  const [activeUser, setActiveUser] = useState();
  const [pendingUser, setPendingUser] = useState();
  const [adminUser, setAdminUser] = useState();
  const [modUser, setModUser] = useState();

  const [sizeCategory, setSizeCategory] = useState();
  const [approvedCategory, setApprovedCategory] = useState();

  const [sizeHelp, setSizeHelp] = useState();
  const [approvedHelp, setApprovedHelp] = useState();
  useEffect(() => {
    async function fetchDataPost() {
      const colRef = collection(db, "posts");
      const queryApproved = query(
        colRef,
        where("status", "==", postStatus.APPROVED)
      );
      const queryPending = query(
        colRef,
        where("status", "==", postStatus.PENDING)
      );
      const queryReject = query(
        colRef,
        where("status", "==", postStatus.REJECT)
      );
      const queryHot = query(colRef, where("hot", "==", true));

      onSnapshot(colRef, (doc) => {
        setSize(doc.size);
      });
      onSnapshot(queryApproved, (doc) => {
        setApproved(doc.size);
      });
      onSnapshot(queryHot, (doc) => {
        setHot(doc.size);
      });
      if (sizePost === approvedPost) {
        setPending(0);
        setReject(0);
      }
      onSnapshot(queryPending, (doc) => {
        setPending(doc.size);
      });
      onSnapshot(queryReject, (doc) => {
        setReject(doc.size);
      });
    }
    fetchDataPost();
  }, [sizePost, approvedPost]);
  useEffect(() => {
    async function fetchDataUser() {
      const colRef = collection(db, "users");
      const queryActive = query(
        colRef,
        where("status", "==", userStatus.ACTIVE)
      );
      const queryPending = query(
        colRef,
        where("status", "==", userStatus.PENDING)
      );
      const queryRoleAdmin = query(colRef, where("role", "==", userRole.ADMIN));
      const queryRoleMod = query(colRef, where("role", "==", userRole.MOD));
      onSnapshot(colRef, (doc) => {
        setSizeUser(doc.size);
      });
      onSnapshot(queryActive, (doc) => {
        setActiveUser(doc.size);
      });
      onSnapshot(queryPending, (doc) => {
        setPendingUser(doc.size);
      });
      onSnapshot(queryRoleAdmin, (doc) => {
        setAdminUser(doc.size);
      });
      onSnapshot(queryRoleMod, (doc) => {
        setModUser(doc.size);
      });
    }
    fetchDataUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    async function fetchDataCategory() {
      const colRef = collection(db, "categories");
      const queryApproved = query(
        colRef,
        where("status", "==", categoryStatus.APPROVED)
      );
      onSnapshot(colRef, (doc) => {
        setSizeCategory(doc.size);
      });
      onSnapshot(queryApproved, (doc) => {
        setApprovedCategory(doc.size);
      });
    }
    fetchDataCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    async function fetchDataHelp() {
      const colRef = collection(db, "helps");
      const queryApproved = query(
        colRef,
        where("status", "==", helpStatus.APPROVED)
      );
      onSnapshot(colRef, (doc) => {
        setSizeHelp(doc.size);
      });
      onSnapshot(queryApproved, (doc) => {
        setApprovedHelp(doc.size);
      });
    }
    fetchDataHelp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="bg-gradient">
      <DashboardHeading
        title="Dashboard"
        desc="Overview dashboard monitor"
      ></DashboardHeading>
      <DashboardMainItem title="Post">
        <CardOverview
          bgColor="bg-gradient-to-br from-[#50489E] to-[#368DC2]"
          size={sizePost}
          text="Current Post"
          to="/manage/post"
        ></CardOverview>
        <CardStatus
          bgColor="bg-gradient-to-br from-[#A040BD] to-[#B73E8D]"
          title="Status Post"
        >
          <StatusItem
            textColor="text-green-500"
            figures={approvedPost}
            to="/manage/post?status=approved"
          ></StatusItem>
          <StatusItem
            children="Pending"
            textColor="text-orange-500"
            figures={pendingPost}
            to="/manage/post?status=pending"
          ></StatusItem>
          <StatusItem
            children="Rejected"
            textColor="text-red-500"
            figures={rejectPost}
            to="/manage/post?status=rejected"
          ></StatusItem>
        </CardStatus>
        <CardOverview
          bgColor="bg-gradient-to-br from-[#FE7547] to-[#FA9F4E]"
          size={hotPost}
          text="Feature Post"
          to="/manage/post?hot=true"
        ></CardOverview>
      </DashboardMainItem>
      <DashboardMainItem title="User">
        <CardOverview
          bgColor="bg-gradient-to-tl from-[#50489E] to-[#368DC2]"
          size={sizeUser}
          text="Current User"
          to="/manage/user"
        ></CardOverview>
        <CardStatus
          bgColor="bg-gradient-to-tl from-[#A040BD] to-[#B73E8D]"
          title="Status User"
        >
          <StatusItem
            children="Active"
            textColor="text-green-500"
            figures={activeUser}
            to=""
          ></StatusItem>
          <StatusItem
            children="Pending"
            textColor="text-orange-500"
            figures={pendingUser}
            to=""
          ></StatusItem>
          <StatusItem
            children="Banned"
            textColor="text-red-500"
            figures={sizeUser - activeUser - pendingUser}
            to=""
          ></StatusItem>
        </CardStatus>
        <CardStatus title="Role User">
          <StatusItem
            children="Admin"
            textColor="text-green-500"
            figures={adminUser}
            to=""
          ></StatusItem>
          <StatusItem
            children="Moderator"
            textColor="text-orange-500"
            figures={modUser}
            to=""
          ></StatusItem>
          <StatusItem
            children="User"
            textColor="text-red-500"
            figures={sizeUser - adminUser - modUser}
            to=""
          ></StatusItem>
        </CardStatus>
      </DashboardMainItem>
      <DashboardMainItem title="Category">
        <CardOverview
          bgColor="bg-gradient-to-br from-[#50489E] to-[#368DC2]"
          size={sizeCategory}
          text="Current Category"
          to="/manage/category"
        ></CardOverview>
        <CardStatus
          bgColor="bg-gradient-to-br from-[#A040BD] to-[#B73E8D]"
          title="Status Category"
        >
          <StatusItem
            textColor="text-green-500"
            figures={approvedCategory}
            to=""
          ></StatusItem>
          <StatusItem
            children="Unapproved"
            textColor="text-red-500"
            figures={sizeCategory - approvedCategory}
            to=""
          ></StatusItem>
        </CardStatus>
      </DashboardMainItem>
      <DashboardMainItem title="Help">
        <CardOverview
          bgColor="bg-gradient-to-tl from-[#50489E] to-[#368DC2]"
          size={sizeHelp}
          text="Current Help"
          to="/manage/help"
        ></CardOverview>
        <CardStatus
          bgColor="bg-gradient-to-tl from-[#A040BD] to-[#B73E8D]"
          title="Status Help"
        >
          <StatusItem
            textColor="text-green-500"
            figures={approvedHelp}
            to="manage/help?status=approved"
          ></StatusItem>
          <StatusItem
            children="Unapproved"
            textColor="text-red-500"
            figures={sizeHelp - approvedHelp}
            to="manage/help?status=unapproved"
          ></StatusItem>
        </CardStatus>
      </DashboardMainItem>
    </div>
  );
};

export default DashboardPage;
