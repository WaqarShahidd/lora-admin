import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "./global/Sidebar";
import NavBar from "./NavBar";
import { useSelector } from "react-redux";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const { isAuthenticated } = useSelector((state) => state.log);
  const token = localStorage.getItem("token");

  return token === null ? (
    <Navigate to="/login" />
  ) : (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        isNonMobile={isNonMobile}
        drawerWidth="275px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <NavBar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
