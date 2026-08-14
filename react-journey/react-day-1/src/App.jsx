import { useState } from 'react'
import './App.css'

// function Welcome(props) { 
//   const name = props.name;
//   return (
//     <div>
//       <h1>React Learning App</h1>
//       <p>Hello, { name}!</p>
//     </div>
//   )
// }

// function Counter() { 
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//       <p>Count: {count}</p>
//       <button onClick={() => {setCount(count + 1);}}>[ + ]</button>
//       <button onClick={() => { setCount(count - 1)}}>[ - ]</button>
//     </div>
//   )
 
// } 

function UserCard({ name, age, profession }) {
  const [showLess, setShowLess] = useState(false);
  return (
    <div>
      <p>Name: {name}</p>
      <p>{ showLess ? `age : ${age}` : ""}</p> 
      <p>{ showLess ? `profession : ${profession}`: ""}</p>
      <button onClick={() => { setShowLess(!showLess) }}>{showLess ?  `[ Hide ]`: `[ Show ]` }</button>
      <br />
    </div>
  )
}

function App() {

  return (
    <div>
      <UserCard
        name="Sasha"
        age={28}
        profession="Frontend Developer"
      />
      <UserCard
        name="Hakob"
        age={18}
        profession="Engineer"
      />
      <UserCard
        name="Armen"
        age={22}
        profession="Teacher"
      />
    </div>
    
  )
}

export default App
