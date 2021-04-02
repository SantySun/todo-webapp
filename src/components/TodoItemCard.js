import React from "react"
import PropTypes from "prop-types"

const TodoItemCard = (props) => {
  const { name, content, priority, completed, onComplete, onEdit, onDelete } = props

  const getBackgroundColor = () => {
    let backgroundColor = "danger"
    if (completed) {
      backgroundColor = "dark"
    } else if (priority === "Medium") {
      backgroundColor = "warning"
    } else if (priority === "Low") {
      backgroundColor = "info"
    }
    return `list-group-item-${backgroundColor}`
  }
  return (
    <div
      className={`list-group-item ${getBackgroundColor()} d-flex justify-content-between align-items-center p-3 m-1`}
    >
      <div
        className="list-group-item flex-column align-items-start"
        style={{ width: "100%", backgroundColor: completed ? "#ccc": "white" }}
      >
        <div className="d-flex w-100 justify-content-between">
          <h4 className="mb-1">{name}</h4>
          <button
            type="button"
            className="close"
            aria-label="Close"
            title="Delete this task"
            onClick={onDelete}
          >
            <span aria-hidden="true" style={{ color: "#f00" }}>
              &times;
            </span>
          </button>
        </div>
        <p className="mb-1">{content}</p>
        <small>{`Priority: ${priority}`}</small>
        <div className="d-flex w-100">
          <button
            type="button"
            className="btn btn-link btn-sm"
            title="Edit this task"
            onClick={onEdit}
          >
            <span aria-hidden="true">Edit</span>
          </button>
          <button
            type="button"
            className="btn btn-link btn-sm"
            title="Delete this task"
            onClick={onComplete}
          >
            <span aria-hidden="true">{completed ? "Resume" : "Complete"}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

TodoItemCard.propTypes = {
  name: PropTypes.string,
  content: PropTypes.string,
  priority: PropTypes.oneOf(["High", "Medium", "Low"]),
  completed: PropTypes.bool,
  onComplete: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
}

export default TodoItemCard
