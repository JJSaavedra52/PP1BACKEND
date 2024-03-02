import mongoose from 'mongoose';

export const startConnection = async () => {
  try {
    const url = encodeURI('mongodb+srv://brray94:XqQkyhznTGQiT2O6@proyectopi.fpahdt6.mongodb.net/?retryWrites=true&w=majority&appName=proyectoPI');
    await mongoose.connect(url);
    console.log('Conexión establecida con la base de datos');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
    throw error;
  }
};

export const closeConnection = async () => {
  await mongoose.connection.close();
  console.log('Conexión cerrada con la base de datos');
};
