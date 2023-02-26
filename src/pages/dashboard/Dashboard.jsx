import {
  Box,
  Button,
  IconButton,
  Stack,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import {
  Delete,
  Edit,
  Preview,
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { customer } from "../../constants/data";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";

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
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 150,
      renderCell: (params) => <Actions {...{ params }} />,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  // const handleUpdateRow = () => {
  //   setRows((prevRows) => {
  //     const rowToUpdateIndex = randomInt(0, rows.length - 1);

  //     return prevRows.map((row, index) =>
  //       index === rowToUpdateIndex ? { ...row, username: randomUserName() } : row,
  //     );
  //   });
  // };

  // const handleUpdateAllRows = () => {
  //   setRows(rows.map((row) => ({ ...row, username: randomUserName() })));
  // };

  // const handleDeleteRow = () => {
  //   setRows((prevRows) => {
  //     const rowToDeleteIndex = randomInt(0, prevRows.length - 1);
  //     return [
  //       ...rows.slice(0, rowToDeleteIndex),
  //       ...rows.slice(rowToDeleteIndex + 1),
  //     ];
  //   });
  // };

  //   const handleAddRow = () => {
  //     setRows((prevRows) => [
  //       ...prevRows,
  //       { id: "", lastName: "", firstName: "", age: "" },
  //     ]);
  //   };

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
          value={8}
          increase="+14%"
          description="Since last month"
          icon={<Email sx={{ color: "#ffe3a3", fontSize: "26px" }} />}
        />
        <StatBox
          title="Total Assignees"
          value={10}
          increase="+21%"
          description="Since last month"
          icon={<PointOfSale sx={{ color: "#ffe3a3", fontSize: "26px" }} />}
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
          title="Monthly Sales"
          value={200}
          increase="+5%"
          description="Since last month"
          icon={<PersonAdd sx={{ color: "#ffe3a3", fontSize: "26px" }} />}
        />
        <StatBox
          title="Yearly Sales"
          value={800}
          increase="+43%"
          description="Since last month"
          icon={<Traffic sx={{ color: "#ffe3a3", fontSize: "26px" }} />}
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
