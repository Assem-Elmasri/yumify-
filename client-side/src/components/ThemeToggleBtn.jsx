import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react"; 

function ThemeToggleBtn() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`relative flex items-center justify-between w-14 h-7 rounded-full transition-colors duration-300 ${
        darkMode ? "bg-gray-700" : "bg-gray-300"
      }`}
    >
      <span
        className={`absolute w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
          darkMode ? "translate-x-7" : "translate-x-1"
        }`}
      />
      <Sun className="absolute left-1 w-4 h-4 text-yellow-500" />
      <Moon className="absolute right-1 w-4 h-4 text-blue-400" />
    </button>
  );
}
export default ThemeToggleBtn;