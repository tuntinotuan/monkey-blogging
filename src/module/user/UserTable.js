import React from "react";
import { useState } from "react";
import { imageSunflower, userRole, userStatus } from "utils/constants";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Table } from "components/table";
import { LabelStatus } from "components/label";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { ActionDelete, ActionEdit } from "components/action";
import Swal from "sweetalert2";
import { deleteUser } from "firebase/auth";
import { toast } from "react-toastify";
import { Button } from "components/button";
import { debounce } from "lodash";

const USER_PER_PAGE = 5;

const UserTable = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [currentDocument, setCurrentdocument] = useState("");
  const [filter, setFilter] = useState("");
  const [total, setTotal] = useState(0);
  const handleLoadMoreUser = async () => {
    const next = query(
      collection(db, "users"),
      startAfter(currentDocument),
      limit(USER_PER_PAGE)
    );
    onSnapshot(next, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setUserList([...userList, ...results]);
    });
    const documentSnapshots = await getDocs(next);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setCurrentdocument(lastVisible);
  };
  useEffect(() => {
    async function fetchDataUser() {
      const colRef = collection(db, "users");
      const newRef = filter
        ? query(
            colRef,
            where("fullname", ">=", filter),
            where("fullname", "<=", filter + "utf8")
          )
        : query(colRef, limit(USER_PER_PAGE));
      const documentSnapshots = await getDocs(newRef);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      onSnapshot(colRef, (snapshot) => {
        setTotal(snapshot.size);
      });
      onSnapshot(newRef, (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setUserList(results);
      });
      setCurrentdocument(lastVisible);
    }
    fetchDataUser();
  }, [filter]);
  const handleDeleteUser = async (user) => {
    const colRef = doc(db, "users", user.id);
    Swal.fire({
      title: `Are you sure? ${user.username}`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(colRef);
        await deleteUser(user);
        toast.success("Delete user successfully!");
        Swal.fire(
          "Deleted!",
          `Your ${user.username} has been deleted.`,
          "success"
        );
      }
    });
  };
  const handleSearchUser = debounce((e) => {
    setFilter(e.target.value);
  }, 500);
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
            src={user.avatar || imageSunflower}
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
      <th title={user?.email}>{user?.email?.slice(0, 5) + "..."}</th>
      <th>{renderLabelStatus(user.status)}</th>
      <th>{renderLabelRole(user.role)}</th>
      <th>
        <div className="flex gap-3 text-gray-400">
          <ActionEdit
            onClick={() => navigate(`/manage/update-user?id=${user.id}`)}
          ></ActionEdit>
          <ActionDelete onClick={() => handleDeleteUser(user)}></ActionDelete>
        </div>
      </th>
    </tr>
  );
  return (
    <div>
      <div className="mb-10 flex justify-end">
        <div className="w-full max-w-[300px]">
          <input
            type="text"
            className="w-full p-4 rounded-lg border border-solid border-gray-300"
            placeholder="Search User..."
            onChange={handleSearchUser}
          />
        </div>
      </div>
      <Table>
        <thead className="dark:bg-darkMain dark:text-darkTextA0">
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
        <tbody className="dark:text-darkTextA0">
          {userList.length > 0 && userList.map((user) => renderUserItem(user))}
        </tbody>
      </Table>
      {userList.length < total && (
        <Button kind="ghost" className="mx-auto" onClick={handleLoadMoreUser}>
          Load more
        </Button>
      )}
    </div>
  );
};

export default UserTable;
