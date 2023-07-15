import { ErrorFallback } from "components/error";
import React from "react";
import { withErrorBoundary } from "react-error-boundary";

const DashboardHeading = ({ title = "", desc = "", children }) => {
  return (
    <div className="flex items-start justify-between mb-10">
      <div>
        <h1 className="dashboard-heading">{title}</h1>
        <p className="dashboard-short-desc">{desc}</p>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default withErrorBoundary(DashboardHeading, {
  FallbackComponent: ErrorFallback,
});
