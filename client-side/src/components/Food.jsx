import React from "react";
import { useNavigate } from "react-router-dom";


const Food = ({foodObj}) => {

  const navigator = useNavigate()
  return (
    <div onClick={()=>navigator(`/${foodObj._id}`)} className="food-card rounded-2xl shadow-lg transition-transform hover:translate-y-[-5px] hover:shadow-xl">
      <img
        className="w-full h-56 object-cover rounded-t-2xl"
        src={`http://localhost:5000/${foodObj.imageUrl}`}
        alt={foodObj.name}
      />
      <div className="p-6">
        <h3 className="text-2xl text-slate-900">{foodObj.name}</h3>
        <p className="text-slate-500 mt-2 text-sm">{foodObj.description}</p>
        <div className="flex justify-between items-center mt-5">
          <span className="text-2xl font-bold text-orange-500">${foodObj.price.toFixed(2)}</span>
          <button
            className="add-to-cart-btn px-5 py-2 rounded-full font-semibold text-white bg-orange-500 hover:bg-orange-600 transition-colors"
            // onClick={}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Food;
