import login from '../components/login/controller.mjs';

const routes = (server) => {
    server.use('/login', login);
}

export default routes;