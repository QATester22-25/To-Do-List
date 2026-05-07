import React, { useEffect, useRef, useState } from "react";
import to_do_list from "../../public/to_do_list.png";
import move from "../assets/moving.png"
import no_task from "../assets/no_tasks.avif"
import all_done from "../assets/all_done.webp"
import TodoItems from "./TodoItems";

const Todo = () => {
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : [],
  );

  const [error, setError] = useState("");

  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === "") {
      setError("Please write a task first!");
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };
    setTodoList([...todoList, newTodo]);
    inputRef.current.value = "";
  };

  const deleteTodo = (id) => {
    setTodoList((tasks) => {
      return tasks.filter((task) => task.id !== id);
    });
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  const toggle = (id) => {
    setTodoList((prevTodo) => {
      return prevTodo.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
    });
  };

  const tasksToDo = () => {
    const done = todoList.filter((todo) => !todo.isComplete);
    return done.length;
  };

  const remaining = tasksToDo();
  const total = todoList.length;
  const completed = total - remaining;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-137.5 rounded-xl">
      {/* ----------title------------ */}

      <div className="flex items-center mt-7 gap-2">
        <img className="w-8" src={to_do_list} alt="" />
        <h1 className="text-3xl font-semibold">To-Do List</h1>
      </div>

      {/* ----------input box------------ */}

      <div className="flex items-center my-7 bg-gray-200 rounded-full">
        <input
          ref={inputRef}
          onFocus={() => setError("")}
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
          type="text"
          placeholder="Add your task"
        />
        <button
          onClick={add}
          className="border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium hover:bg-orange-700 cursor-pointer"
        >
          Add Task +
        </button>
      </div>
      <div>
        <p className="text-red-600 ml-4 font-sans-serif">{error}</p>
      </div>

      {/* ----------to do list----------- */}

      <div>
        {todoList.map((item, index) => {
          return (
            <TodoItems
              key={index}
              text={item.text}
              id={item.id}
              isComplete={item.isComplete}
              deleteTodo={deleteTodo}
              toggle={toggle}
            />
          );
        })}
      </div>
      {
        total === 0 ? (
          <div>
            <p className="text-center mt-3 text-gray-500 font-medium text-xl">
              No tasks found
            </p>
            <img src={no_task} alt="no_task" />
          </div>
        ) : (
          <>
            <p className="text-center mt-10  text-orange-500 font-medium text-xl">
                {remaining > 0 ? `⏳ You have ${remaining} task${remaining !== 1 ? "s" : ""} to do` : ''}
            </p>

            <p className="text-center mt-2 text-green-600 font-medium text-lg">
                {completed > 0 && remaining ? `${completed} task${completed !== 1 ? "s" : ""} done` : !remaining ? <div>
                  <p>All tasks are done ✔️</p><img src={all_done} className="w-50 mx-auto" alt="all_done"/>
                </div> : !completed && remaining >= 3 ? <div className="flex justify-center"><span className="text-center  mr-2 text-blue-700 font-medium text-xl">Keep pushing forward!</span><img src={move} className="w-5" alt="move_icon"/></div>:  ''}
            </p>
          </>
        )}
  
      <div
        className={`transition-all duration-500 ${total === 0 ? "opacity-0 h-0" : "opacity-100 h-auto"}`}
      >
        {total > 0 && (
          <>
            <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
              <div
                className="bg-green-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-center mt-2 text-sm text-gray-600 font-medium">
              {progress}% completed
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Todo;
