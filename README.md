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
