# React Todo App

A simple and responsive Todo application built with React.

This project was created to practice React fundamentals, component structure, state management with `useReducer`, custom filtering, editing tasks, and data persistence with `localStorage`.

## Features

- Add new tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as completed
- Cancel task editing
- Search tasks
- Filter tasks by:
  - All
  - Active
  - Completed
- Clear completed tasks
- Clear all tasks
- Task statistics:
  - Total
  - Completed
  - Remaining
- Save tasks to `localStorage`
- Responsive design

## Built With

- React
- JavaScript
- CSS
- Vite
- localStorage

## React Concepts Practiced

This project includes practice with:

- `useState`
- `useReducer`
- `useEffect`
- Controlled inputs
- Props
- Component composition
- Conditional rendering
- List rendering
- Derived state
- Reducer actions
- Immutable state updates
- Local storage persistence

## Project Structure

```text
src/
├── components/
│   ├── AddTask.jsx
│   ├── SearchFilter.jsx
│   ├── TaskItem.jsx
│   ├── TaskList.jsx
│   └── TaskStats.jsx
├── reducers/
│   └── tasksReducer.js
├── App.jsx
├── App.css
└── main.jsx
```

## Getting Started

Clone the repository:

```bash
git clone https://github.com/martirosyansash/fullstack-journey.git
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## What I Learned

While building this project, I practiced separating UI into reusable React components and managing more complex state with `useReducer`.

I also learned how to keep state immutable, create derived data for filtering and searching, and persist application state using `localStorage`.

## Future Improvements

Possible future improvements:

- Drag and drop task ordering
- Due dates
- Task priorities
- Dark/light theme switch
- Better animations
- Backend/database integration

## Author

Built as part of my React learning journey.