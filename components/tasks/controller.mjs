import { addTask, getTasks, updateTask, deleteTask } from "./store.mjs";
import User from "../user/model.mjs";
import Task from "./model.mjs";

// Create (C)
const add = async (req, res) => {
    const { userName, task } = req.body;

    // Check if user exists
    const user = await User.findOne({ user: userName });
    if (!user) {
        return res.status(400).json({ error: 'User does not exist' });
    }

    try {
        const result = await addTask(userName, task);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Read (R)
const get = async (req, res) => {
    const { userName } = req.body;
    try {
        const userTasks = await Task.findOne({ userName });
        if (!userTasks) {
            return res.status(404).json({ error: 'No tasks found for this user' });
        }
        res.status(200).json(userTasks.tasks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update (U)
// const update = async (req, res) => {
//     const { userName, task } = req.body;
//     try {
//         const result = await updateTask(userName, task);
//         res.status(200).json(result);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// Delete (D)
// const deleted = async (req, res) => {
//     const { userName, taskId } = req.body;
//     try {
//         const result = await deleteTask(userName, taskId);
//         res.status(200).json(result);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

export { add, get };
// export { add, get, update, deleted };