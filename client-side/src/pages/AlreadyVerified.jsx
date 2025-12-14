import { useNavigate } from "react-router";

export default function AlreadyVerified() {
    const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white px-6 font-poppins 
                    dark:bg-gradient-to-br dark:from-[#071018] dark:to-[#071426]">
      
      <div className="bg-white rounded-2xl shadow-lg text-center p-10 max-w-md w-full animate-[popIn_0.5s_ease-out]
                      dark:bg-[#071826] dark:border dark:border-[rgba(255,255,255,0.05)] dark:shadow-[0_10px_30px_rgba(2,6,23,0.6)]">

        <div className="text-orange-500 mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 h-20 mx-auto"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
          </svg>
        </div>

        <h1 className="font-montserrat font-semibold text-2xl text-gray-800 mb-4 dark:text-gray-100">
          Already Verified
        </h1>
        <p className="text-gray-600 text-base leading-relaxed mb-8 dark:text-gray-300">
          Your email has already been verified. You can proceed to log in to your account.
        </p>
<button
          onClick={() => navigate("/login")}
          className="bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md w-full
                     hover:bg-orange-600 hover:shadow-lg transition-all duration-300"
        >
          Go to Login
        </button>
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