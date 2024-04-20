import { router } from "../components/user/network.mjs";
import { router as task } from "../components/tasks/network.mjs";

const user = router; // Inicializa el enrutador de usuario

// Función para configurar las rutas del servidor
const routes = (server) => {
    server.use('/user', user); // Configura las rutas del network de usuario bajo la ruta '/user'
    server.use('/tasks', task); // Configura las rutas del network de tareas bajo la ruta '/tasks'
};


export default routes;
