var mongoose = require("mongoose")
var Schema = mongoose.Schema
var ObjectId = mongoose.SchemaTypes.ObjectId
var SchemaName = "Board"

var schema = new Schema({
    name: {type: String, required: true},
    creatorId: {type: ObjectId, ref: 'User', required: true},
    description: {type: String}
})

module.exports = mongoose.model(SchemaName, schema)