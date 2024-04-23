import { Router } from 'express';
import { success, error } from '../../network/response.mjs';
import { login, register } from './controller.mjs';

const router = Router(); // Inicializa el enrutador de Express
const controller = { login, register }; // Objeto que contiene las funciones de controlador importadas

// Ruta para el método GET en /user/login
router.get('/', (req, res) => {
    success(res, 'Todo correcto en /login', 200); // Responde con un mensaje de éxito
});

// Ruta para el método POST en /user/login
router.post('/login', (req, res) => {
    // Llama a la función de controlador de inicio de sesión con los datos del cuerpo de la solicitud
    controller.login(req.body)
        .then(({ status, message, userName }) => {
            // Envia una respuesta de éxito con el mensaje y el estado devueltos por el controlador
            success(res, message, status, userName);
        })
        .catch(({ status, message }) => {
            // Envia una respuesta de error con el mensaje y el estado devueltos por el controlador
            error(res, 'Error interno', status || 500, message);
        });
});

// Ruta para el método POST en /user/register
router.post('/register', (req, res) => {
    // Llama a la función de controlador de registro con los datos del cuerpo de la solicitud
    controller.register(req.body)
        .then(({ status, message }) => {
            // Envia una respuesta de éxito con el mensaje y el estado devueltos por el controlador
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            // Envia una respuesta de error con el mensaje y el estado devueltos por el controlador
            error(res, 'Error interno', status || 500, message);
        });
});

export { router };



