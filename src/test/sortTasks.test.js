import { sortByPriority, sortByName } from "../util/sortTasks"
import sampleTasks from "../sampleTasks"
require("jest-sorted")

const prioritySorting = (a, b) => {
  if (
    a.priority === "High" ||
    (a.priority === "Medium" && b.priority !== "High") ||
    (a.priority === "Low" && b.priority === "Low")
  ) {
    return 1
  }
  return -1
}

test("sort by priority", () => {
  expect(sampleTasks.sort(sortByPriority)).toBeSorted({
    compare: prioritySorting,
    descending: true
  })
})

test("sort by name", () => {
  expect(sampleTasks.sort(sortByName)).toBeSorted({ key: "name" })
})
