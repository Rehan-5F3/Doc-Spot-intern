import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useAuth } from "../hooks/useAuth";
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
  CheckCircle,
  AlertCircle,
  XCircle,
  Edit3,
  MoreHorizontal,
  Download,
  Upload,
} from "lucide-react";

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
      reason: "Regular check-up",
      fee: "$150",
      canReschedule: true,
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
      reason: "Skin consultation",
      fee: "$120",
      canReschedule: true,
    },
    {
      id: "3",
      doctor: "Dr. Emily Rodriguez",
      specialty: "Pediatrics",
      date: "2024-01-25",
      time: "9:00 AM",
      location: "Children's Medical Center",
      status: "scheduled",
      avatar: "ER",
      reason: "Vaccination",
      fee: "$100",
      canReschedule: false,
    },
  ];

  const recentAppointments = [
    {
      id: "4",
      doctor: "Dr. James Wilson",
      specialty: "Orthopedics",
      date: "2024-01-05",
      time: "9:00 AM",
      status: "completed",
      notes: "Knee examination completed. Physical therapy recommended.",
      avatar: "JW",
      summary: "Mild knee strain. Prescribed rest and PT exercises.",
      followUp: "Follow-up in 2 weeks",
      medications: ["Ibuprofen 400mg", "Physical therapy exercises"],
    },
    {
      id: "5",
      doctor: "Dr. Lisa Park",
      specialty: "General Practice",
      date: "2023-12-28",
      time: "11:30 AM",
      status: "completed",
      notes: "Annual check-up completed. All vitals normal.",
      avatar: "LP",
      summary: "Overall health excellent. Continue current lifestyle.",
      followUp: "Annual check-up next year",
      medications: ["Daily multivitamin"],
    },
  ];

  const notifications = [
    {
      id: "1",
      type: "appointment_confirmed",
      title: "Appointment Confirmed",
      message:
        "Dr. Sarah Johnson confirmed your appointment for Jan 15, 10:00 AM",
      time: "2 hours ago",
      read: false,
    },
    {
      id: "2",
      type: "reminder",
      title: "Appointment Reminder",
      message:
        "You have an appointment with Dr. Michael Chen tomorrow at 2:30 PM",
      time: "1 day ago",
      read: false,
    },
    {
      id: "3",
      type: "follow_up",
      title: "Follow-up Instructions",
      message:
        "Dr. Wilson has added follow-up instructions to your recent visit",
      time: "3 days ago",
      read: true,
    },
  ];

  const healthMetrics = [
    {
      icon: Heart,
      label: "Heart Rate",
      value: "72 bpm",
      status: "normal",
      color: "text-green-600",
      trend: "stable",
    },
    {
      icon: Thermometer,
      label: "Temperature",
      value: "98.6°F",
      status: "normal",
      color: "text-green-600",
      trend: "normal",
    },
    {
      icon: Weight,
      label: "Weight",
      value: "165 lbs",
      status: "stable",
      color: "text-blue-600",
      trend: "+2 lbs",
    },
    {
      icon: Activity,
      label: "Blood Pressure",
      value: "120/80",
      status: "normal",
      color: "text-green-600",
      trend: "optimal",
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
      badge: notifications.filter((n) => !n.read).length,
    },
  ];

  const StatusBadge = ({ status }: { status: string }) => {
    const statusConfig = {
      confirmed: {
        bg: "bg-green-100",
        text: "text-green-800",
        label: "Confirmed",
        icon: CheckCircle,
      },
      pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        label: "Pending Approval",
        icon: AlertCircle,
      },
      scheduled: {
        bg: "bg-blue-100",
        text: "text-blue-800",
        label: "Scheduled",
        icon: Calendar,
      },
      completed: {
        bg: "bg-gray-100",
        text: "text-gray-800",
        label: "Completed",
        icon: CheckCircle,
      },
      cancelled: {
        bg: "bg-red-100",
        text: "text-red-800",
        label: "Cancelled",
        icon: XCircle,
      },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
      >
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </span>
    );
  };

  const handleAppointmentAction = (appointmentId: string, action: string) => {
    // Handle appointment actions (reschedule, cancel, etc.)
    console.log(`${action} appointment ${appointmentId}`);
    // In a real app, this would make API calls
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: Activity },
    { id: "appointments", label: "Appointments", icon: Calendar },
    { id: "health", label: "Health Metrics", icon: Heart },
    { id: "records", label: "Medical Records", icon: FileText },
    { id: "notifications", label: "Notifications", icon: Bell },
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
                className="medical-card p-6 hover:shadow-medical-lg transition-all duration-300 group relative"
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
                {action.badge && action.badge > 0 && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {action.badge}
                  </div>
                )}
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
                const unreadCount =
                  tab.id === "notifications"
                    ? notifications.filter((n) => !n.read).length
                    : 0;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors relative ${
                      activeTab === tab.id
                        ? "border-medical-blue text-medical-blue"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                    {unreadCount > 0 && (
                      <span className="ml-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
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
                    {upcomingAppointments.slice(0, 2).map((appointment) => (
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
                                {appointment.specialty} • {appointment.reason}
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
                            <span className="text-sm font-medium text-medical-blue">
                              {appointment.fee}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Notifications */}
                <div>
                  <h2 className="text-xl font-semibold text-medical-dark-blue mb-4">
                    Recent Notifications
                  </h2>
                  <div className="space-y-3">
                    {notifications.slice(0, 3).map((notification) => (
                      <div
                        key={notification.id}
                        className={`border border-gray-200 rounded-lg p-4 ${!notification.read ? "bg-blue-50 border-blue-200" : ""}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <div
                              className={`w-2 h-2 rounded-full mt-2 ${!notification.read ? "bg-blue-500" : "bg-gray-300"}`}
                            />
                            <div>
                              <h4 className="font-medium text-medical-dark-blue">
                                {notification.title}
                              </h4>
                              <p className="text-sm text-gray-600 mt-1">
                                {notification.message}
                              </p>
                            </div>
                          </div>
                          <span className="text-xs text-gray-500">
                            {notification.time}
                          </span>
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
                              <p className="text-xs text-gray-500">
                                {metric.trend}
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
                    Appointment Management
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
                    Upcoming Appointments
                  </h3>
                  <div className="space-y-3">
                    {upcomingAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-medical-blue rounded-full flex items-center justify-center">
                              <span className="text-white font-medium">
                                {appointment.avatar}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-medium text-medical-dark-blue">
                                {appointment.doctor}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {appointment.specialty} • {appointment.reason}
                              </p>
                              <p className="text-sm text-gray-500">
                                {appointment.date} at {appointment.time} •{" "}
                                {appointment.location}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <StatusBadge status={appointment.status} />
                            <span className="text-sm font-medium text-medical-blue">
                              {appointment.fee}
                            </span>
                            <div className="flex space-x-1">
                              {appointment.canReschedule && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handleAppointmentAction(
                                      appointment.id,
                                      "reschedule",
                                    )
                                  }
                                >
                                  <Edit3 className="w-4 h-4 mr-1" />
                                  Reschedule
                                </Button>
                              )}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleAppointmentAction(
                                    appointment.id,
                                    "cancel",
                                  )
                                }
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent */}
                <div>
                  <h3 className="text-lg font-medium text-medical-dark-blue mb-3">
                    Recent Appointments
                  </h3>
                  <div className="space-y-3">
                    {recentAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center">
                              <span className="text-white font-medium">
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
                              <div className="mt-2 bg-gray-50 p-3 rounded">
                                <p className="text-sm text-gray-700 mb-2">
                                  <strong>Visit Summary:</strong>{" "}
                                  {appointment.summary}
                                </p>
                                <p className="text-sm text-gray-700 mb-2">
                                  <strong>Follow-up:</strong>{" "}
                                  {appointment.followUp}
                                </p>
                                <p className="text-sm text-gray-700">
                                  <strong>Medications:</strong>{" "}
                                  {appointment.medications?.join(", ")}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <StatusBadge status={appointment.status} />
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-1" />
                              Download Summary
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-medical-dark-blue">
                  Notifications
                </h2>
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`border border-gray-200 rounded-lg p-4 ${!notification.read ? "bg-blue-50 border-blue-200" : ""}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div
                            className={`w-2 h-2 rounded-full mt-2 ${!notification.read ? "bg-blue-500" : "bg-gray-300"}`}
                          />
                          <div>
                            <h4 className="font-medium text-medical-dark-blue">
                              {notification.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">
                          {notification.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "health" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-medical-dark-blue">
                    Health Metrics & Records
                  </h2>
                  <Button className="medical-button-primary">
                    <Upload className="w-4 h-4 mr-2" />
                    Add Health Data
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {healthMetrics.map((metric) => {
                    const Icon = metric.icon;
                    return (
                      <div
                        key={metric.label}
                        className="border border-gray-200 rounded-lg p-6 text-center"
                      >
                        <Icon
                          className={`w-8 h-8 ${metric.color} mx-auto mb-3`}
                        />
                        <h3 className="font-semibold text-medical-dark-blue mb-2">
                          {metric.label}
                        </h3>
                        <p className="text-2xl font-bold text-medical-dark-blue mb-1">
                          {metric.value}
                        </p>
                        <p className="text-sm text-gray-600">{metric.trend}</p>
                        <p className="text-xs text-green-600 mt-1 capitalize">
                          {metric.status}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === "records" && (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Medical Records
                </h3>
                <p className="text-gray-600 mb-6">
                  Access your complete medical history, visit summaries, and
                  health documents. Hi {firstName}, your records are securely
                  stored and always accessible.
                </p>
                <div className="flex justify-center space-x-4">
                  <Button className="medical-button-primary">
                    <Download className="w-4 h-4 mr-2" />
                    Download Records
                  </Button>
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Document
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
