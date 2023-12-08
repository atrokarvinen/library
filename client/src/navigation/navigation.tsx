import { AppBar, Button, Link as MuiLink, Stack, Toolbar } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { axios } from "../core/axios";

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
  const navigate = useNavigate();
  const cookies = document.cookie;
  const isLoggedIn = cookies.includes("userId");

  const isActive = (page: Page) => {
    if (page.path === "/") {
      return (
        location.pathname === page.path ||
        location.pathname.startsWith("/books")
      );
    }
    return location.pathname.startsWith(page.path);
  };

  const handleLogout = async () => {
    console.log("logging out...");
    await axios.post("/auth/logout");
    navigate("/");
    console.log("logged out");
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
        {isLoggedIn && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            sx={{ ml: 5 }}
          >
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
