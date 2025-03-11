import { useState, useEffect } from 'react';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchTasks();
  }, [statusFilter]); // Fetch tasks when filter changes

  const fetchTasks = async () => {
    let url = 'http://localhost:3000/tasks'; // Backend API URL
    if (statusFilter !== 'all') {
      // Basic filter - adjust backend if needed for status filtering
      url = `<span class="math-inline">\{url\}?status\=</span>{statusFilter}`;
    }
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setTasks(data);
    } else {
      console.error('Failed to fetch tasks');
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const response = await fetch(`http://localhost:3000/tasks/${id}`, { // Backend API URL
        method: 'DELETE',
      });
      if (response.ok) {
        fetchTasks(); // Refresh task list after deletion
      } else {
        console.error('Failed to delete task');
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    await fetch(`http://localhost:3000/tasks/${id}`, { // Backend API URL
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchTasks(); // Refresh task list after status change
  };
  const filteredTasks = statusFilter === 'all' ? tasks : tasks.filter(task => task.status === statusFilter);


  return (
    <div>
      <div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            {task.title} - Status: {task.status}
            <select
              value={task.status}
              onChange={(e) => handleStatusChange(task.id, e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;