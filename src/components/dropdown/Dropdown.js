import React from "react";
import { DropdownProvider } from "./dropdown-context";
import { withErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "components/error";

const Dropdown = ({ children, ...props }) => {
  return (
    <DropdownProvider {...props}>
      <div className="relative inline-block w-full">{children}</div>
    </DropdownProvider>
  );
};

export default withErrorBoundary(Dropdown, {
  FallbackComponent: ErrorFallback,
});
