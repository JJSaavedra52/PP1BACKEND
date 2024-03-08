import mongoose from 'mongoose';

export const startConnection = async () => {
  try {
    const url = encodeURI(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`);
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
