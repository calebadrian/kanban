var mongoose = require("mongoose")
var Schema = mongoose.Schema
var ObjectId = mongoose.SchemaTypes.ObjectId
var SchemaName = "List"

var schema = new Schema({
    name: {type: String, required: true},
    creatorId: {type: ObjectId, ref: 'User'},
    boardId: {type: ObjectId, ref: 'Board'}
})

module.exports = mongoose.model(SchemaName, schema)