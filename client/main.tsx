import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import "./global.css";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import BookAppointment from "./pages/BookAppointment";
import FindDoctors from "./pages/FindDoctors";
import NotFound from "./pages/NotFound";

// Placeholder pages
import About from "./pages/About";
import Contact from "./pages/Contact";
import Appointments from "./pages/Appointments";

// Mock user type
interface User {
  id: string;
  name: string;
  email: string;
  role: "patient" | "doctor" | "admin";
}

// Mock authentication
function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing auth session
    const savedUser = localStorage.getItem("docspot_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("docspot_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("docspot_user");
  };

  return { user, login, logout, loading };
}

// Protected route component
function ProtectedRoute({
  children,
  requiredRole,
}: {
  children: React.ReactNode;
  requiredRole?: "patient" | "doctor" | "admin";
}) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-medical-blue"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

// Layout component
function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const location = useLocation();

  // Hide navbar/footer on login/signup pages
  const hideLayout = ["/login", "/signup"].includes(location.pathname);

  if (hideLayout) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} onLogout={logout} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

// Main App component
function App() {
  const { login } = useAuth();

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/doctors" element={<FindDoctors />} />

          {/* Auth routes */}
          <Route path="/login" element={<Login onLogin={login} />} />
          <Route path="/signup" element={<Signup onSignup={login} />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredRole="patient">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor-dashboard"
            element={
              <ProtectedRoute requiredRole="doctor">
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/book"
            element={
              <ProtectedRoute>
                <BookAppointment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              <ProtectedRoute>
                <Appointments />
              </ProtectedRoute>
            }
          />

          {/* Placeholder routes */}
          <Route path="/team" element={<div>Team Page - Coming Soon</div>} />
          <Route
            path="/careers"
            element={<div>Careers Page - Coming Soon</div>}
          />
          <Route path="/help" element={<div>Help Center - Coming Soon</div>} />
          <Route
            path="/privacy"
            element={<div>Privacy Policy - Coming Soon</div>}
          />
          <Route
            path="/terms"
            element={<div>Terms of Service - Coming Soon</div>}
          />
          <Route
            path="/hipaa"
            element={<div>HIPAA Compliance - Coming Soon</div>}
          />
          <Route
            path="/records"
            element={<div>Health Records - Coming Soon</div>}
          />
          <Route
            path="/telemedicine"
            element={<div>Telemedicine - Coming Soon</div>}
          />
          <Route
            path="/emergency"
            element={<div>Emergency Care - Coming Soon</div>}
          />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

// Render the app
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
