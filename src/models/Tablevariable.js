const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TableVariable = new Schema({
    auth: {
        id: String,
        creatorName: String,
    },
    variable: [
        {
            item: String,
            value: Number,
            date: {
                type: Date,
                default: Date.now,
            }
        }
    ],

})

const TBVariable = mongoose.model('TB_Variable', TableVariable);

module.exports = TBVariable;