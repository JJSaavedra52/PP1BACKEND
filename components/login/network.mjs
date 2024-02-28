import express from 'express';
import { success, error } from '../../network/response.mjs';
import controller from './controller.mjs';

const router = express.Router(); // Inicializa el enrutador de express

router.get('/', (req, res) => {
    success(req, res, 'Todo correcto en /login', 200); // Utiliza el método success importado
});

router.post('/', (req, res) => {
    const { usuario, contraseña } = req.body;
    controller.login(usuario, contraseña)
    .then((data) => {
        success(req, res, data, 200);
    })
    .catch((e) => {
        error(req, res, 'Error interno', 500, e);
    });
});

export default router;


