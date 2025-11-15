# Yumify - Food Delivery App

## Owner Portal - Phase 1

This document provides instructions for running and testing Phase 1 of the Owner Portal feature.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (for backend - optional in Phase 1, using mock API)

## Quick Start

### 1. Install Dependencies

```bash
# Install backend dependencies (from root directory)
npm install

# Install frontend dependencies (from client-side directory)
cd client-side
npm install
```

### 2. Run Development Servers

**Backend Server:**
```bash
# From root directory
npm run dev
```
The backend server will start on `http://localhost:5000` (or PORT specified in `.env`)

**Frontend Server:**
```bash
# From client-side directory (in a separate terminal)
npm run dev
```
The frontend server will start on `http://localhost:5173` (Vite default port)

### 3. Access the Owner Portal

1. Visit `http://localhost:5173/` (main customer app)
2. Click the **"Log in as Owner"** button in the top navigation bar
3. You'll be redirected to `/owner/login`
4. Enter any non-empty identifier and password (mock authentication accepts any credentials)
5. After successful login, you'll be redirected to `/owner/dashboard`

## Verification Checklist

After logging in, verify the following features:

- ✅ **Dashboard Page** (`/owner/dashboard`)
  - [ ] Three stat cards display: Orders Today, Pending Orders, Revenue
  - [ ] Recent Orders section shows top 3 most recent orders
  - [ ] Stats update correctly based on order data

- ✅ **Orders Page** (`/owner/orders`)
  - [ ] Filter buttons work: All, Placed, Preparing, Ready
  - [ ] Orders are filtered correctly by status
  - [ ] Order cards display: order number, customer name, total, status, date
  - [ ] Action buttons appear based on order status
  - [ ] Status updates work when clicking action buttons

- ✅ **Navigation**
  - [ ] Sidebar is responsive (collapsible on mobile)
  - [ ] All navigation links work: Dashboard, Orders, Notifications, Inventory, Staff, Feedback, Suppliers, Settings
  - [ ] Unread notification count badge appears on Notifications link
  - [ ] Topbar shows restaurant name or "Yumify"
  - [ ] Profile avatar circle displays owner initials

- ✅ **Authentication**
  - [ ] Token is saved to localStorage as `owner_token`
  - [ ] Protected routes redirect to login if not authenticated
  - [ ] Login redirects to attempted page after authentication
  - [ ] Logout clears token and redirects to login

- ✅ **Dev Tools** (Development mode only)
  - [ ] Dev tools panel is visible in bottom-right corner (🔧 icon)
  - [ ] "Simulate Order" button creates a new order
  - [ ] "Simulate Notification" button creates a new notification
  - [ ] "Clear owner_token" button clears authentication

## Replacing Mock API with Real Backend

When you're ready to integrate with a real backend API, follow these steps:

### 1. Update Base URL

In `client-side/src/api/client.js`, uncomment and configure the base URL:

```javascript
// Replace this line:
// import mockApi from "./mockApi.js";

// With your HTTP client (axios recommended):
import axios from 'axios';

// Set your API base URL:
const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:5000/api/owner';
```

### 2. Replace Mock API Functions

Each function in `client-side/src/api/client.js` has a `// TODO:` comment showing how to replace it with real HTTP calls.

**Example - Login Function:**

```javascript
// Replace this:
async login(credentials) {
  return await mockApi.auth.login(credentials);
}

// With this:
async login(credentials) {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
  // Store token
  localStorage.setItem('owner_token', response.data.token);
  return response.data;
}
```

**Example - Get Orders:**

```javascript
// Replace this:
async getOrders(filter = {}) {
  const orders = await mockApi.orders.getOrders(filter);
  return Array.isArray(orders) ? orders : [];
}

// With this:
async getOrders(filter = {}) {
  const params = new URLSearchParams(filter);
  const response = await axios.get(`${API_BASE_URL}/orders?${params}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('owner_token')}` }
  });
  return response.data.orders || [];
}
```

### 3. Key Files to Update

