
import { Router } from 'express';

const docentes  = [
    { id: 1, name: 'Juan Perez' },
    { id: 2, name: 'Maria Gomez' },
    { id: 3, name: 'Carlos Rodriguez' }
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


export class LoginController {

    loginSession = (req, res) => {
        const { user, password } = req.body;
    
        try {
            if (typeof user !== 'string' || typeof password !== 'string') {
                return res.status(400).json({ message: 'Las credenciales deben ser cadenas de texto', err: true });
            }
            if(!user || !password) return res.status(400).json({ message: 'Faltan credenciales', err: true });
        
            if (user === 'admin' && password === 'admin') { res.status(200).json({ message: 'Inicio de sesión exitoso', err: false });    } 
            else {  res.status(401).json({ message: 'Credenciales incorrectas', err: true });}
        
        } catch (err) {
            return res.status(500).json({ message: 'Error en el servidor', err: true });
        }
    };





    loginIdUser = (req, res) => {
        const { idUni, idDocente, idDocumento } = req.params;

        if( idUni < 1 || idUni > universidades.length ) {
            return res.status(400).json({ message: 'ID de universidad inválido', err: true });
        }
        if( idDocente < 1 || idDocente > docentes.length) {
            return res.status(400).json({ message: 'ID de docente inválido', err: true });
        }
        if( idDocumento < 1 || idDocumento > documentos.length) {
            return res.status(400).json({ message: 'ID de documento inválido', err: true });
        }

        res.status(200).json({ message: `el id de la universidad es ${ universidades[idUni - 1].name }, el id del docente es ${docentes[idDocente - 1].name} y el id del documento es ${documentos[idDocumento - 1].name}`, err: false  })

    }

}




// const validDocument = () => {
//     const { title, asign, content, category } = req.body;
//     res.status(201).json({ message: 'Documento creado', document: { title, asign, content, category } });

//     if(!title || !asign || !content || !category) {
//         return res.status(400).json({ message: 'Faltan datos del documento', err: true });
//     }

//     if((title.length < 5) || (title.length > 50)) {
//         return res.status(400).json({ message: 'El título debe tener entre 5 y 50 caracteres', err: true });
//     }

export const loginController = new LoginController();