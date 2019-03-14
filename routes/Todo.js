//autowired
var mongoose = require('mongoose');

//scheme
var TodoSchema = mongoose.Schema({
    name: String
}, {
    timestamps: true
});

//export scheme with alias
module.exports = mongoose.model('Todo', TodoSchema);