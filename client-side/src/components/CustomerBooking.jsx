import { useEffect, useState } from "react";
import Button from "./Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomerBooking = () => {
  const [bookData, setBookData] = useState({
    name: "",
    date: null,
    time: "50:00",
    peopleNumber: 1,
    tabelLocation: "Any Available",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedDate = bookData.date
      ? bookData.date.toISOString().split("T")[0]
      : null;

    setBookData({ ...bookData, date: formattedDate });
  };
  useEffect(() => {
    console.log("bookData changed:", bookData);
  }, [bookData.date]);

  const handleDate = (field, value) => {
    setBookData((prev) => ({ ...prev, [field]: value }));
  };
  return (
    <div className="w-[500px] rounded-[12px] p-[25px_30px_25px_30px]  flex flex-col justify-center items-center bg-white text-[15px]">
      <h2 className="text-[2.3em] mb-[5px] font-serif font-bold text-gray-800 ">
        Book a Table
      </h2>
      <p className="text-[1em] mb-[15px] font-[500] text-[#707785] text-center w-[350px]">
        Reserve your spot for an unforgettable dining experience.
      </p>
      {/* prettier-ignore */}
      <form onSubmit={handleSubmit} action="" className=" flex flex-col gap-[15px] w-[100%] mt-[10px]">

        {/* set the name */}

        <div className="text-[15px]">
          <label htmlFor="name" className=" text-[0.9em] block text-sm font-medium text-gray-700">Full Name</label>
          <input
            className="w-[100%] h-[50px] rounded-[5px] border border-[2px] text-[1.07em] pl-[10px]"
            placeholder="Enter your name"
            type="text"
            name="name"
            id="name"
            required
            value={bookData.name}
            onChange={(e) => setBookData({ ...bookData, name: e.target.value })}
          />
        </div>

          {/* date and time */}

        <div className="flex gap-[10px] mt-[5px] text-[15px]">
          <div className="flex flex-col flex-1">
            <label htmlFor="data" className="text-[0.9em] block text-sm font-medium text-gray-700">Data</label>
            <DatePicker
            required
            id="date"
            selected={bookData.date}
            onChange={(newDate) => handleDate("date",newDate)}
            placeholderText="mm-dd-yyyy"
            className="h-[50px] rounded-[5px] border border-[2px] text-[1.07em] pl-[10px]"
            dateFormat="MM-dd-yyyy"
            isClearable
            todayButton="Today"
            />
          </div>

          {/* set the time */}

          <div className="flex flex-col flex-1">
            <label htmlFor="time" className="text-[0.9em] block text-sm font-medium text-gray-700">Time</label>
                <select
                  id="time"
                  name="time"
                  value={bookData.time}
                  onChange={(e)=>setBookData({...bookData ,time:e.target.value})}
                  className="h-[50px] rounded-[5px] border border-[2px] text-[1.07em] pl-[10px]"
                  required
                >
                  <option value="5" selected>50:00</option>
                  <option value="5.5">05:30</option>
                  <option value="6">06:00</option>
                  <option value="6.5">06:30</option>
                  <option value="7">07:00</option>
                  <option value="7.5">07:30</option>
                  <option value="8">08:00</option>
                  <option value="8.5">08:30</option>
                  <option value="9">09:00</option>
                  <option value="9.5">09:30</option>
                  <option value="10">10:00</option>
                  <option value="10.5">10:30</option>
                  </select>
          </div>
        </div>

        {/* counter and location */}

        <div className="flex gap-[10px] mt-[5px] text-[15px]">
          <div className="flex flex-col flex-1">
            <span className="text-[12px] block text-[0.9em] font-medium text-gray-700">Number of People</span>

            <div className="h-[50px] rounded-[5px] border border-[2px] text-[1.07em]  flex justify-between items-center p-[0px_10px_0px_10px]">
              <button
                onClick={() => {
                  if (bookData.peopleNumber > 1) 
                    setBookData((prev)=>({...prev,peopleNumber: prev.peopleNumber-1}));
                }}
                className="text-[25px] text-prim p-[0px_10px_0px_10px] h-[90%] rounded-[8px] hover:bg-[#FFEDD5]"
                type="button"
              >
                -
              </button>
              <p className="text-[17px] font-[900]">{bookData.peopleNumber}</p>
              <button
                onClick={() => {
                  if (bookData.peopleNumber < 10)
                    setBookData((prev)=>({...prev,peopleNumber: prev.peopleNumber+1}));
                }}
                className="text-[25px] text-prim p-[0px_10px_0px_10px] h-[90%]  rounded-[8px] hover:bg-[#FFEDD5]"
                type="button"
              >
                +
              </button>
            </div>
          </div>

          {/* select the location */}

          <div className="flex flex-col flex-1 mb-[15px] text-[15px]">
            <label className="text-[0.9em] block  font-medium text-gray-700" htmlFor="tableLocation">Table Location</label>
            <select
              required
              name="tableLocation"
              id="tableLocation"
              value={bookData.tabelLocation}
              onChange={(e) => setBookData({...bookData ,tabelLocation: e.target.value})}
              className="h-[50px] rounded-[5px] border border-[2px] text-[1.07em] pl-[10px]"
            >
              <option value="Any Available" selected>
                Any Available
              </option>
              <option value="Window">Window</option>
              <option value="Outdoor">Outdoor</option>
              <option value="Private Room">Private Room</option>
            </select>
          </div>
        </div>

        <Button buttonText={"Book Table"} fontSize="text-[15px]" height="h-[43px]"/>
      </form>
    </div>
  );
};

export default CustomerBooking;
