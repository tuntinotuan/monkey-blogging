import { ActionDelete, ActionEdit, ActionView } from "components/action";
import { Button } from "components/button";
import { LabelStatus } from "components/label";
import { Table } from "components/table";
import { useAuth } from "contexts/auth-context";
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
import { debounce } from "lodash";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { categoryStatus } from "utils/constants";

const CATEGORY_PER_PAGE = 1;

const CategoryManage = () => {
  const { userInfo } = useAuth();
  const [categoryList, setCategoryList] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentDocument, setCurrentdocument] = useState("");
  const [total, setTotal] = useState("");
  const navigate = useNavigate();

  const handleLoadMoreCategory = async () => {
    const next = query(
      collection(db, "categories"),
      startAfter(currentDocument),
      limit(CATEGORY_PER_PAGE)
    );
    onSnapshot(next, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategoryList([...categoryList, ...results]);
    });
    const documentSnapshots = await getDocs(next);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setCurrentdocument(lastVisible);
    // console.log(documentSnapshots.docs[0].id);
  };
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "categories");
      const newRef = categoryFilter
        ? query(
            colRef,
            where("name", ">=", categoryFilter),
            where("name", "<=", categoryFilter + "utf8")
          )
        : query(colRef, limit(CATEGORY_PER_PAGE));
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
        setCategoryList(results);
      });
      setCurrentdocument(lastVisible);
    }
    fetchData();
  }, [categoryFilter]);
  const handleDeleteCategory = async (categoryId, categoryName) => {
    const colRef = doc(db, "categories", categoryId);
    Swal.fire({
      title: `Are you sure? ${categoryName}`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(colRef);
        Swal.fire(
          "Deleted!",
          `Your ${categoryName} has been deleted.`,
          "success"
        );
      }
    });
  };
  const handleSearchCategory = debounce((e) => {
    setCategoryFilter(e.target.value);
  }, 500);
  if (userInfo.role === 3) return null;
  return (
    <div>
      <DashboardHeading title="Categories" desc="Manage your category">
        <Button kind="ghost" height="60px" to="/manage/add-category">
          Create category
        </Button>
      </DashboardHeading>
      <div className="flex justify-end my-5">
        <input
          type="text"
          placeholder="Search category..."
          className="ml-auto border border-gray-300 rounded-full py-3 px-4"
          onChange={handleSearchCategory}
        />
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categoryList.length > 0 &&
            categoryList.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>
                  <em className="text-gray-400">{category.slug}</em>
                </td>
                <td>
                  {Number(category.status) === categoryStatus.APPROVED && (
                    <LabelStatus type="success">Approved</LabelStatus>
                  )}
                  {Number(category.status) === categoryStatus.UNAPPROVED && (
                    <LabelStatus type="warning">Unapproved</LabelStatus>
                  )}
                </td>
                <td>
                  <div className="flex gap-3 text-gray-400">
                    <ActionView></ActionView>
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/update-category?id=${category.id}`)
                      }
                    ></ActionEdit>
                    <ActionDelete
                      onClick={() =>
                        handleDeleteCategory(category.id, category.name)
                      }
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {categoryList.length < total && (
        <Button
          kind="ghost"
          className="mx-auto"
          height="56px"
          onClick={handleLoadMoreCategory}
        >
          Load more
        </Button>
      )}
    </div>
  );
};

export default CategoryManage;
