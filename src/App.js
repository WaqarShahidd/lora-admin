import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Sidebar from "./pages/global/Sidebar";
import Layout from "./pages/Layout";
import Task from "./pages/dashboard/Task";
import Parents from "./pages/dashboard/Parents";
import Child from "./pages/dashboard/Child";
import Login from "./pages/dashboard/Login";
import { ColorModeContext, useMode } from "./constants/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Test from "./pages/dashboard/Test";
import AddForm from "./pages/dashboard/AddForm";
import Queries from "./pages/dashboard/Queries";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Router>
          {/* <Sidebar /> */}
          <Routes>
            <Route path="/login" element={<Login />} />
            {/* <Route path="/test" element={<Test />} /> */}
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/assignors" element={<Parents />} />
              <Route path="/task" element={<Task />} />
              <Route path="/assignees" element={<Child />} />
              <Route path="/form/:id" element={<AddForm />} />
              <Route path="/queries" element={<Queries />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
