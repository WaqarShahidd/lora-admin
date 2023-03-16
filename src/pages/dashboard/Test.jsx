import * as React from "react";
import Modal from "react-modal";
import DatePicker from "react-date-picker";
import {
  Box,
  Button,
  colors,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { themeP } from "../global/themeP";

export default function Test() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [value, onChange] = React.useState();
  const [valueOutside, onChangeOutsidde] = React.useState();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

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
                        width: "50px",
                        height: "50px",
                        bgcolor: "primary.main",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography variant="h6" fontWeight="bold" color="white">
                        AA
                      </Typography>
                    </Box>
                    {/* LOGO END */}

                    <Typography color="white" fontWeight="bold" mt={7} mb={3}>
                      Sign in to dashboard
                    </Typography>
                  </Box>

                  {/* INPUTS */}
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Email"
                    // onBlur={handleBlur}
                    // onChange={handleChange}
                    // value={values.email}
                    name="email"
                    // error={!!touched.email && !!errors.email}
                    // helperText={touched.email && errors.email}
                    sx={{
                      width: "100%",
                      marginBottom: "10px",
                      "& .MuiInputLabel-root": {
                        color: "black",
                      },
                      "& .MuiInput-underline": {
                        borderBottomColor: "black",
                      },
                      "& .MuiInput-label": {
                        color: "#f00",
                      },
                    }}
                  />
                  {/* INPUT END */}

                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 4, boxShadow: `0 0 20px ${colors.green[500]}` }}
                  >
                    Login
                  </Button>
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
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    color="whitesmoke"
                    mb={3}
                  >
                    Join Our <br /> Community
                  </Typography>
                  <Typography variant="body1" fontWeight="" color="whitesmoke">
                    Create Your High-Level Cloud Network Service!
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          {/* GRID SYSTEM END */}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
