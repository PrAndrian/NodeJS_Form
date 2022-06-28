const mongoose = require('mongoose');

const formSchema = mongoose.Schema({
    nom: {type : String, required: true},
    prenom : {type: String, required: true},
    email: {type: String, required: true},
    message: {type: String, required: true},
})

module.exports = mongoose.model('Form', formSchema)