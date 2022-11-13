const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TableFixend = new Schema({
    auth: {
        id: String,
        creatorName: String,
    },
    fixend: [
        {
            item: String,
            value: Number,
            date: {
                type: Date,
                default: Date.now,
            }
        }
    ]
})

const TBFixend = mongoose.model('TB_Fixend', TableFixend);

module.exports = TBFixend;