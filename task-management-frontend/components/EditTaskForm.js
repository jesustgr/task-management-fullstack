import { useState, useEffect } from 'react';

const EditTaskForm = ({ task, onTaskUpdated, onCancelEdit }) => {
    // State variables to manage input fields, initialized with task prop values
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description || ''); // Default to empty string if description is null/undefined
    const [status, setStatus] = useState(task.status);

    // useEffect to update local state if the task prop changes (e.g., if a different task is being edited)
    useEffect(() => {
    setTitle(task.title);
    setDescription(task.description || '');
    setStatus(task.status);
    }, [task]); // Effect dependency on 'task' prop

    // Function to handle form submission for updating the task
    const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, { // API endpoint to update task by ID (PUT request)
        method: 'PUT', // HTTP PUT method for updating an existing resource
        headers: { 'Content-Type': 'application/json' }, // Indicate JSON content in the request body
        body: JSON.stringify({ title, description, status }), // Send updated task data in JSON format
    });
    if (response.ok) { // Check if the response was successful (status code 200-299)
        onTaskUpdated(); // Call the callback to refresh the task list in the parent component
        onCancelEdit(); // Call the callback to exit edit mode
    } else {
        console.error('Failed to update task'); // Log error if update fails
    }
    };

    return (
    // Form for editing an existing task
    <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
        <label htmlFor="edit-title" className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
        <input
            type="text"
            id="edit-title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required // Title is a required field
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" // Tailwind CSS styling
        />
        </div>
        <div className="mb-2">
        <label htmlFor="edit-description" className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
        <textarea
            id="edit-description"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" // Tailwind CSS styling
        />
        </div>
        <div className="mb-4">
        <label htmlFor="edit-status" className="block text-gray-700 text-sm font-bold mb-2">Status:</label>
        <select
            id="edit-status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" // Tailwind CSS styling
        >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
        </select>
        </div>
        <div className="flex space-x-4">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Update Task
        </button>
        <button type="button" onClick={onCancelEdit} className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Cancel
        </button>
        </div>
    </form>
    );
};

export default EditTaskForm;
