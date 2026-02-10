
import express from 'express';
import router from './router/subject.route.js';
// import ArchiveController from './helpers/archive.helper.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send("hola mundo");
});

// app.use('/usuarios', router);

app.use('/asignaturas', router);

// app.get('/document/:file', ArchiveController.parseMyFile);

app.listen(PORT, () => {
  console.log(`Servidor encendido en la ruta http://localhost:${PORT}`);
});


