# Project Title : VillaX Room Booking Rental Website

# Website Name: VillaX

VillaX is a modern full-stack room rental platform designed to provide a seamless and intuitive booking experience. It combines a high-performance Next.js frontend with a structured Node.js and MongoDB(mongoose) backend to efficiently manage dynamic listings, reservations, and user interactions. The platform supports multiple user roles and ensures secure authentication while handling property management, booking workflows, and administrative controls.
With a focus on clean UI design, structured dashboards, and secure stripe transactions, VillaX enables guests to explore and reserve accommodations, hosts to manage listings and availability, and administrators to oversee user roles and system operations with efficiency and scalability in mind.

## 🚀🚀 Live Site :

https://villa-x-nextjs-client-side.vercel.app

## 🔐 Role-Based Authentication Credentials :

| Serial | Email            | Password         | Role  |
| ------ | ---------------- | ---------------- | ----- |
| 1      | admin@villax.com | admin@villax.com | Admin |
| 2      | host@villax.com  | host@villax.com  | Host  |
| 3      | guest@villax.com | guest@villax.com | Guest |

Use the following demo credentials to explore different dashboards and role-based features of the platform.

## Features

- Redux for state management
- Next.js powers dynamic routing across the platform.
- Secure Authentication with Firebase.
- Role-based access control (Admin, Host, Guest).
- User profile management and editing.
- Secure room booking and payment with Stripe.
- Responsive design optimized for desktop, tablet, and mobile.
- Role-based access control for Users, Host, and Admins.
- Category wise room filter.
- Browse, search, and filter Rooms in all rooms page.
- Admin dashboard for managing User.
- Awesome interface with light and dark mode support.
- Notification and Toast Alerts.
- Role assignment and user management by admins.
- Room booking , revenue etc stats and chart in each role dashboard.
- CORS configured securely
- Token Authentication.
- Form validation with React Hook Form.
- zod validation with react hook form .
- shadcdn awesome interface .
- tanstack query for data fetch and cache.
- Integration of Charts in the admin adn host dashboard.
- Add room functionality in host dashboard.
- Room galery and many more.

## Npm Packages :

### FrontEnd :

- next JS
- next-themes
- shadcdn
- axios
- framer-motion
- lucide-react
- swiper js.
- react-spinners
- react-hot-toast
- headlessui/react
- react hookform/resolvers
- radix-ui/react-dialog
- reduxjs/toolkit
- @stripe/react-stripe-js
- @tanstack/react-query
- query string
- clsx
- lucide react
- date-fns
- firebase
- react-date-range
- react-dom
- react-loading-skeleton
- react-redux
- recharts
- redux
- tailwind-merge
- zod
- sweetalert2

## Npm Packages :

### BackEnd :

- nodejs
- mongoose
- mongodb
- cors
- dotenv
- express
- firebase-admin
- stripe

# Role-Based Workflow

## Setup & installation instructions

1.Clone the repository or Download the repository as Zip and after that follow this:

```bash
git clone https://github.com/khalidhossain5000/villa-x-nextjs-client-side
cd villa-x-nextjs-client-side folder-name-of-the-project-to-enter-the-folder

```

2.Install dependencies

```bash
npm install

```

3.Create environment variables

```bash
mongoDB_uri
STRIPE_KEY
FIREBASE_ADMIN_SDK

```

4.Run the development server

````bash
npm run dev

This workflow visualizes the permissions and functionalities available to each user role.

```mermaid
flowchart TD
    %% --- Admin Workflow ---
    subgraph Admin ["Admin Workflow"]
        A1[Home Dashboard]
        A1 --> A1a[View total users as card]
        A1 --> A1b[View total rooms as chart]
        A1 --> A1c[View role-based users chart]
        A1 --> A1d[View category-wise pie chart]

        A2[Manage Users]
        A2 --> A2a[Update user roles: Host or Guest]
        A2 --> A2b[Delete users]
        A2 --> A2c[Monitor overall system]

        A1 --> A2
    end

    %% --- Host Workflow ---
    subgraph Host ["Host Workflow"]
        B1[Toggle Guest and Host Menu]
        B1 --> B1a[View room count added by host]
        B1 --> B1b[View booked count]
        B1 --> B1c[View total revenue]
        B1 --> B1d[Month-wise revenue chart]
        B1 --> B1e[Month-wise room booking chart]

        B2[Host Actions]
        B2 --> B2a[Add Room]
        B2 --> B2b[My Listing: view all added rooms]
        B2 --> B2c[Manage Booking: approve/reject]
        B2 --> B2d[Cancel Requests: manage cancellations]

        B1 --> B2
    end

    %% --- Guest Workflow ---
    subgraph Guest ["Guest Workflow"]
        C1[Guest Dashboard]
        C1 --> C1a[View booking count]
        C1 --> C1b[View total money spent]
        C1 --> C1c[Update Profile]
        C1 --> C1d[Apply to become Host]
        C1 --> C1e[View My Bookings]
        C1 --> C1f[View Cancel Requests sent]
    end
````
