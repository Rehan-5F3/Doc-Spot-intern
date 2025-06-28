import { Shield, Users, Activity, Settings, BarChart3 } from "lucide-react";
import { Button } from "../components/ui/button";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Shield className="w-16 h-16 text-medical-blue mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-medical-dark-blue mb-4">
            Admin Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Platform management and oversight
          </p>
        </div>

        <div className="medical-card p-8 text-center">
          <h2 className="text-xl font-semibold text-medical-dark-blue mb-4">
            Administrative Control Panel
          </h2>
          <p className="text-gray-600 mb-8">
            Complete admin dashboard will feature:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              {
                icon: Users,
                label: "User Management",
                desc: "Manage patients and doctors",
              },
              {
                icon: Activity,
                label: "Platform Monitoring",
                desc: "System health and activity",
              },
              {
                icon: BarChart3,
                label: "Analytics & Reports",
                desc: "Platform usage insights",
              },
              {
                icon: Settings,
                label: "System Configuration",
                desc: "Platform settings control",
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

          <Button className="medical-button-primary">
            Coming Soon - Full Admin Portal
          </Button>
        </div>
      </div>
    </div>
  );
}
