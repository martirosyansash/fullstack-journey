import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => { 
    async function fetchUser() {
      const response = await fetch("https://randomuser.me/api/");
      const data = await response.json();
      setUser(data.results[0]);
      console.log(data);
    }
    fetchUser();
  },[])
  return (
    <div>
      {user && (
        <div>
          <p>{user.name.first} {user.name.last}</p>
          <p>{user.email}</p>
          <p>{user.location.country}</p>
          <img
            src={user.picture.large}
            alt={`${user.name.first} ${user.name.last}`}
          />
        </div>
        )
      }
    </div>
  )
}

export default App
