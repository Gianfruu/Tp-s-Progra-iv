const { db } = require('../config/database');

const getProducts = (req, res) => {
  const { category, search } = req.query;

  // Consulta segura utilizando parámetros preparados
  const query = 'SELECT * FROM products WHERE category = ? AND name LIKE ?';
  const params = [category, '%' + search + '%'];

  // Ejecutar la consulta
  db.query(query, params, (err, results) => {
    if (err) {
      console.error('Error al obtener productos:', err);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
    res.json(results);
  });
};

module.exports = {
  getProducts
};