import {
  StrictMode,
  useState,
  useEffect,
  createContext,
  useContext,
} from "react";
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

// Auth context
interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

// Auth provider component
function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing auth session
    const savedUser = localStorage.getItem("docspot_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error parsing saved user:", error);
        localStorage.removeItem("docspot_user");
      }
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

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth context
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
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
function AppContent() {
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
          <Route
            path="/team"
            element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-medical-dark-blue mb-2">
                    Team Page
                  </h1>
                  <p className="text-gray-600">Coming Soon</p>
                </div>
              </div>
            }
          />
          <Route
            path="/careers"
            element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-medical-dark-blue mb-2">
                    Careers Page
                  </h1>
                  <p className="text-gray-600">Coming Soon</p>
                </div>
              </div>
            }
          />
          <Route
            path="/help"
            element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-medical-dark-blue mb-2">
                    Help Center
                  </h1>
                  <p className="text-gray-600">Coming Soon</p>
                </div>
              </div>
            }
          />
          <Route
            path="/privacy"
            element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-medical-dark-blue mb-2">
                    Privacy Policy
                  </h1>
                  <p className="text-gray-600">Coming Soon</p>
                </div>
              </div>
            }
          />
          <Route
            path="/terms"
            element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-medical-dark-blue mb-2">
                    Terms of Service
                  </h1>
                  <p className="text-gray-600">Coming Soon</p>
                </div>
              </div>
            }
          />
          <Route
            path="/hipaa"
            element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-medical-dark-blue mb-2">
                    HIPAA Compliance
                  </h1>
                  <p className="text-gray-600">Coming Soon</p>
                </div>
              </div>
            }
          />
          <Route
            path="/records"
            element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-medical-dark-blue mb-2">
                    Health Records
                  </h1>
                  <p className="text-gray-600">Coming Soon</p>
                </div>
              </div>
            }
          />
          <Route
            path="/telemedicine"
            element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-medical-dark-blue mb-2">
                    Telemedicine
                  </h1>
                  <p className="text-gray-600">Coming Soon</p>
                </div>
              </div>
            }
          />
          <Route
            path="/emergency"
            element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-medical-dark-blue mb-2">
                    Emergency Care
                  </h1>
                  <p className="text-gray-600">Coming Soon</p>
                </div>
              </div>
            }
          />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

// Main App with provider
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

// Render the app
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