All API functions are located in:
- **`client-side/src/api/client.js`** - Main API client (replace all functions)
- **`client-side/src/api/mockApi.js`** - Can be removed after migration (or keep for reference)

### 4. Environment Variables

Create a `.env` file in `client-side/` directory:

```env
VITE_API_URL=http://localhost:5000/api/owner
```

### 5. Authentication Token Handling

The token is currently stored in localStorage as `owner_token`. When switching to real backend:

- Ensure your backend API accepts tokens in the Authorization header: `Bearer <token>`
- The `OwnerAuthProvider` already handles token storage and retrieval
- Token is sent automatically via axios interceptors (add to axios config)

**Example Axios Interceptor:**

```javascript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to all requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('owner_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### 6. Expected API Endpoints

Your backend should implement the following endpoints:

- `POST /api/owner/auth/login` - Owner login
- `POST /api/owner/auth/logout` - Owner logout
- `GET /api/owner/auth/me` - Get current owner profile
- `GET /api/owner/orders` - Get orders (with query params for filtering)
- `GET /api/owner/orders/:id` - Get single order
- `PATCH /api/owner/orders/:id/status` - Update order status
- `GET /api/owner/inventory` - Get inventory items
- `POST /api/owner/inventory` - Create inventory item
- `PUT /api/owner/inventory/:id` - Update inventory item
- `DELETE /api/owner/inventory/:id` - Delete inventory item
- `GET /api/owner/staff` - Get staff members
- `POST /api/owner/staff` - Add staff member
- `PUT /api/owner/staff/:id` - Update staff member
- `DELETE /api/owner/staff/:id` - Delete staff member
- `GET /api/owner/notifications` - Get notifications
- `PATCH /api/owner/notifications/:id/read` - Mark notification as read
- `PATCH /api/owner/notifications/read-all` - Mark all as read
- `GET /api/owner/feedback` - Get customer feedback
- `GET /api/owner/suppliers` - Get suppliers
- `POST /api/owner/suppliers/:id/requests` - Send supplier request

## Project Structure

```
Team_Dev_Repo/
├── server-side/          # Backend Express server
│   ├── server.js
│   ├── routes/
│   ├── models/
│   └── ...
├── client-side/          # Frontend React app
│   ├── src/
│   │   ├── api/
│   │   │   ├── client.js      # Main API client (replace with real calls)
│   │   │   └── mockApi.js     # Mock API (remove after migration)
│   │   ├── features/
│   │   │   └── owner/         # Owner portal feature
│   │   │       ├── context/   # Auth context provider
│   │   │       ├── hooks/     # Custom hooks
│   │   │       ├── pages/     # Owner pages
│   │   │       ├── components/# Owner components
│   │   │       ├── routes.jsx # Owner routes
│   │   │       └── ...
│   │   └── ...
│   └── ...
└── README.md
```

## Notes

- **Mock API**: Currently uses in-memory data storage with simulated latency (300-800ms)
- **Authentication**: Mock login accepts any non-empty credentials
- **Token Storage**: Uses localStorage (`owner_token` key)
- **Event Subscription**: Mock API supports real-time event simulation via `subscribe()` method
- **Development Tools**: Dev tools panel only appears in development mode

## Troubleshooting

**Issue**: Orders not showing up
- **Solution**: Ensure `mockApi.initMockApi()` is called in `main.jsx`

**Issue**: Cannot login
- **Solution**: Check browser console for errors, ensure both servers are running

**Issue**: Redirect loop after login
- **Solution**: Check that token is being saved correctly in localStorage

**Issue**: Dev tools not visible
- **Solution**: Dev tools only appear when `NODE_ENV !== 'production'`

## Next Steps (Future Phases)

- [ ] Implement remaining pages: Notifications, Inventory, Staff, Feedback, Suppliers, Settings
- [ ] Add order details page with full order information
- [ ] Implement real-time updates via WebSocket
- [ ] Add analytics and reporting features
- [ ] Integrate with real backend API
- [ ] Add unit and integration tests

