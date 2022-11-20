const TableFixend = require('../models/Tablefixend');
const UserModel = require('../models/User');

class FixendController {
    async consultTableFixend(req, res) {
		const id = req.params.id;
        const tableFixend = await TableFixend.findById(id);
        try {
            return res.status(200).json({ message: "Dados retornado com sucesso!", tableFixend })
        } catch {
            return res.status(500).json({ message: "Erro no servidor, tente novamente mais tarde!" })
        }
    }

    async createTableFixend(req, res) {
        const fixend = req.body.fixend;
        const idUser = req.body.auth.id;
        const tableFixend = await UserModel.findById(idUser);
        if (!tableFixend) {
            return res.status(404).json({ message: "Usúario sem permição ou inexistente!" });
        }
        if (fixend.length === 0) {
            return res.status(400).json({ message: "Sem dados na tabela!" });
        }
        if (tableFixend?.idTableFixend) {
            return res.status(400).json({ message: "Usuario ja tem uma tablea criada, por favor editar!" });
        }        
        try {
            const createTableFixend = await TableFixend.create(req.body);
            const idTable = createTableFixend._id
            await tableFixend.updateOne({idTableFixend: idTable});
            const updateTableFixend = await UserModel.findById(idUser, "idTableFixend").exec();
            return res.status(200).json({ message: "Tabela criada com sucesso!", updateTableFixend});
        } catch {
            return res.status(500).json({message: "Erro no servidor ao criar, tente novamente mais tarde!"});
        }
    }

    async updateTableFixend(req, res) {
        const { _id } = req.body;
        const idSelect = await TableFixend.findById(_id);
        try {
            await TableFixend.updateOne(idSelect, req.body);
            const updateData = await TableFixend.findById(_id);
            return res.status(200).json({ message: "Tabela criada com sucesso!", updateData});
        } catch {
            return res.status(500).json({message: "Erro no servidor ao editar, tente novamente mais tarde!"});
        }
    }



    async deleteTableFixend(req, res) {
        const id = req.params.id
        const tableFixend = await TableFixend.findById(id)
        const idUser = tableFixend?.auth?.id
        const user = await UserModel.findById(idUser)
        if (!tableFixend) {
            return res.status(404).json({ message: "Table não enconstrado!" });
        }
        try {
            await user.updateOne({idTableFixend: null})
            tableFixend.deleteOne()
            return res.status(200).json({message: 'Table deletado com sucesso!'})
        } catch {
            return res.status(500).json({message: "Erro no servidor, tente novamente mais tarde!"});
        }
    }

}

module.exports = new FixendController;