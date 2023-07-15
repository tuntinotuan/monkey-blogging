import { ActionDelete, ActionEdit, ActionView } from "components/action";
import { Button } from "components/button";
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
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { postStatus } from "utils/constants";

const POST_PER_PAGE = 5;

const PostManage = () => {
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const [postList, setPostList] = useState([]);
  const [filter, setFilter] = useState("");
  const [currentDocument, setCurrentdocument] = useState("");
  const [total, setTotal] = useState(0);
  const handleLoadMorePost = async () => {
    const next = query(
      collection(db, "posts"),
      startAfter(currentDocument),
      limit(POST_PER_PAGE)
    );
    onSnapshot(next, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPostList([...postList, ...results]);
    });
    const documentSnapshots = await getDocs(next);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setCurrentdocument(lastVisible);
  };
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "posts");
      const newRef = filter
        ? query(
            colRef,
            where("title", ">=", filter),
            where("title", "<=", filter + "utf8")
          )
        : query(colRef, limit(POST_PER_PAGE));
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
        if (results.length === 0) setFilter("abc");
        setPostList(results);
      });
      setCurrentdocument(lastVisible);
    }
    fetchData();
  }, [filter]);
  const handleDeletePost = async (postId, postTitle) => {
    const colRef = doc(db, "posts", postId);
    Swal.fire({
      title: `Are you sure? ${postTitle}`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(colRef);
        Swal.fire("Deleted!", `Your ${postTitle} has been deleted.`, "success");
      }
    });
  };
  const handleSearchPost = debounce((e) => {
    setFilter(e.target.value);
  }, 500);
  const renderPostStatus = (status) => {
    switch (status) {
      case postStatus.APPROVED:
        return <LabelStatus type="success">Approved</LabelStatus>;
      case postStatus.PENDING:
        return <LabelStatus type="warning">Pending</LabelStatus>;
      case postStatus.REJECT:
        return <LabelStatus type="danger">Rejected</LabelStatus>;
      default:
        break;
    }
  };
  if (userInfo.role === 3) return null;
  return (
    <div>
      <DashboardHeading
        title="All posts"
        desc="Manage all posts"
      ></DashboardHeading>
      <div className="flex justify-end my-5">
        <InputSearchDashboard
          placeholder="Search post..."
          onChange={handleSearchPost}
        ></InputSearchDashboard>
      </div>
      {postList.length > 0 ? (
        <Table>
          <thead className="dark:text-darkTextA0 dark:bg-darkMain">
            <tr>
              <th>Id</th>
              <th>Post</th>
              <th>Category</th>
              <th>Author</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="dark:text-darkTextA0">
            {postList.length > 0 &&
              postList.map((post) => (
                <tr key={post.id}>
                  <td>{post.id.slice(0, 5) + "..."}</td>
                  <td>
                    <div className="flex items-center gap-x-3">
                      <img
                        src={post.image}
                        alt=""
                        className="w-[66px] h-[55px] rounded object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold max-w-[200px] whitespace-pre-wrap line-clamp-3">
                          {post.title}
                        </h3>
                        <time className="text-sm text-gray-500">
                          Date:
                          {new Date(
                            post?.createdAt?.seconds * 1000
                          ).toLocaleDateString("vi-VI")}
                        </time>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-gray-500">{post?.category.name}</span>
                  </td>
                  <td>
                    <span className="text-gray-500">
                      {post?.user?.fullname}
                    </span>
                  </td>
                  <td>{renderPostStatus(post.status)}</td>
                  <td>
                    <div className="flex items-center gap-x-3 text-gray-500">
                      <ActionView
                        onClick={() => navigate(`/${post.slug}`)}
                      ></ActionView>
                      <ActionEdit
                        onClick={() =>
                          navigate(`/manage/update-post?id=${post.id}`)
                        }
                      ></ActionEdit>
                      <ActionDelete
                        onClick={() => handleDeletePost(post.id, post.title)}
                      ></ActionDelete>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      ) : (
        filter && <NotFoundData size="medium"></NotFoundData>
      )}
      <div className="mt-10">
        {total > postList.length && postList.length > 0 && (
          <Button
            className="mx-auto w-[200px]"
            onClick={() => handleLoadMorePost()}
          >
            Load more
          </Button>
        )}
      </div>
    </div>
  );
};

export default withErrorBoundary(PostManage, {
  FallbackComponent: ErrorFallback,
});
