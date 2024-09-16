import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  // Common states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("dealer");
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [step, setStep] = useState(1);

  // Dealer specific states
  const [dealerCompanyName, setDealerCompanyName] = useState('');
  const [dealerGstNumber, setDealerGstNumber] = useState('');
  const [dealerAddressLine1, setDealerAddressLine1] = useState('');
  const [dealerAddressLine2, setDealerAddressLine2] = useState('');
  const [dealerPincode, setDealerPincode] = useState('');

  // Driver specific states
  const [driverCompanyName, setDriverCompanyName] = useState('');
  const [driverGstNumber, setDriverGstNumber] = useState('');
  const [driverAddressLine1, setDriverAddressLine1] = useState('');
  const [driverAddressLine2, setDriverAddressLine2] = useState('');
  const [driverPincode, setDriverPincode] = useState('');
  const [truckType, setTruckType] = useState('');
  const [engineNumber, setEngineNumber] = useState('');
  const [truckYear, setTruckYear] = useState('');
  const [truckModel, setTruckModel] = useState('');
  const [truckMake, setTruckMake] = useState('');

  const navigate = useNavigate();

  const goToSignUpPage = () => {
    navigate("/");
  };

  const handleNext = () => {
    if (step === 1) {
      if (password !== confirmPassword) {
        setPasswordError("Passwords do not match");
        return;
      } else {
        setError("");
        setStep(step + 1);
      }
    } else if (step === 2) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  useEffect(() => {
    if (password) {
      setPasswordStrength(checkPassword(password));
    }
  }, [password]);

  const checkPassword = (password) => {
    let resultStrength = "";
    if (password.length < 6) {
      resultStrength = "low";
    } else if (password.length < 10) {
      resultStrength = "medium";
    } else if (password.length >= 10) {
      const upperCase = /[A-Z]/.test(password);
      const numbers = /[0-9]/.test(password);
      const specialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);

      if (upperCase && numbers && specialCharacter) {
        resultStrength = "high";
      } else {
        resultStrength = "medium";
      }
    }
    return resultStrength;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = role === "dealer" ? {
        name,
        email,
        password,
        role,
        companyName: dealerCompanyName,
        gstNumber: dealerGstNumber,
        addressLine1: dealerAddressLine1,
        addressLine2: dealerAddressLine2,
        pincode: dealerPincode
      } : {
        name,
        email,
        password,
        role,
        companyName: driverCompanyName,
        gstNumber: driverGstNumber,
        addressLine1: driverAddressLine1,
        addressLine2: driverAddressLine2,
        pincode: driverPincode,
        truckType,
        engineNumber,
        truckYear,
        truckModel,
        truckMake,
      };

      const response = await axios.post("http://localhost:4000/api/signup", data);
      console.log("response",response)
      toast(`${response.data.user.name} created successfully now you can login`);
      setTimeout(() => {
        navigate("/");
      }, 7000);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <ToastContainer />
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              {/* Step 1: User Details */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 "
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 "
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 "
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <p className={`text-sm ${passwordStrength === "low" ? "text-red-500" : passwordStrength === "medium" ? "text-yellow-500" : "text-green-500"}`}>
                  Strength: {passwordStrength}
                </p>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Confirm Password</label>
                <input
                  type="password"
                  id="password"
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 "
                  placeholder="ReEnter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <p className="text-red-500">{passwordError}</p>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">Role</label>
                <select
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 "
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="dealer">Dealer</option>
                  <option value="driver">Driver</option>
                </select>
              </div>
              <p className="text-red-500">{error}</p>
            </>
          )}

          {/* Dealer Form */}
          {step === 2 && role === "dealer" && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Company Name</label>
                <input
                  type="text"
                  id="company"
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 "
                  placeholder="Enter your Company Name"
                  value={dealerCompanyName}
                  onChange={(e) => setDealerCompanyName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">GST Number</label>
                <input
                  type="text"
                  id="gst"
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 "
                  placeholder="Enter your GST Number"
                  value={dealerGstNumber}
                  onChange={(e) => setDealerGstNumber(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="addressLine1">Address Line 1</label>
                <input
                  type="text"
                  id="addressLine1"
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 "
                  placeholder="Enter Address Line 1"
                  value={dealerAddressLine1}
                  onChange={(e) => setDealerAddressLine1(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="addressLine2">Address Line 2</label>
                <input
                  type="text"
                  id="addressLine2"
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 "
                  placeholder="Enter Address Line 2"
                  value={dealerAddressLine2}
                  onChange={(e) => setDealerAddressLine2(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pincode">Pincode</label>
                <input
                  type="text"
                  id="pincode"
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 "
                  placeholder="Enter Pincode"
                  value={dealerPincode}
                  onChange={(e) => setDealerPincode(e.target.value)}
                />
              </div>
            </>
          )}

          {/* Driver Form */}
          {step === 2 && role === "driver" && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Company Name</label>
                <input
                  type="text"
                  id="company"
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 "
                  placeholder="Enter your Company Name"
                  value={driverCompanyName}
                  onChange={(e) => setDriverCompanyName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">GST Number</label>
                <input
                  type="text"
                  id="gst"
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 "
                  placeholder="Enter your GST Number"
                  value={driverGstNumber}
                  onChange={(e) => setDriverGstNumber(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="addressLine1">Address Line</label>
                <input
                  type="text"
                  id="addressLine1"
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 "
                  placeholder="Enter Address Line"
                  value={driverAddressLine1}
                  onChange={(e) => setDriverAddressLine1(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="addressLine2">Address Line 2</label>
                <input
                  type="text"
                  id="addressLine2"
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 "
                  placeholder="Enter Address Line 2"
                  value={driverAddressLine2}
                  onChange={(e) => setDriverAddressLine2(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pincode">Pincode</label>
                <input
                  type="text"
                  id="pincode"
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 "
                  placeholder="Enter Pincode"
                  value={driverPincode}
                  onChange={(e) => setDriverPincode(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="truckType">Truck Type</label>
                <select
                  id="truckType"
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 "
                  value={truckType}
                  onChange={(e) => setTruckType(e.target.value)}
                >
                  <option value="12">12 Tyres</option>
                  <option value="16">16 Tyres</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="engineNumber">Engine Number</label>
                <input
                  type="text"
                  id="engineNumber"
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 "
                  placeholder="Enter Engine Number"
                  value={engineNumber}
                  onChange={(e) => setEngineNumber(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="truckYear">Truck Year</label>
                <input
                  type="text"
                  id="truckYear"
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 "
                  placeholder="Enter Truck Year"
                  value={truckYear}
                  onChange={(e) => setTruckYear(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="truckModel">Truck Model</label>
                <input
                  type="text"
                  id="truckModel"
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 "
                  placeholder="Enter Truck Model"
                  value={truckModel}
                  onChange={(e) => setTruckModel(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="truckMake">Truck Make</label>
                <input
                  type="text"
                  id="truckMake"
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 "
                  placeholder="Enter Truck Make"
                  value={truckMake}
                  onChange={(e) => setTruckMake(e.target.value)}
                />
              </div>
            </>
          )}

          <div className="flex justify-between">
            {step > 1 && (
              <button
                type="button"
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleBack}
              >
                Back
              </button>
            )}
            {step < 3 && (
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleNext}
              >
                Next
              </button>
            )}
            {step === 2 && (
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            )}
          </div>
        </form>
        <p className="text-sm font-bold mt-4 cursor-pointer text-blue-600" onClick={goToSignUpPage}>
          Already have an account?
        </p>
      </div>
    </div>
  );
};

export default SignUp;
