var mongoose = require("mongoose")
var Schema = mongoose.Schema
var ObjectId = mongoose.SchemaTypes.ObjectId
var SchemaName = "Comment"

var schema = new Schema({
    taskId: {type: ObjectId, ref: 'Task', required: true},
    listId: {type: ObjectId, ref: 'List', required: true},
    boardId: {type: ObjectId, ref: 'Board', required: true},
    creatorId: {type: ObjectId, ref: 'User', required: true},
    creatorName: {},
    body: {type: String, required: true}
})

module.exports = mongoose.model(SchemaName, schema)