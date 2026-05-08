import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

//Class component
// class ClassComponent extends React.Component
// {
//   render(){
//     return <h2>Class Component</h2>
//   }
// }
const Card = ({title}) => {
  return(
    <div className='card'>
      <h2>{title}</h2>
    </div>
  )
}
const App = () => {
  return (
    <div className="card-container">
      <Card title="Star Wars" rating={5} actors={[{name: 'Actor'}]}/>
      <Card title="Avatar"/>
      <Card title="The Lion King"/>
    </div>
  )
}

export default App
