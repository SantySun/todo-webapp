import { render, screen, waitFor, fireEvent } from "@testing-library/react"
import TodoItemForm from "./TodoItemForm"


const task = {
  name: "Todo Task 1",
  content: "This is Todo Task One",
  priority: "High",
  completed: false
}


test('display default value', () => {
  render(<TodoItemForm {...task} />)
  expect(screen.getByLabelText(/Task Name/)).toHaveValue("Todo Task 1")
  expect(screen.getByLabelText(/Task Description/)).toHaveValue(
    "This is Todo Task One"
  )
  expect(screen.getByLabelText(/Priority/)).toHaveValue("High")
  expect(screen.getByLabelText(/Completed/)).not.toBeChecked()
})

test('change field values', async () => {
  render(<TodoItemForm {...task} />)
  // change task name
  fireEvent.change(screen.getByLabelText(/Task Name/), {
    target: { value: "Todo Task 1#" }
  })
  await waitFor(() => screen.getByLabelText(/Task Name/))
  expect(screen.getByLabelText(/Task Name/)).toHaveValue("Todo Task 1#")

  // change task content
  fireEvent.change(screen.getByLabelText(/Task Description/), {
    target: { value: "This is Todo Task One#" }
  })
  await waitFor(() => screen.getByLabelText(/Task Description/))
  expect(screen.getByLabelText(/Task Description/)).toHaveValue(
    "This is Todo Task One#"
  )

  // change task priority
  fireEvent.change(screen.getByLabelText(/Priority/), {
    target: { value: "Low" }
  })
  await waitFor(() => screen.getByLabelText(/Priority/))
  expect(screen.getByLabelText(/Priority/)).toHaveValue("Low")

  // change completed status
  fireEvent.change(screen.getByLabelText(/Completed/), {
    target: { checked: true }
  })
  await waitFor(() => screen.getByLabelText(/Completed/))
  expect(screen.getByLabelText(/Completed/)).toBeChecked(true)
})