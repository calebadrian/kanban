var mongoose = require("mongoose")
var Schema = mongoose.Schema
var ObjectId = mongoose.SchemaTypes.ObjectId
var SchemaName = "Board"
var Lists = require("../models/list")
var Tasks = require("../models/task")
var Comments = require("../models/comment")

var schema = new Schema({
    name: {type: String, required: true},
    creatorId: {type: ObjectId, ref: 'User', required: true},
    description: {type: String},
    collabs: []
})

schema.pre('remove', function(next) {
    Lists.remove({boardId: this._id}).exec()
    Tasks.remove({boardId: this._id}).exec()
    Comments.remove({boardId: this._id}).exec()
    next()
})

module.exports = mongoose.model(SchemaName, schema)