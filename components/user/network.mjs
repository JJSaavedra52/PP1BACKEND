import { Router } from 'express';
import { success, error } from '../../network/response.mjs';
import { login, register } from './controller.mjs';

const router = Router(); // Inicializa el enrutador de express
const controller = { login, register };

router.get('/', (req, res) => {
    success(res, 'Todo correcto en /login', 200); // Utiliza el método success importado
});

router.post('/login', (req, res) => {
    controller.login(req.body)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message);
        });
});

router.post('/register', (req, res) => {
    controller.register(req.body)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message);
        });
});

export { router };



