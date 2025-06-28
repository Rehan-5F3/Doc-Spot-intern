import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Search,
  MapPin,
  Star,
  Clock,
  Calendar,
  Filter,
  Users,
  Stethoscope,
  Heart,
  Eye,
  Brain,
  Baby,
} from "lucide-react";

export default function FindDoctors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const specialties = [
    { id: "all", name: "All Specialties", icon: Stethoscope },
    { id: "cardiology", name: "Cardiology", icon: Heart },
    { id: "dermatology", name: "Dermatology", icon: Users },
    { id: "ophthalmology", name: "Ophthalmology", icon: Eye },
    { id: "neurology", name: "Neurology", icon: Brain },
    { id: "pediatrics", name: "Pediatrics", icon: Baby },
  ];

  const doctors = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      rating: 4.9,
      reviews: 156,
      experience: "15 years",
      location: "Medical Center Downtown",
      distance: "2.3 miles",
      nextAvailable: "Today 3:00 PM",
      image: "SJ",
      about:
        "Specialized in interventional cardiology with expertise in heart disease prevention and treatment.",
      languages: ["English", "Spanish"],
      insurance: ["Blue Cross", "Aetna", "Medicare"],
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      specialty: "Dermatology",
      rating: 4.8,
      reviews: 203,
      experience: "12 years",
      location: "Skin Health Clinic",
      distance: "1.8 miles",
      nextAvailable: "Tomorrow 10:00 AM",
      image: "MC",
      about:
        "Board-certified dermatologist specializing in skin cancer detection and cosmetic procedures.",
      languages: ["English", "Mandarin"],
      insurance: ["United Health", "Cigna", "Blue Cross"],
    },
    {
      id: "3",
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatrics",
      rating: 4.9,
      reviews: 189,
      experience: "10 years",
      location: "Children's Medical Center",
      distance: "3.1 miles",
      nextAvailable: "Monday 9:00 AM",
      image: "ER",
      about:
        "Passionate pediatrician focused on child development and preventive care.",
      languages: ["English", "Spanish", "Portuguese"],
      insurance: ["Blue Cross", "Humana", "Medicare"],
    },
    {
      id: "4",
      name: "Dr. James Wilson",
      specialty: "Orthopedics",
      rating: 4.7,
      reviews: 142,
      experience: "18 years",
      location: "Sports Medicine Institute",
      distance: "4.2 miles",
      nextAvailable: "Wednesday 2:00 PM",
      image: "JW",
      about:
        "Orthopedic surgeon specializing in sports injuries and joint replacement.",
      languages: ["English"],
      insurance: ["Aetna", "United Health", "Blue Cross"],
    },
  ];

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty =
      !selectedSpecialty ||
      selectedSpecialty === "all" ||
      doctor.specialty.toLowerCase() === selectedSpecialty.toLowerCase();
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-medical-dark-blue mb-4">
            Find Your Perfect Doctor
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse through our network of verified healthcare professionals and
            book appointments that fit your schedule.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="medical-card p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <Input
                  type="text"
                  placeholder="Search doctors, specialties, or conditions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Specialty Filter */}
            <div>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-medical-blue focus:border-transparent"
              >
                {specialties.map((specialty) => (
                  <option key={specialty.id} value={specialty.id}>
                    {specialty.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <div className="relative">
                <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <Input
                  type="text"
                  placeholder="Enter location or ZIP"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Specialty Pills */}
          <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-200">
            {specialties.slice(1).map((specialty) => {
              const Icon = specialty.icon;
              return (
                <button
                  key={specialty.id}
                  onClick={() => setSelectedSpecialty(specialty.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all ${
                    selectedSpecialty === specialty.id
                      ? "bg-medical-blue text-white border-medical-blue"
                      : "bg-white text-gray-700 border-gray-300 hover:border-medical-blue"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{specialty.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-medical-dark-blue">
              Available Doctors
            </h2>
            <p className="text-gray-600">
              {filteredDoctors.length} doctors found
            </p>
          </div>
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>More Filters</span>
          </Button>
        </div>

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="medical-card p-6 hover:shadow-medical-lg transition-all duration-300 doctor-card"
            >
              <div className="flex items-start space-x-4">
                {/* Doctor Avatar */}
                <div className="w-16 h-16 bg-medical-blue rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold text-lg">
                    {doctor.image}
                  </span>
                </div>

                {/* Doctor Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-medical-dark-blue">
                        {doctor.name}
                      </h3>
                      <p className="text-medical-green font-medium">
                        {doctor.specialty}
                      </p>
                      <p className="text-sm text-gray-600">
                        {doctor.experience} experience
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-medium">{doctor.rating}</span>
                        <span className="text-gray-500 text-sm">
                          ({doctor.reviews})
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                    {doctor.about}
                  </p>

                  <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{doctor.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span className="text-green-600 font-medium">
                        {doctor.nextAvailable}
                      </span>
                    </div>
                  </div>

                  {/* Languages and Insurance */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    <div className="text-xs">
                      <span className="font-medium text-gray-700">
                        Languages:{" "}
                      </span>
                      <span className="text-gray-600">
                        {doctor.languages.join(", ")}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                    <div className="text-xs text-gray-500">
                      <span className="font-medium">Insurance: </span>
                      {doctor.insurance.slice(0, 2).join(", ")}
                      {doctor.insurance.length > 2 && " +more"}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                      <Link to="/book">
                        <Button className="medical-button-primary text-sm px-4 py-2">
                          <Calendar className="w-4 h-4 mr-1" />
                          Book Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" className="px-8">
            Load More Doctors
          </Button>
        </div>

        {/* Emergency Banner */}
        <div className="mt-12 bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-800">
                Need Immediate Care?
              </h3>
              <p className="text-red-700">
                For medical emergencies, call 911 immediately. For urgent care,
                visit our emergency booking portal.
              </p>
            </div>
            <Link to="/emergency">
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                Emergency Care
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
