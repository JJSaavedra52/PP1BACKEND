import { router } from "../components/user/network.mjs";

const user = router; // Inicializa el enrutador de usuario

// Función para configurar las rutas del servidor
const routes = (server) => {
    server.use('/user', user); // Configura las rutas del enrutador de usuario bajo la ruta '/user'
};


export default routes;
