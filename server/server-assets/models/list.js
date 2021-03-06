var mongoose = require("mongoose")
var Schema = mongoose.Schema
var ObjectId = mongoose.SchemaTypes.ObjectId
var SchemaName = "List"
var Tasks = require("../models/task")
var Comments = require("../models/comment")

var schema = new Schema({
    name: {type: String, required: true},
    creatorId: {type: ObjectId, ref: 'User', required: true},
    boardId: {type: ObjectId, ref: 'Board', required: true}
})

schema.pre('remove', function(next) {
    Tasks.remove({listId: this._id}).exec()
    Comments.remove({listId: this._id}).exec()
    next()
})

module.exports = mongoose.model(SchemaName, schema)