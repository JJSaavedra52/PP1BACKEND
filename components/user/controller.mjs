import { isCorrectPassword, saveUser } from './store.mjs';

// Lógica para el controlador de login
const login = async (body) => {
    const { user, password } = body;
    if (!user || !password) {
        throw { status: 400, message: 'Faltan datos' };
    }
    const isAuthenticated = await isCorrectPassword(user, password);
    if (isAuthenticated) {
        return { status: 200, message: 'Usuario logeado correctamente' };
    } else {
        throw { status: 401, message: 'Usuario o contraseña incorrectos' };
    }
};

// Lógica para el controlador de register
const register = async (body) => {
    const { user, password } = body;
    const result = await saveUser(user, password);
    if (result === 'Nombre de usuario ya registrado') {
        throw { status: 400, message: result };
    } else {
        return { status: 201, message: result };
    }
};

export { login, register };

