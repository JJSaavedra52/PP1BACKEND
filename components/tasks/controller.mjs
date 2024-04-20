import { addTask, getTasks, updateTask, deleteTask } from "./store.mjs";

// Create (C)
const add = async (req, res) => {
    const { userName, task } = req.body;
    try {
        const result = await addTask(userName, task);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Read (R)
// Read (R)
const get = async (req, res) => {
    const { userName } = req.body;
    try {
        const tasks = await getTasks(userName);
        res.status(200).json(tasks);
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