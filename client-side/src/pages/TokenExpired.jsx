import { useNavigate } from "react-router-dom";

export default function TokenExpired() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white px-6 font-poppins 
                    dark:bg-gradient-to-br dark:from-[#071018] dark:to-[#071426]">
      
      <div className="bg-white rounded-2xl shadow-lg text-center p-10 max-w-md w-full animate-[popIn_0.5s_ease-out]
                      dark:bg-[#071826] dark:border dark:border-[rgba(255,255,255,0.05)] dark:shadow-[0_10px_30px_rgba(2,6,23,0.6)]">

        <div className="text-yellow-500 mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 h-20 mx-auto"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
          </svg>
        </div>

        <h1 className="font-montserrat font-semibold text-2xl text-gray-800 mb-4 dark:text-gray-100">
          Verification Link Expired
        </h1>
        <p className="text-gray-600 text-base leading-relaxed mb-8 dark:text-gray-300">
          This verification link has expired. Please request a new verification email to complete your registration.
        </p>
<div className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/emailVerfication")}
            className="bg-orange-500 text-white font-semibold py-3 rounded-lg shadow-md 
                       hover:bg-orange-600 hover:shadow-lg transition-all duration-300"
          >
            Request New Verification Email
          </button>

          <button
            onClick={() => navigate("/login")}
            className="border-2 border-orange-500 text-orange-500 font-semibold py-3 rounded-lg transition-all duration-300
                       hover:bg-orange-50 hover:border-orange-600 hover:text-orange-600 
                       dark:border-orange-400 dark:text-orange-400 dark:hover:bg-[#0b1e2b] dark:hover:border-orange-300"
          >
            Back to Login
          </button>
        </div>
      </div>
      <style>{`
        @keyframes popIn {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}