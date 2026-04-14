import React, { useRef, useState } from 'react'
import to_do_list from '../assets/to_do_list.png'
import TodoItems from './TodoItems'

const Todo = () => {

  const [todoList, setTodoList] = useState([])
  const [error, setError] = useState("");

  const inputRef = useRef()

  const add = () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === "") {
      setError("Please add task first!");
      return
    }
    setError("");
    
    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false
    }
    setTodoList([...todoList, newTodo]) 
    inputRef.current.value = ""
  }

  const deleteTodo = (id) => {
    setTodoList((tasks) => {
      return tasks.filter((task) => task.id !== id  
      )
    })
  }

  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-137.5 rounded-xl'>
      
      {   /* ----------title------------ */}

      <div className='flex items-center mt-7 gap-2'>
        <img className='w-8' src={to_do_list} alt="" />
          <h1 className='text-3xl font-semibold'>To-Do List</h1>
      </div>

      {   /* ----------input box------------ */}

      <div className='flex items-center my-7 bg-gray-200 rounded-full'>
        <input ref={inputRef} onFocus={()=>setError("")} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' type="text" placeholder='Add your task' />
        <button onClick={add} className='border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium hover:bg-orange-700 cursor-pointer'>Add Task</button>
      </div>
      <div><p className='text-red-600 ml-4 font-sans-serif'>{error}</p></div>
      
      {   /* ----------to do list----------- */}

      <div>
        {todoList.map((item,index) => {
          return <TodoItems key={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} />
       })}
      </div>
    </div>
  )
}

export default Todo