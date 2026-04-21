
import express from 'express';
import router from './router/subject.route.js';
import morgan from "morgan";
import route from './router/auth.route.js';
import cors from "cors"
import routerUser from './router/user.route.js';
import routerPnf from './router/pnf.route.js';
import categoryFileRoute from './router/category.file.route.js';
import documentRoute from './router/document.route.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.json());
app.use(cors())

// Servir archivos estáticos desde la carpeta uploads (para preview DOCX/PPTX con Google Docs Viewer)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/login', route);

app.use('/subject', router);

app.use('/user', routerUser);

app.use('/pnf', routerPnf);

app.use('/categories', categoryFileRoute)

app.use('/document', documentRoute);



app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor encendido en la ruta http://192.168.100.34:${PORT}`);
});


