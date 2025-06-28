import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Phone className="w-16 h-16 text-medical-blue mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-medical-dark-blue mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600">
            Get in touch with our support team
          </p>
        </div>

        <div className="medical-card p-8 text-center">
          <h2 className="text-xl font-semibold text-medical-dark-blue mb-4">
            We're Here to Help
          </h2>
          <p className="text-gray-600 mb-8">
            Contact our support team for any questions about appointments,
            technical issues, or general inquiries.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Phone,
                label: "Phone Support",
                desc: "+1 (555) 123-4567",
              },
              {
                icon: Mail,
                label: "Email Support",
                desc: "support@docspot.com",
              },
              {
                icon: MapPin,
                label: "Office Location",
                desc: "123 Healthcare Ave, Medical City",
              },
              {
                icon: Clock,
                label: "Support Hours",
                desc: "24/7 Available",
              },
            ].map((contact, index) => {
              const Icon = contact.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 medical-gradient rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-medical-dark-blue mb-2">
                    {contact.label}
                  </h3>
                  <p className="text-sm text-gray-600">{contact.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
