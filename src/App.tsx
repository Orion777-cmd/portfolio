import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AdminProvider } from "./context/admin.context";
import PortfolioHome from "./components/PortfolioHome";
import AdminPanel from "./components/admin/AdminPanel";
import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute";

function App() {
  return (
    <AdminProvider>
      <Router>
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
      </Router>
    </AdminProvider>
  );
}

export default App;
