var mongoose = require("mongoose")
var Schema = mongoose.Schema
var ObjectId = mongoose.SchemaTypes.ObjectId
var SchemaName = "Comment"

var schema = new Schema({
    taskId: {type: ObjectId, ref: 'Task'},
    creatorId: {type: ObjectId, ref: 'User'},
    description: {type: String, required: true}
})

module.exports = mongoose.model(SchemaName, schema)