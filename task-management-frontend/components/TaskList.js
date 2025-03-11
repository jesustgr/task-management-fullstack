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
      <div className="mb-4">
        <label htmlFor="status-filter" className="block text-gray-700 text-sm font-bold mb-2">Filter by Status:</label>
        <select
          id="status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <ul className="divide-y divide-gray-200">
        {filteredTasks.map((task) => (
          <li key={task.id} className="py-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Status:</span>
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task.id, e.target.value)}
                  className="shadow border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="text-gray-500">{task.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;