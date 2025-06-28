import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { useAuth } from "../hooks/useAuth";
import {
  Calendar,
  Clock,
  User,
  FileText,
  CheckCircle,
  Upload,
  MapPin,
  Phone,
  Mail,
  Star,
  AlertCircle,
  Stethoscope,
} from "lucide-react";

export default function BookAppointment() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [bookingData, setBookingData] = useState({
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
    symptoms: "",
    documents: [] as File[],
    insuranceInfo: "",
    emergencyContact: "",
    medicalHistory: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  const firstName = user?.name?.split(" ")[0] || "User";

  const availableDoctors = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      rating: 4.9,
      experience: "15 years",
      location: "Medical Center Downtown",
      image: "SJ",
      availableSlots: ["09:00", "10:30", "14:00", "15:30"],
      fee: "$150",
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      specialty: "Dermatology",
      rating: 4.8,
      experience: "12 years",
      location: "Skin Health Clinic",
      image: "MC",
      availableSlots: ["08:30", "11:00", "13:30", "16:00"],
      fee: "$120",
    },
    {
      id: "3",
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatrics",
      rating: 4.9,
      experience: "10 years",
      location: "Children's Medical Center",
      image: "ER",
      availableSlots: ["09:30", "11:30", "14:30", "16:30"],
      fee: "$100",
    },
  ];

  const handleDoctorSelect = (doctor: any) => {
    setSelectedDoctor(doctor);
    setCurrentStep(2);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setBookingData((prev) => ({
        ...prev,
        documents: [...prev.documents, ...files],
      }));
    }
  };

  const removeDocument = (index: number) => {
    setBookingData((prev) => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index),
    }));
  };

  const handleSubmitBooking = async () => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setBookingComplete(true);
      setCurrentStep(4);
    }, 2000);
  };

  const steps = [
    { number: 1, title: "Select Doctor", icon: User },
    { number: 2, title: "Choose Date & Time", icon: Calendar },
    { number: 3, title: "Medical Information", icon: FileText },
    { number: 4, title: "Confirmation", icon: CheckCircle },
  ];

  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="medical-card p-12 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-medical-dark-blue mb-4">
              Appointment Request Received!
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Hi {firstName}, your appointment request has been successfully
              submitted.
              {selectedDoctor?.name} will review your request and confirm the
              appointment.
            </p>

            <div className="bg-medical-light-blue p-6 rounded-lg mb-8">
              <h3 className="font-semibold text-medical-dark-blue mb-4">
                Appointment Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-medical-blue" />
                  <span>Doctor: {selectedDoctor?.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-medical-blue" />
                  <span>Date: {bookingData.appointmentDate}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-medical-blue" />
                  <span>Time: {bookingData.appointmentTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-medical-blue" />
                  <span>Location: {selectedDoctor?.location}</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium">What happens next?</p>
                  <ul className="mt-2 space-y-1">
                    <li>
                      • {selectedDoctor?.name} will review your request within
                      24 hours
                    </li>
                    <li>
                      • You'll receive a confirmation notification with final
                      details
                    </li>
                    <li>• You can manage this appointment in your dashboard</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate("/dashboard")}
                className="medical-button-primary"
              >
                Go to Dashboard
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentStep(1);
                  setBookingComplete(false);
                  setSelectedDoctor(null);
                  setBookingData({
                    appointmentDate: "",
                    appointmentTime: "",
                    reason: "",
                    symptoms: "",
                    documents: [],
                    insuranceInfo: "",
                    emergencyContact: "",
                    medicalHistory: "",
                  });
                }}
              >
                Book Another Appointment
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-medical-dark-blue mb-4">
            Book Your Appointment
          </h1>
          <p className="text-lg text-gray-600">
            Hi {firstName}, schedule your healthcare visit in just a few simple
            steps
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-4 md:space-x-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;

              return (
                <div key={step.number} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        isCompleted
                          ? "bg-green-500"
                          : isActive
                            ? "bg-medical-blue"
                            : "bg-gray-300"
                      }`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span
                      className={`text-sm mt-2 ${isActive ? "text-medical-blue font-medium" : "text-gray-600"}`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`hidden md:block w-24 h-0.5 mx-4 ${
                        currentStep > step.number
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="medical-card p-8">
          {/* Step 1: Select Doctor */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-semibold text-medical-dark-blue mb-6">
                Select Your Doctor
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {availableDoctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer"
                    onClick={() => handleDoctorSelect(doctor)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-medical-blue rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">
                          {doctor.image}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-medical-dark-blue">
                          {doctor.name}
                        </h3>
                        <p className="text-medical-green font-medium">
                          {doctor.specialty}
                        </p>
                        <p className="text-sm text-gray-600">
                          {doctor.experience} experience
                        </p>

                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span>{doctor.rating}</span>
                          </div>
                          <span className="font-medium text-medical-blue">
                            {doctor.fee}
                          </span>
                        </div>

                        <div className="mt-3">
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <MapPin className="w-4 h-4" />
                            <span>{doctor.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full mt-4 medical-button-primary">
                      Select Doctor
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Date & Time Selection */}
          {currentStep === 2 && selectedDoctor && (
            <div>
              <h2 className="text-2xl font-semibold text-medical-dark-blue mb-6">
                Select Date & Time
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">
                    Appointment Date
                  </Label>
                  <Input
                    type="date"
                    name="appointmentDate"
                    value={bookingData.appointmentDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full"
                    required
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">
                    Available Time Slots
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedDoctor.availableSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() =>
                          setBookingData((prev) => ({
                            ...prev,
                            appointmentTime: slot,
                          }))
                        }
                        className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                          bookingData.appointmentTime === slot
                            ? "bg-medical-blue text-white border-medical-blue"
                            : "bg-white border-gray-300 hover:border-medical-blue"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Label
                  htmlFor="reason"
                  className="text-sm font-medium text-gray-700 mb-3 block"
                >
                  Reason for Visit
                </Label>
                <Textarea
                  id="reason"
                  name="reason"
                  value={bookingData.reason}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Please describe the reason for your appointment..."
                  className="w-full"
                  required
                />
              </div>

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                  Back to Doctor Selection
                </Button>
                <Button
                  onClick={() => setCurrentStep(3)}
                  disabled={
                    !bookingData.appointmentDate ||
                    !bookingData.appointmentTime ||
                    !bookingData.reason
                  }
                  className="medical-button-primary"
                >
                  Continue to Medical Info
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Medical Information & Documents */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-semibold text-medical-dark-blue mb-6">
                Medical Information & Documents
              </h2>

              <div className="space-y-6">
                <div>
                  <Label
                    htmlFor="symptoms"
                    className="text-sm font-medium text-gray-700 mb-3 block"
                  >
                    Current Symptoms
                  </Label>
                  <Textarea
                    id="symptoms"
                    name="symptoms"
                    value={bookingData.symptoms}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Describe any current symptoms you're experiencing..."
                    className="w-full"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="medicalHistory"
                    className="text-sm font-medium text-gray-700 mb-3 block"
                  >
                    Relevant Medical History
                  </Label>
                  <Textarea
                    id="medicalHistory"
                    name="medicalHistory"
                    value={bookingData.medicalHistory}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Any relevant medical history, allergies, or medications..."
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label
                      htmlFor="insuranceInfo"
                      className="text-sm font-medium text-gray-700 mb-3 block"
                    >
                      Insurance Information
                    </Label>
                    <Input
                      id="insuranceInfo"
                      name="insuranceInfo"
                      value={bookingData.insuranceInfo}
                      onChange={handleInputChange}
                      placeholder="Insurance provider and policy number"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="emergencyContact"
                      className="text-sm font-medium text-gray-700 mb-3 block"
                    >
                      Emergency Contact
                    </Label>
                    <Input
                      id="emergencyContact"
                      name="emergencyContact"
                      value={bookingData.emergencyContact}
                      onChange={handleInputChange}
                      placeholder="Emergency contact name and phone"
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Document Upload */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">
                    Upload Medical Documents
                  </Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">
                      Upload medical records, insurance cards, or other relevant
                      documents
                    </p>
                    <Input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <Label
                      htmlFor="file-upload"
                      className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Choose Files
                    </Label>
                  </div>

                  {/* Uploaded Files */}
                  {bookingData.documents.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-700 mb-2">
                        Uploaded Documents:
                      </h4>
                      <div className="space-y-2">
                        {bookingData.documents.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-gray-50 p-3 rounded"
                          >
                            <div className="flex items-center space-x-2">
                              <FileText className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-700">
                                {file.name}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeDocument(index)}
                              className="text-red-500 hover:text-red-700 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={() => setCurrentStep(2)}>
                  Back to Date & Time
                </Button>
                <Button
                  onClick={handleSubmitBooking}
                  disabled={isSubmitting}
                  className="medical-button-primary"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting Request...
                    </div>
                  ) : (
                    "Submit Appointment Request"
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
