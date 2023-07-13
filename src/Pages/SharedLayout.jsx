import React, { useEffect } from "react";
import { useGlobalContext } from "../components/Context";
import { Outlet, redirect, useNavigate, Navigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import Navbar from "../components/Layout/Navbar";
import Options from "../components/Options";

function MyFallbackComponent({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
function SharedLayout() {
  const { session } = useGlobalContext();
  const navigate = useNavigate();
  // console.log(Boolean(session));

  useEffect(() => {
    if (!session) {
      return navigate("/login");
    }
  }, []);

  
  //  return <Navigate to="/login" replace />

  return (
    <>
      <ErrorBoundary
        FallbackComponent={MyFallbackComponent}
        onReset={() => {
          // reset the state of your app here
          return redirect("/");
        }}
        resetKeys={["someKey"]}
      >
        <Navbar />
        <Outlet />
      </ErrorBoundary>
    </>
  );
}

export default SharedLayout;
