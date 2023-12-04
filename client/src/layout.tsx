import { Box } from "@mui/material";
import { Outlet } from "react-router";
import Navigation from "./navigation/navigation";

export const Layout = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Navigation />
      <Box
        sx={{
          maxWidth: "1920px",
          justifyContent: "center",
          display: "flex",
          flexGrow: 1,
          padding: 2,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
