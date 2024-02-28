import express from 'express';
import bodyParser from 'body-parser';
import router from './network/routes.mjs';

const app = express();
app.use(bodyParser.json());

router(app);

app.use('/app', express.static('public'));

app.listen(3000);
console.log('La aplicación está escuchando en http://localhost:3000');
