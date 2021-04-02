import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.css"
import TodoItemForm from "./components/TodoItemForm"
import TodoItemCard from "./components/TodoItemCard"
import sampleTasks from "./defaultTasks"

function App() {
  const [tasks, setTasks] = useState(sampleTasks)
  const [taskUnderEditing, setTaskUnderEditing] = useState()

  const onTaskDelete = (id) => {
    setTasks(tasks.filter((t) => t.id !== id))
  }

  const onTaskEditSubmit = (id, values) => {
    setTasks(tasks.map((t) => (t.id !== id ? t : { ...t, ...values })))
  }

  return (
    <div className="container card">
      {tasks.map((task) =>
        taskUnderEditing === task.id ? (
          <TodoItemForm
            {...task}
            onChange={(values) => {
              onTaskEditSubmit(task.id, values)
              setTaskUnderEditing()
            }}
            onCancel={() => setTaskUnderEditing()}
          />
        ) : (
          <TodoItemCard
            key={task.id}
            {...task}
            onEdit={() => setTaskUnderEditing(task.id)}
            onDelete={() => onTaskDelete(task.id)}
            onComplete={() => onTaskEditSubmit(task.id, { completed: true })}
          />
        )
      )}
    </div>
  )
}

export default App
