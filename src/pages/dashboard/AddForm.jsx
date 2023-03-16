import {
  Box,
  TextField,
  useMediaQuery,
  Button,
  FilledInput,
  IconButton,
  InputAdornment,
  InputLabel,
  Input,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  useTheme,
  Typography,
  Modal,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addAssignor, getAssignor } from "../../redux/dispatchers/assignor";
import axios from "axios";
import { BASE_URL } from "../../constants/config";
import DialogModal from "../../components/DialogModal";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { tasks, taskTypeDropDown } from "../../constants/data";
import { tokens } from "../../constants/theme";
import Header from "../../components/Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";
import { getAssignee } from "../../redux/dispatchers/assignee";
import moment from "moment";

const AddForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { id } = useParams();
  const current = new Date();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();
  const { loginData } = useSelector((state) => state.log);

  useEffect(() => {
    dispatch(getAssignor());
    dispatch(getAssignee());
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  //   Add Avatar
  const [dataUri, setDataUri] = useState(null);
  const [URL, setURL] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const onImageChange = (file) => {
    if (!file) {
      setDataUri("");
      return;
    }
    if (file.type === "image/png" || file.type === "image/jpeg") {
      fileToDataUri(file).then((dataUri) => {
        setDataUri(dataUri);
        dataURItoBlob(file);
        setPreviewImage(dataUri);
      });
    } else {
      console.log("Please select only png/jpeg format of image.");
    }
  };
  const fileToDataUri = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    });
  function dataURItoBlob(dataURI) {
    let formData = new FormData();
    formData.append("file", dataURI);
    axios
      .post(
        `http://18.222.69.245:3001/api/aws/file?email=admin@gmail.com`,
        formData
      )
      .then((res) => {
        setURL(res.data.url);
        console.log(res.data);
      })
      .catch((err) => {
        console.log("image", err);
      });
  }

  // Assignor
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [assignorState, setAssignorState] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = () => {
    setAssignorState(false);
    let token = localStorage.getItem("token");
    axios
      .post(
        `${BASE_URL}/addParent`,
        {
          name: name,
          email: email,
          password: password,
        },
        {
          headers: {
            Authorization: `token ${JSON.parse(token)}`,
          },
        }
      )
      .then((res) => {
        setAssignorState(true);
      })
      .catch((e) => {
        setAssignorState(false);
      });
  };

  //   Assignee
  const [assigneeName, setassigneeName] = useState("");
  const [assigneeUserName, setassigneeUserName] = useState("");
  const [assigneePassword, setassigneePassword] = useState("");
  const [age, setage] = useState("");
  const [gender, setgender] = useState("");
  const [color, setcolor] = useState("");
  const [desc, setdesc] = useState("");
  const [parent, setparent] = useState("");
  const [assignorChild, setassignorChild] = useState("");

  const [showPasswordAss, setShowPasswordAss] = React.useState(false);

  const handleAssPass = () => setShowPasswordAss((show) => !show);

  const onSubmitAss = () => {
    let token = localStorage.getItem("token");
    axios
      .post(
        `${BASE_URL}/addChild`,
        {
          name: assigneeName,
          age: age,
          parentId: parent,
          gender: gender,
          color: color,
          description: desc,
          image: URL,
          userName: assigneeUserName.toLowerCase(),
          password: assigneePassword,
        },
        {
          headers: {
            Authorization: `token ${JSON.parse(token)}`,
          },
        }
      )
      .then((res) => {})
      .catch((e) => {});
  };

  //   Tasks
  const [taskName, setTaskName] = useState("");
  const [taskType, setTaskType] = useState("");
  const [task, setTask] = useState([]);
  const [timerState, setTimerState] = useState(false);
  const [time, setTime] = useState("");
  const [taskDesc, settaskDesc] = useState("");
  const [descSwitch, setDescSwitch] = useState(false);
  const [assignedToID, setassignedToID] = useState("");
  const [t, sett] = useState([]);
  const [startDate, setStartDate] = useState(current);
  const [taskState, settaskState] = useState(false);

  const [assignorDropdown, setassignorDropdown] = useState("");
  const [assigneeDropdown, setassigneeDropdown] = useState([]);
  const { assignee } = useSelector((state) => state.ass);
  const handleAssignor = (id) => {
    const newAssignee = assignor?.filter((x) => x.id === id);
    setassignorDropdown(id);
    setassigneeDropdown(newAssignee[0]?.children);
  };

  const handleTask = (id) => {
    const dt = tasks.filter((x) => x.type === id);
    sett(dt);
    setTaskType(id);
  };

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setTask((prevSelectedValues) =>
      event.target.checked
        ? [...prevSelectedValues, value]
        : prevSelectedValues.filter((val) => val !== value)
    );
  };

  const onSubmitTask = () => {
    settaskState(false);
    let token = localStorage.getItem("token");
    axios
      .post(
        `${BASE_URL}/createTask`,
        {
          name: taskName,
          type: taskType,
          task: task,
          time: timerState,
          timeAllowed: time,
          assignedToId: assignedToID,
          description: taskDesc,
          date: moment(startDate).format("MM-DD-YYYY"),
          month: moment(startDate).format("MMM"),
        },
        {
          headers: {
            Authorization: `token ${JSON.parse(token)}`,
          },
        }
      )
      .then((res) => {
        settaskState(true);
      })
      .catch((e) => {
        settaskState(false);
      });
  };

  const [show, setshow] = useState(false);

  const { assignor, getLoading } = useSelector((state) => state.assignor);
  return (
    <Box m="40px">
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Header
          title={
            id === "parent"
              ? "Add Assignor"
              : id === "child"
              ? "Add Assginee"
              : "Add Task"
          }
          subtitle=""
        />
      </Box>
      <DialogModal
        value={assignorState}
        setValue={setAssignorState}
        title="Confirmation"
        subtitle="Assignor created successfully"
        onClick={() => {
          setAssignorState(false);
          setName("");
          setEmail("");
          setPassword("");
        }}
      />
      <DialogModal
        value={taskState}
        setValue={settaskState}
        title="Confirmation"
        subtitle="Task created successfully"
        onClick={() => {
          settaskState(false);
          setTaskName("");
          setTaskType("");
          setTask([]);
          sett([]);
          setTime("");
          settaskDesc("");
          setassigneeDropdown([]);
        }}
      />

      {id === "parent" ? (
        <>
          <Box
            // display="grid"
            // gap="30px"
            // gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="First Name"
              value={name}
              name="firstName"
              {...register("firstName", { required: true })}
              onChange={(e) => setName(e.target.value)}
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
              type="text"
              label="Email"
              value={email}
              name="Email"
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
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
          <Box display="flex" justifyContent="end" mt="20px">
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              onClick={handleSubmit(onSubmit)}
            >
              Create New Assignor
            </Button>
          </Box>
        </>
      ) : id === "child" ? (
        <>
          <Box
            // display="grid"
            // gap="30px"
            // gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {dataUri ? (
                <img
                  src={dataUri}
                  style={{
                    borderRadius: "75px",
                    height: "150px",
                    width: "150px",
                  }}
                />
              ) : (
                <img
                  src={require("../../assets/user.png")}
                  style={{
                    borderRadius: "75px",
                    height: "150px",
                    width: "150px",
                  }}
                />
              )}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 10,
                marginBottom: 20,
              }}
            >
              <input
                accept="image/*"
                type="file"
                id="select-image"
                style={{ display: "none" }}
                onChange={(event) =>
                  onImageChange(event.target.files[0] || null)
                }
              />
              <label htmlFor="select-image">
                <Button variant="contained" color="primary" component="span">
                  Add Avatar
                </Button>
              </label>
            </div>

            <Select
              value={parent}
              onChange={(e) => setparent(e.target.value)}
              label="Assignors"
              fullWidth
              variant="filled"
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              style={{ marginBottom: "20px" }}
            >
              <MenuItem value="" disabled>
                <>Choose Assignor</>
              </MenuItem>
              {assignor?.map((as, index) => {
                return (
                  <MenuItem value={as.id} key={index}>
                    {as.name}
                  </MenuItem>
                );
              })}
            </Select>

            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Full Name"
              value={assigneeName}
              name="fullName"
              {...register("fullName", { required: true })}
              onChange={(e) => setassigneeName(e.target.value)}
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
              type="text"
              label="Username"
              value={assigneeUserName}
              name="userName"
              onChange={(e) => setassigneeUserName(e.target.value)}
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
              type={showPasswordAss ? "text" : "password"}
              label="Password"
              value={assigneePassword}
              name="assigneePass"
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleAssPass}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPasswordAss ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setassigneePassword(e.target.value)}
              style={{ marginBottom: "20px" }}
            />
            <Select
              value={age}
              onChange={(e) => setage(e.target.value)}
              label="Age"
              fullWidth
              variant="filled"
              displayEmpty
              sx={{}}
              style={{ marginBottom: "20px" }}
            >
              <MenuItem value="" disabled>
                <>Select gender</>
              </MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={13}>13</MenuItem>
              <MenuItem value={14}>14</MenuItem>
              <MenuItem value={15}>15</MenuItem>
            </Select>
            <Select
              value={gender}
              defaultValue="none"
              onChange={(e) => setgender(e.target.value)}
              label="Gender"
              fullWidth
              variant="filled"
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              style={{ marginBottom: "20px" }}
            >
              <MenuItem value="" disabled>
                <>Select gender</>
              </MenuItem>
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
              <MenuItem value={"Others"}>Others</MenuItem>
            </Select>
            <Select
              value={color}
              onChange={(e) => setcolor(e.target.value)}
              label="Color"
              fullWidth
              variant="filled"
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              style={{ marginBottom: "20px" }}
            >
              <MenuItem value="" disabled style={{ color: "#757575" }}>
                <>Choose assignee color</>
              </MenuItem>
              <MenuItem value={"Red"}>Red</MenuItem>
              <MenuItem value={"Yellow"}>Yellow</MenuItem>
              <MenuItem value={"Brown"}>Brown</MenuItem>
              <MenuItem value={"Black"}>Black</MenuItem>
              <MenuItem value={"White"}>White</MenuItem>
            </Select>
            <TextField
              fullWidth
              variant="filled"
              type={"text"}
              label="Description"
              value={desc}
              name="desc"
              onChange={(e) => setdesc(e.target.value)}
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
          <Box display="flex" justifyContent="end" mt="20px">
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              onClick={handleSubmit(onSubmitAss)}
            >
              Create New Assignee
            </Button>
          </Box>
        </>
      ) : (
        id === "task" && (
          <>
            <Box
              // display="grid"
              // gap="30px"
              // gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <Typography
                variant="h5"
                color={colors.greenAccent[400]}
                style={{ marginBottom: "5px" }}
              >
                Assignor
              </Typography>
              <Select
                value={assignorDropdown}
                onChange={(e) => handleAssignor(e.target.value)}
                label="Assignors"
                fullWidth
                variant="filled"
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                style={{ marginBottom: "20px" }}
              >
                <MenuItem value="" disabled>
                  <>Choose assignors</>
                </MenuItem>
                {assignor?.map((as, index) => {
                  return (
                    <MenuItem value={as.id} key={index}>
                      {as.name}
                    </MenuItem>
                  );
                })}
              </Select>
              <Typography
                variant="h5"
                color={colors.greenAccent[400]}
                style={{ marginBottom: "5px" }}
              >
                Assignee
              </Typography>
              <Select
                // value={assigneeDropdown}
                defaultValue="none"
                onChange={(e) => setassignedToID(e.target.value)}
                label="Assignees"
                fullWidth
                variant="filled"
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                style={{ marginBottom: "20px" }}
              >
                <MenuItem value="" disabled style={{ color: "#757575" }}>
                  <>Choose assignee</>
                </MenuItem>
                {assigneeDropdown?.map((as, index) => {
                  return (
                    <MenuItem value={as.id} key={index}>
                      {as.name}
                    </MenuItem>
                  );
                })}
              </Select>

              <Typography
                variant="h5"
                color={colors.greenAccent[400]}
                style={{ marginBottom: "5px" }}
              >
                Task type
              </Typography>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={(e) => handleTask(e.target.value)}
                style={{ marginBottom: "20px" }}
              >
                {taskTypeDropDown.map((c, index) => {
                  return (
                    <FormControlLabel
                      key={index}
                      value={c.type}
                      control={<Radio style={{ color: colors.primary[100] }} />}
                      label={c.type}
                    />
                  );
                })}
              </RadioGroup>
              {t.length !== 0 && (
                <>
                  <Typography
                    variant="h5"
                    color={colors.greenAccent[400]}
                    style={{ marginBottom: "5px" }}
                  >
                    Task
                  </Typography>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    onChange={(e) => setTask(e.target.value)}
                    style={{ marginBottom: "20px" }}
                  >
                    {t.map((c, index) => {
                      return (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <FormControlLabel
                            key={index}
                            value={c.task}
                            label={c.task}
                            control={
                              <Checkbox
                                value={c.task}
                                label={c.task}
                                onChange={handleCheckboxChange}
                                style={{ color: colors.primary[100] }}
                              />
                            }
                          />
                        </div>
                      );
                    })}
                  </RadioGroup>
                </>
              )}
              {task?.includes("Other") && (
                <TextField
                  variant="filled"
                  type={"text"}
                  label="Task name"
                  value={taskName}
                  name="task"
                  sx={{
                    "& .MuiInputLabel-root": {
                      color: colors.primary[100],
                    },
                    "& .MuiInput-underline": {
                      borderBottomColor: colors.primary[100],
                    },
                    width: "100%",
                  }}
                  onChange={(e) => setTaskName(e.target.value)}
                  style={{ marginBottom: "20px", color: colors.primary[100] }}
                />
              )}

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  variant="filled"
                  type={"numeric"}
                  label="Time"
                  value={time}
                  name="time"
                  sx={{
                    "& .MuiInputLabel-root": {
                      color: colors.primary[100],
                    },
                    "& .MuiInput-underline": {
                      borderBottomColor: colors.primary[100],
                    },
                    width: "90%",
                  }}
                  onChange={(e) => setTime(e.target.value)}
                  style={{
                    marginBottom: "20px",
                    color: colors.primary[100],
                    marginRight: "5%",
                  }}
                  InputProps={{
                    endAdornment: <p>mins</p>,
                  }}
                />

                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  customInput={
                    <TextField
                      variant="filled"
                      sx={{
                        "& .MuiInputLabel-root": {
                          color: colors.primary[100],
                        },
                        "& .MuiInput-underline": {
                          borderBottomColor: colors.primary[100],
                        },
                        width: "90%",
                        marginLeft: "5%",
                      }}
                    />
                  }
                />
              </div>

              <TextField
                fullWidth
                variant="filled"
                type={"text"}
                label="Description"
                value={taskDesc}
                name="desc"
                onChange={(e) => settaskDesc(e.target.value)}
                style={{ marginBottom: "20px" }}
              />
            </Box>
            <Typography
              variant="h5"
              color={colors.greenAccent[400]}
              style={{ marginBottom: "5px" }}
            >
              Attachment
            </Typography>
            <div
              style={{
                display: "flex",
                marginTop: 10,
                marginBottom: 0,
                width: isNonMobile ? "60%" : "100%",
              }}
            >
              <input
                accept="image/*"
                type="file"
                id="select-image"
                style={{ display: "none" }}
                onChange={(event) =>
                  onImageChange(event.target.files[0] || null)
                }
              />
              <label htmlFor="select-image">
                <div
                  style={{
                    width: "500px",
                    height: "500px",
                    borderRadius: "12px",
                    borderStyle: "dashed",
                    borderWidth: "1px",
                    borderColor: "grey",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  {URL === "" ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <p>Add attachments</p>

                      <span id="mins">e.g. jpg, png</span>
                    </div>
                  ) : (
                    <>
                      <img
                        src={URL}
                        height="400px"
                        width="400px"
                        style={{ borderRadius: "8px" }}
                        alt=""
                      />
                      {/* <button
                        className="bttn"
                        id="close-modal"
                        onClick={() => {
                          setPreviewImage("");
                        }}
                        style={{ position: "absolute", top: "5%", right: "5%" }}
                      >
                        X
                      </button> */}
                    </>
                  )}
                </div>
              </label>
            </div>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                onClick={handleSubmit(onSubmitTask)}
              >
                Create New Task
              </Button>
            </Box>
          </>
        )
      )}
    </Box>
  );
};

export default AddForm;
