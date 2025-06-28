import { Calendar, Clock, User, Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

export default function Appointments() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Calendar className="w-16 h-16 text-medical-blue mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-medical-dark-blue mb-4">
            My Appointments
          </h1>
          <p className="text-lg text-gray-600">
            View and manage all your healthcare appointments
          </p>
        </div>

        <div className="medical-card p-8 text-center">
          <h2 className="text-xl font-semibold text-medical-dark-blue mb-4">
            Appointment Management
          </h2>
          <p className="text-gray-600 mb-8">
            Complete appointment management system will include scheduling,
            rescheduling, cancellation, and appointment history.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              {
                icon: Calendar,
                label: "Upcoming Appointments",
                desc: "View scheduled visits",
              },
              {
                icon: Clock,
                label: "Appointment History",
                desc: "Past visit records",
              },
              {
                icon: User,
                label: "Doctor Information",
                desc: "Provider details",
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 medical-gradient rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-medical-dark-blue mb-2">
                    {feature.label}
                  </h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              );
            })}
          </div>

          <Link to="/book">
            <Button className="medical-button-primary">
              <Plus className="w-5 h-5 mr-2" />
              Book New Appointment
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
