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
    priority: {type: String, enum: priorities}
})

schema.pre('remove', function(next) {
    Comments.remove({taskId: this._id}).exec()
    next()
})

schema.pre('save', function(next) {
    Comments.find({taskId: this._id})
    .then(res => {
        for (var i = 0; i < res.length; i++){
            res[i].listId = this.listId
            res[i].save()
        }
    })
    next()
})

module.exports = mongoose.model(SchemaName, schema)