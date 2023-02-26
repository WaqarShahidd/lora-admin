import React, { useContext, useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";

import {
  AppBar,
  Button,
  Box,
  Typography,
  IconButton,
  InputBase,
  Toolbar,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/dispatchers/login";
import { ColorModeContext, tokens } from "../constants/theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

const NavBar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => {
    setAnchorEl(null);
    dispatch(logout());
  };

  const { loginData } = useSelector((state) => state.log);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  return (
    // <AppBar
    //   sx={{
    //     position: "static",
    //     background: "none",
    //     boxShadow: "none",
    //   }}
    //   style={{ padding: "10px 5px" }}
    // >
    //   <Toolbar sx={{ justifyContent: "space-between" }}>
    //     {/* LEFT SIDE */}
    //     <Box
    //       style={{
    //         display: "flex",
    //         justifyContent: "space-between",
    //         alignItems: "center",
    //       }}
    //     >
    //       <IconButton
    //         onClick={() => {
    //           setIsSidebarOpen(!isSidebarOpen);
    //         }}
    //         style={{ marginRight: "15px" }}
    //       >
    //         <MenuIcon />
    //       </IconButton>
    //       <Box
    //         style={{
    //           display: "flex",
    //           justifyContent: "space-between",
    //           alignItems: "center",
    //         }}
    //         backgroundColor={"#F0F0F0"}
    //         borderRadius="9px"
    //         gap="3rem"
    //         p="0.1rem 1.5rem"
    //       >
    //         <InputBase placeholder="Search..." />
    //         <IconButton onClick={() => console.log(loginData)}>
    //           <Search />
    //         </IconButton>
    //       </Box>
    //     </Box>

    //     {/* RIGHT SIDE */}
    //     <Box
    //       style={{
    //         display: "flex",
    //         justifyContent: "space-between",
    //         alignItems: "center",
    //       }}
    //     >
    //       <IconButton>
    //         <SettingsOutlined sx={{ fontSize: "25px" }} />
    //       </IconButton>

    //       <Box
    //         style={{
    //           display: "flex",
    //           justifyContent: "space-between",
    //           alignItems: "center",
    //         }}
    //       >
    //         <Button
    //           onClick={handleClick}
    //           sx={{
    //             display: "flex",
    //             justifyContent: "space-between",
    //             alignItems: "center",
    //             textTransform: "none",
    //             gap: "1rem",
    //           }}
    //         >
    //           <Box
    //             component="img"
    //             alt="profile"
    //             src={require("../assets/hero1.png")}
    //             height="32px"
    //             width="32px"
    //             borderRadius="50%"
    //             sx={{ objectFit: "cover" }}
    //           />
    //           <Box textAlign="left">
    //             <Typography
    //               fontWeight="bold"
    //               fontSize="0.85rem"
    //               sx={{ color: "#000" }}
    //             >
    //               User
    //             </Typography>
    //             <Typography fontSize="0.75rem" sx={{ color: "#000" }}>
    //               Software
    //             </Typography>
    //           </Box>
    //           <ArrowDropDownOutlined sx={{ color: "#000", fontSize: "25px" }} />
    //         </Button>
    //         <Menu
    //           anchorEl={anchorEl}
    //           open={isOpen}
    //           onClose={handleClose}
    //           anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    //         >
    //           <MenuItem onClick={handleClose}>Log Out</MenuItem>
    //         </Menu>
    //       </Box>
    //     </Box>
    //   </Toolbar>
    // </AppBar>
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box display="flex" borderRadius="3px">
        <IconButton
          sx={{ ml: 2, flex: 1 }}
          onClick={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
          style={{ marginRight: "15px" }}
        >
          <MenuIcon />
        </IconButton>

        {/* SEARCH BAR */}
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
        >
          <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default NavBar;
