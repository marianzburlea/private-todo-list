export const getCompleted = (list = []) => list.reduce((a, b) => a + (b.completed ? 1 : 0), 0)
