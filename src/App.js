import React, { useState } from "react"
import TodoItemForm from "./components/TodoItemForm"
import TodoItemCard from "./components/TodoItemCard"
import sampleTasks from "./sampleTasks"

import "bootstrap/dist/css/bootstrap.css"
import TodoList from "./components/TodoList"


function App() {
  const [tasks, setTasks] = useState(sampleTasks)

  return (
    <div className="container card mt-3">
      <TodoList tasks={tasks} setTasks={setTasks} sortMethod="Priority"/>
    </div>
  )
}

export default App
