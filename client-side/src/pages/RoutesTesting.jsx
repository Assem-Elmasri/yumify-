import foodAPI from "../apis/food.api"
import userAPI from "../apis/user.api"
import cartAPI from "../apis/cart.api"

async function addFoods() {
    try {
        const response = await foodAPI.post("/add", {
            name: "Test Food",
            description: "This is a test food item",
            price: 9.99,
            category: "Test Category",
            imageUrl: "http://example.com/image.jpg"
        });
        console.log("Food added:", response.data);
    } catch (error) {
        console.error("Error adding food:", error);
    }
}
async function addFoodToCart() {
    try {
        const response = await cartAPI.post("/68f3cc8104c68e816215cd21/add", {
            foodId: "68f3c4ad5403b47047064356",
            quantity: 2
        });
        console.log("Food added to cart:", response.data);
    } catch (error) {
        console.error("Error adding food to cart:", error);
    }
}
async function makeUser() {
    try {
        const response = await userAPI.post("/register", {
            name: "asldnfhkljasdbgklj",
            email: "test@email.com",
            password: "password123",
            role: "customer"
        });
        console.log("User created:", response.data);
    } catch (error) {
        console.error("Error creating user:", error);
    }
}
const RoutesTesting = () => {
  return (
    <div>
        <h1>Routes Testing Page</h1>
        <p>This is a test page for routing purposes.</p>
        <button onClick={() => {addFoods()}}>
            Make Cart
        </button> <br />
        <button onClick={() => {addFoodToCart()}}>
            add food to cart
        </button> <br />
        <button onClick={() => {makeUser()}}>
            make user
        </button>
    </div>
  )
}

export default RoutesTesting