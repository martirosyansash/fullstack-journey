import { useState } from 'react'
import './App.css'

function UserCard({ user }) {
  const { name, age, profession } = user;
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div>
      <p>Name: {name}</p>

      {showDetails && (
        <div>
          <p>Age: {age}</p>
          <p>Profession: {profession}</p>
        </div>
      )}

      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "[ Hide ]" : "[ Show ]"}
      </button>
    </div>
  );
}

function AddUser({ onAddUser }) { 
  
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [profession, setProfession] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) { 
    event.preventDefault();
    if (name.trim() === "") {
      setError("Name is required");
      return;
    }

    if (age === "") {
      setError("Age is required");
      return;
    }

    if (Number(age) <= 0 || Number(age) > 120) {
      setError("Number is not valid");
      return;
    }

    if (profession.trim() === "") {
      setError("Profession is required");
      return;
    }
    setError("");
    onAddUser({
      name: name.trim(),
      age: Number(age),
      profession: profession.trim()
    });
    setName("");
    setAge("");
    setProfession("");
  }

  return (
    <form className='form' onSubmit={handleSubmit}>
      <input type="text"
        value={name}
        onChange={(evt) => { setName(evt.target.value) }}
      />
      <input type="number"
        value={age}
        onChange={(evt) => { setAge(evt.target.value) }}
      />
      <input type="text"
        value={profession}
        onChange={(evt) => { setProfession(evt.target.value) }}
      />
      <button type='submit'> Add User </button>
      {error && <p>{ error }</p>}
    </form>
  )
}

function App() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Sasha",
      age: 28,
      profession: "Frontend Developer"
    },
    {
      id: 2,
      name: "Hakob",
      age: 18,
      profession: "Engineer"
    },
    {
      id: 3,
      name: "Armen",
      age: 22,
      profession: "Teacher"
    }
  ]);
  function addUser(user) {
    setUsers((prevUsers) => [
      ...prevUsers,
      {
        id: Date.now(),
        ...user
      }
    ]);
  }

  return (
    <div>
      {
        users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
          />
        ))
      }
      <AddUser onAddUser={addUser} />
    </div>
  );
}
export default App
