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
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/parent" element={<Parents />} />
              <Route path="/task" element={<Task />} />
              <Route path="/child" element={<Child />} />
              <Route path="/test" element={<Test />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
