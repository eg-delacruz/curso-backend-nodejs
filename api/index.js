const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

//middleware para poder devolver objetos json en el body de la respuesta de las peticiones
app.use(express.json());

const whitelist = [
  'http://localhost:8080',
  'http://localhost:3000',
  'http://127.0.0.1:5500',
  'https://myapp.co',
];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido'));
    }
  },
};

//Importante que esto vaya antes del routerApi(app)
app.use(cors(options));

app.get('/api', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/api/nueva-ruta', (req, res) => {
  res.send('Hola , soy una nueva ruta');
});

routerApi(app);

//Los middleware de tipo error van siempre después del routing. Se ejecutan al momento en que se encuentra un error
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

//Le decimos en qué puerto va a correr la app
app.listen(port, () => {
  console.log(`Mi port: ${port}`);
});
