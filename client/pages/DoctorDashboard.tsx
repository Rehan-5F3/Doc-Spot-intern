import { useState } from "react";
import { Button } from "../components/ui/button";
import { useAuth } from "../hooks/useAuth";
import {
  Stethoscope,
  Calendar,
  Users,
  Clock,
  Activity,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  Phone,
  Mail,
  MapPin,
  Edit3,
  Plus,
  Settings,
  Star,
  TrendingUp,
  Bell,
} from "lucide-react";

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { user } = useAuth();

  const firstName = user?.name?.split(" ")[0] || "Doctor";

  const appointmentRequests = [
    {
      id: "1",
      patient: "John Doe",
      reason: "Regular check-up",
      requestedDate: "2024-01-15",
      requestedTime: "10:00 AM",
      status: "pending",
      symptoms: "Annual physical examination",
      medicalHistory: "No significant medical history",
      insurance: "Blue Cross Blue Shield",
      documents: ["insurance_card.jpg", "previous_lab_results.pdf"],
      submittedAt: "2 hours ago",
    },
    {
      id: "2",
      patient: "Sarah Wilson",
      reason: "Follow-up consultation",
      requestedDate: "2024-01-16",
      requestedTime: "2:30 PM",
      status: "pending",
      symptoms: "Post-surgery follow-up, mild pain",
      medicalHistory: "Recent cardiac surgery",
      insurance: "Aetna",
      documents: ["post_surgery_notes.pdf"],
      submittedAt: "4 hours ago",
    },
    {
      id: "3",
      patient: "Mike Johnson",
      reason: "Urgent consultation",
      requestedDate: "2024-01-14",
      requestedTime: "3:00 PM",
      status: "pending",
      symptoms: "Chest pain, shortness of breath",
      medicalHistory: "Hypertension, diabetes",
      insurance: "Medicare",
      documents: ["ecg_report.pdf", "blood_test.pdf"],
      submittedAt: "30 minutes ago",
      priority: "high",
    },
  ];

  const confirmedAppointments = [
    {
      id: "4",
      patient: "Emma Davis",
      date: "2024-01-15",
      time: "9:00 AM",
      reason: "Routine cardiology check",
      status: "confirmed",
      patientPhone: "+1 (555) 123-4567",
      patientEmail: "emma.davis@email.com",
      notes: "Regular patient, stable condition",
    },
    {
      id: "5",
      patient: "Robert Brown",
      date: "2024-01-15",
      time: "11:30 AM",
      reason: "Hypertension management",
      status: "confirmed",
      patientPhone: "+1 (555) 987-6543",
      patientEmail: "robert.brown@email.com",
      notes: "Medication adjustment needed",
    },
  ];

  const completedAppointments = [
    {
      id: "6",
      patient: "Lisa Anderson",
      date: "2024-01-10",
      time: "2:00 PM",
      reason: "Annual physical",
      status: "completed",
      diagnosis: "Overall health excellent",
      treatment: "Continue current lifestyle",
      followUp: "Annual check-up next year",
      medications: ["Daily multivitamin"],
      notes: "Patient in excellent health, no concerns",
    },
    {
      id: "7",
      patient: "David Wilson",
      date: "2024-01-08",
      time: "10:30 AM",
      reason: "Chest pain evaluation",
      status: "completed",
      diagnosis: "Mild anxiety-related chest tightness",
      treatment: "Stress management, exercise",
      followUp: "Follow-up in 2 weeks",
      medications: ["Relaxation techniques", "Regular exercise"],
      notes: "Recommended stress reduction techniques",
    },
  ];

  const practiceStats = [
    {
      icon: Users,
      label: "Patients Treated",
      value: "245",
      change: "+12 this month",
      color: "text-blue-600",
    },
    {
      icon: Calendar,
      label: "Appointments",
      value: "18",
      change: "this week",
      color: "text-green-600",
    },
    {
      icon: Star,
      label: "Patient Rating",
      value: "4.9",
      change: "+0.1 this month",
      color: "text-yellow-600",
    },
    {
      icon: TrendingUp,
      label: "Revenue",
      value: "$15,240",
      change: "+8% this month",
      color: "text-purple-600",
    },
  ];

  const StatusBadge = ({
    status,
    priority,
  }: {
    status: string;
    priority?: string;
  }) => {
    const statusConfig = {
      pending: {
        bg: priority === "high" ? "bg-red-100" : "bg-yellow-100",
        text: priority === "high" ? "text-red-800" : "text-yellow-800",
        label: priority === "high" ? "Urgent Review" : "Pending Review",
      },
      confirmed: {
        bg: "bg-green-100",
        text: "text-green-800",
        label: "Confirmed",
      },
      completed: {
        bg: "bg-gray-100",
        text: "text-gray-800",
        label: "Completed",
      },
      rescheduled: {
        bg: "bg-blue-100",
        text: "text-blue-800",
        label: "Rescheduled",
      },
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

  const handleAppointmentAction = (
    requestId: string,
    action: "approve" | "reschedule" | "decline",
  ) => {
    console.log(`${action} appointment request ${requestId}`);
    // In a real app, this would make API calls to update appointment status
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: Activity },
    {
      id: "requests",
      label: "New Requests",
      icon: Bell,
      badge: appointmentRequests.length,
    },
    { id: "schedule", label: "My Schedule", icon: Calendar },
    { id: "patients", label: "Patient Records", icon: FileText },
    { id: "settings", label: "Practice Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-medical-dark-blue">
            Welcome, Dr. {firstName}
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your practice and patient appointments
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {practiceStats.map((stat) => {
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
                {/* Today's Schedule */}
                <div>
                  <h2 className="text-xl font-semibold text-medical-dark-blue mb-4">
                    Today's Schedule
                  </h2>
                  <div className="space-y-3">
                    {confirmedAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-medical-blue rounded-full flex items-center justify-center">
                              <span className="text-white text-sm font-medium">
                                {appointment.patient
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-medium text-medical-dark-blue">
                                {appointment.patient}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {appointment.time} • {appointment.reason}
                              </p>
                              <p className="text-xs text-gray-500">
                                {appointment.notes}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
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

                {/* Pending Requests Preview */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-medical-dark-blue">
                      Pending Appointment Requests
                    </h2>
                    <Button
                      variant="outline"
                      onClick={() => setActiveTab("requests")}
                    >
                      View All ({appointmentRequests.length})
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {appointmentRequests.slice(0, 2).map((request) => (
                      <div
                        key={request.id}
                        className={`border rounded-lg p-4 ${
                          request.priority === "high"
                            ? "border-red-200 bg-red-50"
                            : "border-gray-200"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-medical-dark-blue">
                              {request.patient}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {request.requestedDate} at {request.requestedTime}{" "}
                              • {request.reason}
                            </p>
                            <p className="text-xs text-gray-500">
                              Submitted {request.submittedAt}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <StatusBadge
                              status={request.status}
                              priority={request.priority}
                            />
                            <div className="flex space-x-1">
                              <Button
                                size="sm"
                                onClick={() =>
                                  handleAppointmentAction(request.id, "approve")
                                }
                                className="bg-green-600 hover:bg-green-700 text-white"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleAppointmentAction(
                                    request.id,
                                    "reschedule",
                                  )
                                }
                              >
                                <Edit3 className="w-4 h-4 mr-1" />
                                Reschedule
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "requests" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-medical-dark-blue">
                  New Appointment Requests
                </h2>
                <div className="space-y-4">
                  {appointmentRequests.map((request) => (
                    <div
                      key={request.id}
                      className={`border rounded-lg p-6 ${
                        request.priority === "high"
                          ? "border-red-200 bg-red-50"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-medical-dark-blue">
                            {request.patient}
                          </h3>
                          <p className="text-gray-600">
                            Requested: {request.requestedDate} at{" "}
                            {request.requestedTime}
                          </p>
                          <p className="text-sm text-gray-500">
                            Submitted {request.submittedAt}
                          </p>
                        </div>
                        <StatusBadge
                          status={request.status}
                          priority={request.priority}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">
                            Reason for Visit
                          </h4>
                          <p className="text-sm text-gray-600">
                            {request.reason}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">
                            Current Symptoms
                          </h4>
                          <p className="text-sm text-gray-600">
                            {request.symptoms}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">
                            Medical History
                          </h4>
                          <p className="text-sm text-gray-600">
                            {request.medicalHistory}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">
                            Insurance
                          </h4>
                          <p className="text-sm text-gray-600">
                            {request.insurance}
                          </p>
                        </div>
                      </div>

                      {request.documents && request.documents.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-700 mb-2">
                            Uploaded Documents
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {request.documents.map((doc, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                              >
                                <FileText className="w-3 h-3 mr-1" />
                                {doc}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex justify-end space-x-3">
                        <Button
                          variant="outline"
                          onClick={() =>
                            handleAppointmentAction(request.id, "decline")
                          }
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Decline
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() =>
                            handleAppointmentAction(request.id, "reschedule")
                          }
                        >
                          <Edit3 className="w-4 h-4 mr-2" />
                          Suggest Different Time
                        </Button>
                        <Button
                          onClick={() =>
                            handleAppointmentAction(request.id, "approve")
                          }
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve & Confirm
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "schedule" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-medical-dark-blue">
                    My Schedule
                  </h2>
                  <Button className="medical-button-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Block Time
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-medical-dark-blue mb-4">
                      Confirmed Appointments
                    </h3>
                    <div className="space-y-3">
                      {confirmedAppointments.map((appointment) => (
                        <div
                          key={appointment.id}
                          className="border border-gray-200 rounded-lg p-4"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-medical-dark-blue">
                                {appointment.patient}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {appointment.date} at {appointment.time}
                              </p>
                              <p className="text-sm text-gray-600">
                                {appointment.reason}
                              </p>
                              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                                <span className="flex items-center">
                                  <Phone className="w-3 h-3 mr-1" />
                                  {appointment.patientPhone}
                                </span>
                                <span className="flex items-center">
                                  <Mail className="w-3 h-3 mr-1" />
                                  {appointment.patientEmail}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col space-y-2">
                              <StatusBadge status={appointment.status} />
                              <Button variant="outline" size="sm">
                                Contact Patient
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-medical-dark-blue mb-4">
                      Recent Completed Appointments
                    </h3>
                    <div className="space-y-3">
                      {completedAppointments.map((appointment) => (
                        <div
                          key={appointment.id}
                          className="border border-gray-200 rounded-lg p-4"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium text-medical-dark-blue">
                                {appointment.patient}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {appointment.date} at {appointment.time}
                              </p>
                              <p className="text-sm text-gray-600">
                                {appointment.reason}
                              </p>
                              <div className="mt-2 bg-gray-50 p-2 rounded text-xs">
                                <p>
                                  <strong>Diagnosis:</strong>{" "}
                                  {appointment.diagnosis}
                                </p>
                                <p>
                                  <strong>Treatment:</strong>{" "}
                                  {appointment.treatment}
                                </p>
                              </div>
                            </div>
                            <StatusBadge status={appointment.status} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "patients" && (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Patient Records Management
                </h3>
                <p className="text-gray-600 mb-6">
                  Access patient medical records, update treatment notes, and
                  manage follow-up care.
                </p>
                <Button className="medical-button-primary">
                  Access Patient Records
                </Button>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="text-center py-12">
                <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Practice Settings
                </h3>
                <p className="text-gray-600 mb-6">
                  Configure your availability, appointment types, fees, and
                  practice preferences.
                </p>
                <Button className="medical-button-primary">
                  Manage Settings
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
