import React from "react";
import { useState } from "react";
import { userRole, userStatus } from "utils/constants";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Table } from "components/table";
import { LabelStatus } from "components/label";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot } from "firebase/firestore";
import { ActionDelete, ActionEdit } from "components/action";

const UserTable = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    async function fetchDataUser() {
      const colRef = collection(db, "users");
      onSnapshot(colRef, (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setUserList(results);
      });
    }
    fetchDataUser();
  }, []);
  const renderLabelRole = (role) => {
    switch (role) {
      case userRole.ADMIN:
        return "Admin";
      case userRole.MOD:
        return "Mod";
      case userRole.USER:
        return "User";
      default:
        break;
    }
  };
  const renderLabelStatus = (status) => {
    switch (status) {
      case userStatus.ACTIVE:
        return <LabelStatus type="success">Active</LabelStatus>;
      case userStatus.PENDING:
        return <LabelStatus type="warning">Pending</LabelStatus>;
      case userStatus.BAN:
        return <LabelStatus type="danger">Rejected</LabelStatus>;
      default:
        break;
    }
  };
  const renderUserItem = (user) => (
    <tr key={user.id}>
      <td title={user.id}>{user.id.slice(0, 5) + "..."}</td>
      <th className="whitespace-nowrap">
        <div className="flex items-center gap-x-3">
          <img
            src={user.avatar}
            alt=""
            className="flex-shrink-0 object-cover w-10 h-10 rounded-md"
          />
          <div className="flex-1">
            <h3>{user?.fullname}</h3>
            <time className="text-sm text-gray-300 italic">
              {new Date(user?.createdAt?.seconds * 1000).toLocaleDateString(
                "vi-VI"
              )}
            </time>
          </div>
        </div>
      </th>
      <th>{user.username}</th>
      <th title={user.email}>{user.email.slice(0, 5) + "..."}</th>
      <th>{renderLabelStatus(user.status)}</th>
      <th>{renderLabelRole(user.role)}</th>
      <th>
        <div className="flex gap-3 text-gray-400">
          <ActionEdit
            onClick={() => navigate(`/manage/update-category?id=${user.id}`)}
          ></ActionEdit>
          <ActionDelete
          // onClick={() =>
          //   handleDeleteCategory(category.id, category.name)
          // }
          ></ActionDelete>
        </div>
      </th>
    </tr>
  );
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Info</th>
            <th>Username</th>
            <th>Email address</th>
            <th>Status</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.length > 0 && userList.map((user) => renderUserItem(user))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserTable;
