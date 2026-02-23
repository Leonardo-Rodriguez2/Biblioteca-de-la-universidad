
import express from 'express';
import router from './router/subject.route.js';
// import ArchiveController from './helpers/archive.helper.js';
import morgan from "morgan";
import route from './router/auth.route.js';
import jwtMiddleware from './middleware/jwt.middleware.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.json());


app.use('/login', route);

app.get('/', (req, res) => {
res.send("hola mundo");
});

// app.use('/usuarios', router);

app.use('/subject', router);



// app.get('/document/:file', ArchiveController.parseMyFile);

app.listen(PORT, () => {
  console.log(`Servidor encendido en la ruta http://localhost:${PORT}`);
});


