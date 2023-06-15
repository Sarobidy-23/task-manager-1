import { useTaskManager } from '@/store/useTaskManager';
import React, { ChangeEvent, useRef, useState } from 'react';

interface Task {
  id: number,
  title: string,
  completed: boolean,
}

const TaskManager = () => {
  const [searchTask,setSearchTask] = useState("")
  const createTaskRef = useRef<HTMLInputElement>(null)
   const {
     tasks,
     addTask,
     updateTask,
     deleteTask,
   } = useTaskManager();

  const handleAddTask = () => {
    const title = createTaskRef.current?.value as string
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };
     addTask(newTask);
  };

  const handleUpdateTask = (taskId: number, updatedTask: Task) => {
     updateTask(taskId, updatedTask);
  };

  const handleDeleteTask = (taskId: number) => {
    deleteTask(taskId);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTask(e.target.value);
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTask.toLowerCase())
  );

  return (
    <div>
      <h1>Task Manager</h1>

      <input type="text" ref={createTaskRef}/>

      <button onClick={handleAddTask}>Add Task</button>

      <input type="text" onChange={handleSearch} placeholder="Search Task" />

      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <input
              type="text"
              value={task.title}
              onChange={(e) =>
                handleUpdateTask(task.id, {
                  title: e.target.value,
                  id: task.id,
                  completed: task.completed
                })
              }
            />
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
