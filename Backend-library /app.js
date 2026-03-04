
import express from 'express';
import router from './router/subject.route.js';
import morgan from "morgan";
import route from './router/auth.route.js';
import cors from "cors"
import routerUser from './router/user.route.js';
import routerPnf from './router/pnf.route.js';
import routerWarehouses from './router/warehouses.route.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.json());
app.use(cors())


app.use('/login', route);

app.use('/subject', router);

app.use('/user', routerUser);

app.use('/pnf', routerPnf);

app.use('/warehouse', routerWarehouses);



app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor encendido en la ruta http://192.168.100.34:${PORT}`);
});


