import React, { useState } from 'react';



const Input = ({ label, required = false, ...props }) => (
  <div className="flex flex-col">
    <label className="text-sm text-slate-600 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      required={required}
      className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    />
  </div>
);

const Select = ({ label, options, required = false, name, value, onChange }
  ) => (
    <div className="flex flex-col">
      <label className="text-sm text-slate-600 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        required={required}
        name={name}
        value={value}
        onChange={onChange}
        className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select {label}</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
  

const AddStudentForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    gender: '',
    phone: '',
    secondaryPhone: '',
    email: '',
    occupation: '',
    company: '',
    province: '',
    district: '',
    municipality: '',
    ward: '',
    streetAddress: '',
    course: '',
    courseType: '',
    courseFee: '',
    startDate: '',
    endDate: '',
    courseCenter: '',
    teacher: '',
    remarks: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const BASE_URL = `http://${import.meta.env.VITE_DEV_IP}:${import.meta.env.VITE_DEV_PORT}`;

  
  const handleSubmit = async (e) => {

    e.preventDefault();
    try {

      const response = await fetch(`${BASE_URL}/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Student added:', result);
      } else {
        console.error('Failed to add student');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="p-6 ml-64">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">Add New Student</h2>
      <form className="bg-white border border-slate-200 rounded-lg p-6 space-y-6 text-sm" onSubmit={handleSubmit}>
        <div>
          <h3 className="font-medium mb-2 text-slate-700">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input label="First Name" required name="firstName" value={formData.firstName} onChange={handleInputChange} />
            <Input label="Middle Name" name="middleName" value={formData.middleName} onChange={handleInputChange} />
            <Input label="Last Name" required name="lastName" value={formData.lastName} onChange={handleInputChange} />
            <Input label="Date of Birth" type="date" required name="dob" value={formData.dob} onChange={handleInputChange} />
            <Select label="Gender" options={['Male', 'Female', 'Other']} required name="gender" value={formData.gender} onChange={handleInputChange} />
            <Input label="Phone Number" required name="phone" value={formData.phone} onChange={handleInputChange} />
            <Input label="Secondary Phone Number" name="secondaryPhone" value={formData.secondaryPhone} onChange={handleInputChange} />
            <Input label="Email" type="email" required name="email" value={formData.email} onChange={handleInputChange} />
            <Input label="Occupation" name="occupation" value={formData.occupation} onChange={handleInputChange} />
            <Input label="Company/Organization" name="company" value={formData.company} onChange={handleInputChange} />
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2 text-slate-700">Current Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Select label="Province" options={['1', '2', '3']} required name="province" value={formData.province} onChange={handleInputChange} />
            <Select label="District" options={['Kathmandu', 'Lalitpur']} required name="district" value={formData.district} onChange={handleInputChange} />
            <Select label="Municipality" options={['KMC', 'LMC']} required name="municipality" value={formData.municipality} onChange={handleInputChange} />
            <Input label="Ward" name="ward" value={formData.ward} onChange={handleInputChange} />
            <Input label="Street Address" name="streetAddress" value={formData.streetAddress} onChange={handleInputChange} />
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2 text-slate-700">Course Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select label="Course" options={['Frontend', 'Backend']} required name="course" value={formData.course} onChange={handleInputChange} />
            <Select label="Course Type" options={['Online', 'Offline']} required name="courseType" value={formData.courseType} onChange={handleInputChange} />
            <Input label="Course Fee" name="courseFee" value={formData.courseFee} onChange={handleInputChange} />
            <Input label="Start Date" type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} />
            <Input label="End Date" type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} />
            <Select label="Course Center" options={['Center A', 'Center B']} name="courseCenter" value={formData.courseCenter} onChange={handleInputChange} />
            <Select label="Teacher" options={['John Doe', 'Jane Smith']} name="teacher" value={formData.teacher} onChange={handleInputChange} />
          </div>
        </div>

        <div>
          <label className="text-sm text-slate-600">Remarks</label>
          <textarea
            className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write short remarks (if any)"
            name="remarks"
            value={formData.remarks}
            onChange={handleInputChange}
            rows={3}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-800 text-white px-6 py-2 rounded hover:bg-blue-900 transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudentForm;
