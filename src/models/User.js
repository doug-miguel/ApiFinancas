const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    id: ObjectId,
    name: {
        type: String,
        unique: true,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        require: true,
        lowercase: true,
    },
    password: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    idTableFixend: {
        type: String,
    },
    idTableVariable: {
        type: String,
    }
})

const UserModel = mongoose.model('TB_User', UserSchema);

module.exports = UserModel;