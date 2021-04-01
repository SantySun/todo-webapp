import React, { useState } from "react";
import PropTypes from "prop-types";

const TodoItemCard = (props) => {
  const { name, priority, completed, onChange } = props;
  const [isEditing, setisEditing] = useState(false);
  return (
    <div className="card">
      {name}
      <button
        onClick={() => {
          console.log(isEditing);
        }}
      >
        Clike me
      </button>
    </div>
  );
};

TodoItemCard.propTypes = {
  name: PropTypes.string,
  priority: PropTypes.oneOf(["High", "Medium", "Low"]),
  completed: PropTypes.bool,
  onChange: PropTypes.func,
};

export default TodoItemCard;
