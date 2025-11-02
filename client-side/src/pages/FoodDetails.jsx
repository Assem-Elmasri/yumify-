import {ArrowLeft,ShoppingCartIcon,Star} from 'lucide-react'
import { useNavigate } from 'react-router'
const FileDetails = () => {
  const navigator=useNavigate()
  return (
    <>
      <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <nav class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="flex h-20 items-center justify-between">
                {/* Left Side: Back Arrow and Logo */}
                <div class="flex items-center gap-4">
                    <button class="text-gray-600 hover:text-gray-900 transition-colors" onClick={()=>navigator('/')} aria-label="Back to Menu">
                        {/* Lucide icon: arrow-left */}
                        <ArrowLeft />
                    </button>
                    <span class="font-poppins text-2xl font-bold text-orange-brand">Yumify</span>
                </div>
                
                {/* Right Side: Cart and Profile */}
                <div class="flex items-center gap-4">
                    <button class="relative text-gray-600 hover:text-gray-900 transition-colors" aria-label="Open Cart">
                        {/* Lucide icon: shopping-cart */}
                        <ShoppingCartIcon />
                        {/* High contrast badge: Orange bg, dark text */}
                        <span id="cart-badge" class="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-brand text-gray-900 text-xs font-bold transition-all duration-300 transform scale-0">0</span>
                    </button>
                    <button class="h-10 w-10 overflow-hidden rounded-full" aria-label="Open Profile">
                        Placeholder avatar with better contrast
                        <img src="https://placehold.co/40x40/E07B39/FFFFFF?text=A" alt="Profile Avatar" class="h-full w-full object-cover"/>
                    </button>
                </div>
            </div>
        </nav>
      </header>
      <main class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-16">
            
            {/* Left Column: Food Image */}
            <div class="mb-8 lg:mb-0">
                {/* MODIFICATION: Removed text and gradient overlay */}
                <div class="aspect-square w-full overflow-hidden rounded-3xl shadow-xl">
                    <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                         alt="Classic Cheeseburger"
                         class="h-full w-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"/>
                </div>
            </div>

            <div class="flex flex-col">
                <h1 class="font-poppins text-4xl font-bold text-gray-900 mb-3">Classic Cheeseburger 🍔</h1>
                
                {/* Description */}
                <p class="text-lg text-gray-600 mb-4">A juicy, 100% beef patty with melted cheddar cheese, fresh lettuce, tomato, and our secret sauce on a toasted brioche bun.</p>
                
                {/* Rating and Time */}
                <div class="flex flex-wrap items-center gap-4 mb-4">
                    <button id="rating-link" class="flex items-center gap-2" aria-label="Scroll to reviews">
                        <div class="flex text-yellow-400">
                            {/* Lucide icon: star (filled) */}
                            <Star/>
                            <Star/>
                            <Star/>
                            <Star/>
                            <Star/>
                        </div>
                        <span class="text-gray-600 font-medium hover:underline">(124 Reviews)</span>
                    </button>
                    <span class="text-gray-400 hidden sm:inline">|</span>
                    <span class="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                        {/* Lucide icon: clock */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        Ready in 15–20 mins
                    </span>
                </div>
                
                {/* Price */}
                <p class="font-poppins text-5xl font-bold text-orange-brand mb-6">$12.99</p>

                {/* Divider */}
                <hr class="border-gray-200 mb-6"/>
                
                {/* Ingredients (What it comes with) */}
                <h3 class="text-xl font-poppins font-bold text-gray-800 mb-3">Comes with</h3>
                <div class="flex flex-wrap gap-3 mb-6">
                    <span class="flex items-center gap-2 rounded-full bg-orange-brand-light px-3 py-1 text-sm font-semibold text-orange-brand-dark">🥬 Lettuce</span>
                    <span class="flex items-center gap-2 rounded-full bg-orange-brand-light px-3 py-1 text-sm font-semibold text-orange-brand-dark">🍅 Tomato</span>
                    <span class="flex items-center gap-2 rounded-full bg-orange-brand-light px-3 py-1 text-sm font-semibold text-orange-brand-dark">🧀 Cheddar</span>
                    <span class="flex items-center gap-2 rounded-full bg-orange-brand-light px-3 py-1 text-sm font-semibold text-orange-brand-dark">🥩 Beef</span>
                    <span class="flex items-center gap-2 rounded-full bg-orange-brand-light px-3 py-1 text-sm font-semibold text-orange-brand-dark">🍞 Brioche</span>
                </div>

                {/* Special Request */}
                <label for="special-request" class="text-xl font-poppins font-bold text-gray-800 mb-3">Add a note or special request:</label>
                
                <textarea id="special-request" rows="3"
                    class="w-full rounded-2xl border-2 border-gray-300 p-4 text-gray-700 bg-white transition-all resize-none 
                           hover:border-orange-brand 
                           focus:border-orange-brand focus:outline-none focus:ring-0"
                    placeholder="No onions, extra cheese, etc."></textarea>
                
                {/* Spacer to push button to bottom on desktop */}
                <div class="flex-grow"></div>
                
                {/* Action Row: Quantity and Add to Cart */}
                <div class="mt-8 flex flex-col md:flex-row items-center gap-6">
                    {/* Quantity Selector */}
                    <div class="flex h-16 w-full md:w-auto items-center justify-between rounded-2xl bg-gray-100 p-2 shadow-inner">
                        <button id="qty-minus" class="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-3xl font-bold text-orange-brand shadow transition-all active:scale-90" aria-label="Decrease quantity">-</button>
                        <input id="qty-input" type="number" value="1" min="1" class="h-full w-16 border-none bg-transparent text-center text-2xl font-bold text-gray-900 focus:ring-0 focus:outline-none" aria-label="Current quantity"/>
                        <button id="qty-plus" class="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-3xl font-bold text-orange-brand shadow transition-all active:scale-90" aria-label="Increase quantity">+</button>
                    </div>
                    
                    {/* Add to Cart Button */}
                    <button id="add-to-cart-btn" class="flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-orange-brand to-orange-brand-dark px-8 py-4 text-xl font-bold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:from-orange-brand-dark hover:to-orange-brand-darker active:scale-95">
                        {/* Lucide icon: shopping-cart */}
                        <ShoppingCartIcon/>
                        <span id="add-to-cart-text">Add to Cart</span>
                    </button>
                </div>
            </div>
        </div>
        
        {/* 3. Additional Sections */}
        <div class="mt-16 md:mt-24">
            {/* Recommended Items */}
            <section class="mb-16">
                <h2 class="font-poppins text-3xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
                <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {/* Item 1 */}
                    <div class="group relative">
                        <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-2xl bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 transition-all">
                            <img src="https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" alt="Pepperoni Pizza" class="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
                        </div>
                        <div class="mt-4 flex justify-between">
                            <div>
                                <h3 class="text-lg font-bold text-gray-900"><a href="#" class="hover:underline">Pepperoni Pizza</a></h3>
                                <p class="mt-1 text-sm text-gray-500">Spicy & Cheesy</p>
                            </div>
                            <p class="text-lg font-bold text-orange-brand">$14.50</p>
                        </div>
                    </div>
                    {/* Item 2 */}
                    <div class="group relative">
                        <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-2xl bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 transition-all">
                            <img src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" alt="Fresh Garden Salad" class="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
                        </div>
                        <div class="mt-4 flex justify-between">
                            <div>
                                <h3 class="text-lg font-bold text-gray-900"><a href="#" class="hover:underline">Fresh Garden Salad</a></h3>
                                <p class="mt-1 text-sm text-gray-500">Healthy & Crisp</p>
                            </div>
                            <p class="text-lg font-bold text-orange-brand">$9.00</p>
                        </div>
                    </div>
                    {/* Item 3 */}
                    <div class="group relative">
                        <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-2xl bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 transition-all">
                            <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" alt="Loaded Fries" class="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
                        </div>
                        <div class="mt-4 flex justify-between">
                            <div>
                                <h3 class="text-lg font-bold text-gray-900"><a href="#" class="hover:underline">Loaded Fries</a></h3>
                                <p class="mt-1 text-sm text-gray-500">With Bacon & Cheese</p>
                            </div>
                            <p class="text-lg font-bold text-orange-brand">$7.50</p>
                        </div>
                    </div>
                    {/* Item 4 */}
                    <div class="group relative">
                        <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-2xl bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 transition-all">
                            <img src="https://images.unsplash.com/photo-1551024601-bec782860a76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" alt="Chocolate Milkshake" class="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
                        </div>
                        <div class="mt-4 flex justify-between">
                            <div>
                                <h3 class="text-lg font-bold text-gray-900"><a href="#" class="hover:underline">Chocolate Milkshake</a></h3>
                                <p class="mt-1 text-sm text-gray-500">Thick & Creamy</p>
                            </div>
                            <p class="text-lg font-bold text-orange-brand">$6.00</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Customer Reviews */}
            <section id="reviews">
                <h2 class="font-poppins text-3xl font-bold text-gray-900 mb-6">What People Are Saying</h2>
                <div class="space-y-6">
                    {/* Review 1 */}
                    <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div class="flex items-center gap-4 mb-3">
                            <img src="https://placehold.co/40x40/FFC300/FFFFFF?text=S" alt="Sarah J." class="h-10 w-10 rounded-full"/>
                            <div>
                                <h4 class="font-bold text-gray-800">Sarah J.</h4>
                                <div class="flex text-yellow-400">
                                    5 stars
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                </div>
                            </div>
                        </div>
                        <p class="text-gray-600">"Absolutely the best cheeseburger I've had in a long time. The sauce is incredible! Will be ordering again."</p>
                    </div>
                    {/* Review 2 */}
                    <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div class="flex items-center gap-4 mb-3">
                            <img src="https://placehold.co/40x40/9CA3AF/FFFFFF?text=M" alt="Mike D." class="h-10 w-10 rounded-full"/>
                            <div>
                                <h4 class="font-bold text-gray-800">Mike D.</h4>
                                <div class="flex text-yellow-400">
                                    {/* 4 stars */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-300"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                </div>
                            </div>
                        </div>
                        <p class="text-gray-600">"Solid burger. A bit greasy, but the flavor was on point. The bun was perfect."</p>
                    </div>
                </div>
            </section>
        </div>
    </main>
    </>
  )
}

export default FileDetails