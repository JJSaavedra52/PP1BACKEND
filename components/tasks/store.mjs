import Task from "./model.mjs";

// Create (C)
export const addTask = async (user, task) => {
    // Find the user document
    const userTasks = await Task.findOne({ user });

    if (!userTasks) {
        // If the user document doesn't exist, create a new one
        const newUserTasks = new Task({ user, tasks: [task] });
        return newUserTasks.save();
    } else {
        // If the user document exists, push the new task into the tasks array
        userTasks.tasks.push(task);
        return userTasks.save();
    }
};

// Read (R)
export const getTasks = async (user) => {
    try {
        const tasks = await Task.find({ user });
        return tasks;
    } catch (error) {
        console.error('Error en getTasks:', error);
        throw error;
    }
};

// Update (U)
export const updateTask = async (user, task) => {
    try {
        await Task.updateOne({ user, 'tasks.id': task.id }, { $set: { 'tasks.$': task } });
        return 'Tarea actualizada correctamente';
    } catch (error) {
        console.error('Error en updateTask:', error);
        throw error;
    }
};

// Delete (D)
export const deleteTask = async (user, taskId) => {
    try {
        await Task.updateOne({ user }, { $pull: { tasks: { id: taskId } } });
        return 'Tarea eliminada correctamente';
    } catch (error) {
        console.error('Error en deleteTask:', error);
        throw error;
    }
};