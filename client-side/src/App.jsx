
import "./App.css";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import FoodDetails from './pages/FoodDetails'
import {Routes,Route} from 'react-router'
import Register from "./pages/Regsiter";
import Login from "./pages/Login";

function App() {
  return (
    < >
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path=':foodid' element={<FoodDetails/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </>
  )
}

export default App;
