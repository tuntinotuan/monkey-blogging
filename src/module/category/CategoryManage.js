import { ActionDelete, ActionEdit } from "components/action";
import { Button } from "components/button";
import { Dropdown } from "components/dropdown";
import { ErrorFallback } from "components/error";
import { InputSearchDashboard } from "components/input";
import { LabelStatus } from "components/label";
import { NotFoundData } from "components/notfound";
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
import { withErrorBoundary } from "react-error-boundary";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { categoryStatus } from "utils/constants";

const CATEGORY_PER_PAGE = 5;

const CategoryManage = () => {
  const [params] = useSearchParams();
  const statusCategoryParams = params.get("status");
  const { userInfo } = useAuth();
  const [categoryList, setCategoryList] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentDocument, setCurrentdocument] = useState("");
  const [total, setTotal] = useState("");
  const navigate = useNavigate();

  const handleLoadMoreCategory = async () => {
    const next = statusCategoryParams
      ? query(
          collection(db, "categories"),
          startAfter(currentDocument),
          limit(CATEGORY_PER_PAGE),
          where(
            "status",
            "==",
            statusCategoryParams === "unapproved"
              ? categoryStatus.UNAPPROVED
              : categoryStatus.APPROVED
          )
        )
      : query(
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
        : statusCategoryParams
        ? query(
            colRef,
            limit(CATEGORY_PER_PAGE),
            where(
              "status",
              "==",
              statusCategoryParams === "unapproved"
                ? categoryStatus.UNAPPROVED
                : categoryStatus.APPROVED
            )
          )
        : query(colRef, limit(CATEGORY_PER_PAGE));
      if (statusCategoryParams) {
        onSnapshot(
          query(
            colRef,
            where(
              "status",
              "==",
              statusCategoryParams === "unapproved"
                ? categoryStatus.UNAPPROVED
                : categoryStatus.APPROVED
            )
          ),
          (snapshot) => {
            setTotal(snapshot.size);
          }
        );
      } else {
        onSnapshot(colRef, (snapshot) => {
          setTotal(snapshot.size);
        });
      }
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
      const documentSnapshots = await getDocs(newRef);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      setCurrentdocument(lastVisible);
    }
    fetchData();
  }, [categoryFilter, statusCategoryParams]);
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
      <div className="flex justify-end gap-4 my-5">
        <div className="w-40">
          <Dropdown>
            <Dropdown.Select
              placeholder={statusCategoryParams || "Normal"}
              padding={3}
              arrowSize="5"
            ></Dropdown.Select>
            <Dropdown.List>
              {statusCategoryParams !== "approved" && (
                <Dropdown.Option
                  onClick={() => navigate("/manage/category?status=approved")}
                >
                  Approved
                </Dropdown.Option>
              )}
              {statusCategoryParams !== "unapproved" && (
                <Dropdown.Option
                  onClick={() => navigate("/manage/category?status=unapproved")}
                >
                  Unapproved
                </Dropdown.Option>
              )}
              {statusCategoryParams && (
                <Dropdown.Option onClick={() => navigate("/manage/category")}>
                  Normal
                </Dropdown.Option>
              )}
            </Dropdown.List>
          </Dropdown>
        </div>
        <InputSearchDashboard
          placeholder="Search category..."
          onChange={handleSearchCategory}
        ></InputSearchDashboard>
      </div>
      {categoryList.length > 0 ? (
        <Table>
          <thead className="dark:bg-darkMain dark:text-darkTextA0">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Slug</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="dark:text-darkTextA0">
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
      ) : (
        categoryFilter && <NotFoundData size="medium"></NotFoundData>
      )}
      {categoryList.length < total && categoryList.length > 0 && (
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

export default withErrorBoundary(CategoryManage, {
  FallbackComponent: ErrorFallback,
});
