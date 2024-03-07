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


export const saveUser = async (user, password) => {
    try {
        if (!user || !password) {
            throw new Error('Datos incorrectos');
        }

        const foundUser = await User.findOne({ user: user });
        if (foundUser) {
            return 'Nombre de usuario ya registrado';
        }

        const newUser = new User({ user, password });
        await newUser.save();
        return 'Usuario registrado correctamente';
    } catch (error) {
        console.error('Error en saveUser:', error);
        throw error;
    }
};




