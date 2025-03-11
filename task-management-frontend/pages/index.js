import AddTaskForm from '../components/AddTaskForm';
import TaskList from '../components/TaskList';
import { useState } from 'react';

export default function Home() {
  const [tasksUpdated, setTasksUpdated] = useState(false); // State to trigger task list refresh

  const handleTaskAdded = () => {
    setTasksUpdated(!tasksUpdated); // Toggle state to refresh TaskList
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Management Platform</h1>
      <AddTaskForm onTaskAdded={handleTaskAdded} />
      <h2 className="text-xl font-semibold mb-2">Task List</h2>
      <TaskList key={tasksUpdated} /> {/* Force TaskList to re-render on task add/update */}
    </div>
  );
}
