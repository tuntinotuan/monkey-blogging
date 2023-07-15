import DashboardHeading from "module/dashboard/DashboardHeading";
import React from "react";
import UserTable from "./UserTable";
import { Button } from "components/button";
import { useAuth } from "contexts/auth-context";
import { withErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "components/error";

const UserManage = () => {
  const { userInfo } = useAuth();
  if (userInfo.role !== 1) return null;
  return (
    <div>
      <DashboardHeading title="Users" desc="Manage your user">
        <Button kind="ghost" height="60px" to="/manage/add-user">
          Create new user
        </Button>
      </DashboardHeading>
      <UserTable></UserTable>
    </div>
  );
};

export default withErrorBoundary(UserManage, {
  FallbackComponent: ErrorFallback,
});
