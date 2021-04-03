import { render, screen } from "@testing-library/react"
import SortingRatioButtons from "./SortingRatioButtons"

test("renders sort ratio buttons text", () => {
  render(<SortingRatioButtons method="Priority" />)
  const sortTextOne = screen.getByText(/sort by priority/i)
  const sortTextTwo = screen.getByText(/sort by name/i)
  expect(sortTextOne).toBeInTheDocument()
  expect(sortTextTwo).toBeInTheDocument()
})

