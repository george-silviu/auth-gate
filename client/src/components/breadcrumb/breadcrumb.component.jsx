import { useLocation } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

//material ui components
import { Breadcrumbs, Link } from "@mui/material";

//styles
import { BreadcrumbContainer } from "./breadcrumb.styles";

const Breadcrumb = () => {
  const { auth } = useAuth();

  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <BreadcrumbContainer>
      {location.pathname === "/dashboard" ? (
        <p style={{ color: "#2b2c34" }}>
          Nice to see you again, {auth?.username}! Your role is {auth?.roles[0]}
          .{console.log(auth)}
        </p>
      ) : (
        <Breadcrumbs aria-label="breadcrumb" style={{ color: "#9EE493" }}>
          {pathnames.map((value, index) => {
            const last = index === pathnames.length - 1;

            const to = `/${pathnames.slice(0, index + 1).join("/")}`;

            // Capitalize the first letter of each word in the path
            const capitalizedValue =
              value.charAt(0).toUpperCase() + value.slice(1);

            return last ? (
              <Link
                underline="hover"
                color="text.primary"
                href={to}
                aria-current="page"
                style={{ color: "#2b2c34" }}
                key={to}
              >
                {capitalizedValue}
              </Link>
            ) : (
              <Link
                underline="hover"
                color="inherit"
                href={to}
                style={{ color: "#2b2c34" }}
                key={to}
              >
                {capitalizedValue}
              </Link>
            );
          })}
        </Breadcrumbs>
      )}
    </BreadcrumbContainer>
  );
};

export default Breadcrumb;
