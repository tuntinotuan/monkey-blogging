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
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { withErrorBoundary } from "react-error-boundary";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { helpStatus } from "utils/constants";

const HELP_PER_PAGE = 5;

const HelpManage = () => {
  const [params] = useSearchParams();
  const getFilterStatus = params.get("status");
  const { userInfo } = useAuth();
  const [helpList, setHelpList] = useState([]);
  const [helpFilter, setHelpFilter] = useState("");
  const [currentDocument, setCurrentdocument] = useState("");
  const [total, setTotal] = useState("");
  const navigate = useNavigate();
  const handleLoadMoreCategory = async () => {
    const next = !getFilterStatus
      ? query(
          collection(db, "helps"),
          startAfter(currentDocument),
          limit(HELP_PER_PAGE)
        )
      : query(
          collection(db, "helps"),
          startAfter(currentDocument),
          limit(HELP_PER_PAGE),
          where(
            "status",
            "==",
            getFilterStatus === "unapproved"
              ? helpStatus.UNAPPROVED
              : helpStatus.APPROVED
          )
        );
    onSnapshot(next, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setHelpList([...helpList, ...results]);
    });
    const documentSnapshots = await getDocs(next);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setCurrentdocument(lastVisible);
  };
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "helps");
      const newRef = helpFilter
        ? query(
            colRef,
            where("question", ">=", helpFilter),
            where("question", "<=", helpFilter + "utf8")
          )
        : getFilterStatus
        ? query(
            colRef,
            limit(HELP_PER_PAGE),
            where(
              "status",
              "==",
              getFilterStatus === "unapproved"
                ? helpStatus.UNAPPROVED
                : helpStatus.APPROVED
            )
          )
        : query(colRef, limit(HELP_PER_PAGE));
      if (getFilterStatus) {
        onSnapshot(
          query(
            colRef,
            where(
              "status",
              "==",
              getFilterStatus === "unapproved"
                ? helpStatus.UNAPPROVED
                : helpStatus.APPROVED
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
      const documentSnapshots = await getDocs(newRef);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      onSnapshot(newRef, (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setHelpList(results);
      });
      setCurrentdocument(lastVisible);
    }
    fetchData();
  }, [helpFilter, getFilterStatus]);
  const handleDeleteHelp = async (helpId, helpName) => {
    const colRef = doc(db, "helps", helpId);
    Swal.fire({
      title: `Are you sure? ${helpName}`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(colRef);
        Swal.fire("Deleted!", `Your ${helpName} has been deleted.`, "success");
      }
    });
  };
  const handleSearchHelp = debounce((e) => {
    setHelpFilter(e.target.value);
  }, 500);
  if (userInfo.role === 3) return null;
  return (
    <div>
      <DashboardHeading title="Help" desc="Manage your help">
        <Button kind="ghost" height="60px" to="/manage/add-help">
          Create Help
        </Button>
      </DashboardHeading>
      <div className="flex justify-end gap-4 my-5">
        <div className="w-40">
          <Dropdown>
            <Dropdown.Select
              placeholder={getFilterStatus || "Normal"}
              padding={3}
              arrowSize="5"
            ></Dropdown.Select>
            <Dropdown.List>
              {!getFilterStatus ? (
                <>
                  <Dropdown.Option
                    onClick={() => navigate("/manage/help?status=approved")}
                  >
                    Approved
                  </Dropdown.Option>
                  <Dropdown.Option
                    onClick={() => navigate("/manage/help?status=unapproved")}
                  >
                    Unapproved
                  </Dropdown.Option>
                </>
              ) : getFilterStatus === "unapproved" ? (
                <Dropdown.Option
                  onClick={() => navigate("/manage/help?status=approved")}
                >
                  Approved
                </Dropdown.Option>
              ) : (
                <Dropdown.Option
                  onClick={() => navigate("/manage/help?status=unapproved")}
                >
                  Unapproved
                </Dropdown.Option>
              )}
              {getFilterStatus && (
                <Dropdown.Option onClick={() => navigate("/manage/help")}>
                  Normal
                </Dropdown.Option>
              )}
            </Dropdown.List>
          </Dropdown>
        </div>
        <InputSearchDashboard
          placeholder="Search help..."
          onChange={handleSearchHelp}
        ></InputSearchDashboard>
      </div>
      {helpList.length > 0 ? (
        <Table>
          <thead className="dark:bg-darkMain dark:text-darkTextA0">
            <tr>
              <th>Id</th>
              <th>Question</th>
              <th>Answer</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="dark:text-darkTextA0">
            {helpList.length > 0 &&
              helpList.map((help) => (
                <tr key={help.id}>
                  <td title={help.id}>{help.id.slice(0, 3) + "..."}</td>
                  <td className="max-w-[200px] truncate" title={help.question}>
                    {help.question}
                  </td>
                  <td>
                    <em
                      className="text-gray-400 max-w-[200px] whitespace-pre-wrap line-clamp-3"
                      title={help.answer}
                    >
                      {help.answer}
                    </em>
                  </td>
                  <td>
                    {Number(help.status) === helpStatus.APPROVED && (
                      <LabelStatus type="success">Approved</LabelStatus>
                    )}
                    {Number(help.status) === helpStatus.UNAPPROVED && (
                      <LabelStatus type="warning">Unapproved</LabelStatus>
                    )}
                  </td>
                  <td>
                    <div className="flex gap-3 text-gray-400">
                      <ActionEdit
                        onClick={() =>
                          navigate(`/manage/update-help?id=${help.id}`)
                        }
                      ></ActionEdit>
                      <ActionDelete
                        onClick={() => handleDeleteHelp(help.id, help.question)}
                      ></ActionDelete>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      ) : (
        helpFilter && <NotFoundData size="medium"></NotFoundData>
      )}
      {helpList.length < total && helpList.length > 0 && (
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

export default withErrorBoundary(HelpManage, {
  FallbackComponent: ErrorFallback,
});
