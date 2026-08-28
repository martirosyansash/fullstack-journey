// import { useState } from 'react'
import './App.css'
import LessText from './LessText'

function App() {
  let text = "gkljssssssssssssssssssssssssssssssssssssssfdlkhgsdjkghjksdhgkjshgkjshdjkghsdkjhgjksdhgjksdhjkghsdjkghjdshgjkhdsjghsdjkhgjkshgkjsdhdgjkshgjkshg;shdg;lskhglkshgklshglksjgklsh;lkghsghjklghsjl;kdfhgjsdgh;sjlhglhg;sl";
  let max = 60;
  
  return (
    <div>
      <LessText text={text} max={max} />
    </div>
  )
}

export default App
