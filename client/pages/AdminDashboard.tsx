import { useState } from "react";
import { Button } from "../components/ui/button";
import { useAuth } from "../hooks/useAuth";
import {
  Shield,
  Users,
  Activity,
  Settings,
  BarChart3,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  Clock,
  TrendingUp,
  UserCheck,
  UserX,
  Bell,
  Globe,
  Lock,
  Database,
  Stethoscope,
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { user } = useAuth();

  const firstName = user?.name?.split(" ")[0] || "Admin";

  const pendingDoctors = [
    {
      id: "1",
      name: "Dr. Michael Thompson",
      specialty: "Neurology",
      experience: "8 years",
      licenseNumber: "MD789456",
      medicalSchool: "Harvard Medical School",
      residency: "Johns Hopkins Hospital",
      submittedAt: "2 days ago",
      documents: [
        "medical_license.pdf",
        "board_certification.pdf",
        "cv.pdf",
        "references.pdf",
      ],
      verificationStatus: "pending",
      backgroundCheck: "completed",
    },
    {
      id: "2",
      name: "Dr. Jennifer Liu",
      specialty: "Pediatrics",
      experience: "12 years",
      licenseNumber: "MD123789",
      medicalSchool: "Stanford University",
      residency: "Children's Hospital of Philadelphia",
      submittedAt: "1 day ago",
      documents: [
        "medical_license.pdf",
        "board_certification.pdf",
        "cv.pdf",
        "malpractice_insurance.pdf",
      ],
      verificationStatus: "pending",
      backgroundCheck: "completed",
    },
    {
      id: "3",
      name: "Dr. Robert Garcia",
      specialty: "Emergency Medicine",
      experience: "15 years",
      licenseNumber: "MD456123",
      medicalSchool: "UCLA Medical School",
      residency: "Massachusetts General Hospital",
      submittedAt: "3 hours ago",
      documents: ["medical_license.pdf", "board_certification.pdf", "cv.pdf"],
      verificationStatus: "in_review",
      backgroundCheck: "pending",
    },
  ];

  const platformStats = [
    {
      icon: Users,
      label: "Total Users",
      value: "12,567",
      change: "+245 this month",
      color: "text-blue-600",
      category: "users",
    },
    {
      icon: UserCheck,
      label: "Active Doctors",
      value: "487",
      change: "+12 approved",
      color: "text-green-600",
      category: "doctors",
    },
    {
      icon: Activity,
      label: "Appointments",
      value: "8,943",
      change: "+156 today",
      color: "text-purple-600",
      category: "appointments",
    },
    {
      icon: TrendingUp,
      label: "Platform Revenue",
      value: "$89,240",
      change: "+12% this month",
      color: "text-green-600",
      category: "revenue",
    },
  ];

  const systemAlerts = [
    {
      id: "1",
      type: "security",
      severity: "high",
      title: "Multiple Failed Login Attempts",
      description: "Detected unusual login activity from IP 192.168.1.100",
      timestamp: "15 minutes ago",
      status: "active",
    },
    {
      id: "2",
      type: "compliance",
      severity: "medium",
      title: "HIPAA Audit Required",
      description: "Quarterly compliance audit due in 7 days",
      timestamp: "2 hours ago",
      status: "pending",
    },
    {
      id: "3",
      type: "performance",
      severity: "low",
      title: "Server Response Time",
      description: "Average response time increased by 15%",
      timestamp: "1 day ago",
      status: "monitoring",
    },
  ];

  const recentActivities = [
    {
      id: "1",
      type: "doctor_approved",
      message: "Dr. Sarah Johnson approved and activated",
      user: "Admin",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      type: "user_suspended",
      message: "Patient account suspended for policy violation",
      user: "Admin",
      timestamp: "4 hours ago",
    },
    {
      id: "3",
      type: "system_update",
      message: "Platform updated to version 2.1.3",
      user: "System",
      timestamp: "1 day ago",
    },
    {
      id: "4",
      type: "policy_updated",
      message: "Privacy policy updated",
      user: "Admin",
      timestamp: "2 days ago",
    },
  ];

  const complianceMetrics = [
    {
      category: "HIPAA Compliance",
      status: "compliant",
      lastAudit: "2024-01-01",
      nextAudit: "2024-04-01",
      score: "98%",
    },
    {
      category: "Data Security",
      status: "compliant",
      lastAudit: "2024-01-15",
      nextAudit: "2024-03-15",
      score: "96%",
    },
    {
      category: "Medical Licensing",
      status: "compliant",
      lastAudit: "2024-01-10",
      nextAudit: "2024-03-10",
      score: "100%",
    },
    {
      category: "Platform Policies",
      status: "review_needed",
      lastAudit: "2023-12-01",
      nextAudit: "2024-02-01",
      score: "94%",
    },
  ];

  const StatusBadge = ({
    status,
    type = "default",
  }: {
    status: string;
    type?: string;
  }) => {
    const statusConfig = {
      pending: { bg: "bg-yellow-100", text: "text-yellow-800" },
      approved: { bg: "bg-green-100", text: "text-green-800" },
      rejected: { bg: "bg-red-100", text: "text-red-800" },
      in_review: { bg: "bg-blue-100", text: "text-blue-800" },
      compliant: { bg: "bg-green-100", text: "text-green-800" },
      review_needed: { bg: "bg-yellow-100", text: "text-yellow-800" },
      active: { bg: "bg-red-100", text: "text-red-800" },
      completed: { bg: "bg-gray-100", text: "text-gray-800" },
      monitoring: { bg: "bg-blue-100", text: "text-blue-800" },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
      >
        {status.replace("_", " ").toUpperCase()}
      </span>
    );
  };

  const SeverityIcon = ({ severity }: { severity: string }) => {
    const severityConfig = {
      high: { icon: AlertTriangle, color: "text-red-500" },
      medium: { icon: Clock, color: "text-yellow-500" },
      low: { icon: Activity, color: "text-blue-500" },
    };

    const config =
      severityConfig[severity as keyof typeof severityConfig] ||
      severityConfig.low;
    const Icon = config.icon;

    return <Icon className={`w-4 h-4 ${config.color}`} />;
  };

  const handleDoctorAction = (
    doctorId: string,
    action: "approve" | "reject",
  ) => {
    console.log(`${action} doctor ${doctorId}`);
    // In a real app, this would make API calls to update doctor status
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    {
      id: "doctors",
      label: "Doctor Approvals",
      icon: UserCheck,
      badge: pendingDoctors.length,
    },
    { id: "users", label: "User Management", icon: Users },
    { id: "compliance", label: "Compliance", icon: Shield },
    { id: "system", label: "System Health", icon: Activity },
    { id: "settings", label: "Platform Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-medical-dark-blue">
            Platform Administration
          </h1>
          <p className="text-gray-600 mt-2">
            Welcome {firstName}, manage your DocSpot healthcare platform
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {platformStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="medical-card p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-medical-gradient rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-medical-dark-blue">
                      {stat.value}
                    </p>
                    <p className={`text-xs ${stat.color}`}>{stat.change}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* System Alerts */}
        {systemAlerts.some((alert) => alert.severity === "high") && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <div>
                <h3 className="font-semibold text-red-800">
                  Critical System Alerts
                </h3>
                <p className="text-red-700 text-sm">
                  {
                    systemAlerts.filter((alert) => alert.severity === "high")
                      .length
                  }{" "}
                  high-priority alerts require immediate attention
                </p>
              </div>
            </div>
          </div>
        )}

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
                    className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors relative ${
                      activeTab === tab.id
                        ? "border-medical-blue text-medical-blue"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                    {tab.badge && tab.badge > 0 && (
                      <span className="ml-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {tab.badge}
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
                {/* System Alerts */}
                <div>
                  <h2 className="text-xl font-semibold text-medical-dark-blue mb-4">
                    System Alerts
                  </h2>
                  <div className="space-y-3">
                    {systemAlerts.map((alert) => (
                      <div
                        key={alert.id}
                        className={`border rounded-lg p-4 ${
                          alert.severity === "high"
                            ? "border-red-200 bg-red-50"
                            : alert.severity === "medium"
                              ? "border-yellow-200 bg-yellow-50"
                              : "border-gray-200"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <SeverityIcon severity={alert.severity} />
                            <div>
                              <h3 className="font-medium text-gray-900">
                                {alert.title}
                              </h3>
                              <p className="text-sm text-gray-600 mt-1">
                                {alert.description}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {alert.timestamp}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <StatusBadge status={alert.status} />
                            <Button variant="outline" size="sm">
                              Investigate
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activities */}
                <div>
                  <h2 className="text-xl font-semibold text-medical-dark-blue mb-4">
                    Recent Platform Activities
                  </h2>
                  <div className="space-y-3">
                    {recentActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-900">
                              {activity.message}
                            </p>
                            <p className="text-xs text-gray-500">
                              By {activity.user} • {activity.timestamp}
                            </p>
                          </div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Compliance Overview */}
                <div>
                  <h2 className="text-xl font-semibold text-medical-dark-blue mb-4">
                    Compliance Status
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {complianceMetrics.map((metric) => (
                      <div
                        key={metric.category}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <h3 className="font-medium text-gray-900 mb-2">
                          {metric.category}
                        </h3>
                        <div className="flex items-center justify-between mb-2">
                          <StatusBadge status={metric.status} />
                          <span className="text-lg font-bold text-medical-blue">
                            {metric.score}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          Next audit: {metric.nextAudit}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "doctors" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-medical-dark-blue">
                    Doctor Registration Approvals
                  </h2>
                  <div className="text-sm text-gray-600">
                    {pendingDoctors.length} pending approvals
                  </div>
                </div>

                <div className="space-y-6">
                  {pendingDoctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      className="border border-gray-200 rounded-lg p-6"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-medical-dark-blue">
                            {doctor.name}
                          </h3>
                          <p className="text-gray-600">{doctor.specialty}</p>
                          <p className="text-sm text-gray-500">
                            {doctor.experience} experience • License:{" "}
                            {doctor.licenseNumber}
                          </p>
                          <p className="text-xs text-gray-500">
                            Submitted {doctor.submittedAt}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <StatusBadge status={doctor.verificationStatus} />
                          <StatusBadge status={doctor.backgroundCheck} />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">
                            Education
                          </h4>
                          <p className="text-sm text-gray-600">
                            Medical School: {doctor.medicalSchool}
                          </p>
                          <p className="text-sm text-gray-600">
                            Residency: {doctor.residency}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">
                            Submitted Documents
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {doctor.documents.map((doc, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                              >
                                <FileText className="w-3 h-3 mr-1" />
                                {doc}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                        <Button
                          variant="outline"
                          onClick={() =>
                            handleDoctorAction(doctor.id, "reject")
                          }
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject Application
                        </Button>
                        <Button
                          onClick={() =>
                            handleDoctorAction(doctor.id, "approve")
                          }
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve & Activate
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "compliance" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-medical-dark-blue">
                  Platform Compliance Management
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {complianceMetrics.map((metric) => (
                    <div
                      key={metric.category}
                      className="border border-gray-200 rounded-lg p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {metric.category}
                        </h3>
                        <StatusBadge status={metric.status} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">
                            Compliance Score:
                          </span>
                          <span className="font-medium text-medical-blue">
                            {metric.score}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">
                            Last Audit:
                          </span>
                          <span className="text-sm">{metric.lastAudit}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">
                            Next Audit:
                          </span>
                          <span className="text-sm">{metric.nextAudit}</span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full mt-4"
                        size="sm"
                      >
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "users" && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  User Management
                </h3>
                <p className="text-gray-600 mb-6">
                  Manage patient and doctor accounts, view user analytics, and
                  handle account-related issues.
                </p>
                <Button className="medical-button-primary">
                  Access User Management
                </Button>
              </div>
            )}

            {activeTab === "system" && (
              <div className="text-center py-12">
                <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  System Health Monitoring
                </h3>
                <p className="text-gray-600 mb-6">
                  Monitor platform performance, server health, database status,
                  and system analytics.
                </p>
                <Button className="medical-button-primary">
                  View System Dashboard
                </Button>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="text-center py-12">
                <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Platform Configuration
                </h3>
                <p className="text-gray-600 mb-6">
                  Configure platform settings, manage policies, update terms of
                  service, and control platform features.
                </p>
                <Button className="medical-button-primary">
                  Access Settings
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
