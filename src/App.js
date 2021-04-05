import React, { useState } from "react"
import sampleTasks from "./sampleTasks"
import TodoList from "./components/TodoList"
import SortingRatioButtons from "./components/SortingRatioButtons"
import TodoItemForm from "./components/TodoItemForm"

import "bootstrap/dist/css/bootstrap.css"

function App() {
  const [tasks, setTasks] = useState(sampleTasks || [])
  const [method, setMethod] = useState("Priority")
  const [isAddingTask, setIsAddingTask] = useState(false)

  const createNewTask = (values) => {
    const newTaskId = new Date().toISOString()
    setTasks([...tasks, { id: newTaskId, ...values }])
    setIsAddingTask(false)
  }

  return (
    <div className="container p-3">
      <h3>{`Total: ${tasks.length} tasks`}</h3>
      <h3>{`Completed: ${tasks.filter((t) => t.completed).length} tasks`}</h3>
      <SortingRatioButtons method={method} onSelect={setMethod} />
      {isAddingTask ? (
        <TodoItemForm
          onSave={createNewTask}
          onCancel={() => {
            setIsAddingTask(false)
          }}
        />
      ) : (
        <button
          className="btn btn-primary m-1"
          onClick={() => {
            setIsAddingTask(true)
          }}
        >
          Add a New Task
        </button>
      )}
      <TodoList tasks={tasks} setTasks={setTasks} sortMethod={method} />
    </div>
  )
}

export default App
