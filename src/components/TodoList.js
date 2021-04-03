import React, { useState } from "react"
import PropTypes from "prop-types"
import TodoItemForm from "./TodoItemForm"
import TodoItemCard from "./TodoItemCard"
import { sortByName, sortByPriority} from "../util/sortTasks"


const TodoList = (props) => {
  const { tasks, setTasks, sortMethod } = props
  const [taskUnderEditing, setTaskUnderEditing] = useState()
  const onTaskDelete = (id) => {
    setTasks(tasks.filter((t) => t.id !== id))
  }

  const onTaskEditSubmit = (id, values) => {
    setTasks(tasks.map((t) => (t.id !== id ? t : { ...t, ...values })))
  }

  const sortTasks = (tasks) => {
    const sortFunction = sortMethod === "Priority" ? sortByPriority : sortByName

    const inProgress = tasks.filter((t) => !t.completed)
    const finished = tasks.filter((t) => t.completed)
    return [...inProgress.sort(sortFunction), ...finished.sort(sortFunction)]
  }


  return (
    <div className="mt-3 mb-3" role="list">
      {sortTasks(tasks).map((task) =>
        taskUnderEditing === task.id ? (
          <TodoItemForm
            key={task.id}
            {...task}
            onSave={(values) => {
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
            onComplete={() =>
              onTaskEditSubmit(task.id, { completed: !task.completed })
            }
          />
        )
      )}
    </div>
  )
}

TodoList.propTypes = {
  tasks: PropTypes.array,
  setTasks: PropTypes.func,
  sortMethod: PropTypes.oneOf(["Name", "Priority"])
}

export default TodoList
