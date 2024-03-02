import { isCorrectPassword, saveUser } from './store.mjs';

// Lógica para el controlador de login
const login = async (req, res) => {
    const { user, password } = req.body;
    if (!user || !password) {
        return res.status(400).send('Faltan datos');
    }
    try {
        const isAuthenticated = await isCorrectPassword(user, password);
        if (isAuthenticated) {
            return res.status(200).send('Usuario logeado correctamente');
        } else {
            return res.status(401).send('Usuario o contraseña incorrectos');
        }
    } catch (error) {
        return res.status(500).send('Error interno');
    }
};


// Lógica para el controlador de register
const register = async (req, res) => {
    const { user, password } = req.body;
    try {
        const result = await saveUser(user, password);
        if (result === 'Nombre de usuario ya registrado') {
            res.status(400).send(result); // Envía un mensaje de error con código 400 (Bad Request)
        } else {
            res.status(201).send(result); // Envía una respuesta exitosa con código 201 (Created)
        }
    } catch (error) {
        console.error('Error en register:', error);
        res.status(500).send('Error interno'); // Envía un mensaje de error genérico con código 500 (Internal Server Error)
    }
};




export { login, register };

