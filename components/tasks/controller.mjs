import { addTask, getTasks, updateTask, deleteTask } from "./store.mjs";
import User from "../user/model.mjs";
import Task from "./model.mjs";

// Create (C)
const add = async (req, res) => {
    const { user, task } = req.body;

    // console.log('Received user:', user); // Log the received user
    // console.log('Received task:', task); // Log the received task

    // Check if user exists
    const foundUser = await User.findOne({ user: user });
    // console.log('Found user:', foundUser); // Log the found user

    if (!foundUser) {
        throw { status: 400, message: 'User does not exist' };
    }
    try {
        const result = await addTask(user, task);
        return { status: 201, message: result };
    } catch (error) {
        throw { status: 400, message: error.message };
    }
};

// Read (R)
const get = async (req, res) => {
    const { user } = req.params;
    try {
        const userTasks = await Task.findOne({ user });
        if (!userTasks) {
            return res.status(404).json({ error: 'No tasks found for this user' });
        }
        return { status: 200, message: userTasks.tasks };
    } catch (error) {
        throw { status: 400, message: error.message };
    }
};

const getTaskById = async (req, res) => {
    const { taskId } = req.params; // req.params para obtener el ID de la tarea de los parámetros de la URL
    try {
        const userTask = await Task.findOne({ 'tasks._id': taskId }); // Busca la tarea por su ID
        if (!userTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        const task = userTask.tasks.find(task => task._id.toString() === taskId); // Encuentra la tarea específica dentro de las tareas del usuario
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        //return res.status(200).json(task);
        return { status: 200, message: task };
    } catch (error) {
        throw { status: 400, message: error.message };
    }
};

//Update (U)
const update = async (req, res) => {
    const { taskId, stepId, status } = req.body;
    //console.log('Request body:', req.body); 
    try {
        const result = await updateTask(taskId, stepId, status);
        return { status: 200, message: result };
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete (D)
// const deleted = async (req, res) => {
//     const { user, taskId } = req.body;
//     try {
//         const result = await deleteTask(user, taskId);
//         res.status(200).json(result);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

export { add, get, getTaskById, update};
// export { add, get, update, deleted };