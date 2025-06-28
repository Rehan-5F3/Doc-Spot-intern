import { HeroSection } from "../components/HeroSection";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import {
  Calendar,
  Users,
  Shield,
  Clock,
  Star,
  CheckCircle,
  ArrowRight,
  Play,
  FileText,
  Phone,
  Globe,
} from "lucide-react";

export default function Index() {
  const features = [
    {
      icon: Calendar,
      title: "Easy Scheduling",
      description:
        "Book appointments 24/7 with real-time availability. No more waiting on hold or playing phone tag.",
    },
    {
      icon: Users,
      title: "Verified Doctors",
      description:
        "Access to 500+ verified healthcare providers across all specialties and locations.",
    },
    {
      icon: Shield,
      title: "HIPAA Compliant",
      description:
        "Your health information is protected with enterprise-grade security and privacy controls.",
    },
    {
      icon: Clock,
      title: "Flexible Hours",
      description:
        "Find appointments that fit your schedule - early morning, evening, or weekend slots available.",
    },
    {
      icon: FileText,
      title: "Document Upload",
      description:
        "Upload medical records, insurance information, and other documents securely before your visit.",
    },
    {
      icon: Phone,
      title: "24/7 Support",
      description:
        "Get help when you need it with our round-the-clock customer support team.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Patient",
      content:
        "DocSpot made booking my appointment so easy. I found a great doctor near me and booked online in under 5 minutes!",
      rating: 5,
    },
    {
      name: "Dr. Michael Chen",
      role: "Cardiologist",
      content:
        "The platform helps me manage my schedule efficiently and connect with patients who need my care.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Patient",
      content:
        "Finally, a healthcare platform that actually works! The interface is intuitive and booking is seamless.",
      rating: 5,
    },
  ];

  const steps = [
    {
      step: "1",
      title: "Create Your Account",
      description:
        "Sign up as a patient with your email and basic information. It takes less than 2 minutes.",
      icon: Users,
    },
    {
      step: "2",
      title: "Find Your Doctor",
      description:
        "Search by specialty, location, or doctor name. Filter by availability and read reviews.",
      icon: Calendar,
    },
    {
      step: "3",
      title: "Book Your Appointment",
      description:
        "Select your preferred time slot, upload any documents, and confirm your booking instantly.",
      icon: CheckCircle,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-medical-dark-blue mb-4">
              Everything You Need for Healthcare Management
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools you need to
              manage your healthcare journey efficiently and securely.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="medical-card p-6 text-center hover:shadow-medical-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 medical-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-medical-dark-blue mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-medical-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-medical-dark-blue mb-4">
              How DocSpot Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get started with DocSpot in three simple steps. Booking healthcare
              appointments has never been this easy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="text-center relative">
                  {/* Connection line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-1/2 transform translate-x-6 lg:translate-x-12 w-24 lg:w-32 h-0.5 bg-medical-blue/30"></div>
                  )}

                  <div className="relative">
                    <div className="w-16 h-16 medical-gradient rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                      <span className="text-2xl font-bold text-white">
                        {step.step}
                      </span>
                    </div>
                    <div className="w-8 h-8 bg-medical-light-blue rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-4 h-4 text-medical-blue" />
                    </div>
                    <h3 className="text-xl font-semibold text-medical-dark-blue mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link to="/signup">
              <Button className="medical-button-primary text-lg px-8 py-4 h-auto">
                Start Your Health Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-medical-dark-blue mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied patients and healthcare providers who
              trust DocSpot for their medical appointment needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="medical-card p-6 text-center hover:shadow-medical-lg transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <h4 className="font-semibold text-medical-dark-blue">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 medical-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Transform Your Healthcare Experience?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join DocSpot today and discover how easy healthcare management can
            be. Book your first appointment in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button className="bg-white text-medical-blue hover:bg-gray-100 text-lg px-8 py-4 h-auto font-semibold">
                Get Started Free
              </Button>
            </Link>
            <Link to="/doctors">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-medical-blue text-lg px-8 py-4 h-auto font-semibold"
              >
                Browse Doctors
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
