import React from "react";
import { useState } from "react";
import { imageSunflower, userRole, userStatus } from "utils/constants";
import { useNavigate, useSearchParams } from "react-router-dom";
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
import { NotFoundData } from "components/notfound";
import { InputSearchDashboard } from "components/input";
import { withErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "components/error";
import { Dropdown } from "components/dropdown";

const USER_PER_PAGE = 5;

const UserTable = () => {
  const [params] = useSearchParams();
  const statusUserParams = params.get("status");
  const roleUserParams = params.get("role");
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [currentDocument, setCurrentdocument] = useState("");
  const [filter, setFilter] = useState("");
  const [total, setTotal] = useState(0);
  const handleLoadMoreUser = async () => {
    const next =
      statusUserParams || roleUserParams
        ? statusUserParams
          ? query(
              collection(db, "users"),
              startAfter(currentDocument),
              limit(USER_PER_PAGE),
              where(
                "status",
                "==",
                statusUserParams === "active"
                  ? userStatus.ACTIVE
                  : statusUserParams === "pending"
                  ? userStatus.PENDING
                  : userStatus.BAN
              )
            )
          : query(
              collection(db, "users"),
              startAfter(currentDocument),
              limit(USER_PER_PAGE),
              where(
                "role",
                "==",
                roleUserParams === "admin"
                  ? userRole.ADMIN
                  : roleUserParams === "moderator"
                  ? userRole.MOD
                  : userRole.USER
              )
            )
        : query(
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
      const paramsRef = statusUserParams
        ? query(
            colRef,
            limit(USER_PER_PAGE),
            where(
              "status",
              "==",
              statusUserParams === "active"
                ? userStatus.ACTIVE
                : statusUserParams === "pending"
                ? userStatus.PENDING
                : userStatus.BAN
            )
          )
        : query(
            colRef,
            limit(USER_PER_PAGE),
            where(
              "role",
              "==",
              roleUserParams === "admin"
                ? userRole.ADMIN
                : roleUserParams === "moderator"
                ? userRole.MOD
                : userRole.USER
            )
          );
      const newRef = filter
        ? query(
            colRef,
            where("fullname", ">=", filter),
            where("fullname", "<=", filter + "utf8")
          )
        : statusUserParams || roleUserParams
        ? paramsRef
        : query(colRef, limit(USER_PER_PAGE));
      const statusSize = query(
        colRef,
        where(
          "status",
          "==",
          statusUserParams === "active"
            ? userStatus.ACTIVE
            : statusUserParams === "pending"
            ? userStatus.PENDING
            : userStatus.BAN
        )
      );
      const roleSize = query(
        colRef,
        where(
          "role",
          "==",
          roleUserParams === "admin"
            ? userRole.ADMIN
            : roleUserParams === "moderator"
            ? userRole.MOD
            : userRole.USER
        )
      );
      onSnapshot(
        statusUserParams || roleUserParams
          ? statusUserParams
            ? statusSize
            : roleSize
          : colRef,
        (snapshot) => {
          setTotal(snapshot.size);
        }
      );
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
      const documentSnapshots = await getDocs(newRef);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      setCurrentdocument(lastVisible);
    }
    fetchDataUser();
  }, [filter, statusUserParams, roleUserParams]);
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
  const handleSelectStatus = (to) => {
    if (to === "status") return navigate("/manage/user");
    navigate(`/manage/user?status=${to}`);
  };
  const handleSelectRole = (to) => {
    if (to === "role") return navigate("/manage/user");
    navigate(`/manage/user?role=${to}`);
  };
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
        return <LabelStatus type="danger">Banned</LabelStatus>;
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
      <div className="flex justify-end gap-4 my-5">
        <div className="w-40">
          <Dropdown>
            <Dropdown.Select
              placeholder={statusUserParams || "Status"}
              active={statusUserParams}
              padding={3}
              arrowSize="5"
            ></Dropdown.Select>
            <Dropdown.List>
              {statusUserParams !== "active" && (
                <Dropdown.Option
                  onClick={() => handleSelectStatus("active")}
                  colorType="active"
                >
                  Active
                </Dropdown.Option>
              )}
              {statusUserParams !== "pending" && (
                <Dropdown.Option
                  onClick={() => handleSelectStatus("pending")}
                  colorType="pending"
                >
                  Pending
                </Dropdown.Option>
              )}
              {statusUserParams !== "banned" && (
                <Dropdown.Option
                  onClick={() => handleSelectStatus("banned")}
                  colorType="banned"
                >
                  Banned
                </Dropdown.Option>
              )}
              {statusUserParams && (
                <Dropdown.Option
                  onClick={() => handleSelectStatus("status")}
                  className="border border-t-gray-200"
                >
                  Status
                </Dropdown.Option>
              )}
            </Dropdown.List>
          </Dropdown>
        </div>
        <div className="w-40">
          <Dropdown>
            <Dropdown.Select
              placeholder={roleUserParams || "Role"}
              active={roleUserParams}
              padding={3}
              arrowSize="5"
            ></Dropdown.Select>
            <Dropdown.List>
              {roleUserParams !== "admin" && (
                <Dropdown.Option
                  onClick={() => handleSelectRole("admin")}
                  colorType="admin"
                >
                  Admin
                </Dropdown.Option>
              )}
              {roleUserParams !== "moderator" && (
                <Dropdown.Option
                  onClick={() => handleSelectRole("moderator")}
                  colorType="moderator"
                >
                  Moderator
                </Dropdown.Option>
              )}
              {roleUserParams !== "user" && (
                <Dropdown.Option
                  onClick={() => handleSelectRole("user")}
                  colorType="user"
                >
                  User
                </Dropdown.Option>
              )}
              {roleUserParams && (
                <Dropdown.Option
                  onClick={() => handleSelectRole("role")}
                  className="border border-t-gray-200"
                >
                  Role
                </Dropdown.Option>
              )}
            </Dropdown.List>
          </Dropdown>
        </div>
        <InputSearchDashboard
          placeholder="Search user..."
          onChange={handleSearchUser}
        ></InputSearchDashboard>
      </div>
      {userList.length > 0 ? (
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
            {userList.length > 0 &&
              userList.map((user) => renderUserItem(user))}
          </tbody>
        </Table>
      ) : (
        filter && <NotFoundData size="medium"></NotFoundData>
      )}
      {userList.length < total && userList.length > 0 && (
        <Button kind="ghost" className="mx-auto" onClick={handleLoadMoreUser}>
          Load more
        </Button>
      )}
    </div>
  );
};

export default withErrorBoundary(UserTable, {
  FallbackComponent: ErrorFallback,
});
