
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'library_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const poolConnection = pool.getConnection()
    .then(connection => {
        console.log('Conexión a la base de datos establecida');
        connection.release();
    }) 
    .catch(err => {
        console.error('Error al conectar a la base de datos:', err);
    });

export default pool;

const docentes = [
    { id: 1, name: 'Dr. Juan Pérez' },
    { id: 2, name: 'Dra. María Gómez' },
    { id: 3, name: 'Dr. Carlos Rodríguez' }
]

const universidades = [
    { id: 1, name: 'Universidad Nacional' },
    { id: 2, name: 'Universidad de la Ciudad' },
    { id: 3, name: 'Instituto Tecnológico' }
]

const documentos = [
    { id: 1, name: 'Documento de Investigación' },
    { id: 2, name: 'Documento de Tesis' },
    { id: 3, name: 'Documento de Proyecto' }
]

export { docentes, universidades, documentos };

