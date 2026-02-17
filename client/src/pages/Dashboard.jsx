import { useState, useEffect } from 'react';
import axios from '../api/axios';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    const fetchTasks = async () => {
        try {
            const { data } = await axios.get('/tasks');
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleTaskAdded = async (newTask) => {
        try {
            const { data } = await axios.post('/tasks', newTask);
            setTasks([...tasks, data]);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const handleTaskUpdated = async (updatedTask) => {
        try {
            const { data } = await axios.put(`/tasks/${updatedTask._id}`, updatedTask);
            setTasks(tasks.map((task) => (task._id === data._id ? data : task)));
            setEditingTask(null);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleTaskDeleted = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await axios.delete(`/tasks/${id}`);
                setTasks(tasks.filter((task) => task._id !== id));
            } catch (error) {
                console.error('Error deleting task:', error);
            }
        }
    };

    const filteredTasks = tasks.filter((task) => {
        const matchesFilter = filter === 'all' || task.status === filter;
        const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) ||
            (task.description && task.description.toLowerCase().includes(search.toLowerCase()));
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-lg shadow">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">My Tasks</h2>

                <div className="flex space-x-4 w-full sm:w-auto">
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border p-2"
                    />
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="block rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border p-2"
                    >
                        <option value="all">All</option>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
            </div>

            <TaskForm
                onTaskAdded={handleTaskAdded}
                editingTask={editingTask}
                onTaskUpdated={handleTaskUpdated}
                onCancelEdit={() => setEditingTask(null)}
            />

            <div className="grid gap-4">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                        <TaskItem
                            key={task._id}
                            task={task}
                            onEdit={setEditingTask}
                            onDelete={handleTaskDeleted}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500">No tasks found.</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
