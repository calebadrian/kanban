var mongoose = require("mongoose")
var Schema = mongoose.Schema
var ObjectId = mongoose.SchemaTypes.ObjectId
var SchemaName = "Task"

var priorities = ["high", "medium", "low"]

var schema = new Schema({
    creatorId: {type: ObjectId, ref: 'User'},
    listId: {type: ObjectId, ref: 'List'},
    description: {type: String},
    priority: {type: String, enum: priorities, default: priorities[1]}
})

module.exports = mongoose.model(SchemaName, schema)