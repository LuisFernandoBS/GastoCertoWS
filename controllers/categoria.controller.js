const postgre = require('../db');

const categoriaController = {
    getAll: async (req, res) => {
        try {
            const { rows } = await postgre.query("SELECT * FROM tb_categoria_gasto");
            res.json({ msg: "success", data: rows });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },
};

module.exports = categoriaController;