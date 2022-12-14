const TableVariable = require('../models/Tablevariable');
const UserModel = require('../models/User');

class VariableController {
    async consultTableVariable(req, res) {
        const id = req.params.id;
        const tableVariable = await TableVariable.findById(id);
        try {
            return res.status(200).json({ message: "Dados retornado com sucesso!", tableVariable })
        } catch {
            return res.status(500).json({ message: "Erro no servidor, tente novamente mais tarde!" })
        }
    }

    async createTableVariable(req, res) {
        const { variable } = req.body
        const idUser = req.body.auth.id;
        const tableVariable = await UserModel.findById(idUser);
        if (!tableVariable) {
            return res.status(404).json({ message: "Usúario sem permição ou inexistente!" });
        }
        if (variable.length === 0) {
            return res.status(400).json({ message: "Sem dados na tabela!" });
        }
        if (tableVariable?.idTableVariable) {
            return res.status(400).json({ message: "Usuario ja tem uma tablea criada, por favor editar!" });
        }  
        try {
            const createdTableVari = await TableVariable.create(req.body);
            const idTable = createdTableVari._id
            await tableVariable.updateOne({idTableVariable: idTable});
            const updateTableFixend = await UserModel.findById(idUser, "idTableFixend").exec();
            return res.status(200).json({ message: "Tabela criada com sucesso!",  updateTableFixend});
        } catch {
            return res.status(500).json({message: "Erro no servidor ao criar, tente novamente mais tarde!"});
        }
    }

    async updateTableVariable(req, res) {
        const { _id } = req.body
        const idSelect = await TableVariable.findById(_id)
        try {
            await TableVariable.updateOne(idSelect, req.body);
            const updateData = await TableVariable.findOne({ _id });
            return res.status(200).json({ message: "Tabela criada com sucesso!", updateData});
        } catch {
            return res.status(500).json({message: "Erro no servidor ao editar, tente novamente mais tarde!"});
        }
    }
    
    async deleteTableVariable(req, res) {
        const id = req.params.id
        const tableVariable = await TableVariable.findById(id)
        const idUser = tableVariable?.auth?.id
        const user = await UserModel.findById(idUser)
        if (!tableVariable) {
            return res.status(404).json({ message: "Table não enconstrado!" });
        }
        try {
            await user.updateOne({idTableVariable: null})
            tableVariable.deleteOne()
            return res.status(200).json({message: 'Table deletado com sucesso!'})
        } catch {
            return res.status(500).json({message: "Erro no servidor, tente novamente mais tarde!"});
        }
    }
}

module.exports = new VariableController;