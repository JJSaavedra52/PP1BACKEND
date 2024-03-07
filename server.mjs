import express from 'express';
import bodyParser from 'body-parser';
import routes from './network/routes.mjs';
import cors from 'cors';
import { startConnection } from './db.mjs';

const router = routes;

var app = express();
app.use(cors());

app.use(bodyParser.json());

router(app);

app.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send('Este es el principal');
});

const startServer = async () => {
    await startConnection();
    app.listen(3000, () => {
      console.log('La aplicación está escuchando en http://localhost:3000');
    });
};

startServer();
