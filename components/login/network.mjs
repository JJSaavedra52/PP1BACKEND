import response from '../../network/response.mjs';
import controller from './controller.mjs';
import router from 'express';

router.post('/', (req, res) => {
    const { usuario, contraseña } = req.body;
    controller.login(usuario, contraseña)
    .then((data) => {
        response.success(req, res, data, 200);
    })
    .catch((e) => {
        response.error(req, res, 'Error interno', 500, e);
    });
});

export default router;
