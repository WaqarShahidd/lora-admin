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
  Backdrop,
  CircularProgress,
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
import { useNavigate, useParams } from "react-router-dom";
import { tokens } from "../../constants/theme";
import { themeP } from "../global/themeP";
import { securityQuestions } from "../../constants/data";
import axios from "axios";
import { BASE_URL } from "../../constants/config";
import DoneIcon from "@mui/icons-material/Done";

const checkoutSchema = yup.object().shape({
  password: yup.string().required("required"),
  confirmPassword: yup.string().required("required"),
});

const initialValues = {
  password: "",
  confirmPassword: "",
};

const ResetPassword = () => {
  const dispatch = useDispatch();

  const [loading, setloading] = useState(false);
  const [confirmation, setconfirmation] = useState(false);

  const [errorState, seterrorState] = useState(false);
  const { id, token } = useParams();

  const handleFormSubmit = (values) => {
    seterrorState(false);
    setloading(true);

    if (values.password !== values.confirmPassword) {
      seterrorState(true);
    } else {
      axios
        .post(`${BASE_URL}/reset-password/${id}/${token}`, {
          password: values.password,
          confirmPassword: values.confirmPassword,
        })
        .then((res) => {
          console.log(res.data);
          setconfirmation(true);
          setloading(false);
        })
        .catch((e) => {
          console.log(`reset error ${e}`);
          setloading(false);
        });
    }
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [value, setValue] = useState(false);

  return (
    <ThemeProvider theme={themeP}>
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
                      Reset Password
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
                          <FormControl
                            sx={{ width: "100%", marginBottom: "10px" }}
                            variant="filled"
                          >
                            {errorState && (
                              <p
                                style={{
                                  color: "red",
                                  fontSize: "10px",
                                  alignSelf: "flex-start",
                                  paddingBottom: 0,
                                }}
                              >
                                *Password does not match
                              </p>
                            )}
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

                          <FormControl
                            sx={{ width: "100%", marginBottom: "10px" }}
                            variant="filled"
                          >
                            <InputLabel htmlFor="filled-adornment-password">
                              Confirm Password
                            </InputLabel>
                            <FilledInput
                              fullWidth
                              id="filled-adornment-password"
                              type={showConfirmPassword ? "text" : "password"}
                              variant="filled"
                              label="Confirm Password"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.confirmPassword}
                              name="confirmPassword"
                              error={
                                !!touched.confirmPassword &&
                                !!errors.confirmPassword
                              }
                              helperText={
                                touched.confirmPassword &&
                                errors.confirmPassword
                              }
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
                                    onClick={handleClickShowConfirmPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                  >
                                    {showConfirmPassword ? (
                                      <VisibilityOff />
                                    ) : (
                                      <Visibility />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              }
                            />
                          </FormControl>
                        </Box>

                        <Button
                          type="submit"
                          variant="contained"
                          fullWidth
                          sx={{
                            mt: 4,
                            boxShadow: `0 0 20px #2dce65`,
                          }}
                        >
                          Reset
                        </Button>
                      </form>
                    )}
                  </Formik>
                </Box>
              </Box>
            </Grid>

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
                  Your password has been reset successfully.
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
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ResetPassword;
