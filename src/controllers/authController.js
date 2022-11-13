const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


class UserController {
    async create(req, res) {
        const { name, email, password } = req.body;
        const userExists = await UserModel.findOne({ email: email });
        //verificar se nome foi preechido
        if (!name) {
            return res.status(422).json({ message: "Nome é obrigatório" });
        }
        //verificar se email foi preechido
        if (!email) {
            return res.status(422).json({ message: "Email é obrigatório" });
        }
        //verificar se senha foi preechido
        if (!password) {
            return res.status(422).json({ message: "Senha é obrigatório" });
        }
        //verificar se o email ja existe
        if (userExists) {
            return res.status(422).json({ message: "Usuário já existe" });
        }

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        const user = new UserModel({
            name,
            email,
            password: passwordHash,
        });

        try {
            await user.save();
            return res.status(201).json({ message: "Usuário criado com sucesso!" });
        } catch(error) {
            return res.status(500).json({message: "Erro no servidor, tente novamente mais tarde!"});
        }

    }

    async login(req, res) {
        const {email, password} = req.body;
        const user = await UserModel.findOne({ email });
        //verificar se email foi preechido
        if (!email) {
            return res.status(422).json({ message: "Email é obrigatório" });
        }
        //verificar se senha foi preechido
        if (!password) {
            return res.status(422).json({ message: "Senha é obrigatório" });
        }
        //verificar se email existe
        if (!user) {
            return res.status(404).json({ message: "Usuário não existe!" });
        }
        //verificar se a senha esta correta
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.status(422).json({ message: "Senha incorreta!" }); 
        } 

        try {
            const userModel = {
                id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt
            }
            const secret = process.env.SECRET;
            const token = jwt.sign(
                {
                    id: user.id,
                },
                secret,
            )
            return res.status(200).json({message: 'Autenticação com sucesso!', token, userModel})
        } catch {
            return res.status(500).json({message: "Erro no servidor, tente novamente mais tarde!"});
        }
    }

    async delete(req, res) {
        const id = req.params.id
        const user = await UserModel.findById(id, '-password')
        if (!user) {
            return res.status(404).json({ message: "Usuário não enconstrado!" });
        }
        try {
            user.deleteOne()
            return res.status(200).json({message: 'Usuário deletado com sucesso!'})
        } catch {
            return res.status(500).json({message: "Erro no servidor, tente novamente mais tarde!"});
        }
    }
}

module.exports = new UserController