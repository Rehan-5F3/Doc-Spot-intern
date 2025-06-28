import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Stethoscope,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  ArrowLeft,
  Shield,
  Users,
  FileText,
  CheckCircle,
} from "lucide-react";

interface SignupProps {
  onSignup: (user: {
    id: string;
    name: string;
    email: string;
    role: "patient" | "doctor" | "admin";
  }) => void;
}

export default function Signup({ onSignup }: SignupProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    specialty: "",
    licenseNumber: "",
    experience: "",
    bio: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState<"patient" | "doctor">("patient");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";

    if (userType === "doctor") {
      if (!formData.specialty.trim())
        newErrors.specialty = "Specialty is required";
      if (!formData.licenseNumber.trim())
        newErrors.licenseNumber = "License number is required";
      if (!formData.experience.trim())
        newErrors.experience = "Experience is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const mockUser = {
        id: "1",
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        role: userType,
      };

      onSignup(mockUser);

      // Navigate to appropriate dashboard
      const redirectPath =
        userType === "doctor" ? "/doctor-dashboard" : "/dashboard";
      navigate(redirectPath);

      setLoading(false);
    }, 1500);
  };

  const commonFields = (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label
            htmlFor="firstName"
            className="text-sm font-medium text-gray-700"
          >
            First Name *
          </Label>
          <div className="mt-1 relative">
            <Input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleInputChange}
              className="pl-10"
              placeholder="John"
              required
            />
            <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
          )}
        </div>

        <div>
          <Label
            htmlFor="lastName"
            className="text-sm font-medium text-gray-700"
          >
            Last Name *
          </Label>
          <div className="mt-1">
            <Input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Doe"
              required
            />
          </div>
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email Address *
        </Label>
        <div className="mt-1 relative">
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className="pl-10"
            placeholder="john@example.com"
            required
          />
          <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div>
        <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
          Phone Number *
        </Label>
        <div className="mt-1 relative">
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            className="pl-10"
            placeholder="+1 (555) 123-4567"
            required
          />
          <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Password *
          </Label>
          <div className="mt-1 relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange}
              className="pl-10 pr-10"
              placeholder="••••••••"
              required
            />
            <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        <div>
          <Label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-gray-700"
          >
            Confirm Password *
          </Label>
          <div className="mt-1 relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="pr-10"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.confirmPassword}
            </p>
          )}
        </div>
      </div>
    </>
  );

  const doctorFields = (
    <>
      <div>
        <Label
          htmlFor="specialty"
          className="text-sm font-medium text-gray-700"
        >
          Medical Specialty *
        </Label>
        <div className="mt-1 relative">
          <Input
            id="specialty"
            name="specialty"
            type="text"
            value={formData.specialty}
            onChange={handleInputChange}
            className="pl-10"
            placeholder="e.g., Cardiology, Dermatology"
            required
          />
          <Stethoscope className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
        {errors.specialty && (
          <p className="mt-1 text-sm text-red-600">{errors.specialty}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label
            htmlFor="licenseNumber"
            className="text-sm font-medium text-gray-700"
          >
            Medical License Number *
          </Label>
          <div className="mt-1 relative">
            <Input
              id="licenseNumber"
              name="licenseNumber"
              type="text"
              value={formData.licenseNumber}
              onChange={handleInputChange}
              className="pl-10"
              placeholder="MD123456"
              required
            />
            <FileText className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          {errors.licenseNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.licenseNumber}</p>
          )}
        </div>

        <div>
          <Label
            htmlFor="experience"
            className="text-sm font-medium text-gray-700"
          >
            Years of Experience *
          </Label>
          <Input
            id="experience"
            name="experience"
            type="number"
            value={formData.experience}
            onChange={handleInputChange}
            placeholder="5"
            min="0"
            required
          />
          {errors.experience && (
            <p className="mt-1 text-sm text-red-600">{errors.experience}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="bio" className="text-sm font-medium text-gray-700">
          Professional Bio
        </Label>
        <Textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          className="mt-1"
          rows={3}
          placeholder="Brief description of your medical background and expertise..."
        />
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light-blue via-white to-medical-light-gray flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-medical-green/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-medical-blue/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center space-x-2">
            <div className="w-12 h-12 medical-gradient rounded-lg flex items-center justify-center">
              <Stethoscope className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold text-medical-dark-blue">
              DocSpot
            </span>
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-medical-dark-blue">
            Create Your Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join DocSpot and start managing your healthcare journey
          </p>
        </div>

        {/* Signup Form */}
        <div className="medical-card p-8">
          {/* User Type Selection */}
          <div className="mb-8">
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              I am signing up as a *
            </Label>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  type: "patient" as const,
                  icon: Users,
                  label: "Patient",
                  desc: "Book appointments",
                },
                {
                  type: "doctor" as const,
                  icon: Stethoscope,
                  label: "Doctor",
                  desc: "Manage practice",
                },
              ].map(({ type, icon: Icon, label, desc }) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setUserType(type)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    userType === type
                      ? "border-medical-blue bg-medical-light-blue"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 mb-2 ${userType === type ? "text-medical-blue" : "text-gray-600"}`}
                  />
                  <div
                    className={`font-medium ${userType === type ? "text-medical-blue" : "text-gray-900"}`}
                  >
                    {label}
                  </div>
                  <div className="text-sm text-gray-500">{desc}</div>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {commonFields}

            {userType === "doctor" && (
              <>
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-medical-dark-blue mb-4 flex items-center">
                    <Stethoscope className="w-5 h-5 mr-2" />
                    Professional Information
                  </h3>
                  <div className="space-y-6">{doctorFields}</div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div className="text-sm text-yellow-800">
                      <p className="font-medium">Verification Required</p>
                      <p>
                        Doctor accounts require admin approval. You'll be
                        notified once your credentials are verified.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 rounded border-gray-300 text-medical-blue focus:ring-medical-blue"
                required
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{" "}
                <Link
                  to="/terms"
                  className="text-medical-blue hover:text-medical-blue/80"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="text-medical-blue hover:text-medical-blue/80"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full medical-button-primary"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Create Account
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-medical-blue hover:text-medical-blue/80 font-medium"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-gray-600 hover:text-medical-blue"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
