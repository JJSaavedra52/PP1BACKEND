import { addTask, getTasks, updateTask, deleteTask } from "./store.mjs";

// Create (C)
const add = async (req, res) => {
    const { userName, task } = req.body;
    try {
        const result = await addTask(userName, task);
        success(res, result, 201);
    } catch (error) {
        error(res, error, 400);
    }
};

// Read (R)
const get = async (req, res) => {
    const { userName } = req.body;
    try {
        const tasks = await getTasks(userName);
        success(res, tasks, 200);
    } catch (error) {
        error(res, error, 400);
    }
};

// Update (U)
const update = async (req, res) => {
    const { userName, task } = req.body;
    try {
        const result = await updateTask(userName, task);
        success(res, result, 200);
    } catch (error) {
        error(res, error, 400);
    }
};

// Delete (D)
const deleted = async (req, res) => {
    const { userName, taskId } = req.body;
    try {
        const result = await deleteTask(userName, taskId);
        success(res, result, 200);
    } catch (error) {
        error(res, error, 400);
    }
};

export { add, get, update, deleted };