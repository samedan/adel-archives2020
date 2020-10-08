import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import ArchivesUnauthModal from "../../features/auth/ArchivesUnauthModal";

export default function AdelPrivateRoute({
  component: Component,
  prevLocation,
  ...rest
}) {
  const { authenticated } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
          <Component {...props} />
        ) : (
          <ArchivesUnauthModal {...props} />
        )
      }
    />
  );
}
