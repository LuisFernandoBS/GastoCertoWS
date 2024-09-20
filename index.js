const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'gasto_certo'
});

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL.');
});


app.get('/gastos', (req, res) => {
    db.query('SELECT * FROM tb_gastos', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json(results);
    });
});


app.get('/gastos/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM tb_gastos WHERE cod = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json(result[0]);
    });
});

app.post('/gastos', (req, res) => {
    const { descricao, data_gasto, forma_pagamento, qtd_parcelas, status_pagamento, valor } = req.body;
    const query = 'INSERT INTO tb_gastos (descricao, data_gasto, forma_pagamento, qtd_parcelas, status_pagamento, valor) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [descricao, data_gasto, forma_pagamento, qtd_parcelas, status_pagamento, valor], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json({ id: result.insertId, ...req.body });
    });
});


app.put('/gastos/:id', (req, res) => {
    const { id } = req.params;
    const { descricao, data_gasto, forma_pagamento, qtd_parcelas, status_pagamento, valor } = req.body;
    const query = 'UPDATE tb_gastos SET descricao = ?, data_gasto = ?, forma_pagamento = ?, qtd_parcelas = ?, status_pagamento = ?, valor = ? WHERE cod = ?';
    db.query(query, [descricao, data_gasto, forma_pagamento, qtd_parcelas, status_pagamento, valor, id], (err) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json({ message: 'Registro atualizado com sucesso.' });
    });
});


app.delete('/gastos/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM tb_gastos WHERE cod = ?';
    db.query(query, [id], (err) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json({ message: 'Registro deletado com sucesso.' });
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
