# Full Stack Journey

This repository documents my learning journey toward becoming a **Full Stack Web Developer and AI Engineer**.

It contains projects and practical exercises built while learning frontend development, JavaScript, React, backend development, databases, authentication, REST APIs, and full-stack application architecture.

The goal is to progressively move from fundamental concepts to building complete, real-world applications.

---

## 🚀 Projects

### 01 — HTML & CSS Portfolio

A responsive portfolio website built with HTML and CSS.

**Topics practiced:**
- Semantic HTML
- CSS layouts
- Flexbox
- Responsive design
- Media queries

---

### 02 — DOM Practice

JavaScript exercises focused on DOM manipulation and browser interactions.

**Topics practiced:**
- DOM selection
- Event listeners
- Dynamic content
- User interactions
- JavaScript fundamentals

---

### 03 — Random User App

An application that fetches and displays random user data from an external API.

**Topics practiced:**
- Fetch API
- Async / Await
- API requests
- JSON
- Error handling
- DOM manipulation

---

### 04 — Smart Todo App

A feature-rich Todo application built with Vanilla JavaScript.

**Features:**
- Add, edit, and delete tasks
- Mark tasks as completed
- Search and filter tasks
- Sort tasks by priority
- Task priorities and deadlines
- LocalStorage persistence
- Debounced search

**Technologies:**
- HTML
- CSS
- JavaScript

---

### 05 — React Todo App

A Todo application rebuilt with React to practice component-based application development and state management.

**Topics practiced:**
- React components
- Props
- `useState`
- `useReducer`
- `useEffect`
- Component composition
- Controlled inputs
- LocalStorage
- Search and filtering
- Reducer-based state management

---

### 06 — Product Explorer

A React application for browsing products from an external API.

**Features:**
- Product listing
- Product details
- Dynamic routing
- Debounced search
- Category filtering
- Price sorting
- Loading and error states
- Responsive product grid

**Topics practiced:**
- React
- React Router
- `useParams`
- Custom hooks
- API service layer
- Fetch API
- `useEffect`
- Derived state
- Reusable components
- Responsive CSS

---

### 07 — ProductHub Full Stack Application

A full-stack product management application built with React, Node.js, Express, and MongoDB.

This project connects a React frontend to a custom REST API and includes user authentication, role-based authorization, product management, and server-side filtering and pagination.

**Features:**
- User registration and login
- JWT-based authentication
- Role-based authorization (user/admin)
- Public product browsing
- Individual product details
- Admin-only product creation
- Admin-only product editing and deletion
- Debounced product search
- Category filtering
- Stock availability filtering
- Price and date sorting
- Server-side pagination
- Loading, error, and empty states
- Responsive product cards
- Shared navigation bar

**Frontend technologies:**
- React
- React Router
- React Context API
- Vite
- JavaScript
- Fetch API
- CSS

**Backend technologies:**
- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt
- CORS
- Vitest
- Supertest

**Backend architecture:**
- REST API routes
- Controllers
- Database models
- Middleware
- Authentication middleware
- Role-based authorization
- Centralized error handling
- Environment-based configuration
- API tests

**Topics practiced:**
- Full-stack application architecture
- Frontend and backend integration
- REST API design
- CRUD operations
- Authentication and authorization
- Protected API routes
- Password hashing
- Database queries
- Server-side search and pagination
- Global authentication state
- Client-side routing
- API testing

---

## 🛠 Technologies

### Frontend
- HTML5
- CSS3
- JavaScript (ES6+)
- React
- React Router
- Vite

### Backend
- Node.js
- Express
- REST APIs
- JWT
- bcrypt

### Database
- MongoDB
- MongoDB Atlas
- Mongoose

### Testing
- Vitest
- Supertest

### Development Tools
- Git
- GitHub
- VS Code
- Browser DevTools
- npm
- Postman / API testing tools

### Concepts
- Responsive Web Design
- DOM Manipulation
- Asynchronous JavaScript
- Component-Based Architecture
- React Hooks
- State Management
- React Context API
- Custom React Hooks
- Client-Side Routing
- REST API Architecture
- CRUD Operations
- Authentication and Authorization
- Database Integration
- Environment Variables
- Error Handling
- API Testing
- LocalStorage

---

## ⚙️ Running ProductHub Locally

ProductHub consists of two applications:

- `node-api` — Express backend
- `fullstack-client` — React frontend

### Prerequisites

- Node.js and npm
- MongoDB Atlas connection string
- Git

### 1. Clone the repository

```bash
git clone <repository-url>
cd fullstack-journey
```

Replace `https://github.com/martirosyansash/fullstack-journey` with the actual GitHub repository URL.

### 2. Set up the backend

```bash
cd node-api
npm install
```

Create a `.env` file based on `.env.example`.

Example:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Use your own MongoDB connection string and a strong JWT secret.

Start the backend using the npm start or development script defined in `node-api/package.json`.

The backend runs locally on:

```text
http://localhost:3000
```

### 3. Set up the frontend

Open another terminal:

```bash
cd fullstack-client
npm install
```

Create a `.env` file based on `.env.example`:

```env
VITE_API_URL=http://localhost:3000
```

Start the frontend:

```bash
npm run dev
```

Open the local URL shown by Vite, typically:

```text
http://localhost:5173
```

### 4. Authentication and permissions

- Visitors can browse products without logging in.
- Users can register and log in.
- Product creation, editing, and deletion require an admin account.
- Public registration does not grant admin privileges.

Admin access is enforced by backend authorization middleware.

---

## 🔐 Environment Variables and Security

Environment variables are used to configure the frontend and backend.

Real `.env` files are excluded from Git tracking through `.gitignore`.

Example environment files are provided to document the required configuration without exposing credentials.

Sensitive information such as database connection strings, passwords, and JWT secrets should never be committed to the repository.

---

## 📚 Current Focus

- Full-stack project architecture
- Code organization and maintainability
- Git and GitHub best practices
- Building portfolio-ready applications
- Improving application quality and developer workflows

---

## 🎯 Roadmap

The next stages of this journey include:

- Build a production-style full-stack portfolio project
- Learn TypeScript
- Improve automated testing
- Learn deployment and production configuration
- Build a practical business-oriented application
- Study AI engineering foundations
- Work with AI APIs and integrations
- Build AI-powered full-stack applications

---

## 📈 Goal

My goal is to develop strong software engineering fundamentals and become a skilled **Full Stack Web Developer and AI Engineer**.

I aim to build practical applications, understand how frontend and backend systems work together, and gradually progress toward production-ready software and AI-powered products.

This repository will continue to grow as I learn, build, test, and improve.