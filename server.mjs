import express from 'express';
import bodyParser from 'body-parser';
import routes from './network/routes.mjs';

const router = routes;

var app = express();
app.use(bodyParser.json());

router(app);

app.get('/', (req, res) => {
    res.send('Este es el principal');
});

app.listen(3000);
console.log('La aplicación está escuchando en http://localhost:3000');
