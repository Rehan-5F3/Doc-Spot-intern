import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Stethoscope,
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowLeft,
  Shield,
  Users,
  Calendar,
} from "lucide-react";

interface LoginProps {
  onLogin: (user: {
    id: string;
    name: string;
    email: string;
    role: "patient" | "doctor" | "admin";
  }) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<"patient" | "doctor" | "admin">(
    "patient",
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      if (email && password) {
        // Mock user data based on selected type
        const mockUser = {
          id: "1",
          name:
            userType === "doctor"
              ? "Dr. John Smith"
              : userType === "admin"
                ? "Admin User"
                : "John Doe",
          email,
          role: userType,
        };

        onLogin(mockUser);

        // Navigate to appropriate dashboard
        const redirectPath =
          userType === "doctor"
            ? "/doctor-dashboard"
            : userType === "admin"
              ? "/admin-dashboard"
              : "/dashboard";

        navigate(redirectPath);
      } else {
        setError("Please fill in all fields");
      }
      setLoading(false);
    }, 1000);
  };

  const demoAccounts = [
    {
      type: "patient" as const,
      email: "patient@demo.com",
      password: "demo123",
      name: "John Doe",
    },
    {
      type: "doctor" as const,
      email: "doctor@demo.com",
      password: "demo123",
      name: "Dr. Smith",
    },
    {
      type: "admin" as const,
      email: "admin@demo.com",
      password: "demo123",
      name: "Admin User",
    },
  ];

  const fillDemoAccount = (demo: (typeof demoAccounts)[0]) => {
    setEmail(demo.email);
    setPassword(demo.password);
    setUserType(demo.type);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light-blue via-white to-medical-light-gray flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-medical-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-medical-green/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center space-x-2">
            <div className="w-12 h-12 medical-gradient rounded-lg flex items-center justify-center">
              <Stethoscope className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold text-medical-dark-blue">
              DocSpot
            </span>
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-medical-dark-blue">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account to continue
          </p>
        </div>

        {/* Login Form */}
        <div className="medical-card p-8">
          {/* User Type Selection */}
          <div className="mb-6">
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              Login as
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { type: "patient" as const, icon: Users, label: "Patient" },
                { type: "doctor" as const, icon: Stethoscope, label: "Doctor" },
                { type: "admin" as const, icon: Shield, label: "Admin" },
              ].map(({ type, icon: Icon, label }) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setUserType(type)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    userType === type
                      ? "border-medical-blue bg-medical-light-blue text-medical-blue"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Icon className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-sm font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email Address
              </Label>
              <div className="mt-1 relative">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  placeholder="Enter your email"
                  required
                />
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>

            <div>
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </Label>
              <div className="mt-1 relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  placeholder="Enter your password"
                  required
                />
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-medical-blue focus:ring-medical-blue"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-medical-blue hover:text-medical-blue/80"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full medical-button-primary"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-3 text-center">
              Demo Accounts (for testing):
            </p>
            <div className="space-y-2">
              {demoAccounts.map((demo) => (
                <button
                  key={demo.type}
                  onClick={() => fillDemoAccount(demo)}
                  className="w-full text-left text-sm bg-gray-50 hover:bg-gray-100 p-2 rounded border"
                >
                  <span className="font-medium capitalize">{demo.type}:</span>{" "}
                  {demo.email}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-medical-blue hover:text-medical-blue/80 font-medium"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-gray-600 hover:text-medical-blue"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
