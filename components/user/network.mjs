import { Router } from 'express';
import { success, error } from '../../network/response.mjs';
import { login, register } from './controller.mjs';

const router = Router(); // Inicializa el enrutador de express
const controller = { login, register };

router.get('/', (req, res) => {
    success(res, 'Todo correcto en /login', 200); // Utiliza el método success importado
});

router.post('/login', (req, res) => {
    controller.login(req, res).then((data) => {
        success(res, data, 200);
    } ).catch((e) => {
        error(res, 'Error interno', 500, e);
    });
});

router.post('/register', (req, res) => {
    controller.register(req, res).then((data) => {
        success(res, data, 201);
    } ).catch((e) => {
        error(res, 'Error interno', 500, e);
    });
});

export { router };



