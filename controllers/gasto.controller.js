const postgre = require('../db');

const gastoController = {
    getAll: async (req, res) => {
        try {
            const { rows } = await postgre.query("SELECT tb_gastos.*,tb_categoria_gasto.nome FROM tb_gastos LEFT JOIN tb_categoria_gasto ON tb_gastos.cod_categoria = tb_categoria_gasto.cod;");
            res.json({ msg: "success", data: rows });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const { rows } = await postgre.query("SELECT * FROM tb_gastos WHERE cod = $1", [req.params.id]);
            if (rows[0]) {
                return res.json({ msg: "success", data: rows });
            }
            res.status(404).json({ msg: "not found" });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const { descricao, data_gasto, forma_pagamento, qtd_parcelas, status_pagamento, valor, cod_categoria } = req.body;
            const sql = 'INSERT INTO tb_gastos (descricao, data_gasto, forma_pagamento, qtd_parcelas, status_pagamento, valor, cod_categoria) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
            const { rows } = await postgre.query(sql, [descricao, data_gasto, forma_pagamento, qtd_parcelas, status_pagamento, valor, cod_categoria]);
            res.json({ msg: "success", data: rows[0] });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },

    updateById: async (req, res) => {
        try {
            const { descricao, data_gasto, forma_pagamento, qtd_parcelas, status_pagamento, valor, cod_categoria } = req.body;
            const sql = 'UPDATE tb_gastos SET descricao = $1, data_gasto = $2, forma_pagamento = $3, qtd_parcelas = $4, status_pagamento = $5, valor = $6, cod_categoria = $7 WHERE cod = $8 RETURNING *';
            const { rows } = await postgre.query(sql, [descricao, data_gasto, forma_pagamento, qtd_parcelas, status_pagamento, valor, cod_categoria, req.params.id]);
            res.json({ msg: "success", data: rows[0] });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },

    deleteById: async (req, res) => {
        try {
            const sql = 'DELETE FROM tb_gastos WHERE cod = $1 RETURNING *';
            const { rows } = await postgre.query(sql, [req.params.id]);
            if (rows[0]) {
                return res.json({ msg: "success", data: rows[0] });
            }
            return res.status(404).json({ msg: "not found" });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }
};

module.exports = gastoController;