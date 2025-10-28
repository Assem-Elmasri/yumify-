// src/Components/Register.jsx
import React from "react";
import "@fontsource/cormorant-garamond"; // Elegant title font
import "@fontsource/dm-sans"; // Clean body font

const Register1 = () => {
  return (
    <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden text-white font-[DM_Sans]">
      {/* 🔹 Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-1/2 left-1/2 w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 z-[1] brightness-[0.35] contrast-[1.1] saturate-[1.2]"
      >
        <source
          src="/Samsung_Style_Food_Commercial_Video.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* 🔹 Golden overlay for warmth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70 z-[1]" />

      {/* 🔹 Glassmorphic card */}
      <div
        className="relative z-[2] w-[90%] max-w-md p-10 rounded-2xl border border-[#d4af37]/30 
                   bg-white/10 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)]
                   animate-fade-in-up transition-all duration-700"
      >
        {/* 🔹 Soft glowing border */}
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-tr from-[#b87333]/40 via-[#d4af37]/20 to-transparent blur-2xl opacity-70" />

        {/* 🔹 Title */}
        <h1
          className="relative mb-8 text-4xl font-[Cormorant_Garamond] font-extrabold text-center 
                     tracking-wider text-transparent bg-clip-text 
                     bg-gradient-to-r from-[#d4af37] via-[#ffcc70] to-[#f9d976]
                     drop-shadow-[0_0_12px_rgba(0,0,0,0.6)]"
        >
          Create Account
        </h1>

        {/* 🔹 Form */}
        <form className="relative flex flex-col gap-4 text-base tracking-wide">
          <input
            type="text"
            placeholder="Full Name"
            required
            className="w-full px-5 py-3 rounded-lg border border-[#d4af37]/30 bg-white/10 text-white
                       placeholder-white/70 outline-none
                       focus:border-[#d4af37] focus:bg-white/15 
                       focus:shadow-[0_0_12px_rgba(212,175,55,0.4)]
                       transition-all duration-300"
          />
          <input
            type="email"
            placeholder="Email Address"
            required
            className="w-full px-5 py-3 rounded-lg border border-[#d4af37]/30 bg-white/10 text-white
                       placeholder-white/70 outline-none
                       focus:border-[#d4af37] focus:bg-white/15 
                       focus:shadow-[0_0_12px_rgba(212,175,55,0.4)]
                       transition-all duration-300"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full px-5 py-3 rounded-lg border border-[#d4af37]/30 bg-white/10 text-white
                       placeholder-white/70 outline-none
                       focus:border-[#d4af37] focus:bg-white/15 
                       focus:shadow-[0_0_12px_rgba(212,175,55,0.4)]
                       transition-all duration-300"
          />

          {/* 🔹 Button */}
          <button
            type="submit"
            className="w-full py-3 mt-2 rounded-lg 
                       bg-gradient-to-r from-[#b87333] via-[#d4af37] to-[#f9d976]
                       text-black text-lg font-semibold tracking-wide
                       shadow-[0_0_20px_rgba(212,175,55,0.3)]
                       hover:scale-[1.04] hover:shadow-[0_0_35px_rgba(212,175,55,0.5)]
                       transition-all duration-300"
          >
            Register
          </button>
        </form>

        {/* 🔹 Login link */}
        <p className="mt-6 text-sm text-center text-white/90 relative">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-[#d4af37] font-semibold hover:text-[#f9d976] hover:underline transition-colors duration-200"
          >
            Log In
          </a>
        </p>
      </div>

      {/* 🔹 Animation */}
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(25px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.9s ease-out both;
        }
      `}</style>
    </div>
  );
};

export default Register1;
