import { Heart, Users, Shield, Globe } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Heart className="w-16 h-16 text-medical-blue mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-medical-dark-blue mb-4">
            About DocSpot
          </h1>
          <p className="text-lg text-gray-600">
            Transforming healthcare accessibility through technology
          </p>
        </div>

        <div className="medical-card p-8 text-center">
          <h2 className="text-xl font-semibold text-medical-dark-blue mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 mb-8">
            DocSpot is revolutionizing healthcare by making it easier than ever
            to connect with qualified medical professionals and manage your
            health journey.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Users,
                label: "500+ Doctors",
                desc: "Verified healthcare providers",
              },
              {
                icon: Globe,
                label: "24/7 Access",
                desc: "Book anytime, anywhere",
              },
              {
                icon: Shield,
                label: "HIPAA Compliant",
                desc: "Your privacy is protected",
              },
              {
                icon: Heart,
                label: "Patient First",
                desc: "Focused on your wellbeing",
              },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 medical-gradient rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-medical-dark-blue mb-2">
                    {stat.label}
                  </h3>
                  <p className="text-sm text-gray-600">{stat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
