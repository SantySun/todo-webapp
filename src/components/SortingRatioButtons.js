import React from "react"
import PropTypes from "prop-types"

const SortingRatioButtons = (props) => {
  const { method, onSelect } = props
  return (
    <div>
      <div className="d-flex w-100">
        {["Priority", "Name"].map((m) => (
          <div className="form-check m-3" key={m}>
            <input
              className="form-check-input"
              type="radio"
              name={`ratio-${m}`}
              id={`ratio-${m}`}
              onClick={() => onSelect(m)}
              checked={method === m}
              readOnly
            />
            <label className="form-check-label" htmlFor={`ratio-${m}`}>
              {`Sort By ${m}`}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

SortingRatioButtons.propTypes = {
  method: PropTypes.oneOf(["Name", "Priority"]),
  onSelect: PropTypes.func
}

export default SortingRatioButtons
