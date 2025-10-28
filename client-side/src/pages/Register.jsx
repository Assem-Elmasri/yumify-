import React, { useState } from "react";
import Logo from "../components/logo";
import Button from "../components/Button";
import SmartRestaurant from "../components/SmartRestaurant";
import { Link } from "react-router-dom";

// prettier-ignore
const Register = ({backgroundColor = "bg-[linear-gradient(135deg,#f0f2f5_0%,#e0e5ec_100%)]"}) => {
  const[fullName,setFullName]=useState("");
  const[regEmail,setRegEmail]=useState("");
  const[createPassword,setCreatePassword]=useState("");
  const[confirmPassword,setConfirmPassword]=useState("");
  const [role, setRole] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit=(e)=>{

e.preventDefault();
  const formData = {
    fullName,
    regEmail,
    createPassword,
    confirmPassword,
    role,
    termsAccepted,
  };

  console.log("Form submitted:", formData);

  }
  return (
    <>
      <div className={`login-body flex justify-center items-center min-h-[100vh] ${backgroundColor}`}>
        <div
          className={`login-container  bg-blur-[10px] rounded-[20px] shadow-[0_10px_30px_rgba(0,_0,_0,_0.1)] flex max-w-[900px] w-[90%] overflow-hidden min-height-[500px] max-md:flex-col max-w-[400px] min-h-[0]`}
        >

          {/* login card container */}

          <div className="login-form-section  bg-[#FBFCFD] flex-1 p-[10px] flex-col justify-center items-center text-center  max-md:p-[30px] max-md: min-h-[80%]">
            <Logo logoSize="text-[35px]"/>
            <SmartRestaurant textSize="text-[15px]"/>
            <h1 className="text-[25px] font-[600] m-[20px_5px_15px_5px]">
              Create Your Acounte!
            </h1>
            <div className=" w-[100%] flex flex-col gap-[5px] justify-center ">

              {/* the form creation */}

              <form  onSubmit={handleSubmit} action="" className="flex flex-col gap-[15px] items-center p-[0px_35px]">

                <input
                className="p-[12px] rounded-[8px] border-[2px] border-[#E0E0E0] w-[100%]" type="text" placeholder="Full Name"
                name="fullName"
                value={fullName}
                onChange={(e)=>setFullName(e.target.value)}
                />
                
                <input 
                className="p-[12px] rounded-[8px] border-[2px] border-[#E0E0E0] w-[100%]" type="email" placeholder="Email"
                name="regEmail"
                value={regEmail}
                onChange={(e)=>setRegEmail(e.target.value)}
                />
                
                <input
                className="p-[12px] rounded-[8px] border-[2px] border-[#E0E0E0] w-[100%]" type="password" placeholder="Password"
                name="createPassword"
                value={createPassword}
                onChange={(e)=>setCreatePassword(e.target.value)}
                />
                
                <input
                className="p-[12px] rounded-[8px] border-[2px] border-[#E0E0E0] w-[100%]" type="password" placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                />
                
                      <select 
                       className="select-field p-[12px] rounded-[8px] border-[2px] border-[#E0E0E0] w-[100%]" required
                       name="role"
                       value={role}
                       onChange={(e)=>setRole(e.target.value)}
                       >
                        <option value="" disabled >Select Role</option>
                        <option value="customer">Customer</option>
                        <option value="supplier">Supplier</option>
                        <option value="admin">Admin</option>
                    </select>

                      <div className="checkbox-container flex items-center justify-center mt-[5px] mb-[5px]">
                        <input 
                        className="mr-[5px]" type="checkbox" id="terms" required
                        checked={termsAccepted}
                        onChange={(e)=>setTermsAccepted(e.target.checked)}
                        />
                        <label htmlFor="terms" className="text-sm text-gray-700">I agree to the <Link href="#" className="text-[#FF784E] no-underline hover:underline transform hover:text-red-500 transition duration-300 ease">terms and conditions</Link></label>
                    </div>
                <Button buttonText={"Create Acount"}/>
              </form>


              {/* prettier-ignore */}
              <div className="p-[10px]"><span className="pr-[5px]">Already have an account?</span><Link to="" className="font-[500] text-[#FF784E] no-underline hover:underline transform hover:text-red-500 transition duration-300 ease">Login</Link></div>
            </div>
          </div>

          {/* img container */}
          {/* prettier-ignore */}
          <div className="max-md:  rounded-tl-[0px] rounded-tr-[0px] rounded-bl-[0] md:flex-1 overflow-hidden bg-[linear-gradient(135deg,#FF7043_0%,#FFCCBB_100%)] flex justify-center items-center  relative max-md:max-h-[100px] md:max-h-none">
            <img className="custom-img-animation max-w-[100%] h-[100%] animate-[rightToLeft_0.9s_ease-out_forwards max-md:hidden" src="/berger.png" alt="" />
            <img className="custom-img-animation max-w-[100%] h-[100%] animate-[rightToLeft_0.9s_ease-out_forwards md:hidden w-[100%] h-[600px]" src="/berger650.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
