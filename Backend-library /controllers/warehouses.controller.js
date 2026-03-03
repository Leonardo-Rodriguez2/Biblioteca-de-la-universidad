
import db from "../db/connection.js";

const WarehousesController = {

  getAllWarehouses: async (req, res) => {
    try {
      const query = "SELECT * FROM almacenes";
      const [data] = await db.query(query);

      if (data.length === 0) {
        return res.status(404).json({ message: "No se encontraron almacenes" });
      }
      
      if(!data){
        return res.status(404).json({ message: "Error al obtener los almacenes" });
      }

      res.json(data);
    } catch (error) {
      console.error("Error al obtener los almacenes:", error);
      res.status(500).json({ error: "Error interno del servidor al obtener los almacenes" });
    }
  },


  

  // getWarehouseById: async (req, res) => {
  //   const { id } = req.params;
  //   try {
  //     const [rows] = await db.query("SELECT * FROM warehouses WHERE id = ?", [id]);
  //     if (rows.length === 0) {
  //       return res.status(404).json({ error: "Warehouse not found" });
  //     }
  //     res.json(rows[0]);
  //   } catch (error) {
  //     console.error("Error fetching warehouse:", error);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // },

  createWarehouse: async (req, res) => {
    const { name, code, location, description, responsible } = req.body;

    if (!name || !code || !location || !description || !responsible) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    try {

      const queryCheck = "SELECT * FROM almacenes WHERE codigo_area = ?";
      const [existing] = await db.query(queryCheck, [code]);
      if (existing.length > 0) {
        return res.status(400).json({ message: "Ya existe un almacén con el mismo código de área" });
      }

      const query = "INSERT INTO almacenes (nombre, codigo_area, ubicacion, descripcion, responsable_almacen) VALUES (?, ?, ?, ?, ?)"
      const [result] = await db.query(query, [name, code, location, description, responsible]);
      res.status(201).json({ message: "Almacén creado exitosamente", id: result.insertId, name, code, location, description, responsible });
    } catch (error) {
      console.error("Error al crear el almacén:", error);
      res.status(500).json({ error: "Error interno del servidor al crear el almacén" });
    }
  },

  updateWarehouse: async (req, res) => {
    const { id } = req.params;
    const { name, code, location, description, responsible } = req.body;
    try {
      const [result] = await db.query("UPDATE almacenes SET nombre = ?, codigo_area = ?, ubicacion = ?, descripcion = ?, responsable_almacen = ? WHERE id = ?", [name, code, location, description, responsible, id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Almacén no encontrado" });
      }
      res.json({ message: "Almacén actualizado exitosamente", id, name, code, location, description, responsible });
    } catch (error) {
      console.error("Error updating warehouse:", error);
      res.status(500).json({ error: "Error interno del servidor al actualizar el almacén" });
    }
  },

};

export default WarehousesController;