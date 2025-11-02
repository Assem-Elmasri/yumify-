import {Eye,EyeClosed} from 'lucide-react'
import { useState } from 'react';
import userAPI from '../apis/user.api'
import { useEffect } from 'react';
import ThemeToggleBtn from '../components/ThemeToggleBtn';



const Profile = () => {
  const [pass,setPass] = useState('')
  const [newPass,setNewPass]= useState('')
  const [reNewPass,setNewRePass] = useState('')
  const [passwordShowen,setPasswordShowen] = useState(false)
  const [passwordRepeatShowen,setPasswordRepeatShowen] = useState(false)
  const [image,setImage] = useState(null)
  const profileForm = new FormData()
  const [userData,setUserData] = useState(null)
  const [errorMsg,setErrorMsg] = useState('') //should be 'short' or 'diff'
useEffect(()=>{
  userAPI.get('/profile').then((res)=>{
    if(res.data) setUserData(res.data)
    else console.log('user data doesnt return')
  })
},[])
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
                src={userData?`http://localhost:5000/uploads/users/${userData.imageUrl}`:"https://placehold.co/128x128/E5E5E5/999999?text=Upload"}
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-100"
                alt="Profile ALT Picture"
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
                onChange={(e)=>setImage(e.target.files[0])}
                className="hidden"
                accept="image/*"
                onClick={()=>{
                  profileForm.append("profile",image)
                  userAPI.put('/addUserProfile',profileForm)
                }}
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
                    readOnly
                    value={userData?userData.name:'default name'}
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
                    value={userData?userData.email:'example@provider.com'}
                    readOnly
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
                  value={userData?userData.phone:"Phone number isn't provided"}
                  readOnly
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
              value={pass}
              onChange={(e)=>setPass(e.target.value)}
              className="w-full p-3 rounded-md form-input border-2 border-solid border-gray-200 transition-shadow focus:border-orange-400 focus:shadow-sm focus:shadow-orange-400 focus:outline-none"
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-sub text-center"
              onClick={()=>setPasswordShowen(!passwordShowen)}
            > 
              <Eye className={`w-5 h-5 icon-eye text-gray-400 ${!passwordShowen?'':'hidden'}`}   />
              <EyeClosed className={`w-5 h-5 icon-eye text-gray-400 ${passwordShowen?'':'hidden'}`} />
            </button>
          </div>
          <div className="relative">
            <label
              htmlFor="new-password"
              className="block text-sm font-medium text-sub mb-1 text-gray-400"
              >New Password</label>
            <input
              type={!passwordRepeatShowen?"password":'text'}
              id="new-password"
              value={newPass}
              onChange={(e)=>{setNewPass(e.target.value)}}
              className="w-full p-3 rounded-md border-2 border-solid border-gray-200 transition-shadow focus:border-orange-400 focus:shadow-sm focus:shadow-orange-400 focus:outline-none"
              aria-describedby="password-help"
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-sub"
              onClick={()=>{setPasswordRepeatShowen(!passwordRepeatShowen)}}
            >
              <Eye className={`w-5 h-5 icon-eye text-gray-400 ${!passwordRepeatShowen?'':'hidden'}`}   />
              <EyeClosed className={`w-5 h-5 icon-eye text-gray-400 ${passwordRepeatShowen?'':'hidden'}`} />
            </button>
            <p id="password-help" className={`block text-xs font-medium text-sub mb-1 text-gray-400 ${errorMsg === 'short'?'':'hidden'}`}>
              Minimum 8 characters.
            </p>
            <p id="new-password-error" className={`block text-xs font-medium text-sub mb-1 text-gray-400 ${errorMsg === 'diff'?'':'hidden'}`}>
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
              value={reNewPass}
              onChange={(e)=>setNewRePass(e.target.value)}
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
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 rounded-md border-2 border-orange-400 text-orange-400 font-semibold hover:bg-orange-100 transition-all duration-300"
              onClick={(e)=>{
                e.preventDefault()
                setErrorMsg('')
                if(newPass.length<8) {
                  setErrorMsg('short')
                  return
                }
                if( newPass !== reNewPass){
                  setErrorMsg('diff')
                  return
                }
                userAPI.put('/updatePassword',{password:pass,newPassword:newPass})
              }}
            >
              Update Password
            </button>
          </div>
        </form>
        </div>
        {/* Card 3 notification prefrences */}
        {/* {
          false  ? 
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
        : null
        } */}
      </div>
    </main>
  );
};

export default Profile;
