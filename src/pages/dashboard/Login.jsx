import {
  Box,
  Button,
  FilledInput,
  FormControl,
  InputLabel,
  TextField,
  ThemeProvider,
  Typography,
  useMediaQuery,
  useTheme,
  Grid,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/dispatchers/login";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../constants/theme";
import { themeP } from "../global/themeP";
import { securityQuestions } from "../../constants/data";
import axios from "axios";
import { BASE_URL } from "../../constants/config";
import DoneIcon from "@mui/icons-material/Done";

const checkoutSchema = yup.object().shape({
  email: yup.string().required("required"),
  password: yup.string().required("required"),
});
const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const { loginData, isAuthenticated, loading } = useSelector(
    (state) => state.log
  );
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const handleFormSubmit = (values) => {
    dispatch(
      login(values.email, values.password, securityQuestion, values.answer)
    );
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, loading]);

  const [showPassword, setShowPassword] = React.useState(false);
  const [securityQuestion, setSecurityQuestion] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [value, setValue] = useState(false);
  const [confirmation, setconfirmation] = useState(false);

  const OnSubmit = () => {
    axios
      .post(`${BASE_URL}/ForgetPasswordEmail`, {})
      .then((res) => {
        console.log(res.data);
        setValue(false);
        setconfirmation(true);
      })
      .catch((e) => {
        console.log(`error ${e}`);
        setValue(false);
      });
  };

  return (
    <ThemeProvider theme={themeP}>
      <Box
        sx={{
          // backgroundImage: `url(${bgImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflow: "hidden",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: {
              sm: "90vw",
              xs: "90vw",
              md: "60vw",
              lg: "60vw",
              xl: "60vw",
            },
          }}
        >
          {/* GRID SYSTEM */}
          <Grid container height="90vh">
            <Grid
              xs={12}
              sm={12}
              md={6}
              lg={6}
              xl={6}
              minHeight={550}
              sx={{
                boxShadow: {
                  xs: "",
                  sm: "",
                  md: "15px 2px 5px -5px",
                  lg: "15px 2px 5px -5px",
                  xl: "15px 2px 5px -5px",
                },
              }}
            >
              <Box
                sx={{
                  backgroundColor: "rgba(0, 24, 57, 0.2)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  height: "100%",
                  borderRadius: {
                    xs: "30px",
                    sm: "30px",
                    md: "30px 0 0 30px",
                    lg: "30px 0 0 30px",
                    xl: "30px 0 0 30px",
                  },
                }}
              >
                <Box width="80%">
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    {/* LOGO */}
                    <Box
                      sx={{
                        mt: "60px",
                        width: "150px",
                        height: "50px",
                        bgcolor: "primary.main",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        color="#f3f3f3"
                      >
                        LORA Admin
                      </Typography>
                    </Box>
                    {/* LOGO END */}
                    {/* <Button
                      onClick={() => console.log(localStorage.getItem("token"))}
                    >
                      check
                    </Button> */}
                    <Typography color="white" fontWeight="bold" mt={7} mb={3}>
                      Sign in to dashboard
                    </Typography>
                  </Box>

                  {/* INPUTS */}
                  <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={checkoutSchema}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleBlur,
                      handleChange,
                      handleSubmit,
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <Box style={{ width: "100%" }}>
                          <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={!!touched.email && !!errors.email}
                            helperText={touched.email && errors.email}
                            sx={{
                              width: "100%",
                              marginBottom: "10px",
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
                          <FormControl
                            sx={{ width: "100%", marginBottom: "10px" }}
                            variant="filled"
                          >
                            <InputLabel htmlFor="filled-adornment-password">
                              Password
                            </InputLabel>
                            <FilledInput
                              fullWidth
                              id="filled-adornment-password"
                              type={showPassword ? "text" : "password"}
                              variant="filled"
                              label="Password"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.password}
                              name="password"
                              error={!!touched.password && !!errors.password}
                              helperText={touched.password && errors.password}
                              sx={{
                                width: "100%",
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
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                  >
                                    {showPassword ? (
                                      <VisibilityOff />
                                    ) : (
                                      <Visibility />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              }
                            />
                          </FormControl>

                          <Select
                            value={securityQuestion}
                            onChange={(e) =>
                              setSecurityQuestion(e.target.value)
                            }
                            label="Security Question"
                            sx={{
                              width: "100%",
                              padding: "0px",
                              marginBottom: "10px",
                              // backgroundColor: "#edf1f4",
                              // borderRadius: "6px",
                              // "& fieldset": { border: "none" },
                            }}
                            displayEmpty
                            inputProps={{ "aria-label": "Without label" }}
                          >
                            <MenuItem
                              value=""
                              disabled
                              style={{ color: "#757575" }}
                            >
                              <>Select security question</>
                            </MenuItem>
                            {securityQuestions.map((item) => (
                              <MenuItem value={item.question}>
                                {item.question}
                              </MenuItem>
                            ))}
                          </Select>

                          <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Answer"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.answer}
                            name="answer"
                            error={!!touched.answer && !!errors.answer}
                            helperText={touched.answer && errors.answer}
                            sx={{
                              width: "100%",
                              marginBottom: "10px",
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

                          <Typography
                            color="white"
                            fontWeight="bold"
                            mt={1}
                            mb={1}
                            sx={{
                              textAlign: "left",
                              textDecoration: "underline", // Add underline
                              cursor: "pointer", // Add pointer cursor
                            }}
                            onClick={() => setValue(true)}
                          >
                            Forgot password?
                          </Typography>
                        </Box>

                        <Dialog
                          open={value}
                          onClose={() => setValue(false)}
                          PaperProps={{
                            sx: {
                              width: "22.5%",
                              height: "30%",
                            },
                          }}
                        >
                          <DialogTitle
                            sx={{
                              textAlign: "center",
                              fontWeight: "bold",
                              paddingBottom: "5px",
                            }}
                          >
                            Forgot password
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText sx={{ textAlign: "center" }}>
                              Send a link to reset password on our email
                            </DialogContentText>
                          </DialogContent>

                          <DialogActions
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Button
                              sx={{
                                backgroundColor: "green",
                                color: "white",
                                "&:hover": {
                                  backgroundColor: "#329932",
                                },
                                width: "40%",
                                borderRadius: "18px",
                                marginBottom: "15px",
                              }}
                              onClick={OnSubmit}
                            >
                              Yes
                            </Button>
                            <Button
                              sx={{
                                backgroundColor: "red",
                                color: "white",
                                "&:hover": {
                                  backgroundColor: "#329932",
                                },
                                width: "40%",
                                borderRadius: "18px",
                                marginBottom: "15px",
                              }}
                              onClick={() => setValue(false)}
                            >
                              No
                            </Button>
                          </DialogActions>
                        </Dialog>
                        <Dialog
                          open={confirmation}
                          onClose={() => setconfirmation(false)}
                          PaperProps={{
                            sx: {
                              width: "22.5%",
                              height: "30%",
                            },
                          }}
                        >
                          <DialogTitle
                            sx={{
                              textAlign: "center",
                              fontWeight: "bold",
                              paddingBottom: "5px",
                              flexDirection: "row",
                            }}
                          >
                            {/* <DoneIcon
                sx={{ color: "green", height: "25px", width: "25px" }}
              /> */}
                            Confirmation
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText sx={{ textAlign: "center" }}>
                              An email has been sent to your email address.
                              Please check your email
                            </DialogContentText>
                          </DialogContent>

                          <DialogActions
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Button
                              sx={{
                                backgroundColor: "green",
                                color: "white",
                                "&:hover": {
                                  backgroundColor: "#329932",
                                },
                                width: "60%",
                                borderRadius: "18px",
                                marginBottom: "15px",
                              }}
                              onClick={() => {
                                setconfirmation(false);
                                navigate("/login");
                              }}
                            >
                              Okay
                            </Button>
                          </DialogActions>
                        </Dialog>

                        <Button
                          type="submit"
                          variant="contained"
                          fullWidth
                          sx={{
                            mt: 4,
                            boxShadow: `0 0 20px #2dce65`,
                          }}
                        >
                          Login
                        </Button>
                      </form>
                    )}
                  </Formik>
                  {/* INPUT END */}

                  {/* <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 4, boxShadow: `0 0 20px ${colors.green[500]}` }}
                  >
                    Login
                  </Button> */}
                </Box>
              </Box>
            </Grid>

            <Grid xs={0} sm={0} md={6} lg={6} xl={6} minHeight={550}>
              <Box
                sx={{
                  backgroundImage: `linear-gradient(135deg, rgba(0, 255, 60, 0.3) , rgba(0, 157, 255, 0.3))`,
                  padding: "20px",
                  display: {
                    xs: "none",
                    sm: "none",
                    md: "flex",
                    lg: "flex",
                    xl: "flex",
                  },
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  borderRadius: "0px 30px 30px 0",
                }}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="flex-start"
                >
                  <img
                    src={require("../../assets/logo.png")}
                    style={{ height: "100%", width: "100%" }}
                  />
                  {/* <Typography
                    variant="h4"
                    fontWeight="bold"
                    color="whitesmoke"
                    mb={3}
                  >
                    Join Our <br /> Community
                  </Typography> */}
                  {/* <Typography variant="body1" fontWeight="" color="whitesmoke">
                    Create Your High-Level Cloud Network Service!
                  </Typography> */}
                </Box>
              </Box>
            </Grid>
          </Grid>
          {/* GRID SYSTEM END */}
        </Box>
      </Box>
    </ThemeProvider>
    // <Box
    //   p="20px"
    //   style={{
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     flexDirection: "column",
    //   }}
    // >
    //   {/* <button onClick={() => console.log(token)}>c</button> */}
    //   <Box mb="30px">
    //     <Typography
    //       variant="h2"
    //       color={"#000"}
    //       fontWeight="bold"
    //       sx={{ m: "0 0 5px 0" }}
    //     >
    //       LORA
    //     </Typography>
    //     <Typography
    //       variant="h5"
    //       color={"#70d8bd"}
    //       style={{ textAlign: "center" }}
    //     >
    //       Sign In
    //     </Typography>
    //   </Box>

    //   <Formik
    //     onSubmit={handleFormSubmit}
    //     initialValues={initialValues}
    //     validationSchema={checkoutSchema}
    //   >
    //     {({
    //       values,
    //       errors,
    //       touched,
    //       handleBlur,
    //       handleChange,
    //       handleSubmit,
    //     }) => (
    //       <form onSubmit={handleSubmit}>
    //         <Box style={{ width: "100%" }}>
    //           <TextField
    //             fullWidth
    //             variant="filled"
    //             type="text"
    //             label="Email"
    //             onBlur={handleBlur}
    //             onChange={handleChange}
    //             value={values.email}
    //             name="email"
    //             error={!!touched.email && !!errors.email}
    //             helperText={touched.email && errors.email}
    //             sx={{
    //               width: "100%",
    //               marginBottom: "10px",
    //               "& .MuiInputLabel-root": {
    //                 color: colors.primary[100],
    //               },
    //               "& .MuiInput-underline": {
    //                 borderBottomColor: colors.primary[100],
    //               },
    //               "& .MuiInput-label": {
    //                 color: "#f00",
    //               },
    //             }}
    //           />
    //           <FormControl sx={{ width: "100%" }} variant="filled">
    //             <InputLabel htmlFor="filled-adornment-password">
    //               Password
    //             </InputLabel>
    //             <FilledInput
    //               fullWidth
    //               id="filled-adornment-password"
    //               type={showPassword ? "text" : "password"}
    //               variant="filled"
    //               label="Password"
    //               onBlur={handleBlur}
    //               onChange={handleChange}
    //               value={values.password}
    //               name="password"
    //               error={!!touched.password && !!errors.password}
    //               helperText={touched.password && errors.password}
    //               sx={{
    //                 width: "100%",
    //                 "& .MuiInputLabel-root": {
    //                   color: colors.primary[100],
    //                 },
    //                 "& .MuiInput-underline": {
    //                   borderBottomColor: colors.primary[100],
    //                 },
    //                 "& .MuiInput-label": {
    //                   color: "#f00",
    //                 },
    //               }}
    //               endAdornment={
    //                 <InputAdornment position="end">
    //                   <IconButton
    //                     aria-label="toggle password visibility"
    //                     onClick={handleClickShowPassword}
    //                     onMouseDown={handleMouseDownPassword}
    //                     edge="end"
    //                   >
    //                     {showPassword ? <VisibilityOff /> : <Visibility />}
    //                   </IconButton>
    //                 </InputAdornment>
    //               }
    //             />
    //           </FormControl>
    //         </Box>
    //         <Box
    //           display="flex"
    //           justifyContent="center"
    //           mt="20px"
    //           style={{ width: "100%" }}
    //         >
    //           <Button type="submit" color="secondary" variant="contained">
    //             Login
    //           </Button>
    //         </Box>
    //       </form>
    //     )}
    //   </Formik>
    // </Box>
  );
};

export default Login;
