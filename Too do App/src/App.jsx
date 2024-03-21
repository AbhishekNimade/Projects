import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';



// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import { Linter } from 'eslint'
// import './App.css'

function App() {
  const [todo, setTodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
    }
    settodos(todos)
  }, [])
  

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (params) => {
    setshowFinished(!showFinished)

  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item =>{
      return item.id!==id
    });
    settodos(newTodos)
    saveToLS()
  

  }
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item =>{
      return item.id!==id
    });
    settodos(newTodos)
    saveToLS()
  }

  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isComplete: false }])
    setTodo("")
    saveToLS()

  }
  const handleChange = (e) => {
    setTodo(e.target.value)

  }
  const handleChekbox = (e) => {
    let id = e.target.name
    // todos.filter()
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isComplete = !newTodos[index].isComplete;
    settodos(newTodos)
    saveToLS()
  }


  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 p-5 rounded-xl bg-violet-100 min-h-[80vh] md:w-1/2">
        <h1 className='font-bold text-center text-3xl' >iTask - Manage your todos at one place</h1>
        <div className="addTodo m-5 flex flex-col gap-4">
          <h2 className='text-2xl font-bold'>Add a Todo</h2>
          <div className="flex">

          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800  hover:bg-violet-950  disabled:bg-violet-700 mx-2 p-4 py-2 text-sm font-bold text-white rounded-full '>Save</button>
          </div>
        </div>
          <input className='my-4' id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} /> 
          <label className='mx-2' htmlFor="Show Finished">Show Finished</label>
          <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
        <h2 className='text-2xl font-bold'>Your Todos </h2>
        {todos.length === 0 && <div className='m-5'>No Todos to display</div> }
        <div className="todos">
          {todos.map(item => {

            return (showFinished || !item.isComplete) &&  <div key={item.id} className="todo flex my-3 justify-between">
              <div className='flex gap-5'>
              <input name={item.id} onChange={handleChekbox} type="checkbox" checked={item.isComplete} id="" />
              <div className={item.isComplete ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1 '><FaEdit /></button>
                <button onClick= {(e)=>{handleDelete(e, item.id)}}className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1 '><AiFillDelete /></button>
              </div>
            </div>
          })}
        </div>

      </div>
    </>
  )
}

export default App
