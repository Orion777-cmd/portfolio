import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header.component";

import { useTheme } from "./context/theme.context";
import { AdminProvider } from "./context/admin.context";

import Profile from "./components/profile.component";
import About from "./components/about.component";
import Languages from "./components/languages.component";
import Projects from "./components/projects.component";
import ExperienceSection from "./components/experience/ExperienceSection";
import BlogSection from "./components/blog/BlogSection";
import PortfolioHome from "./components/PortfolioHome";
import AdminPanel from "./components/admin/AdminPanel";

function App() {
  return (
    <AdminProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PortfolioHome />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </Router>
    </AdminProvider>
  );
}

export default App;
