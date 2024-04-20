import User from './model.mjs';

export const isCorrectPassword = async (user, password) => {
    try {
        const foundUser = await User.findOne({ user });
        if (!foundUser) {
            return false; // Usuario no encontrado
        }

        try {
            const isMatch = await foundUser.comparePassword(password);
            return isMatch; // Devuelve true si la contraseña es correcta, false si no lo es
        } catch (error) {
            console.error('Error al comparar contraseñas:', error);
            return false; // Devolver false si hay un error
        }
    } catch (error) {
        console.error('Error en isCorrectPassword:', error);
        throw new Error('Error interno');
    }
};

export const getUserName = async (user) => {
    try {
        const foundUser = await User.findOne({ user });
        if (!foundUser) {
            return false; // Usuario no encontrado
        }
        return foundUser.name; // Devuelve el nombre del usuario
    } catch (error) {
        console.error('Error en getUserName:', error);
        throw new Error('Error interno');
    }
};
export const saveUser = async (user, name, password) => {
    try {
        if (!user || !name || !password) {
            throw new Error('Datos incorrectos');
        }

        const foundUser = await User.findOne({ user: user });
        if (foundUser) {
            return 'Nombre de usuario ya registrado';
        }

        const newUser = new User({ user, name, password });
        await newUser.save();
        return 'Usuario registrado correctamente';
    } catch (error) {
        console.error('Error en saveUser:', error);
        throw error;
    }
};




