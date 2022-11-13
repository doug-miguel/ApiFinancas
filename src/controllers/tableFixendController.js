const TableFixend = require('../models/Tablefixend');

class FixendController {

    async consultTableFixend(req, res) {
        const tableFixend = await TableFixend.find();
        try {
            return res.status(200).json({ message: "Dados retornado com sucesso!", tableFixend })
        } catch {
            return res.status(500).json({ message: "Erro no servidor, tente novamente mais tarde!" })
        }
    }

    async updateTableFixend(req, res) {
        const id = req.body.auth.id
        const idSelect = await TableFixend.findOne({ id });
        if (!idSelect) {
            const { fixend } = req.body
            if (fixend.length === 0) {
                return res.status(400).json({ message: "Sem dados na tabela!" });
            }
            try {
                const createdTableVari = await TableFixend.create(req.body);
                return res.status(200).json({ message: "Tabela criada com sucesso!",  createdTableVari});
            } catch {
                return res.status(500).json({message: "Erro no servidor ao criar, tente novamente mais tarde!"});
            }
        }
        if (idSelect) {
            try {
                await TableFixend.updateOne(idSelect, req.body);
                const updateData = await TableFixend.findOne({ id });
                return res.status(200).json({ message: "Tabela criada com sucesso!", updateData});
            } catch {
                return res.status(500).json({message: "Erro no servidor ao editar, tente novamente mais tarde!"});
            }
        }
    }

    async deleteTableFixend(req, res) {
        const id = req.params.id
        const tableFixend = await TableFixend.findById(id)
        if (!tableFixend) {
            return res.status(404).json({ message: "Table não enconstrado!" });
        }
        try {
            tableFixend.deleteOne()
            return res.status(200).json({message: 'Table deletado com sucesso!'})
        } catch {
            return res.status(500).json({message: "Erro no servidor, tente novamente mais tarde!"});
        }
    }

}

module.exports = new FixendController;