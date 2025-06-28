import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  Shield,
  Users,
  Search,
  MapPin,
  Star,
} from "lucide-react";

export function HeroSection() {
  const stats = [
    { icon: Users, label: "Registered Doctors", value: "500+" },
    { icon: Calendar, label: "Appointments Booked", value: "10K+" },
    { icon: Star, label: "Patient Satisfaction", value: "4.9/5" },
    { icon: Shield, label: "HIPAA Compliant", value: "100%" },
  ];

  const quickActions = [
    {
      icon: Search,
      label: "Find Doctor",
      description: "Search by specialty or location",
      href: "/doctors",
    },
    {
      icon: Calendar,
      label: "Book Appointment",
      description: "Schedule your visit online",
      href: "/book",
    },
    {
      icon: Clock,
      label: "Emergency Care",
      description: "24/7 urgent care booking",
      href: "/emergency",
    },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-medical-light-blue via-white to-medical-light-gray">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-medical-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-medical-green/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-medical-dark-blue leading-tight">
              DocSpot: <span className="text-medical-blue">Seamless</span>{" "}
              Appointment Booking for{" "}
              <span className="text-medical-green">Health</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
              Booking a doctor's appointment has never been easier. With our
              convenient online platform, you can quickly and effortlessly
              schedule your appointments from the comfort of your own home.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/signup">
                <Button className="medical-button-primary text-lg px-8 py-4 h-auto">
                  Get Started Today
                </Button>
              </Link>
              <Link to="/doctors">
                <Button
                  variant="outline"
                  className="text-lg px-8 py-4 h-auto border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white"
                >
                  Find Doctors
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4" />
                <span>500+ Verified Doctors</span>
              </div>
            </div>
          </div>

          {/* Quick Actions Cards */}
          <div className="grid grid-cols-1 gap-6">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.href}
                  to={action.href}
                  className="block group"
                >
                  <div className="medical-card p-6 hover:shadow-medical-lg transition-all duration-300 group-hover:-translate-y-1">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 medical-gradient rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-medical-dark-blue group-hover:text-medical-blue transition-colors">
                          {action.label}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center">
                <div className="w-12 h-12 medical-gradient rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-medical-dark-blue">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Featured Benefits */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-medical-dark-blue mb-4">
            Why Choose DocSpot?
          </h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Say goodbye to the hassle of traditional appointment booking. Our
            platform offers real-time availability, allowing you to choose from
            a range of open slots that fit your schedule.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 medical-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-medical-dark-blue mb-2">
                Real-Time Availability
              </h3>
              <p className="text-gray-600">
                See available appointments instantly and book the slot that
                works best for you.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 medical-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-medical-dark-blue mb-2">
                Location-Based Search
              </h3>
              <p className="text-gray-600">
                Find doctors near you or choose from our network of specialists
                nationwide.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 medical-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-medical-dark-blue mb-2">
                Secure & Private
              </h3>
              <p className="text-gray-600">
                Your health information is protected with enterprise-grade
                security and HIPAA compliance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
