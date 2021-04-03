const priorityMap = {
  High: 3,
  Medium: 2,
  Low: 1
}

const sortByPriority = (t1, t2) => {
  if (priorityMap[t1.priority] < priorityMap[t2.priority]) {
    return 1
  }
  return -1
}

const sortByName = (t1, t2) => {
  if (t1.name > t2.name) {
    return 1
  }
  return -1
}


export { sortByName, sortByPriority }