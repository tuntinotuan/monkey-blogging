import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import { LoadingSpinner } from "components/loading";
import { useEffect } from "react";
import useDarkMode from "hooks/useDarkMode";
const HomePage = React.lazy(() => import("pages/HomePage"));
const SearchPage = React.lazy(() => import("pages/SearchPage"));
const ContactPage = React.lazy(() => import("pages/ContactPage"));
const SignInPage = React.lazy(() => import("pages/SignInPage"));
const SignUpPage = React.lazy(() => import("pages/SignUpPage"));
const PageNotFound = React.lazy(() => import("pages/PageNotFound"));
const CagetoryPage = React.lazy(() => import("pages/CagetoryPage"));
const AuthorPage = React.lazy(() => import("pages/AuthorPage"));
const PostDetailsPage = React.lazy(() => import("pages/PostDetailsPage"));
const PostUpdate = React.lazy(() => import("module/post/PostUpdate"));
const UserUpdate = React.lazy(() => import("module/user/UserUpdate"));
const UserManage = React.lazy(() => import("module/user/UserManage"));
const UserProfile = React.lazy(() => import("module/user/UserProfile"));
const UserAddNew = React.lazy(() => import("module/user/UserAddNew"));
const PostAddNew = React.lazy(() => import("module/post/PostAddNew"));
const PostManage = React.lazy(() => import("module/post/PostManage"));
const DashboardPage = React.lazy(() => import("pages/DashboardPage"));
const DashboardLayout = React.lazy(() =>
  import("module/dashboard/DashboardLayout")
);
const CategoryUpdate = React.lazy(() =>
  import("module/category/CategoryUpdate")
);
const CategoryManage = React.lazy(() =>
  import("module/category/CategoryManage")
);
const CategoryAddNew = React.lazy(() =>
  import("module/category/CategoryAddNew")
);

function App() {
  const [darkMode, setDarkMode] = useDarkMode();
  useEffect(() => {
    setDarkMode(darkMode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <AuthProvider>
        <Suspense
          fallback={
            <div className="h-[100vh] mx-auto flex items-center justify-center">
              <LoadingSpinner
                size="120px"
                borderColor="#2EBAC1"
              ></LoadingSpinner>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route
              path="/contact"
              element={<ContactPage></ContactPage>}
            ></Route>
            <Route
              path="/category/:slug"
              element={<CagetoryPage></CagetoryPage>}
            ></Route>
            <Route
              path="/author/:slug"
              element={<AuthorPage></AuthorPage>}
            ></Route>
            <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
            <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
            <Route path="/search" element={<SearchPage></SearchPage>}></Route>
            <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
            <Route
              path="/:slug"
              element={<PostDetailsPage></PostDetailsPage>}
            ></Route>
            <Route element={<DashboardLayout></DashboardLayout>}>
              <Route
                path="/dashboard"
                element={<DashboardPage></DashboardPage>}
              ></Route>
              <Route
                path="/manage/post"
                element={<PostManage></PostManage>}
              ></Route>
              <Route
                path="/manage/add-post"
                element={<PostAddNew></PostAddNew>}
              ></Route>
              <Route
                path="/manage/update-post"
                element={<PostUpdate></PostUpdate>}
              ></Route>
              <Route
                path="/manage/category"
                element={<CategoryManage></CategoryManage>}
              ></Route>
              <Route
                path="/manage/add-category"
                element={<CategoryAddNew></CategoryAddNew>}
              ></Route>
              <Route
                path="/manage/update-category"
                element={<CategoryUpdate></CategoryUpdate>}
              ></Route>
              <Route
                path="/manage/user"
                element={<UserManage></UserManage>}
              ></Route>
              <Route
                path="/manage/add-user"
                element={<UserAddNew></UserAddNew>}
              ></Route>
              <Route
                path="/manage/update-user"
                element={<UserUpdate></UserUpdate>}
              ></Route>
              <Route
                path="/profile"
                element={<UserProfile></UserProfile>}
              ></Route>
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </div>
  );
}

export default App;
