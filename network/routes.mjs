import { router } from "../components/user/network.mjs";

const user = router;

const routes = (server) => {
    server.use('/user', user);
};

export default routes;
