// src/Components/Register.jsx

import React from "react";

// Final styles object with all modifications
const styles = {
  // Main container that fills the screen
  container: {
    position: "relative",
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    fontFamily: '"Poppins", sans-serif',
  },
  // Background video
  backgroundVideo: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transform: "translate(-50%, -50%)",
    zIndex: 1,
  },
  // Frosted glass effect registration card
  formCard: {
    position: "relative",
    zIndex: 2,
    width: "90%",
    maxWidth: "420px",
    padding: "40px 30px",
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Slightly more opaque
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "20px",
    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
    textAlign: "center",
    color: "white",
  },
  // Form title
  title: {
    marginBottom: "25px",
    fontSize: "2.2rem",
    fontWeight: "700",
    color: "#FFD700", // Golden yellow for the title
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Added for readability
  },
  // Form element
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  // Input fields
  input: {
    width: "100%",
    padding: "14px 20px",
    borderRadius: "10px",
    border: "1px solid rgba(255, 255, 255, 0.5)",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "white",
    fontSize: "16px",
    boxSizing: "border-box",
    outline: "none",
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.4)", // Added for readability
  },
  // Register button
  button: {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#D2691E", // Chocolate / Burnt Orange color
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    marginTop: "10px",
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.4)", // Added for readability
  },
  // Link to login page
  loginLink: {
    marginTop: "20px",
    fontSize: "14px",
    textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)", // Added for readability
  },
  // Style for the link
  link: {
    color: "#FFD700", // Golden yellow for the link, matches title
    fontWeight: "bold",
    textDecoration: "none",
    cursor: "pointer",
  },
};

const Register = () => {
  return (
    <div style={styles.container}>
      <video autoPlay loop muted style={styles.backgroundVideo}>
        {/* Make sure your video file is in the "public" folder */}
        <source src="/Food_Video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div style={styles.formCard}>
        <h1 style={styles.title}>Create Account</h1>

        <form style={styles.form}>
          <input
            style={styles.input}
            type="text"
            placeholder="Full Name"
            required
          />
          <input
            style={styles.input}
            type="email"
            placeholder="Email Address"
            required
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            required
          />
          <button style={styles.button} type="submit">
            Register
          </button>
        </form>

        <p style={styles.loginLink}>
          Already have an account?{" "}
          <a href="/login" style={styles.link}>
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;