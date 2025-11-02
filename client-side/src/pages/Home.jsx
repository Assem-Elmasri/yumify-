import { useEffect, useState } from "react";
import foodAPI from "../apis/food.api";
import Food from "../components/Food.jsx";
import userAPI from "../apis/user.api.js";
import { useNavigate } from "react-router";

const Home = () => {
  const [sideBarOpened, setSideBarOpened] = useState(false); // false means closed, true means opened
  const [userData, setUserData] = useState(null);
  const [cartOpened, setCartOpened] = useState(false); // false means closed, true means opened
  const [foods, setFoods] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const navigator = useNavigate()

  useEffect(() => {
    userAPI.get("/profile").then((res) => setUserData(res.data));
  }, []);
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim() === "") {
        foodAPI
          .get("/")
          .then((response) => {
            setFoods(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        foodAPI
          .get(`/search?q=${searchTerm.trim()}`)
          .then((response) => {
            setFoods(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside
          id="sidebar"
          className={`sidebar fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 p-6 flex flex-col transform ${
            !sideBarOpened ? "-translate-x-full" : "translate-x-0"
          } transition-transform duration-300 ease-in-out `}
        >
          <h2 className="font-logo text-4xl text-orange-500 mb-8">Yumify</h2>
          <nav className="flex flex-col space-y-4 text-lg">
            <a
              href="#"
              className="flex items-center space-x-3 p-2 rounded-lg text-gray-700 hover:bg-orange-50"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>{" "}
              <span>Menu</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 p-2 rounded-lg text-gray-700 hover:bg-orange-50"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                ></path>
              </svg>{" "}
              <span>My Orders</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 p-2 rounded-lg text-gray-700 hover:bg-orange-50"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>{" "}
              <span>Favorites</span>
            </a>
          </nav>
          <div className="mt-auto">
            <a
              href="#"
              className="flex items-center space-x-3 p-2 mt-2 rounded-lg text-gray-700 hover:bg-orange-50"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                ></path>
              </svg>{" "}
              <span onClick={()=>{
                userAPI.post("/logout").then(()=>{
                  navigator('/login')
                })

              }}>Logout</span>
            </a>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Top Bar  */}
          <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-20 p-4 flex justify-between items-center shadow-sm">
            <button
              id="sidebar-toggle"
              className="p-2 rounded-full text-gray-700 hover:bg-gray-200"
              onClick={() => {
                setSideBarOpened(!sideBarOpened);
              }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
            <div className="relative w-full max-w-md mx-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                id="search-input"
                placeholder="Search for dishes..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 bg-gray-50 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <div className="flex items-center space-x-4">
              {userData ? (
                <button
                  onClick={() => navigator("/profile")}
                  className="p-2 w-14 h-14 rounded-full text-gray-700 hover:bg-gray-200"
                >
                  <div>
                    <img
                      src={`http://localhost:5000/uploads/users/${userData.imageUrl}`}
                      alt="Profile Pic"
                      className="rounded-full"
                    />
                  </div>
                </button>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>{" "}
                </svg>
              )}
            </div>
          </header>

          <main className="flex-1 p-6">
            {/* Category Tabs */}
            <section className="mb-8">
              <div className="flex items-center space-x-6 sm:space-x-10 border-b border-gray-200">
                <span
                  onClick={() => setSelectedCategory("all")}
                  className="menu-category-tab font-tabs py-3 text-lg cursor-pointer text-gray-500 hover:text-orange-500 transition-colors active"
                >
                  All
                </span>
                <span
                  onClick={() => setSelectedCategory("Starter")}
                  className="menu-category-tab font-tabs py-3 text-lg cursor-pointer text-gray-500 hover:text-orange-500 transition-colors"
                >
                  Starters
                </span>
                <span
                  onClick={() => setSelectedCategory("MainDish")}
                  className="menu-category-tab font-tabs py-3 text-lg cursor-pointer text-gray-500 hover:text-orange-500 transition-colors"
                >
                  Main Dishes
                </span>
                <span
                  onClick={() => setSelectedCategory("Appetizer")}
                  className="menu-category-tab font-tabs py-3 text-lg cursor-pointer text-gray-500 hover:text-orange-500 transition-colors"
                >
                  Appetizers
                </span>
                <span
                  onClick={() => setSelectedCategory("Dessert")}
                  className="menu-category-tab font-tabs py-3 text-lg cursor-pointer text-gray-500 hover:text-orange-500 transition-colors"
                >
                  Desserts
                </span>
                <span
                  className="menu-category-tab font-tabs py-3 text-lg cursor-pointer text-gray-500 hover:text-orange-500 transition-colors"
                  onClick={() => setSelectedCategory("Drink")}
                >
                  Drinks
                </span>
              </div>
            </section>

            {/* Menu Grid */}
            <div
              id="menu-items-grid"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {/* Menu items */}
              {foods
                .filter((food) =>
                  selectedCategory === "all"
                    ? true
                    : food.category === selectedCategory
                )
                .map((food) => (
                  <Food key={food._id} foodObj={food} />
                ))}
            </div>
            <div
              id="empty-category-message"
              className="hidden text-center text-slate-500 mt-10"
            >
              <p className="text-xl font-semibold">No dishes found!</p>
              <p>Try a different category or search term.</p>
            </div>
          </main>
        </div>
      </div>

      {/* Floating Cart & Drawer  */}
      <div
        id="floating-cart-button"
        onClick={() => setCartOpened(true)}
        className="fixed bottom-8 right-8 bg-slate-800 rounded-full shadow-lg cursor-pointer p-4 transition-transform hover:scale-110"
      >
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          ></path>
        </svg>
        <span
          id="cart-item-count"
          className="absolute top-0 right-0 px-2 py-0.5 bg-orange-500 text-white rounded-full font-semibold text-xs"
        >
          0
        </span>
      </div>
      <div
        id="overlay"
        className={`overlay fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out ${
          cartOpened || sideBarOpened
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
        onClick={() => {
          setCartOpened(false);
          setSideBarOpened(false);
        }}
      ></div>
      <div
        id="mini-cart-drawer"
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-lg z-50 flex flex-col transform ${
          cartOpened ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-bold text-slate-800">Your Order</h2>
          <button
            id="close-cart-btn"
            onClick={() => setCartOpened(false)}
            className="text-2xl text-slate-500 hover:text-slate-800"
          >
            &times;
          </button>
        </div>
        <div
          id="cart-items-container"
          className="flex-grow p-5 overflow-y-auto"
        >
          <div
            id="empty-cart-message"
            className="text-center text-slate-500 mt-10"
          >
            <p className="text-lg">Your cart is empty.</p>
            <p>Start by adding your favorite dishes!</p>
          </div>
        </div>
        <div className="p-5 border-t bg-slate-50">
          <div className="flex justify-between font-bold text-lg mb-4 text-slate-800">
            <span>Total:</span>
            <span id="cart-total">$0.00</span>
          </div>
          <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors">
            Checkout
          </button>
        </div>
      </div>

      {/* Toast Notification  */}
      <div
        id="toast-notification"
        className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-6 py-3 rounded-full shadow-lg hidden z-50"
      >
        <p id="toast-message">Item added to cart!</p>
      </div>
    </>
  );
};

export default Home;
