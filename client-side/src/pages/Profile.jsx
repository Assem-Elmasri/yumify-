import {Eye,EyeClosed} from 'lucide-react'
import { useState } from 'react';

const Profile = () => {
  const [passwordShowen,setPasswordShowen] = useState(false)
  return (
    // Wrapper
    <main className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 bg-gray-100">
      {/* Card holder */}
      <div className="w-full max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-main text-center">
          Account Settings
        </h1>
        {/* card 1 photo / name / phone */}
        <div className="bg-white rounded-lg shadow-soft p-6 md:p-8 border border-[#e5e5e5]">
          <h2 className="text-xl font-semibold text-main mb-6">
            Profile Information
          </h2>
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="flex-shrink-0">
              <img
                id="profile-img"
                src="https://placehold.co/128x128/E5E5E5/999999?text=Upload"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-100"
                alt="Profile Picture"
              />
              <label
                htmlFor="profile-upload"
                className="block text-sm text-center text-orange-400 font-medium mt-2 cursor-pointer hover:underline "
              >
                Change Photo
              </label>
              <input
                type="file"
                id="profile-upload"
                className="hidden"
                accept="image/*"
              />
            </div>
            <div className="w-full space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="full-name"
                    className="block text-sm font-medium text-sub mb-1 text-gray-400"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="full-name"
                    defaultValue="Jane Doe"
                    className="w-full p-3 rounded-md form-input border-2 border-solid border-gray-200 transition-shadow focus:border-orange-400 focus:shadow-sm focus:shadow-orange-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-sub mb-1 text-gray-400"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    defaultValue="jane.doe@example.com"
                    className="w-full p-3 rounded-md form-input border-2 border-solid border-gray-200 transition-shadow focus:border-orange-400 focus:shadow-sm focus:shadow-orange-400 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-sub mb-1 text-gray-400"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  defaultValue="+1 (555) 123-4567"
                  className="w-full p-3 rounded-md form-input border-2 border-solid border-gray-200 transition-shadow focus:border-orange-400 focus:shadow-sm focus:shadow-orange-400 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
        {/* card 2 change password */}
        <div className="bg-white rounded-lg shadow-soft p-6 md:p-8 border border-[#e5e5e5]">
          <h2 className="text-xl font-semibold text-main mb-6">Change Password</h2>
        <form id="password-form" className="space-y-4" >
          <div className="relative">
            <label
              htmlFor="current-password"
              className="block text-sm font-medium text-sub mb-1 text-gray-400"
              >Current Password</label
            >
            <input
              type={`${!passwordShowen?'password':'text'}`}
              id="current-password"
              className="w-full p-3 rounded-md form-input border-2 border-solid border-gray-200 transition-shadow focus:border-orange-400 focus:shadow-sm focus:shadow-orange-400 focus:outline-none"
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-sub"
              onClick={()=>setPasswordShowen(!passwordShowen)}
            > 
              <Eye className='w-5 h-5 icon-eye text-gray-400 '   />
              <EyeClosed className='w-5 h-5 icon-eye-off hidden' />
            </button>
          </div>
          <div className="relative">
            <label
              htmlFor="new-password"
              className="block text-sm font-medium text-sub mb-1 text-gray-400"
              >New Password</label>
            <input
              type="password"
              id="new-password"
              className="w-full p-3 rounded-md form-input border-2 border-solid border-gray-200 transition-shadow focus:border-orange-400 focus:shadow-sm focus:shadow-orange-400 focus:outline-none"
              aria-describedby="password-help"
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-sub"
              onClick={()=>{}}
            >
              <i data-lucide="eye" className="w-5 h-5 icon-eye"></i>
              <i data-lucide="eye-off" className="w-5 h-5 icon-eye-off hidden"></i>
            </button>
            <p id="password-help" className="block text-xs font-medium text-sub mb-1 text-gray-400">
              Minimum 8 characters.
            </p>
            <p id="new-password-error" className="error-message">
              Passwords do not match or are too short.
            </p>
          </div>
          <div className="relative">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-sub mb-1 text-gray-400"
              >Confirm New Password</label
            >
            <input
              type="password"
              id="confirm-password"
              className="w-full p-3 rounded-md form-input border-2 border-solid border-gray-200 transition-shadow focus:border-orange-400 focus:shadow-sm focus:shadow-orange-400 focus:outline-none"
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-sub"
              onClick={()=>{}}
            >
              <i data-lucide="eye" className="w-5 h-5 icon-eye"></i>
              <i data-lucide="eye-off" className="w-5 h-5 icon-eye-off hidden"></i>
            </button>
            <p id="confirm-password-error" className="error-message">
              Passwords do not match.
            </p>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 rounded-md border-2 border-orange-400 text-orange-400 font-semibold hover:bg-orange-100 transition-all duration-300"
            >
              Update Password
            </button>
          </div>
        </form>
        </div>
        {/* Card 3 notification prefrences */}
        <div className="bg-white rounded-lg shadow-soft p-6 md:p-8 border border-[#e5e5e5]">
          <h2 className="text-xl font-semibold text-main mb-6">
          Notification Preferences
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="toggle-orders" className="font-medium text-main"
              >New Order Notifications</label
            >
            <input
              type="checkbox"
              id="toggle-orders"
              className="toggle-checkbox"
              checked
            />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="toggle-stock" className="font-medium text-main"
              >Low Stock Alerts</label
            >
            <input type="checkbox" id="toggle-stock" className="toggle-checkbox" />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="toggle-feedback" className="font-medium text-main"
              >Customer Feedback Alerts</label
            >
            <input
              type="checkbox"
              id="toggle-feedback"
              className="toggle-checkbox"
              
            />
          </div>
        </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
