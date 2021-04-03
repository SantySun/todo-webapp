import React, { useState, useEffect } from "react"
import sampleTasks from "./sampleTasks"

import TodoList from "./components/TodoList"
import SortingRatioButtons from "./components/SortingRatioButtons"
import TodoItemForm from "./components/TodoItemForm"

import "bootstrap/dist/css/bootstrap.css"

function App() {
  const [tasks, setTasks] = useState(sampleTasks)
  const [method, setMethod] = useState("Priority")
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [count, setCount] = useState({
    total: sampleTasks.length,
    completed: sampleTasks.filter((t) => t.completed).length
  })

  const createNewTask = (values) => {
    const newTaskId = (new Date()).toISOString()
    setTasks([...tasks, { id: newTaskId, ...values }])
    setIsAddingTask(false)
  }

  useEffect(() => {
    setCount({
      total: tasks.length,
      completed: tasks.filter((t) => t.completed).length
    })
  }, [tasks])

  return (
    <div className="container card mt-3 p-3">
      <h3>{`Total: ${count.total} tasks`}</h3>
      <h3>{`Completed: ${count.completed} tasks`}</h3>
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
