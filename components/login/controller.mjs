import store from "./store.mjs";

const login = async (user, password) => {
    try {
        if (!user || !password) {
            throw new Error('Usuario y contraseña son requeridos');
        }

        const userData = await store.getUserAndPassword(user);

        if (userData.password === password) {
            return { mensaje: 'Inicio de sesión exitoso' };
        } else {
            throw new Error('Usuario o contraseña incorrectos');
        }
    } catch (error) {
        throw new Error('Error en la autenticación: ' + error.message);
    }
}

export default login;
