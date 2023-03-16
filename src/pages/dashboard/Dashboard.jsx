import { Box, IconButton, Tooltip, useMediaQuery } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import React from "react";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import { useDispatch } from "react-redux";
import { getAssignor } from "../../redux/dispatchers/assignor";
import { getAssignee } from "../../redux/dispatchers/assignee";
import { getTask } from "../../redux/dispatchers/tasks";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { logout } from "../../redux/dispatchers/login";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const Actions = () => {
  return (
    <Box>
      <Tooltip title="Edit this row">
        <IconButton onClick={() => {}}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete this row">
        <IconButton>
          <Delete />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAssignor());
    dispatch(getAssignee());
    dispatch(getTask());
  }, []);

  const { assignor } = useSelector((state) => state.assignor);
  const { assignee } = useSelector((state) => state.ass);
  const { taskData } = useSelector((state) => state.task);

  // useEffect(() => {
  //   if (error?.message === "Request failed with status code 500") {
  //     dispatch(dispatch(logout()));
  //     navigate("/login");
  //   }
  // }, [error]);

  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  return (
    <Box m="1.5rem 2.5rem">
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(8, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Total Assignors"
          value={assignor?.length}
          // increase="+14%"

          icon={<PersonIcon sx={{ color: "#ffe3a3", fontSize: "26px" }} />}
        />
        <StatBox
          title="Total Assignees"
          value={assignee?.length}
          // increase="+21%"
          icon={<PeopleIcon sx={{ color: "#ffe3a3", fontSize: "26px" }} />}
        />
        {/* <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewChart view="sales" isDashboard={true} />
        </Box> */}
        <StatBox
          title="Total Task"
          value={taskData?.length}
          // increase="+5%"
          icon={<TaskAltIcon sx={{ color: "#ffe3a3", fontSize: "26px" }} />}
        />

        {/* ROW 2 */}
        {/* <Box
            gridColumn="span 8"
            gridRow="span 3"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                borderRadius: "5rem",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#21295c",
                color: "#fff6e0",
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: "#21295c",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: "#21295c",
                color: "#fff6e0",
                borderTop: "none",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${"#ffedc2"} !important`,
              },
            }}
          >
            <DataGrid
              // loading={isLoading || !data}
              getRowId={(row) => row.id}
              rows={rows}
              columns={columns}
            />
          </Box> */}
        {/* <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Sales By Category
          </Typography>
          <BreakdownChart isDashboard={true} />
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Breakdown of real states and information via category for revenue
            made for this year and total sales.
          </Typography>
        </Box> */}
      </Box>
    </Box>
  );
};

export default Dashboard;
