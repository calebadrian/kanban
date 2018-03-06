var mongoose = require("mongoose")
var Schema = mongoose.Schema
var ObjectId = mongoose.SchemaTypes.ObjectId
var SchemaName = "Task"
var Comments = require("../models/comment")

var priorities = ["high", "medium", "low"]

var schema = new Schema({
    creatorId: {type: ObjectId, ref: 'User'},
    listId: {type: ObjectId, ref: 'List'},
    boardId: {type: ObjectId, ref: 'Board'},    
    description: {type: String},
    priority: {type: String, enum: priorities, default: priorities[1]}
})

schema.pre('findByIdAndRemove', function(next) {
    Comments.remove({taskId: this._id}).exec()
    next()
})

module.exports = mongoose.model(SchemaName, schema)