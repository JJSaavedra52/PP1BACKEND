import { isCorrectPassword, saveUser, getUserName } from './store.mjs';

// Lógica para el controlador de inicio de sesión
const login = async (body) => { // La función asincrónica toma el cuerpo de la solicitud como argumento
    const { user, password } = body; // Extrae el usuario y la contraseña del cuerpo de la solicitud
    if (!user || !password) { // Verifica si el usuario o la contraseña están ausentes
        throw { status: 400, message: 'Faltan datos' }; // Lanza un error con el estado 400 (Bad Request) y un mensaje
    }
    const isAuthenticated = await isCorrectPassword(user, password); // Verifica si el usuario y la contraseña son correctos
    if (isAuthenticated) { // Si la autenticación es exitosa
        const name = await getUserName(user); // Obtiene el nombre del usuario
        console.log('Bienvenido', name); // Muestra un mensaje de bienvenida en la consola
        return {status: 200, message: `Usuario ${name} logeado correctamente`, userName: name}; // Devuelve un objeto con el estado 200 (OK) y un mensaje de éxito
    } else { // Si la autenticación falla
        throw { status: 401, message: 'Usuario o contraseña incorrectos' }; // Lanza un error con el estado 401 (Unauthorized) y un mensaje de error
    }
};

// Lógica para el controlador de registro
const register = async (body) => { // La función asincrónica toma el cuerpo de la solicitud como argumento
    const { user, name, password} = body; // Extrae el usuario, nombre y la contraseña del cuerpo de la solicitud
    const result = await saveUser(user, name, password); // Guarda el usuario, nombre y la contraseña en la base de datos
    if (result === 'Nombre de usuario ya registrado') { // Si el usuario ya está registrado
        throw { status: 400, message: result }; // Lanza un error con el estado 400 (Bad Request) y un mensaje de error
    } else { // Si el registro es exitoso
        return { status: 201, message: result }; // Devuelve un objeto con el estado 201 (Created) y un mensaje de éxito
    }
};

export { login, register };

