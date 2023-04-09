import React, { useContext, useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
  VisibilityOff,
  Visibility,
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
  Drawer,
  Backdrop,
  fabClasses,
  CircularProgress,
  useMediaQuery,
  TextField,
  InputAdornment,
  Select,
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
import { useNavigate } from "react-router-dom";
import { securityQuestions } from "../constants/data";
import axios from "axios";
import { BASE_URL } from "../constants/config";
import { useForm } from "react-hook-form";

const NavBar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { loginData } = useSelector((state) => state.log);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [editProfile, seteditProfile] = useState(false);

  const [fullName, setFullName] = useState("");
  const [password, setpassword] = useState("");
  const [question, setquestion] = useState("");
  const [answer, setanswer] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [loading, setloading] = useState(false);

  const updateAdmin = () => {
    setloading(true);
    let token = localStorage.getItem("token");
    axios
      .post(
        `${BASE_URL}/updateAdmin`,
        {
          name: fullName,
          password: password,
          question: question,
          answer: answer,
        },
        {
          headers: {
            Authorization: `token ${JSON.parse(token)}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setloading(true);
        seteditProfile(false);
      })
      .catch((e) => {
        console.log(`delete error ${e}`);
        setloading(false);
      });
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  return (
    <Box display="flex" justifyContent="space-between" p={2} mr={2.5}>
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

      {/* Edit Profile */}

      <Drawer
        anchor={"right"}
        open={editProfile}
        onClose={() => seteditProfile(false)}
      >
        <Box
          width="700px"
          style={{
            padding: 0,
            height: "100%",
            overflow: "hidden",
          }}
        >
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>

          <Box
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              margin: "40px",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Typography style={{ fontSize: "28px", fontWeight: "700" }}>
                Edit Profile
              </Typography>
            </Box>
            <hr style={{ marginBottom: "50px", marginTop: "10px" }} />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Full Name"
              value={fullName}
              name="FullName"
              {...register("FullName", {
                required: true,
              })}
              onChange={(e) => setFullName(e.target.value)}
              style={{ marginBottom: "20px" }}
              sx={{
                "& .MuiInputLabel-root": {
                  color: colors.primary[100],
                },
                "& .MuiInput-underline": {
                  borderBottomColor: colors.primary[100],
                },

                "& .MuiInput-label": {
                  color: "#f00",
                },
              }}
            />
            <TextField
              fullWidth
              variant="filled"
              type={showPassword ? "text" : "password"}
              label="Password"
              value={password}
              name="Password"
              {...register("Password", {
                required: true,
              })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setpassword(e.target.value)}
              style={{ marginBottom: "20px" }}
              sx={{
                "& .MuiInputLabel-root": {
                  color: colors.primary[100],
                },
                "& .MuiInput-underline": {
                  borderBottomColor: colors.primary[100],
                },
                "& .MuiInput-label": {
                  color: "#f00",
                },
              }}
            />

            <Select
              value={question}
              onChange={(e) => setquestion(e.target.value)}
              label="Security Question"
              sx={{
                width: "100%",
                padding: "0px",
                marginBottom: "10px",
              }}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="" disabled style={{ color: "#757575" }}>
                <>Select security question</>
              </MenuItem>
              {securityQuestions.map((item) => (
                <MenuItem value={item.question}>{item.question}</MenuItem>
              ))}
            </Select>

            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Answer"
              value={answer}
              name="answer"
              {...register("answer", {
                required: true,
              })}
              onChange={(e) => setanswer(e.target.value)}
              style={{ marginBottom: "20px" }}
              sx={{
                "& .MuiInputLabel-root": {
                  color: colors.primary[100],
                },
                "& .MuiInput-underline": {
                  borderBottomColor: colors.primary[100],
                },
                "& .MuiInput-label": {
                  color: "#f00",
                },
              }}
            />
          </Box>
          <Box m="40px" w="100%" display="flex" justifyContent="end" mt="20px">
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              style={{ marginRight: "20px" }}
              onClick={handleSubmit(updateAdmin)}
            >
              Update
            </Button>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              onClick={() => seteditProfile(false)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton onClick={handleClick}>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>

      {/* Menu */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            seteditProfile(true);
            setAnchorEl(null);
          }}
        >
          Edit Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(logout());
            navigate("/login");
            setAnchorEl(null);
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default NavBar;
