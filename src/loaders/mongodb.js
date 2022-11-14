require('dotenv').config();

const mongoose = require('mongoose');

async function startDB() {
    const dbUser = process.env.MONGODB_USER
    const dbpass = process.env.MONGODB_PASS
    try {
        await mongoose.connect(`mongodb+srv://${dbUser}:${dbpass}@financasmobile.b459qk8.mongodb.net/?retryWrites=true&w=majority`);
    } catch(err) {
        console.log(err)
    }
}

module.exports = startDB;