import foodAPI from "../apis/food.api"
// import userAPI from "../apis/user.api"
// import cartAPI from "../apis/cart.api"
// import { useState } from "react";


// async function addFoodToCart() {
//     try {
//         const response = await cartAPI.post("/68f3cc8104c68e816215cd21/add", {
//             foodId: "68f3c4ad5403b47047064356",
//             quantity: 2
//         });
//         console.log("Food added to cart:", response.data);
//     } catch (error) {
//         console.error("Error adding food to cart:", error);
//     }
// }
// async function makeUser() {
//     try {
//         const response = await userAPI.post("/register", {
//             name: "fxhsadfjh",
//             email: "testing@email.com",
//             password: "12345678",
//             role: "customer",
//             address: "123 Test St, Test City, TS 12345"
//         });
//         console.log("User created:", response.data);
//     } catch (error) {
//         console.error("Error creating user:", error);
//     }
// }
// async function loginUser(email, pass) {
//     try {
//         const response = await userAPI.post("/login",  {
//             email: email,
//             password: pass,
//         });
//         console.log("User logged in:", response.data.message);
//     } catch (error) {
//         console.error("Error logging in user:", error);
//     }
// }
import { useState } from "react";
async function addFoods(formData) {
    try {
        const response = await foodAPI.post("/add", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log("Food added:", response.data);
    } catch (error) {
        console.error("Error adding food:", error);
    }
}
const RoutesTesting = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category', 'MainDish');
        formData.append('image', image);
        await addFoods(formData);
    }
    
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-[300px] mx-auto mt-10"
    >
      <input
        type="text"
        placeholder="title"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded"
      />
      <textarea
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="number"
        placeholder="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
      >
        Add Food
        </button>

      {message && <p className="text-center mt-2">{message}</p>}
    </form>
  )
}

export default RoutesTesting