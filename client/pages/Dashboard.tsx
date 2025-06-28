import { useState, useContext, createContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Calendar,
  Clock,
  User,
  FileText,
  Search,
  Plus,
  MapPin,
  Star,
  Phone,
  Bell,
  Activity,
  Heart,
  Thermometer,
  Weight,
} from "lucide-react";

// Import the auth context type (we need to create a shared hook)
interface User {
  id: string;
  name: string;
  email: string;
  role: "patient" | "doctor" | "admin";
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  loading: boolean;
}

// Create a local context reference (this should match the one in main.tsx)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // If context is not available, return a fallback user
    return {
      user: {
        id: "1",
        name: "User",
        email: "user@example.com",
        role: "patient" as const,
      },
      login: () => {},
      logout: () => {},
      loading: false,
    };
  }
  return context;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { user } = useAuth();

  // Extract first name from user's full name
  const firstName = user?.name?.split(" ")[0] || "User";

  const upcomingAppointments = [
    {
      id: "1",
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      date: "2024-01-15",
      time: "10:00 AM",
      location: "Medical Center Downtown",
      status: "confirmed",
      avatar: "SJ",
    },
    {
      id: "2",
      doctor: "Dr. Michael Chen",
      specialty: "Dermatology",
      date: "2024-01-20",
      time: "2:30 PM",
      location: "Skin Health Clinic",
      status: "pending",
      avatar: "MC",
    },
  ];

  const recentAppointments = [
    {
      id: "3",
      doctor: "Dr. Emily Rodriguez",
      specialty: "General Practice",
      date: "2024-01-05",
      time: "9:00 AM",
      status: "completed",
      notes: "Annual check-up completed. All vitals normal.",
      avatar: "ER",
    },
    {
      id: "4",
      doctor: "Dr. James Wilson",
      specialty: "Orthopedics",
      date: "2023-12-28",
      time: "11:30 AM",
      status: "completed",
      notes: "Knee examination. Recommended physical therapy.",
      avatar: "JW",
    },
  ];

  const healthMetrics = [
    {
      icon: Heart,
      label: "Heart Rate",
      value: "72 bpm",
      status: "normal",
      color: "text-green-600",
    },
    {
      icon: Thermometer,
      label: "Temperature",
      value: "98.6°F",
      status: "normal",
      color: "text-green-600",
    },
    {
      icon: Weight,
      label: "Weight",
      value: "165 lbs",
      status: "stable",
      color: "text-blue-600",
    },
    {
      icon: Activity,
      label: "Blood Pressure",
      value: "120/80",
      status: "normal",
      color: "text-green-600",
    },
  ];

  const quickActions = [
    {
      icon: Search,
      label: "Find Doctor",
      description: "Search for specialists",
      href: "/doctors",
      color: "bg-blue-500",
    },
    {
      icon: Plus,
      label: "Book Appointment",
      description: "Schedule new visit",
      href: "/book",
      color: "bg-green-500",
    },
    {
      icon: FileText,
      label: "Medical Records",
      description: "View health history",
      href: "/records",
      color: "bg-purple-500",
    },
    {
      icon: Bell,
      label: "Notifications",
      description: "Check updates",
      href: "/notifications",
      color: "bg-orange-500",
    },
  ];

  const StatusBadge = ({ status }: { status: string }) => {
    const statusConfig = {
      confirmed: {
        bg: "bg-green-100",
        text: "text-green-800",
        label: "Confirmed",
      },
      pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        label: "Pending",
      },
      completed: {
        bg: "bg-blue-100",
        text: "text-blue-800",
        label: "Completed",
      },
      cancelled: { bg: "bg-red-100", text: "text-red-800", label: "Cancelled" },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
      >
        {config.label}
      </span>
    );
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: Activity },
    { id: "appointments", label: "Appointments", icon: Calendar },
    { id: "health", label: "Health Metrics", icon: Heart },
    { id: "records", label: "Records", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-medical-dark-blue">
            Welcome back, {firstName}!
          </h1>
          <p className="text-gray-600 mt-2">
            Here's an overview of your health journey
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.href}
                to={action.href}
                className="medical-card p-6 hover:shadow-medical-lg transition-all duration-300 group"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-medical-dark-blue">
                      {action.label}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {action.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? "border-medical-blue text-medical-blue"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Upcoming Appointments */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-medical-dark-blue">
                      Upcoming Appointments
                    </h2>
                    <Link to="/book">
                      <Button className="medical-button-primary">
                        <Plus className="w-4 h-4 mr-2" />
                        Book New
                      </Button>
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-medical-blue rounded-full flex items-center justify-center">
                              <span className="text-white font-medium">
                                {appointment.avatar}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-semibold text-medical-dark-blue">
                                {appointment.doctor}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {appointment.specialty}
                              </p>
                              <div className="flex items-center space-x-4 mt-1">
                                <div className="flex items-center space-x-1 text-sm text-gray-500">
                                  <Calendar className="w-4 h-4" />
                                  <span>{appointment.date}</span>
                                </div>
                                <div className="flex items-center space-x-1 text-sm text-gray-500">
                                  <Clock className="w-4 h-4" />
                                  <span>{appointment.time}</span>
                                </div>
                                <div className="flex items-center space-x-1 text-sm text-gray-500">
                                  <MapPin className="w-4 h-4" />
                                  <span>{appointment.location}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <StatusBadge status={appointment.status} />
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Health Metrics Overview */}
                <div>
                  <h2 className="text-xl font-semibold text-medical-dark-blue mb-4">
                    Health Metrics
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {healthMetrics.map((metric) => {
                      const Icon = metric.icon;
                      return (
                        <div
                          key={metric.label}
                          className="border border-gray-200 rounded-lg p-4"
                        >
                          <div className="flex items-center space-x-3">
                            <Icon className={`w-6 h-6 ${metric.color}`} />
                            <div>
                              <p className="text-sm text-gray-600">
                                {metric.label}
                              </p>
                              <p className="text-lg font-semibold text-medical-dark-blue">
                                {metric.value}
                              </p>
                              <p className="text-xs text-gray-500 capitalize">
                                {metric.status}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "appointments" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-medical-dark-blue">
                    All Appointments
                  </h2>
                  <Link to="/book">
                    <Button className="medical-button-primary">
                      <Plus className="w-4 h-4 mr-2" />
                      Book New Appointment
                    </Button>
                  </Link>
                </div>

                {/* Upcoming */}
                <div>
                  <h3 className="text-lg font-medium text-medical-dark-blue mb-3">
                    Upcoming
                  </h3>
                  <div className="space-y-3">
                    {upcomingAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-medical-blue rounded-full flex items-center justify-center">
                              <span className="text-white text-sm font-medium">
                                {appointment.avatar}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-medium text-medical-dark-blue">
                                {appointment.doctor}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {appointment.specialty} • {appointment.date} at{" "}
                                {appointment.time}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <StatusBadge status={appointment.status} />
                            <Button variant="outline" size="sm">
                              Reschedule
                            </Button>
                            <Button variant="outline" size="sm">
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent */}
                <div>
                  <h3 className="text-lg font-medium text-medical-dark-blue mb-3">
                    Recent
                  </h3>
                  <div className="space-y-3">
                    {recentAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center">
                              <span className="text-white text-sm font-medium">
                                {appointment.avatar}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-medium text-medical-dark-blue">
                                {appointment.doctor}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {appointment.specialty} • {appointment.date} at{" "}
                                {appointment.time}
                              </p>
                              {appointment.notes && (
                                <p className="text-sm text-gray-500 mt-1">
                                  {appointment.notes}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <StatusBadge status={appointment.status} />
                            <Button variant="outline" size="sm">
                              View Summary
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "health" && (
              <div className="text-center py-12">
                <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Health Metrics
                </h3>
                <p className="text-gray-600 mb-6">
                  Track your health data and vital signs over time.
                </p>
                <Button className="medical-button-primary">
                  Add Health Data
                </Button>
              </div>
            )}

            {activeTab === "records" && (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Medical Records
                </h3>
                <p className="text-gray-600 mb-6">
                  Access your complete medical history and documents.
                </p>
                <Button className="medical-button-primary">View Records</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
