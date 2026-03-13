
import db from '../db/connection.js';


const teachingController = {

    // Metodo para mostrar los datos de todos los usuarios

    getTeachings: async (req, res) => {
        try {
            const query = "SELECT * FROM usuarios";
            const [data]  = await db.query(query);

            if(!data){
                return res.status(400).json({ message: "No existen usuarios en el sistema" })
            }

            res.status(200).json({ message: "datos de los usuarios", data: data });

        } catch (err) {
            console.log("error: ", err);
        }
    },

    // Metodo para agregar usuarios
addTeachings: async (req, res) => {
    try {
        const { nombre, ci, email, password, rol } = req.body;

        if (!nombre || !ci || !email || !password || !rol) {
            return res.status(400).json({ 
                message: "Todos los campos son obligatorios", 
                err: true 
            });
        }

        const queryCheck = "SELECT * FROM usuarios WHERE ci = ? OR email = ?";
        const [existingUsers] = await db.query(queryCheck, [ci, email]);

        if (existingUsers.length > 0) {
            return res.status(400).json({ 
                message: "La cédula o el correo electrónico ya están registrados", 
                err: true 
            });
        }

        const queryInsert = 'INSERT INTO usuarios (nombre, ci, email, password, rol_id) VALUES (?, ?, ?, ?, ?)';
        const values = [nombre, ci, email, password, rol];
        
        const [result] = await db.query(queryInsert, values);

        return res.status(200).json({ 
            message: "El docente se agregó correctamente", 
            id: result.insertId,
            err: false 
        });

    } catch (error) {
        console.error("Error crítico en addTeachings:", error);
        
        return res.status(500).json({ 
            message: "Error interno del servidor", 
            error: error.message,
            err: true
        });
    }
},









// Metodo para los filtros de busqueda por cedula indentificadora

    // schearTeachings: (req, res) => {
        
    //     const { ci } = req.params;

    //     const query = " SELECT * FROM usuarios WHERE cedula = ? ";

    //     db.query(query, [ci], (err, result)=> {
            
    //         if(err){
    //             console.log("Error en la consulta", err);
    //             res.status(400).json({ message: "Error en la consulta", err: true })
    //         }

    //         if(result.length > 0){
    //             res.stauts(400).json({ message: "No existe un usuario con esa cedula", err: true });
    //         }

    //         res.status(200).json({ message: "Usuario encontrado", data: result, err: false });
            

    //     })

    // },


    // Metodo para filtro de busquedad por el rol

    schearUser: async (req, res) => {
        const { ci } = req.params;
        const query = "SELECT * FROM usuarios WHERE ci = ?";

        const [data] = await db.query(query, [ci]);

            if(!data){
                console.log(`Error en la consulta el error es:  ${ err }`);
                res.status(500).json({ message: "Error en el servidor", err: true });
            }

            if(data.length === 0){
                return res.status(404).json({ message: "No existen usuarios con esa cedula", err: true });
            }
            res.status(200).json({ data: data, err: false});
    },

    schearUserRole: async (req, res) => {
        const { rol } = req.params;
        const query = "SELECT * FROM roles WHERE id = ?";

        const [data] = await db.query(query, [rol]);

            if(!data){
                console.log(`Error en la consulta el error es:  ${ err }`);
                res.status(500).json({ message: "Error en el servidor", err: true });
            }

            if(data.length === 0){
                return res.status(404).json({ message: "No existe el rol", err: true });
            }
            res.status(200).json({ data: data, err: false});
    },



    schearUserStatus: async (req, res) => {
        const { status } = req.params;
        const query = "SELECT * FROM usuarios WHERE activo = ?";

        const [data] = await db.query(query, [status]);

            if(!data){
                console.log(`Error en la consulta el error es:  ${ err }`);
                res.status(500).json({ message: "Error en el servidor", err: true });
            }

            if(data.length === 0){
                return res.status(404).json({ message: "No existen usuaris con ese estado", err: true });
            }
            res.status(200).json({ data: data, err: false});
    },


    // deleteTeachings: (req, res) => {
    //     const { id } =  req.params;
    //     const query = "DELETE FROM usuarios WHERE id = ?";

    //     db.query(query, [id], (err, result)=>{
    //         if(err){
    //             console.log(`Error en la consulta ${err}`);
    //             res.stauts(500).json({ message: "Error en el servidor", err: true });
    //         }
    //         if(result.length === 0){

    //         }
    //         res.status(200).json({ id: id, message: "Se elimino el docente", data: result, err: false })
    //     })
    // },



  updateTeachings: async (req, res) => {
    const { id } = req.params;
    const { nombre, ci, password,  email, rol } = req.body; 

    const estado = true;

    const query = `UPDATE usuarios SET nombre = ?, ci = ?, email = ?, password = ?, rol_id = ?, activo = ?  WHERE id = ?`;

    const values = [nombre, ci, email, password, rol, estado, id];

    const [dataUpdate] = await db.query(query, values);

        if (dataUpdate.affectedRows === 0) {
            return res.status(404).json({ 
                message: "No se encontró el usuario con ese ID", 
                err: true 
            });
        }

        res.status(200).json({ 
            message: "Datos del usuario actualizados correctamente", 
            err: false 
        });
},

}

export default teachingController;