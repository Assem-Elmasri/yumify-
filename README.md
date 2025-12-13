# YumifyPlus

A restaurant management and food ordering platform that connects customers with restaurants. Built with React and Node.js.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-orange?style=for-the-badge)](https://yumify-plus.vercel.app) 
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](#tech-stack)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js)](#tech-stack)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)](#tech-stack)

---

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
  - [Customer Features](#customer-features)
  - [Restaurant Owner Features](#restaurant-owner-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Usage Guide](#usage-guide)
- [Authentication & Security](#authentication--security)
- [Features in Detail](#features-in-detail)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)
- [Contact & Links](#contact--links)

---

## About the Project

YumifyPlus is a full-stack web application I built to make ordering food easier for customers while giving restaurant owners tools to manage their business. Customers can browse menus, place orders, track deliveries, and leave reviews. Restaurant owners get a dashboard with analytics, order management, inventory tracking, and staff management.

### What It Does

For customers, it simplifies the whole ordering process. You can browse different restaurants, add items to your cart, choose how you want to pay, and then track your order in real-time as it goes from "preparing" to "on the way" to "delivered". There's also an AI chatbot that can help answer questions about the menu.

For restaurant owners, it's basically an all-in-one management system. You can see how your restaurant is performing with charts and stats, manage incoming orders and update their status, add or remove items from your menu, manage your staff, and see what customers are saying in reviews.

### Who It's For

- **Customers**: Anyone who wants an easier way to order food and track deliveries
- **Restaurant Owners**: Business owners who need a simple platform to manage orders, menu, inventory, and staff

### Why It's Useful

- Built with modern tech (React 19, Node.js, MongoDB) so it's fast and reliable
- Has an AI chatbot powered by Google Gemini that can actually help customers
- Restaurant owners get real-time analytics to see what's working
- Multiple payment options (cards, cash, e-wallets)
- Dark mode because why not
- Works on phones, tablets, and computers

---

## Features

### Customer Features

- **Browse Restaurant Menus**: Check out food items from different restaurants
- **Shopping Cart**: Add items to your cart and adjust quantities
- **Multiple Payment Methods**: 
  - Credit or debit cards
  - Cash on delivery (pay when you get your food)
  - E-Wallets like Vodafone Cash, Orange Cash, Etisalat Cash, WePay, and Fawry
- **Order Tracking**: See your order status update in real-time as it moves through: pending → confirmed → preparing → ready → on the way → delivered
- **Favorites**: Save your favorite food items so you can order them again quickly
- **Reviews & Ratings**: Leave feedback and rate restaurants and food items after you try them
- **Order History**: Look back at all your past orders with full details
- **Digital Invoices**: Download your order receipt as a PDF
- **Email Verification**: We verify your email when you sign up (keeps things secure)
- **Password Reset**: Forgot your password? We'll send you a reset link via email
- **AI Chatbot**: There's a chatbot that can answer questions about the menu, help with orders, or just chat about food. It's powered by Google Gemini.
- **Dark Mode**: Switch between light and dark themes (your eyes will thank you)
- **Responsive Design**: Works great whether you're on a phone, tablet, or computer

### Restaurant Owner Features

- **Analytics Dashboard**: 
  - See your revenue and sales trends over time
  - Charts showing different metrics (bar charts, area charts, donut charts, sparklines)
  - Get alerts when inventory items are running low
  - Quick overview of recent orders
- **Order Management**: 
  - See all orders with options to filter and search
  - Update order status in real-time (when you confirm an order, mark it as preparing, etc.)
  - View detailed order info including customer details
  - Handle orders that have items from multiple restaurants
- **Menu/Inventory Management**: 
  - Add, edit, or delete food items
  - Organize items by category
  - Upload images for menu items
  - Toggle availability (mark items as out of stock when needed)
- **Staff Management**: 
  - Add new staff members
  - Edit staff info and roles
  - Remove staff members when needed
- **Customer Feedback**: See all the reviews and ratings customers leave for your restaurant
- **Notifications System**: Get notified in real-time when new orders come in or when things need your attention
- **Supplier Management**: Keep track of your suppliers (still being built out)
- **Settings**: Configure your restaurant details, update info, change preferences
- **Real-time Updates**: Everything updates live so you see new orders and changes immediately

---

## Tech Stack

### Frontend

- **React 19** - For building the user interface
- **Vite 7** - Build tool and dev server (it's really fast)
- **React Router v7** - Handles navigation between pages
- **Tailwind CSS** - For styling (utility-first CSS framework)
- **Axios** - Makes API calls to the backend
- **React Hot Toast** - Shows nice notification messages
- **Lucide React** - Icon library
- **React Markdown** - Renders markdown (used in the chatbot)
- **jsPDF & html2canvas** - Generates PDF invoices
- **Custom Theme Context** - Handles dark mode switching

### Backend

- **Node.js** - JavaScript runtime
- **Express.js 5** - Web framework for the API
- **MongoDB** - Database (using MongoDB Atlas cloud database)
- **Mongoose** - Makes working with MongoDB easier
- **JWT (jsonwebtoken)** - For authentication tokens
- **bcrypt** - Hashes passwords (never store plain text passwords!)
- **cookie-parser** - Handles cookies
- **Multer** - Handles file uploads
- **Cloudinary** - Optional cloud storage for images
- **Nodemailer** - Sends emails (for verification and password resets)
- **CORS** - Allows the frontend to talk to the backend

### AI/External Services

- **Google Gemini API** - Powers the chatbot (using the gemini-2.5-flash-lite model)

### Development Tools

- **Nodemon** - Automatically restarts the server when you make changes
- **ESLint** - Catches code errors and style issues
- **PostCSS & Autoprefixer** - Processes CSS

---

## Project Structure

```
Final Project Repo - VIP/
├── client-side/                    # React frontend
│   ├── src/
│   │   ├── apis/                  # API functions for making requests
│   │   │   ├── booking.api.js
│   │   │   ├── cart.api.js
│   │   │   ├── chatbot.api.js
│   │   │   ├── client.js          # Owner API client
│   │   │   ├── food.api.js
│   │   │   ├── order.api.js
│   │   │   ├── restaurant.api.js
│   │   │   ├── review.api.js
│   │   │   └── user.api.js
│   │   ├── components/            # Reusable React components
│   │   │   ├── Chatbot.jsx
│   │   │   ├── OrderCard.jsx
│   │   │   ├── ThemeToggleBtn.jsx
│   │   │   └── ...
│   │   ├── context/               # React Context (for state management)
│   │   │   ├── store.js
│   │   │   └── ThemeContext.jsx
│   │   ├── hooks/                 # Custom React hooks
│   │   │   └── useAuth.js
│   │   ├── Layouts/               # Layout components
│   │   │   └── OwnerLayout.jsx
│   │   ├── pages/                 # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── ODashboard.jsx
│   │   │   ├── Cart.jsx
│   │   │   └── ...
│   │   └── utils/                 # Helper functions
│   │       ├── config.js
│   │       └── showInputToast.jsx
│   ├── public/                    # Static files
│   │   └── payment images/        # Payment method logos
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server-side/                   # Express backend
│   ├── config/
│   │   └── db.js                  # MongoDB connection setup
│   ├── middlewares/
│   │   ├── auth.middleware.js     # Checks if user is logged in
│   │   ├── upload.middleware.js   # Handles file uploads (local storage)
│   │   └── upload.middleware.cloudinary.js  # Cloudinary upload option
│   ├── models/                    # Database schemas (Mongoose models)
│   │   ├── user.model.js
│   │   ├── food.model.js
│   │   ├── order.model.js
│   │   ├── restaurant.model.js
│   │   ├── cart.model.js
│   │   ├── review.model.js
│   │   ├── booking.model.js
│   │   ├── staff.model.js
│   │   └── notification.model.js
│   ├── routes/                    # API endpoints
│   │   ├── user.route.js
│   │   ├── food.route.js
│   │   ├── cart.rotes.js
│   │   ├── order.route.js
│   │   ├── review.route.js
│   │   ├── booking.route.js
│   │   ├── staff.route.js
│   │   ├── restaurents.route.js
│   │   ├── notification.route.js
│   │   └── chatbot.route.js
│   ├── utils/                     # Utility functions
│   │   ├── tokenGen.util.js       # Creates JWT tokens
│   │   ├── tokenVerify.util.js    # Verifies JWT tokens
│   │   ├── sendEmail.util.js      # Sends emails
│   │   ├── cloudinary.util.js     # Cloudinary helper functions
│   │   └── imageUrl.util.js       # Image URL helpers
│   └── server.js                  # Main server file (starts everything)
│
├── uploads/                       # Where uploaded files are stored locally
│   ├── foods/                     # Food images
│   └── users/                     # User profile pictures
│
├── .env                           # Environment variables (not in git)
├── package.json                   # Root package.json
└── README.md                      # This file
```

---

## Prerequisites

Before you start, make sure you have these installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** - Comes with Node.js (or you can use yarn)
- **MongoDB Atlas account** - [Sign up here](https://www.mongodb.com/cloud/atlas) (or run MongoDB locally)
- **Google Gemini API Key** - [Get one here](https://makersuite.google.com/app/apikey) (needed for the chatbot)
- **Email service** - Gmail or another SMTP service (for sending verification emails)

---

## Installation & Setup

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd "Final Project Repo - VIP"
```

### Step 2: Install Dependencies

Install the backend dependencies first:

```bash
npm install
```

Then install the frontend dependencies:

```bash
cd client-side
npm install
cd ..
```

### Step 3: Set Up Environment Variables

Create a `.env` file in the root directory (same level as `package.json`). Here's what to put in it:

```env
# MongoDB Connection
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# JWT Secret (make this a long random string)
JWT_SECRET=your_super_secret_jwt_key_here_minimum_32_characters

# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Email Configuration (Gmail example)
EMAIL=your_email@gmail.com
EMAIL_PASS=your_app_specific_password

# Google Gemini API (for chatbot)
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash-lite
```

### Step 4: Start the Servers

You'll need two terminal windows open.

**Terminal 1 - Start the backend:**
```bash
npm run dev
```
The backend will run on `http://localhost:5000`

**Terminal 2 - Start the frontend:**
```bash
cd client-side
npm run dev
```
The frontend will run on `http://localhost:5173`

Open your browser and go to `http://localhost:5173` to see the app.

---

## Environment Variables

Here's what each environment variable does:

| Variable | What It Does | Example | Required? |
|----------|-------------|---------|-----------|
| `MONGO_URI` | Connection string for MongoDB | `mongodb+srv://user:pass@cluster.mongodb.net/db` | Yes |
| `JWT_SECRET` | Secret key for signing JWT tokens | `random_32_char_string_minimum` | Yes |
| `PORT` | Port number for the backend server | `5000` | No (defaults to 5000) |
| `NODE_ENV` | Environment mode | `development` or `production` | No |
| `FRONTEND_URL` | URL of the frontend app | `http://localhost:5173` | No |
| `EMAIL` | Email address for sending emails | `your_email@gmail.com` | Yes |
| `EMAIL_PASS` | Password for the email account | `your_app_password` | Yes |
| `GEMINI_API_KEY` | API key for Google Gemini | `AIzaSy...` | Yes |
| `GEMINI_MODEL` | Which Gemini model to use | `gemini-2.5-flash-lite` | No |

### How to Get These Credentials

1. **MongoDB URI**: 
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up
   - Create a free cluster
   - Click "Connect" and choose "Connect your application"
   - Copy the connection string and replace `<password>` with your actual password

2. **JWT Secret**: 
   - Generate a random string. You can use: `openssl rand -hex 32`
   - Or just make up a long random string (at least 32 characters)
   - This should be secret and unique

3. **Email Password (Gmail)**: 
   - Turn on 2-factor authentication in your Google account
   - Go to your Google Account settings > Security > App passwords
   - Generate a new app password and use that (not your regular Gmail password)

4. **Gemini API Key**: 
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy the key and paste it in your `.env` file

---

## API Endpoints

Here's a quick overview of the API. All endpoints are prefixed with `/api`:

### Authentication (`/api/user/*`)

- `POST /api/user/register` - Sign up a new user
- `POST /api/user/login` - Log in
- `POST /api/user/logout` - Log out
- `GET /api/user/profile` - Get your profile (requires login)
- `PUT /api/user/profile` - Update your profile (requires login)
- `GET /api/user/verify/:token` - Verify your email address
- `POST /api/user/forgot-password` - Request a password reset
- `POST /api/user/reset-password/:token` - Reset your password
- `GET /api/user/dashboard/:restaurantId` - Get dashboard data (owners only)

### Food/Menu Items (`/api/foods/*`)

- `GET /api/foods` - Get all food items
- `GET /api/foods/random-products` - Get random food items
- `POST /api/foods/add` - Add a new food item (owners only, requires login)
- `PUT /api/foods/modify/:id` - Update a food item (owners only, requires login)
- `DELETE /api/foods/delete/:id` - Delete a food item (owners only, requires login)

### Cart (`/api/cart/*`)

- `GET /api/cart` - Get your cart (requires login)
- `POST /api/cart/add` - Add item to cart (requires login)
- `PUT /api/cart/update/:itemId` - Update item quantity (requires login)
- `DELETE /api/cart/remove/:itemId` - Remove item from cart (requires login)
- `DELETE /api/cart/clear` - Clear your entire cart (requires login)

### Orders (`/api/orders/*`)

- `GET /api/orders` - Get your orders (requires login)
- `GET /api/orders/:id` - Get order details (requires login)
- `POST /api/orders` - Create a new order (requires login)
- `PATCH /api/orders/subOrder/:mainOrderId/:subOrderId/status` - Update order status (owners only, requires login)
- `GET /api/order/trackOrder/:orderId` - Track an order's status (requires login)

### Reviews (`/api/reviews/*`)

- `GET /api/reviews` - Get all reviews
- `POST /api/reviews` - Add a review (requires login)
- `PUT /api/reviews/:id` - Update your review (requires login)
- `DELETE /api/reviews/:id` - Delete your review (requires login)

### Bookings (`/api/booking/*`)

- `GET /api/bookings` - Get all bookings (owners only, requires login)
- `POST /api/booking` - Make a table booking (requires login)
- `PUT /api/booking/:id` - Update a booking (requires login)
- `DELETE /api/booking/:id` - Cancel a booking (requires login)

### Staff (`/api/staff/*`)

- `GET /api/staff` - Get all staff members (owners only, requires login)
- `POST /api/staff/add` - Add a staff member (owners only, requires login)
- `PATCH /api/staff/:id` - Update staff info (owners only, requires login)
- `DELETE /api/staff/:id` - Remove a staff member (owners only, requires login)

### Restaurants (`/api/restaurants/*`)

- `GET /api/restaurants` - Get all restaurants
- `PUT /api/restaurants/modify` - Update restaurant info (owners only, requires login)

### Notifications (`/api/notifications/*`)

- `GET /api/notifications` - Get your notifications (requires login)
- `PATCH /api/notifications/:id/read` - Mark notification as read (requires login)
- `PATCH /api/notifications/read-all` - Mark all notifications as read (requires login)

### Chatbot (`/api/chatbot/*`)

- `POST /api/chatbot/message` - Send a message to the chatbot
- `GET /api/chatbot/menu` - Get menu data for chatbot context

### Static Files

- `GET /uploads/:type/:filename` - Get uploaded images (foods, users)

---

## Deployment

### Frontend (Vercel)

The frontend is deployed on Vercel: [https://yumify-plus.vercel.app](https://yumify-plus.vercel.app)

To deploy yourself:

1. Connect your GitHub repo to Vercel
2. Set these build settings:
   - Framework: Vite
   - Root Directory: `client-side`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
3. Add environment variable:
   - `VITE_API_BASE_URL`: Your backend URL (like `https://your-backend.onrender.com/api`)

### Backend (Render / Railway / Heroku)

For the backend, you can deploy to Render, Railway, Heroku, or any Node.js hosting:

1. Before deploying, make sure your `.env` has:
   - `NODE_ENV=production`
   - `FRONTEND_URL` set to your production frontend URL
   - All other variables configured

2. On Render (example):
   - Connect your repo
   - Set root directory to the project root
   - Build command: `npm install`
   - Start command: `npm start`
   - Add all your environment variables

3. Important things to remember:
   - Make sure MongoDB Atlas allows connections from your hosting provider's IP (or just allow all IPs)
   - Update CORS settings to allow your production frontend URL
   - Use a strong JWT secret in production
   - Set up your email service for production

---

## Usage Guide

### For Customers

1. **Sign up or log in**: Create an account or use your existing one
2. **Browse the menu**: Check out what different restaurants are offering
3. **Add to cart**: Pick items you want and add them to your cart
4. **Checkout**: Review your order, pick a payment method, and place the order
5. **Track your order**: Watch as your order status updates from "preparing" to "on the way" to "delivered"
6. **Leave a review**: After you get your food, rate it and leave feedback

### For Restaurant Owners

1. **Sign up as owner**: When you register, choose "owner" as your role. A restaurant will be created automatically for you.
2. **Go to dashboard**: You'll see analytics, revenue stats, and recent orders
3. **Manage your menu**: Add new items, edit existing ones, upload images, mark items as unavailable
4. **Handle orders**: See incoming orders and update their status as you work through them
5. **Manage staff**: Add staff members and assign them roles
6. **Check feedback**: See what customers are saying in their reviews

### How It All Works

**Customer order flow**: Add items to cart → Go to checkout → Pick payment method → Place order → Track status → Get delivery → Leave review

**Owner workflow**: Dashboard → See new orders → Confirm orders → Mark as preparing → Mark as ready → Update delivery status → View analytics

---

## Authentication & Security

### How Authentication Works

We use JWT (JSON Web Tokens) for authentication. When you log in, you get a token that's stored in a secure HTTP-only cookie. This token expires after 12 hours (you can change this if you want).

### Security Features

- **Password hashing**: Passwords are hashed with bcrypt before being stored. We never store plain text passwords.
- **Protected routes**: Some pages require you to be logged in. The frontend checks this and redirects you to login if needed.
- **API protection**: Protected API endpoints check for a valid token before allowing access.
- **CORS**: We've configured CORS to only allow requests from approved origins.
- **Environment variables**: All sensitive data (API keys, secrets, etc.) are stored in `.env` files that aren't committed to git.
- **Email verification**: We verify email addresses when you sign up.
- **Password reset**: If you forget your password, we send you a secure reset link via email.

### Best Practices

- Never commit `.env` files to git
- Use a strong, unique JWT secret (different for development and production)
- Keep your dependencies updated
- Always validate user inputs on both frontend and backend
- Use HTTPS in production (never HTTP)

---

## Features in Detail

### AI Chatbot

The chatbot is powered by Google Gemini and can actually help customers. It knows about the menu, can answer questions about orders, and maintains conversation context so it remembers what you've talked about. There's rate limiting to prevent abuse, and it's set up to give accurate recommendations based on what's actually on the menu.

You can find the chatbot component in `client-side/src/components/Chatbot.jsx` and the API endpoint in `server-side/routes/chatbot.route.js`.

### Order Tracking

Orders go through these statuses:
1. **Pending** - Just placed, waiting for restaurant to confirm
2. **Confirmed** - Restaurant confirmed they got it
3. **Preparing** - Restaurant is cooking your food
4. **Ready** - Food is ready for pickup/delivery
5. **On the Way** - Driver is bringing it to you
6. **Delivered** - You got it!
7. **Cancelled** - Order was cancelled

The system also handles orders with items from multiple restaurants - each restaurant's items are tracked separately.

### Payment Methods

You can pay in three ways:
1. **Credit/Debit Card**: Standard card processing
2. **Cash on Delivery**: Pay when the food arrives
3. **E-Wallets**: Vodafone Cash, Orange Cash, Etisalat Cash, WePay, or Fawry

### Dashboard Analytics

The owner dashboard shows:
- Revenue trends with different chart types (bar charts, area charts, etc.)
- Order statistics (how many total, pending, completed)
- Low stock alerts (warns you when items are running out)
- Recent orders at a glance
- Visual charts using Sparkline, Donut, and Bar chart components

---

## Contributing

I'm open to contributions! Here's how to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit them (`git commit -m 'Add some AmazingFeature'`)
5. Push to your branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

### Guidelines

- Follow the existing code style
- Write clear commit messages
- Test your changes before submitting
- Update documentation if you add new features

---

## License

This is a graduation project. If you want to use it or have questions about licensing, reach out to the project maintainers.

---

## Contact & Links

- **Live Demo**: [https://yumif-yplus.vercel.app](https://yumif-yplus.vercel.app)
- **Issues**: swe.omar.roushdy@gmail.com

---

<div align="center">

Made with care by the YumifyPlus Team
Star this repo if you found it helpful!

</div>
