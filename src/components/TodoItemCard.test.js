import { render, screen } from "@testing-library/react"
import TodoItemCard from "./TodoItemCard"

const task = {
  name: "Todo Task 1",
  content: "This is Todo Task One",
  priority: "High",
  completed: false
}

test("renders item content", () => {
  render(<TodoItemCard  {...task} />)
  expect(screen.getByText(/Todo Task 1/i)).toBeInTheDocument()
  expect(screen.getByText(/This is Todo Task One/i)).toBeInTheDocument()
  expect(screen.getByText(/Priority: High/)).toBeInTheDocument()
  expect(screen.getByText(/Complete/)).toBeInTheDocument()
  expect(screen.getByText(/Edit/)).toBeInTheDocument()
  expect(screen.getByText(/Delete/)).toBeInTheDocument()
})
