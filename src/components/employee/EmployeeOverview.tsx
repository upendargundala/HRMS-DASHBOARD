"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";

export default function EmployeeOverview() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    // Avatar & Basic Info
    fullName: "Pillalamarrri Varun",
    role: "UI/UX Designer",

    // Personal Details
    contact: "+91 99999 88888",
    dateOfBirth: "25-12-2002",
    gender: "Male",

    // Job Info
    joiningDate: "01-07-2023",
    department: "Engineering",
    salary: "₹65,000",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Here you would typically send the data to your API
    console.log("Updated data:", formData);
    setIsEditModalOpen(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow">
      {/* Avatar and Name Section with Edit Button */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <img
            src="/avatar.png"
            alt="employee"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="text-xl font-semibold">{formData.fullName}</h2>
            <p className="text-gray-500">{formData.role}</p>
          </div>
        </div>

        {/* Edit Profile Button */}
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-800 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
        >
          <Pencil className="w-4 h-4" />
          Edit Profile
        </button>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-800">
                Edit Employee Details
              </h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                &times;
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Avatar and Basic Info Section in Modal */}
                <div className="md:col-span-2">
                  <h3 className="font-semibold text-lg mb-4 text-gray-700">
                    Basic Information
                  </h3>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <img
                        src="/avatar.png"
                        alt="avatar"
                        className="w-20 h-20 rounded-full"
                      />
                      <button
                        type="button"
                        onClick={() => alert("Change avatar clicked")}
                        className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1.5 rounded-full hover:bg-blue-700"
                      >
                        <Pencil className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="flex-1">
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Role
                          </label>
                          <input
                            type="text"
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Personal Details Column */}
                <div>
                  <h3 className="font-semibold text-lg mb-4 text-gray-700">
                    Personal Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Contact Number
                      </label>
                      <input
                        type="tel"
                        name="contact"
                        value={formData.contact}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date of Birth
                      </label>
                      <input
                        type="text"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        placeholder="DD-MM-YYYY"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gender
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">
                          Prefer not to say
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Job Info Column */}
                <div>
                  <h3 className="font-semibold text-lg mb-4 text-gray-700">
                    Job Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Joining Date
                      </label>
                      <input
                        type="text"
                        name="joiningDate"
                        value={formData.joiningDate}
                        onChange={handleInputChange}
                        placeholder="DD-MM-YYYY"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Department
                      </label>
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Engineering">Engineering</option>
                        <option value="Finance">Finance</option>
                        <option value="HR">HR</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Sales">Sales</option>
                        <option value="Design">Design</option>
                        <option value="Operations">Operations</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Salary
                      </label>
                      <input
                        type="text"
                        name="salary"
                        value={formData.salary}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-3 mt-8 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Details */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="font-semibold mb-4">Personal Details</h3>
          <div className="space-y-4 text-sm">
            <div>
              <span className="text-gray-500 block">Contact</span>
              <span className="font-medium">{formData.contact}</span>
            </div>
            <div>
              <span className="text-gray-500 block">Date of Birth</span>
              <span className="font-medium">{formData.dateOfBirth}</span>
            </div>
            <div>
              <span className="text-gray-500 block">Gender</span>
              <span className="font-medium">{formData.gender}</span>
            </div>
          </div>
        </div>

        {/* Job Info */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="font-semibold mb-4">Job Info</h3>
          <div className="space-y-4 text-sm">
            <div>
              <span className="text-gray-500 block">Joining Date</span>
              <span className="font-medium">{formData.joiningDate}</span>
            </div>
            <div>
              <span className="text-gray-500 block">Department</span>
              <span className="font-medium">{formData.department}</span>
            </div>
            <div>
              <span className="text-gray-500 block">Salary</span>
              <span className="font-medium">{formData.salary}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
