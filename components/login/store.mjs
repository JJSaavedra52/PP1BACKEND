import model from './model.mjs';

const getUserAndPassword = async (user) => {
    const userData = model.db.find(entry => entry.user === user);
    if (!userData) {
        throw new Error('Usuario no encontrado');
    }
    return userData;
}

export default { getUserAndPassword };
