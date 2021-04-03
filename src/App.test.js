import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import App from "./App"

// in the app, 5 sample tasks are passed in by default, and 1 of them is completed,
// two of them have high priority, two of them have low priority and the rest has medium priority.

test("renders count text", () => {
  render(<App />)
  const totalCount = screen.getByText(/total: 5 tasks/i)
  const completedCount = screen.getByText(/completed: 1 tasks/i)
  expect(totalCount).toBeInTheDocument()
  expect(completedCount).toBeInTheDocument()
})

test("renders add new task button", () => {
  render(<App />)
  const addNewTaskButton = screen.getByText(/Add a New Task/i)
  expect(addNewTaskButton).toBeInTheDocument()
})

test("add new task button click", async () => {
  render(<App />)
  fireEvent.click(screen.getByText(/Add a New Task/i))
  await waitFor(() => screen.getByText(/save/i))
  expect(screen.getByText(/save/i)).toBeInTheDocument()
})

test("add a new task", async () => {
  render(<App />)
  fireEvent.click(screen.getByText(/Add a New Task/i))
  await waitFor(() => screen.getByText(/save/i))
  expect(screen.queryByText(/Add a New Task/i)).not.toBeInTheDocument()
  fireEvent.change(screen.getByLabelText(/Task Name/), {
    target: { value: "Todo Task Test1" }
  })
  fireEvent.change(screen.getByLabelText(/Task Description/), {
    target: { value: "Todo Task content Test1" }
  })
  fireEvent.change(screen.getByLabelText(/^Priority$/), {
    target: { value: "Medium" }
  })
  fireEvent.change(screen.getByLabelText(/Completed/), {
    target: { checked: false }
  })
  await waitFor(() => screen.getByText(/Cancel/i))
  expect(screen.getByLabelText(/Task Name/)).toHaveValue("Todo Task Test1")
  expect(screen.getByLabelText(/Task Description/)).toHaveValue(
    "Todo Task content Test1"
  )
  expect(screen.getByLabelText(/^Priority$/)).toHaveValue("Medium")
  expect(screen.getByLabelText(/Completed/)).not.toBeChecked()
  fireEvent.click(screen.getByText(/save/i))
  await waitFor(() => screen.getByText(/Add a New Task/i))
  expect(screen.queryByLabelText(/Task Name/)).not.toBeInTheDocument()
  expect(screen.queryByLabelText(/Task Description/)).not.toBeInTheDocument()
  expect(screen.queryByLabelText(/^Priority$/)).not.toBeInTheDocument()
  expect(screen.queryByLabelText(/Completed/)).not.toBeInTheDocument()
  expect(screen.queryByText(/save/i)).not.toBeInTheDocument()
  expect(screen.getByText(/Todo Task Test1/)).toBeInTheDocument()
  expect(screen.getByText(/Todo Task content Test1/)).toBeInTheDocument()
  // there is only one task with medium priority in default tasks, now the number should be 2
  expect(screen.queryAllByText(/Priority: Medium/)).toHaveLength(2)
  expect(screen.queryAllByText(/Resume/i)).toHaveLength(1)
})

test("complete a task", async () => {
  render(<App />)
  fireEvent.click(screen.queryAllByText(/^Complete$/)[0])
  await waitFor(() => screen.queryAllByText("Resume"))
  expect(screen.queryAllByText(/Resume/i)).toHaveLength(2)
})

test("resume a task", async () => {
  render(<App />)
  fireEvent.click(screen.getByText(/Resume/))
  await waitFor(() => screen.queryAllByText("Resume"))
  expect(screen.queryAllByText(/Resume/i)).toHaveLength(0)
})

test("delete a task", async () => {
  render(<App />)
  fireEvent.click(screen.queryAllByText(/^Delete$/)[0])
  await waitFor(() => screen.queryAllByText("Delete"))
  expect(screen.queryAllByText(/Delete/i)).toHaveLength(4)
})

test("edit a task", async () => {
  render(<App />)
  fireEvent.click(screen.queryAllByText(/Edit/)[0]) // click first edit button
  await waitFor(() => screen.getByText(/save/i))
  expect(screen.queryAllByText(/Edit/)).toHaveLength(4) // one of edit buttons is hidden
  fireEvent.change(screen.getByLabelText(/Task Name/), {
    target: { value: "Task with changed name" }
  })
  fireEvent.change(screen.getByLabelText(/Task Description/), {
    target: { value: "modifying task content..." }
  })
  fireEvent.change(screen.getByLabelText(/^Priority$/), {
    target: { value: "Low" }
  })
  fireEvent.change(screen.getByLabelText(/Completed/), {
    target: { checked: false }
  })
  await waitFor(() => screen.getByText(/Cancel/i))
  expect(screen.getByLabelText(/Task Name/)).toHaveValue(
    "Task with changed name"
  )
  expect(screen.getByLabelText(/Task Description/)).toHaveValue(
    "modifying task content..."
  )
  expect(screen.getByLabelText(/^Priority$/)).toHaveValue("Low")
  expect(screen.getByLabelText(/Completed/)).not.toBeChecked()
  fireEvent.click(screen.getByText(/save/i))
  await waitFor(() => screen.queryAllByText(/Edit/))
  expect(screen.queryByLabelText(/Task Name/)).not.toBeInTheDocument()
  expect(screen.queryByLabelText(/Task Description/)).not.toBeInTheDocument()
  expect(screen.queryByLabelText(/^Priority$/)).not.toBeInTheDocument()
  expect(screen.queryByLabelText(/Completed/)).not.toBeInTheDocument()
  expect(screen.queryByText(/save/i)).not.toBeInTheDocument()

  expect(screen.getByText(/Task with changed name/)).toBeInTheDocument()
  expect(screen.getByText(/modifying task content\.\.\./)).toBeInTheDocument()
  expect(screen.queryAllByText(/Priority: Low/)).toHaveLength(3)
  expect(screen.queryAllByText(/^Complete$/i)).toHaveLength(4)
})
