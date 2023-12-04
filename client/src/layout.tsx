import { Box } from "@mui/material";
import { Outlet } from "react-router";
import Navigation from "./navigation/navigation";

export const Layout = () => {
  return (
    <Box
      sx={{
        width: "100vw",
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
          padding: 2,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
