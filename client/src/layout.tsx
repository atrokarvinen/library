import { Box } from "@mui/material";
import { Outlet } from "react-router";
import Navigation from "./navigation/navigation";

export const Layout = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        overflowX: "hidden",
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
          padding: 1,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
