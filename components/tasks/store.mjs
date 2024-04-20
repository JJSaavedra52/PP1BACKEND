import Task from "./model.mjs";

// Create (C)
export const addTask = async (userName, task) => {
    try {
        const newTask = new Task({ userName, tasks: task });
        await newTask.save();
        return 'Tarea añadida correctamente';
    } catch (error) {
        console.error('Error en addTask:', error);
        throw error;
    }
};

// Read (R)
export const getTasks = async (userName) => {
    try {
        const tasks = await Task.find({ userName });
        return tasks;
    } catch (error) {
        console.error('Error en getTasks:', error);
        throw error;
    }
};

// Update (U)
export const updateTask = async (userName, task) => {
    try {
        await Task.updateOne({ userName, 'tasks.id': task.id }, { $set: { 'tasks.$': task } });
        return 'Tarea actualizada correctamente';
    } catch (error) {
        console.error('Error en updateTask:', error);
        throw error;
    }
};

// Delete (D)
export const deleteTask = async (userName, taskId) => {
    try {
        await Task.updateOne({ userName }, { $pull: { tasks: { id: taskId } } });
        return 'Tarea eliminada correctamente';
    } catch (error) {
        console.error('Error en deleteTask:', error);
        throw error;
    }
};