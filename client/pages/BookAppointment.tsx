import { Calendar, Clock, User, FileText, CheckCircle } from "lucide-react";
import { Button } from "../components/ui/button";

export default function BookAppointment() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Calendar className="w-16 h-16 text-medical-blue mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-medical-dark-blue mb-4">
            Book Your Appointment
          </h1>
          <p className="text-lg text-gray-600">
            Schedule your healthcare visit in just a few simple steps
          </p>
        </div>

        <div className="medical-card p-8 text-center">
          <h2 className="text-xl font-semibold text-medical-dark-blue mb-4">
            Appointment Booking System
          </h2>
          <p className="text-gray-600 mb-8">
            Complete appointment booking functionality will be implemented here,
            including:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              {
                icon: User,
                label: "Doctor Selection",
                desc: "Choose from available doctors",
              },
              {
                icon: Calendar,
                label: "Date & Time",
                desc: "Pick convenient slots",
              },
              {
                icon: FileText,
                label: "Medical Info",
                desc: "Upload documents",
              },
              {
                icon: CheckCircle,
                label: "Confirmation",
                desc: "Instant booking confirmation",
              },
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 medical-gradient rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-medical-dark-blue mb-2">
                    {step.label}
                  </h3>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>
              );
            })}
          </div>

          <Button className="medical-button-primary">
            Coming Soon - Full Booking System
          </Button>
        </div>
      </div>
    </div>
  );
}
