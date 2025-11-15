import { useEffect, useState } from "react";
import Logo from "../components/logo";
import { Link } from "react-router-dom";

const Cart = () => {
  const [isMoved, setMove] = useState(false);
  const [orders, setOrders] = useState([
    {
      id: 2,
      name: "Grilled Salmon",
      price: 22.5,
      quantity: 1,
      image:
        "https://www.diabetesselfmanagement.com/wp-content/uploads/2007/09/dsm-simple-grilled-salmon-shutterstock-248850307.jpg",
    },
    {
      id: 5,
      name: "Pepperoni Pizza",
      price: 16.0,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop",
    },
    {
      id: 10,
      name: "Refreshing Mojito",
      price: 8.0,
      quantity: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStpF6qDJK4KNPMmSFCvZ9Mi3M-8oJnjvwEWA&s",
    },
    {
      id: 10,
      name: "Refreshing Mojito",
      price: 8.0,
      quantity: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStpF6qDJK4KNPMmSFCvZ9Mi3M-8oJnjvwEWA&s",
    },
    {
      id: 10,
      name: "Refreshing Mojito",
      price: 8.0,
      quantity: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStpF6qDJK4KNPMmSFCvZ9Mi3M-8oJnjvwEWA&s",
    },
    {
      id: 10,
      name: "Refreshing Mojito",
      price: 8.0,
      quantity: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStpF6qDJK4KNPMmSFCvZ9Mi3M-8oJnjvwEWA&s",
    },
  ]);
  let subTotal = 0;
  let taxes = 0;
  const taxRate = 0.05;
  let deliveryFee = 0;
  let total = 0;
  const [details, setDetails] = useState({
    subTotal: 0,
    taxes: 0,
    taxRate: taxRate,
    deliveryFee: 0,
    total: 0,
    promoCode: "",
  });
  useEffect(() => {
    orders.forEach(({ price, quantity }) => {
      subTotal += price * quantity;
    });
    taxes = parseFloat((taxRate * subTotal).toFixed(2));
    if (isMoved) {
      deliveryFee = 5.0;
    } else {
      deliveryFee = 0;
    }
    total = subTotal + taxes + deliveryFee;
    setDetails({
      subTotal: subTotal,
      taxes: taxes,
      taxRate: taxRate,
      deliveryFee: deliveryFee,
      total: total,
      promoCode: details.promoCode,
    });
  }, [orders, isMoved]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("the promoCode is: " + details);
    console.log(orders);
    console.log(details);
  };
  return (
    // the big container
    <div className="bg-[#F9FAFB]">
      <nav className="bg-white p-[15px_50px_15px_50px] flex justify-between items-center shadow-[0px_-8px_15px_gray] ">
        <Logo
          logoSize="text-[27px] max-xs:text-[15px] max-sm:text-[18px] "
          logoMargin="m-[0px]"
        />
        <Link
          to="/"
          className="text-prim text-[16px] p-[10px] rounded-[18px]  hover:bg-orange-100 transition duration-[0.3s] ease-in-out max-sm:text-[12px]"
        >
          Continue Ordering
        </Link>
      </nav>
      <div className="big-container p-[35px_45px]">
        <h1 className="text-[33px] font-serif m-[20px] mt-[0px] max-sm:text-[28px] max-xs:text-[25px]">
          Your Cart
        </h1>

        {/* orders and order summary */}
        <div className="flex flex-wrap gap-[30px] justify-between max-1170:justify-center">
          {/* order container */}
          <div className="flex flex-col gap-[20px] rounded-[6px] max-h-[540px] overflow-y-auto p-[10px] shadow-[0px_3px_10px_black] w-[60%] min-w-[550px] max-1170:w-[55%] max-1170:max-h-[450px] max-1170:overflow-y-auto max-1170:w-[100%]  max-sm:min-w-[90%] max-xs:min-w-[310px]">
            {/* prettier-ignore */}
            {/* mapping the orders */}
            {orders.map(({ id, name, price, quantity, image }) => {
              return (
                <div
                  key={id}
                  className="flex justify-between items-center w-[100%] bg-white p-[15px] rounded-[8px] shadow-[2px_3px_10px_black] hover:scale-[1.02] transition-transform duration-300"
                >
                  <div className="flex justify-between items-center">
                    <img
                      className="h-[60px] w-[80px] rounded-[6px] mr-[15px] max-sm:w-[60px] max-sm:mr-[10px] max-xs:w-[50px] max-xs:h-[50px] max-xs:mr-[6px]"
                      src={image}
                      alt=""
                    />
                    <div className="">
                      <h2 className="text-[18px] max-sm:text-[12px] max-xs:text-[8px]">
                        {name}
                      </h2>
                      <span className="text-gray-600 text-[15px] max-sm:text-[10px] max-xs:text-[8px]">
                        Price:${price}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex justify-between mr-[20px] max-sm:mr-[10px]">
                      <button
                        onClick={() => {
                          if (quantity > 1) {
                            setOrders((prevOrders) =>
                              prevOrders.map((order) => {
                                return order.id === id
                                  ? { ...order, quantity: quantity - 1 }
                                  : order;
                              })
                            );
                          }
                        }}
                        className="p-[3px_9px_3px_9px] mt-[8px] mb-[8px] rounded-[100%] bg-gray-200 hover:bg-prim transition duration-300 max-sm:p-[4px_9px] max-sm:my-[12px] max-sm:text-[10px] max-xs:text-[8px] max-xs:p-[2px_8px] max-xs:my-[14px]"
                      >
                        -
                      </button>
                      <p className="p-[10px] w-[30px] font-[sans-serif] flex justify-center max-sm:text-[14px] max-xs:text-[12px] max-xs:p-[10px_0px]">
                        {quantity}
                      </p>
                      <button
                        onClick={() => {
                          if (quantity < 100) {
                            setOrders((prevOrders) =>
                              prevOrders.map((order) => {
                                return order.id === id
                                  ? { ...order, quantity: quantity + 1 }
                                  : order;
                              })
                            );
                          }
                        }}
                        className="p-[3px_9px_3px_9px] mt-[8px] mb-[8px] rounded-[100%] bg-gray-200 hover:bg-prim transition duration-300 max-sm:p-[4px_9px] max-sm:my-[12px] max-sm:text-[10px] max-xs:text-[8px] max-xs:p-[2px_8px] max-xs:my-[14px]"
                      >
                        +
                      </button>
                    </div>
                    <span className="p-[10px] w-[50px] flex justify-center max-sm:w-[35px] max-sm:text-[14px] max-xs:text-[11px] max-xs:w-[25px]">
                      ${quantity * price}
                    </span>
                    <button
                      onClick={() => {
                        setOrders((prevOrders) =>
                          prevOrders.filter((order) => order.id !== id)
                        );
                      }}
                      className="m-[10px] rounded-[100%] text-[25px] min-w-[20px]"
                    >
                      <img
                        src="cancel.png"
                        alt=""
                        className="rounded-[100%] hover:scale-[1.1] transition-transform duration-300 max-sm:w-[20px] max-sm:h-[20px] max-xs:w-[16px] max-xs:h-[16px]"
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          {/* order summary */}
          <div className="p-[15px] w-[29%] min-w-[400px] font-[410] rounded-[8px] shadow-[2px_3px_10px_black] max-sm:min-w-[310px]">
            <h2 className="text-[19px] font-[500] mb-[15px] max-sm:text-[14px] max-sm:mb-[12px]">
              Order Summary
            </h2>
            <hr className="h-[0.5px] bg-gray-500 border-none" />
            <h3 className="mt-[15px] font-[500] max-sm:text-[14px] max-sm:mt-[12px]">
              Order Options
            </h3>
            <div className="p-[8px_13px] bg-[#E6E2E2] rounded-[10px] text-[15px] text-gray-600 mt-[10px] mb-[15px] flex justify-between items-center max-sm:py-[6px] max-sm:text-[12px]">
              <span>Pickup</span>
              <button
                onClick={() => setMove(!isMoved)}
                className="bg-[#F97316] h-[23px] w-[50px] rounded-[18px] relative flex items-center max-sm:w-[45px] max-sm:h-[21px]"
              >
                <div
                  className={`bg-white h-[100%] w-[23px] rounded-[50%] absolute shadow-[0.2px_0.2px_2px_black] transition-all duration-300 max-sm:w-[21px]
                    ${isMoved ? "left-[55%] " : "left-[0%]"}`}
                ></div>
              </button>
              <span>Delivery</span>
            </div>
            <form
              onSubmit={handleSubmit}
              action=""
              className="flex justify-between gap-[5px] w-[100%] mb-[20px] max-sm:mb-[10px]"
            >
              <label
                htmlFor="promoCode"
                className="mb-[10px] max-sm:text-[12px]"
              >
                Promo Code
              </label>
              <input
                className="w-[80%] p-[8px] rounded-[8px] border border-gray-400 text-[15px] border border-gray-300 focus:border-orange-600 focus:ring focus:ring-orange-200 focus:outline-none rounded px-3 py-2 max-sm:w-[75%] max-sm:text-[12px] max-sm:h-[95%]"
                type="text"
                name="promoCode"
                value={details.promoCode}
                id="promoCode"
                onChange={(e) =>
                  setDetails({ ...details, promoCode: e.target.value })
                }
                placeholder="Enter coupon code"
              />
              <button className="bg-[#FFEDD5] p-[13px] text-[15px] text-[#F97316] rounded-[8px] font-[510] hover:scale-[1.08] transition duration-300 max-sm:text-[12px] max-sm:h-[95%] max-sm:p-[8px]">
                Apply
              </button>
            </form>
            <hr className="h-[0.5px] bg-gray-500 border-none" />
            <div className="flex flex-col gap-[10px] mt-[15px] text-[15px] text-gray-600 max-sm:gap-[5px] max-sm:text-[12px]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${details.subTotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes(5%)</span>
                <span>${details.taxes}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>${details.deliveryFee}</span>
              </div>
              <hr />
              <div className="flex justify-between text-black text-[22px] font-[600] mb-[15px] max-sm:text-[17px] max-sm:mb-[10px]">
                <span>Total</span>
                <span>${details.total}</span>
              </div>
            </div>
            <Link
              to={"/"}
              className="flex justify-center p-[8px] bg-[#F97316] rounded-[6px] text-[#FFEDD5] mt-[5px] hover:translate-y-[-1.8px] transition duration-300 max-sm:text-[13px] max-sm:p-[5px]"
            >
              Proceed to Payment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
