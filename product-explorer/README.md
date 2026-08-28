# Product Explorer

A responsive React application for browsing and exploring products using a public products API.

The project was built to practice routing, API architecture, custom hooks, filtering, sorting, debounced search, and reusable React components.

## Features

- Browse products from an external API
- Search products by title
- Debounced search
- Filter products by category
- Sort products by price
- Product details page
- Dynamic routes
- Loading and error states
- Responsive product grid
- Reusable components
- Custom hooks for data fetching

## Technologies Used

- React
- JavaScript
- React Router
- Vite
- CSS
- Fetch API
- DummyJSON API

## React Concepts Practiced

- `useState`
- `useEffect`
- Custom hooks
- Props
- Component composition
- Conditional rendering
- List rendering
- Derived state
- Debouncing
- React Router
- Dynamic routes
- `useParams`
- API service layer
- Loading and error handling

## Project Structure

```text
src/
├── components/
│   ├── ProductCard.jsx
│   ├── ProductControls.jsx
│   └── ProductsGrid.jsx
├── hooks/
│   ├── useProduct.js
│   └── useProducts.js
├── pages/
│   ├── Home.jsx
│   └── ProductDetails.jsx
├── services/
│   └── productsApi.js
├── App.jsx
├── App.css
└── main.jsx

productsApi.js
      ↓
custom hooks
      ↓
pages
      ↓
components

/                 → Products page
/products/:id     → Product details page

What I Learned

This project helped me practice separating API logic, state logic, and UI into different layers.

I also learned how to work with dynamic routes, create reusable components, implement debounced search, and combine multiple filters and sorting in a React application.

Future Improvements
Pagination
Server-side search
Dynamic categories from API
Favorites
Shopping cart
Better loading skeletons
Error boundary
Backend integration