import path from "path";
import { fileURLToPath } from "url";
import officeParser from "officeparser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ArchiveController = {

    parseMyFile: async (req, res) => {
        try {

            const { file } = req.params;

            const filePath = path.resolve(__dirname, "..", "archive", `${file}.docx`).trim();
            
            console.log("Ruta absoluta generada:", filePath);

            officeParser.parseOffice(filePath, (data, err) => {
                if (err) {
                    console.error("Error dentro del parser:", err);
                    return res.status(500).json({ error: "Error al leer contenido" });
                }
                
                // for(i=0; i<=data.content.length; i++){
                // }
                res.status(200).json({
                    success: true,
                    content: data.content.length
                });
            });


        } catch (err) {
            console.error("Error en el bloque catch:", err);
            return res.status(500).json({ success: false, message: err.message });
        }
    }

}

export default ArchiveController;