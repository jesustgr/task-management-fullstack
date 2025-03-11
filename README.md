# Task Management Fullstack Application

This repository contains the fullstack code for a task management application, built with a NestJS backend and a Next.js frontend.  It allows users to efficiently manage their tasks with features for creation, viewing, updating, and deletion.

## Functionality

This application provides the following core functionalities:

*   **Task Creation:** Users can add new tasks with titles, descriptions, and statuses (Pending, In Progress, Completed).
*   **Task Listing:**  View a list of all tasks, with options to filter tasks by their status.
*   **Status Update:**  Easily change the status of tasks using dropdown menus within the task list.
*   **Task Deletion:** Remove tasks that are no longer needed.
*   **Task Editing:** Modify existing task details such as title, description, and status.

## Accessing the Application from GitHub

The codebase is organized into two main folders within this repository:

*   **`task-management-api`**: This folder contains the NestJS backend API code. It handles data storage, task management logic, and API endpoints for the frontend to communicate with.
*   **`task-management-frontend`**: This folder houses the Next.js frontend application. It provides the user interface for interacting with the task management system, displaying tasks, and sending requests to the backend API.

To access and run this application, follow these steps:

1.  **Navigate to the Backend Folder:**

    ```bash
    cd task-management-api
    ```

2.  **Backend Setup (`task-management-api`):**

    *   **Install Backend Dependencies:**

        ```bash
        npm install
        ```

    *   **Database Configuration:** Ensure you have PostgreSQL installed and running. Configure your database connection details in the `ormconfig.json` file located in the root of the `task-management-api` folder.  You will need to provide your database host, port, username, password, and database name.

    *   **Run Database Migrations:** To set up the database schema, run the TypeORM migrations:

        ```bash
        npm run typeorm:migration:run
        ```

    *   **Start the Backend Server:**

        ```bash
        npm run start:dev
        ```

        The backend API server should now be running, typically at `http://localhost:3000`.

3.  **Navigate to the Frontend Folder:**

    Open a new terminal window or tab and navigate to the frontend folder:

    ```bash
    cd task-management-frontend
    ```

4.  **Frontend Setup (`task-management-frontend`):**

    *   **Install Frontend Dependencies:**

        ```bash
        npm install
        ```

    *   **Start the Frontend Development Server:**

        ```bash
        npm run dev
        ```

        The Next.js frontend development server should now be running, usually at `http://localhost:3001` or `http://localhost:3000` (check your terminal output for the exact address).

5.  **Access the Application in your Browser:**

    Open your web browser and go to the address where your frontend is running (e.g., `http://localhost:3001`). You should now be able to use the Task Management application.

## Usage

Once both the frontend and backend servers are running, you can interact with the application through your web browser.

*   **Adding Tasks:** Use the "Add New Task" form to create new tasks. Enter a title, description (optional), and select a status.
*   **Viewing Tasks:** The task list will display all tasks, initially showing "All Statuses".
*   **Filtering Tasks:** Use the "Filter by Status" dropdown to view tasks of a specific status (Pending, In Progress, Completed) or "All Statuses".
*   **Updating Task Status:**  Within each task item in the list, you can use the status dropdown to change the status of that task.
*   **Deleting Tasks:** Click the "Delete" button next to a task to remove it from the list.
*   **Editing Tasks:** Click the "Edit" button next to a task to open an edit form. Modify the title, description, or status and click "Update Task" to save your changes. Click "Cancel" to discard edits.
