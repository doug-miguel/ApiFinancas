const TableVariable = require('../models/Tablevariable');

class VariableController {

    async updateVariable(req, res) {
        const id = req.body.auth.id
        const idSelect = await TableVariable.findOne({ id });
        if (!idSelect) {
            const { variable } = req.body
            if (variable.length === 0) {
                return res.status(400).json({ message: "Sem dados na tabela!" });
            }
            try {
                const createdTableVari = await TableVariable.create(req.body);
                return res.status(200).json({ message: "Tabela criada com sucesso!",  createdTableVari});
            } catch {
                return res.status(500).json({message: "Erro no servidor ao criar, tente novamente mais tarde!"});
            }
        }
        if (idSelect) {
            try {
                await TableVariable.updateOne(idSelect, req.body);
                const updateData = await TableVariable.findOne({ id });
                return res.status(200).json({ message: "Tabela criada com sucesso!", updateData});
            } catch {
                return res.status(500).json({message: "Erro no servidor ao editar, tente novamente mais tarde!"});
            }
        }
    }

    async consultTableVariable(req, res) {
        const tableVariable = await TableVariable.find();
        try {
            return res.status(200).json({ message: "Dados retornado com sucesso!", tableVariable })
        } catch {
            return res.status(500).json({ message: "Erro no servidor, tente novamente mais tarde!" })
        }
    }
    
    async deleteTableVariable(req, res) {
        const id = req.params.id
        const tableVariable = await TableVariable.findById(id)
        if (!tableVariable) {
            return res.status(404).json({ message: "Table não enconstrado!" });
        }
        try {
            tableVariable.deleteOne()
            return res.status(200).json({message: 'Table deletado com sucesso!'})
        } catch {
            return res.status(500).json({message: "Erro no servidor, tente novamente mais tarde!"});
        }
    }
}

module.exports = new VariableController;