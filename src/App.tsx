import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import { AdminProvider } from "./context/admin.context";
import PortfolioHome from "./components/PortfolioHome";
import AdminPanel from "./components/admin/AdminPanel";
import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute";
import { initGA, trackPageView } from "./lib/analytics";

// Analytics wrapper component
function AnalyticsWrapper() {
  const location = useLocation();

  useEffect(() => {
    // Initialize Google Analytics on first load
    initGA();
  }, []);

  useEffect(() => {
    // Track page views on route change
    trackPageView(location.pathname);
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<PortfolioHome />} />
      <Route
        path="/admin"
        element={
          <ProtectedAdminRoute>
            <AdminPanel />
          </ProtectedAdminRoute>
        }
      />
      <Route path="/admin/login" element={<AdminPanel />} />
    </Routes>
  );
}

function App() {
  return (
    <AdminProvider>
      <Router>
        <AnalyticsWrapper />
      </Router>
    </AdminProvider>
  );
}

export default App;
