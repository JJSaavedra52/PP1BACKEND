import express from 'express';
import bodyParser from 'body-parser';
import routes from './network/routes.mjs';
import cors from 'cors';
import { startConnection } from './db.mjs';
import dotenv from 'dotenv';

// Carga las variables de entorno del archivo .env en process.env
dotenv.config();

// Inicializa las rutas
const router = routes;

// Crea una instancia de la aplicación Express
var app = express();

// Habilita CORS en la aplicación
app.use(cors());

// Configura el middleware bodyParser para analizar datos JSON en las solicitudes HTTP
app.use(bodyParser.json());

// Configura las rutas en la aplicación Express
router(app);

// Ruta principal, responde con un mensaje simple
app.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Configura los encabezados CORS para permitir todas las solicitudes desde cualquier origen
    res.send('Este es el principal'); // Envía una respuesta con el mensaje 'Este es el principal'
});

// Función para iniciar el servidor
const startServer = async () => {
  await startConnection(); // Inicia la conexión a la base de datos
  app.listen(process.env.PORT, () => { // Inicia el servidor y escucha en el puerto especificado en la variable de entorno PORT
    console.log(`La aplicación está escuchando en http://localhost:${process.env.PORT}`); // Imprime un mensaje en la consola indicando que el servidor ha comenzado a escuchar
  });
};

startServer(); // Llama a la función startServer para iniciar el servidor