import { Router } from 'express';
import { success, error } from '../../network/response.mjs';
import { add, get, getTaskById, update} from './controller.mjs';
// import { error as errorResponse } from '../../network/response.mjs';

// import { add, get, update, deleted} from './controller.mjs';

const router = Router(); // Inicializa el enrutador de Express
const controller = { add, get, getTaskById, update }; // Objeto que contiene las funciones de controlador importadas
// const controller = { add, get, update, deleted }; // Objeto que contiene las funciones de controlador importadas


// Ruta para el método GET en /user/login
router.get('/', (req, res) => {
    success(res, 'Todo correcto en /tasks', 200); // Responde con un mensaje de éxito
});

// Ruta para el método POST en /tasks/addTask (C)
router.post('/addTask', (req, res) => {
    controller.add(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message);
        });
})

// Ruta para el método POST en /tasks/getTasks (R)
router.get('/getTasks/:user', (req, res) => {
    controller.get(req, res)
        .then((message) => {
            success(res, message, 200);
        })
        .catch((err) => {
            error(res, 'Error interno', 500, err.message);
        });
});

router.get('/getTaskById/:taskId', (req, res) => {
    controller.getTaskById(req, res)
        .then((message) => {
            success(res, message, 200);
        })
        .catch((err) => {
            error(res, 'Error interno', 500, err.message);
        });
});

// Ruta para el método POST en /tasks/updateTask (U)
router.post('/UpdateTaskStep', (req, res) => {
    controller.update(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message);
        });
})

// Ruta para el método POST en /tasks/deleteTask (D)
// router.delete('/deleteTask', (req, res) => {
//     controller.deleted(req, res)
//         .then(({ status, message }) => {
//             success(res, message, status);
//         })
//         .catch(({ status, message }) => {
//             error(res, 'Error interno', status || 500, message);
//         });
// });

export { router };