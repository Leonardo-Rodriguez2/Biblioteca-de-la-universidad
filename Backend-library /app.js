
import express from 'express';
import router from './router/teaching.route.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send("hola mundo");
});

app.use('/docente', router)

app.listen(PORT, () => {
  console.log(`Servidor encendido en la ruta http://localhost:${PORT}`);
});


