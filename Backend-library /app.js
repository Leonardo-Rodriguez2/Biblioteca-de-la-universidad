import express from 'express';
import router from './router/login.route.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
});

app.use('/login', router);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
