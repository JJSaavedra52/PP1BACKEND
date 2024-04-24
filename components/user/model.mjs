import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

// Definimos el esquema de usuario
const userSchema = new mongoose.Schema({
    user: { type: String, required: true, unique: true },
    name: { type: String, required: true },	
    password: { type: String, required: true }
});

// Antes de guardar el usuario, encriptamos la contraseña
userSchema.pre('save', async function(next) {
    if(this.isNew || this.isModified('password')) {
        try {
            const salt = await bcryptjs.genSalt(5);
            this.password = await bcryptjs.hash(this.password, salt);
        } catch (error) {
            // Manejar el error
            console.error('Error hashing password:', error);
            return next(error);
        }
    }
    next();
});

// Método para comparar la contraseña ingresada con la contraseña almacenada
userSchema.methods.comparePassword = async function(password) {
    try {
        const isMatch = await bcryptjs.compare(password, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
};

export default mongoose.model('User', userSchema);
