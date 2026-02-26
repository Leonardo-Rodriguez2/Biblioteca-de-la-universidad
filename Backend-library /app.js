
import express from 'express';
import router from './router/subject.route.js';
import morgan from "morgan";
import route from './router/auth.route.js';
import cors from "cors"
import routerUser from './router/user.route.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.json());
app.use(cors())


app.use('/login', route);

app.use('/subject', router);

app.use('/user', routerUser)



app.listen(PORT, () => {
  console.log(`Servidor encendido en la ruta http://localhost:${PORT}`);
});


