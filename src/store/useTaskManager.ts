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
  updateList: (taskList: Task[]) => void,
  setSearchTask: (title: string) => void
}
const useTaskManager = create<{tasks:Task[]} & {searchTask: string} & TaskAction>((set) => ({
  tasks:[],
  searchTask: "",
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
  },
  setSearchTask(title) {
    set(()=>({searchTask: title}))
  },
}))


export {
  useTaskManager
}