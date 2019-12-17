const mongoose = require('../index').db;
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    username: {
        type: String
    },
    highScore: {
        type: Number
    }
})


module.exports.UsersSchema = mongoose.model("Users", UsersSchema, "Users");

