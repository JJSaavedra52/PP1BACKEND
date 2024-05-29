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
export const updateTask = async (taskId, stepId, status) => {
    try {
        // Buscar la tarea que contiene el step a actualizar
        const existingTask = await Task.findOne({ 'tasks._id': taskId });

        if (!existingTask) {
            console.error('Tarea no encontrada');
            return { status: 404, message: 'Tarea no encontrada' };
        }

        // Construir la consulta de actualización
        const update = {
            $set: {
                'tasks.$[task].steps.$[step].status': status
            }
        };

        // Especificar los filtros de array para identificar los elementos correctos
        const arrayFilters = [
            { 'task._id': taskId },
            { 'step._id': stepId }
        ];

        // Realizar la actualización
        await Task.updateOne(
            { 'tasks._id': taskId },
            update,
            { arrayFilters }
        );

        return 'Estado del paso actualizado correctamente';
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