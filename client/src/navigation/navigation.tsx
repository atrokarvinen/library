import { AppBar, Link as MuiLink, Stack, Toolbar } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

type Page = {
  label: string;
  path: string;
};

const pages: Page[] = [
  { label: "Home", path: "/" },
  { label: "Admin", path: "/admin" },
  { label: "Profile", path: "/profile" },
  { label: "Login", path: "/login" },
];

const Navigation = () => {
  const location = useLocation();

  const isActive = (page: Page) => {
    if (page.path === "/") {
      return (
        location.pathname === page.path ||
        location.pathname.startsWith("/books")
      );
    }
    return location.pathname.startsWith(page.path);
  };

  return (
    <AppBar position="static" sx={{ alignItems: "center" }}>
      <Toolbar sx={{ maxWidth: "1920px" }}>
        <Stack direction="row" spacing={2}>
          {pages.map((page) => (
            <MuiLink
              key={page.label}
              component={Link}
              to={page.path}
              color="inherit"
              underline={isActive(page) ? "always" : "none"}
              sx={{ ":hover": { color: "black" } }}
            >
              {page.label}
            </MuiLink>
          ))}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
