import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import {AuthContext} from '../../Context/AuthContext';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import Swal from 'sweetalert2';

const divisions = ["Dhaka", "Chattagram", "Rangpur", "Barisal", "Khulna", "Mymensingh", "Sylhet"];
const heights = ["4'5\"", "4'6\"", "4'7\"", "4'8\"", "4'9\"", "5'0\"", "5'1\"", "5'2\"", "5'3\"", "5'4\"", "5'5\"", "5'6\"", "5'7\"", "5'8\"", "5'9\"", "6'0\""];
const weights = ["40kg", "45kg", "50kg", "55kg", "60kg", "65kg", "70kg", "75kg", "80kg", "85kg"];
const occupations = ["Student", "Job Holder", "Business", "Freelancer"];
const races = ["Fair", "Medium", "Dark"];

const EditBiodata = () => {
  const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting } } = useForm();
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();

  const dob = watch('dateOfBirth'); // ✅ ফিক্সড
  const [calculatedAge, setCalculatedAge] = useState(null);

  useEffect(() => {
    if (dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      setCalculatedAge(age);
    } else {
      setCalculatedAge(null);
    }
  }, [dob]);

const onSubmit = async (data) => {
  try {
    const age = calculatedAge || 0;
    const finalData = { ...data, age, email: user?.email };

    const response = await axiosSecure.post('/biodatas', finalData);

    if (response.data.success) {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: `Biodata saved successfully! Your Biodata Number: ${response.data.id}`,
        confirmButtonText: 'OK',
      });
      reset();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: 'Failed to save biodata',
        confirmButtonText: 'Try Again',
      });
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'An error occurred while saving biodata',
      confirmButtonText: 'OK',
    });
  }
};


  const renderInput = (label, name, type = "text", required = true, extra = {}) => (
    <div className="mb-4">
      <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        {...register(name, {
          required: required ? `${label} is required` : false,
          pattern: name === 'mobileNumber' ? {
            value: /^[0-9]+$/,
            message: 'Only numeric values allowed'
          } : undefined,
        })}
        {...extra}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 ${errors[name] ? 'border-rose-500' : 'border-gray-300'}`}
        autoComplete="off"
      />
      {errors[name] && <p className="text-rose-500 text-xs mt-1">{errors[name].message}</p>}
    </div>
  );

  const renderSelect = (label, name, options, required = true) => (
    <div className="mb-4">
      <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
      <select
        {...register(name, { required: required ? `${label} is required` : false })}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 ${errors[name] ? 'border-rose-500' : 'border-gray-300'}`}
      >
        <option value="">Select</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt}>{opt}</option>
        ))}
      </select>
      {errors[name] && <p className="text-rose-500 text-xs mt-1">{errors[name].message}</p>}
    </div>
  );

  return (
    <section className="min-h-screen flex justify-center items-center bg-gradient-to-tr from-pink-100 via-rose-50 to-yellow-100 py-10 px-4">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-rose-600 mb-6">Create / Edit Your Biodata</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderSelect("Biodata Type", "biodataType", ["Male", "Female"])}
          {renderInput("Full Name", "name")}
          {renderInput("Profile Image Link", "profileImage")}
          {renderInput("Date of Birth", "dateOfBirth", "date")}
          {calculatedAge !== null && (
            <div className="mb-4 flex items-center text-gray-700 font-semibold">
              <span>Calculated Age: {calculatedAge} years</span>
            </div>
          )}
          {renderSelect("Height", "height", heights)}
          {renderSelect("Weight", "weight", weights)}
          {renderSelect("Occupation", "occupation", occupations)}
          {renderSelect("Race (Skin Color)", "race", races)}
          {renderInput("Father's Name", "fathersName")}
          {renderInput("Mother's Name", "mothersName")}
          {renderSelect("Permanent Division", "permanentDivision", divisions)}
          {renderSelect("Present Division", "presentDivision", divisions)}
          {renderInput("Expected Partner Age", "expectedPartnerAge", "text")}
          {renderSelect("Expected Partner Height", "expectedPartnerHeight", heights)}
          {renderSelect("Expected Partner Weight", "expectedPartnerWeight", weights)}
          {renderInput("Email (Readonly)", "email", "email", true, {
            readOnly: true,
            defaultValue: user?.email || "",
            className: "bg-gray-100 cursor-not-allowed"
          })}
          {renderInput("Mobile Number", "mobileNumber")}

          <div className="col-span-1 md:col-span-2 flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full mt-4 bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2 rounded-lg transition-all ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Saving...' : 'Save and Publish Now'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditBiodata;
