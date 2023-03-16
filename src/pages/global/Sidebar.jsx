import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { Sidebar as Side, Menu, MenuItem } from "react-pro-sidebar";
import Parents from "../dashboard/Parents";
import Child from "../dashboard/Child";
import Task from "../dashboard/Task";
import Dashboard from "../dashboard/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import { tokens } from "../../constants/theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { Link } from "react-router-dom";
import AddForm from "../dashboard/AddForm";

const navItems = [
  {
    text: "Dashboard",
    icon: <Dashboard />,
  },
  {
    text: "Assignors",
    icon: <Parents />,
  },
  {
    text: "Assignees",
    icon: <Child />,
  },
  {
    text: "Task",
    icon: <Task />,
  },
];

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  return (
    <Box
      component="nav"
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: "#ffedc2",
              backgroundColor: "#21295c",
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
          onTouchMove={{ color: "#ffedc2" }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: "#858585",
                }}
              >
                <Box display="flex" alignItems="center" gap="0rem">
                  <img src={require("../../assets/logo.png")} />
                  {/* <Typography variant="h4" fontWeight="bold">
                    LORA
                  </Typography> */}
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </div>
            </Box>
            <List style={{ padding: "10px" }}>
              {navItems.map(({ text, icon }) => {
                const lcText = text.toLowerCase();
                return (
                  <ListItem
                    key={text}
                    disablePadding
                    style={{
                      color: colors.grey[100],
                    }}
                  >
                    <ListItemButton
                      onClick={() => {
                        if (lcText === "form") {
                          navigate(`/${lcText}/parent`);
                        } else {
                          navigate(`/${lcText}`);
                        }
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText ? "#ffe3a3" : "transparent",
                        color: active === lcText ? "#191F45" : "#fff6e0",
                      }}
                    >
                      {/* <ListItemIcon sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? "#191F45"
                              : "#ffedc2",
                        }}>{icon}</ListItemIcon> */}
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
          {/* <Box position={"absolute"} bottom="2rem">
            <Divider />
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              textTransform="none"
              gap="1rem"
              m="1.5rem 2rem 0 2rem"
            >
              <Box
                component="img"
                alt="profile"
                src={require("../../assets/hero1.png")}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography fontWeight="bold" fontSize="0.9rem">
                  Testing User
                </Typography>
                <Typography fontSize="0.8rem">Software</Typography>
              </Box>

              <LogoutIcon />
            </Box>
          </Box> */}
        </Drawer>
      )}
    </Box>
    // <Box
    //   sx={{
    //     "& .pro-sidebar-inner": {
    //       background: `${colors.primary[400]} !important`,
    //     },
    //     "& .pro-icon-wrapper": {
    //       backgroundColor: "transparent !important",
    //     },
    //     "& .pro-inner-item": {
    //       padding: "5px 35px 5px 20px !important",
    //     },
    //     "& .pro-inner-item:hover": {
    //       color: "#868dfb !important",
    //     },
    //     "& .pro-menu-item.active": {
    //       color: "#6870fa !important",
    //     },
    //   }}
    // >
    //   <Side collapsed={isCollapsed}>
    //     <Menu iconShape="square">
    //       {/* LOGO AND MENU ICON */}
    //       <MenuItem
    //         onClick={() => setIsCollapsed(!isCollapsed)}
    //         icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
    //         style={{
    //           margin: "10px 0 20px 0",
    //           color: colors.grey[100],
    //         }}
    //       >
    //         {!isCollapsed && (
    //           <Box
    //             display="flex"
    //             justifyContent="space-between"
    //             alignItems="center"
    //             ml="15px"
    //           >
    //             <Typography variant="h3" color={colors.grey[100]}>
    //               ADMINIS
    //             </Typography>
    //             <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
    //               <MenuOutlinedIcon />
    //             </IconButton>
    //           </Box>
    //         )}
    //       </MenuItem>

    //       {!isCollapsed && (
    //         <Box mb="25px">
    //           <Box display="flex" justifyContent="center" alignItems="center">
    //             <img
    //               alt="profile-user"
    //               width="100px"
    //               height="100px"
    //               src={`../../assets/user.png`}
    //               style={{ cursor: "pointer", borderRadius: "50%" }}
    //             />
    //           </Box>
    //           <Box textAlign="center">
    //             <Typography
    //               variant="h2"
    //               color={colors.grey[100]}
    //               fontWeight="bold"
    //               sx={{ m: "10px 0 0 0" }}
    //             >
    //               Ed Roh
    //             </Typography>
    //             <Typography variant="h5" color={colors.greenAccent[500]}>
    //               VP Fancy Admin
    //             </Typography>
    //           </Box>
    //         </Box>
    //       )}

    //       <Box paddingLeft={isCollapsed ? undefined : "10%"}>
    //         <Item
    //           title="Dashboard"
    //           to="/"
    //           icon={<HomeOutlinedIcon />}
    //           selected={selected}
    //           setSelected={setSelected}
    //         />

    //         <Typography
    //           variant="h6"
    //           color={colors.grey[300]}
    //           sx={{ m: "15px 0 5px 20px" }}
    //         >
    //           Data
    //         </Typography>
    //         <Item
    //           title="Manage Team"
    //           to="/team"
    //           icon={<PeopleOutlinedIcon />}
    //           selected={selected}
    //           setSelected={setSelected}
    //         />
    //         <Item
    //           title="Contacts Information"
    //           to="/contacts"
    //           icon={<ContactsOutlinedIcon />}
    //           selected={selected}
    //           setSelected={setSelected}
    //         />
    //         <Item
    //           title="Invoices Balances"
    //           to="/invoices"
    //           icon={<ReceiptOutlinedIcon />}
    //           selected={selected}
    //           setSelected={setSelected}
    //         />

    //         <Typography
    //           variant="h6"
    //           color={colors.grey[300]}
    //           sx={{ m: "15px 0 5px 20px" }}
    //         >
    //           Pages
    //         </Typography>
    //         <Item
    //           title="Profile Form"
    //           to="/form"
    //           icon={<PersonOutlinedIcon />}
    //           selected={selected}
    //           setSelected={setSelected}
    //         />
    //         <Item
    //           title="Calendar"
    //           to="/calendar"
    //           icon={<CalendarTodayOutlinedIcon />}
    //           selected={selected}
    //           setSelected={setSelected}
    //         />
    //         <Item
    //           title="FAQ Page"
    //           to="/faq"
    //           icon={<HelpOutlineOutlinedIcon />}
    //           selected={selected}
    //           setSelected={setSelected}
    //         />

    //         <Typography
    //           variant="h6"
    //           color={colors.grey[300]}
    //           sx={{ m: "15px 0 5px 20px" }}
    //         >
    //           Charts
    //         </Typography>
    //         <Item
    //           title="Bar Chart"
    //           to="/bar"
    //           icon={<BarChartOutlinedIcon />}
    //           selected={selected}
    //           setSelected={setSelected}
    //         />
    //         <Item
    //           title="Pie Chart"
    //           to="/pie"
    //           icon={<PieChartOutlineOutlinedIcon />}
    //           selected={selected}
    //           setSelected={setSelected}
    //         />
    //         <Item
    //           title="Line Chart"
    //           to="/line"
    //           icon={<TimelineOutlinedIcon />}
    //           selected={selected}
    //           setSelected={setSelected}
    //         />
    //         <Item
    //           title="Geography Chart"
    //           to="/geography"
    //           icon={<MapOutlinedIcon />}
    //           selected={selected}
    //           setSelected={setSelected}
    //         />
    //       </Box>
    //     </Menu>
    //   </Side>
    // </Box>
  );
};

export default Sidebar;
