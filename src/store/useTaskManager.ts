import { stat } from 'fs'
import { create } from 'zustand'

type Task = {
  id: number,
  title: string,
  completed: boolean
}
type TaskAction = {
  addTask: (newTask: Task)=>void,
  updateTask: (taskId: number, updatedTask: Task)=>void,
  deleteTask: (taskId: number) => void,
  updateList: (taskList: Task[]) => void
}
const useTaskManager = create<{tasks:Task[]} & TaskAction>((set) => ({
  tasks:[],
  addTask: (newTask) => {
    set((state) => ({tasks: [...state.tasks, newTask]}))
  },
  updateTask: (taskId, updatedTask) => {
    set((state)=>({tasks: state.tasks.map((task)=>task.id == taskId ? updatedTask : task)}))
  },
  deleteTask: (taskId) => {
    set((state) => ({tasks: state.tasks.filter((task)=>task.id != taskId)}))
  },
  updateList: (taskList) => {
    set(() => ({tasks: taskList}))
  }
}))


export {
  useTaskManager
}