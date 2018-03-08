var router = require("express").Router()
var Boards = require("../models/board")
var Lists = require("../models/list")
var Tasks = require("../models/task")
var Comments = require("../models/comment")
var Users = require('../models/user')

router.get("/api/boards", (req, res, next) => {
    Boards.find({creatorId: req.session.uid})
        .then(boards => {
            return res.send(boards)
        })
        .catch(next)
})

router.get("/api/users", (req, res, next) => {
    Users.find(req.query)
        .then(users => {
            return res.send(users)
        })
        .catch(next)
})

router.get("/api/users/:userid", (req, res, next) => {
    Users.findById(req.params.userid)
        .then(user => {
            return res.send(user)
        })
        .catch(next)
})

router.put('/api/users/:userid', (req, res, next) => {
    Users.findById(req.params.userid)
        .then(user => {
            user.friends.push(req.body)
            user.markModified('friends')
            user.save()
            res.send(user)
        })
        .catch(next)
})

router.get("/api/boards/:boardid", (req, res, next) => {
    Boards.find({creatorId: req.session.uid, _id: req.params.boardid})
        .then(board => {
            return res.send(board)
        })
        .catch(next)
})

router.get("/api/boards/:boardid/lists", (req, res, next) => {
    Lists.find({boardId: req.params.boardid})
        .then(lists => {
            return res.send(lists)
        })
        .catch(next)
})

router.get("/api/boards/:boardid/lists/:listid/tasks", (req, res, next) => {
    Tasks.find({listId: req.params.listid})
        .then(tasks => {
            return res.send(tasks)
        })
        .catch(next)
})

router.get("/api/boards/:boardid/lists/:listid/tasks/:taskid/comments", (req, res, next) => {
    Comments.find({taskId: req.params.taskid})
        .then(comments => {
            return res.send(comments)
        })
        .catch(next)
})

router.post("/api/boards", (req, res, next) => {
    Boards.create(req.body)
        .then(board => {
            return res.send(board)
        })
        .catch(next)
})

router.post("/api/boards/:boardid/lists", (req, res, next) => {
    Lists.create(req.body)
        .then(list => {
            return res.send(list)
        })
        .catch(next)
})

router.post("/api/boards/:boardid/lists/:listid/tasks", (req, res, next) => {
    Tasks.create(req.body)
        .then(task => {
            return res.send(task)
        })
        .catch(next)
})

router.post("/api/boards/:boardid/lists/:listid/tasks/:taskid/comments", (req, res, next) => {
    Comments.create(req.body)
        .then(comment => {
            return res.send(comment)
        })
        .catch(next)
})

router.put("/api/boards/:boardid", (req, res, next) => {
    Boards.findByIdAndUpdate(req.params.boardid, req.body)
        .then(board => {
            res.send(board)
        })
        .catch(next)
})

router.put("/api/boards/:boardid/lists/:listid", (req, res, next) => {
    Lists.findByIdAndUpdate(req.params.listid, req.body)
        .then(list => {
            res.send(list)
        })
        .catch(next)
})

router.put("/api/boards/:boardid/lists/:listid/tasks/:taskid", (req, res, next) => {
    Tasks.findByIdAndUpdate(req.params.taskid, req.body, {new: true})
        .then(task => {
            task.save()
            return res.send(task)
        })
        .catch(next)
})

router.put("/api/boards/:boardid/lists/:listid/tasks/:taskid/comments/:commentid", (req, res, next) => {
    Comments.findByIdAndUpdate(req.params.commentid, req.body)
        .then(comment => {

        })
        .catch(next)
})

router.delete("/api/boards/:boardid", (req, res, next) => {
    Boards.findByIdAndRemove(req.params.boardid)
        .then(board => {
            board.remove()
            return res.send({message: "Successfully deleted board"})
        })
        .catch(next)
})

router.delete("/api/boards/:boardid/lists/:listid", (req, res, next) => {
    Lists.findByIdAndRemove(req.params.listid)
        .then(list => {
            list.remove()
            return res.send({message: "Successfully deleted list"})
        })
        .catch(next)
})

router.delete("/api/boards/:boardid/lists/:listid/tasks/:taskid", (req, res, next) => {
    Tasks.findByIdAndRemove(req.params.taskid)
        .then(task => {
            task.remove()
            return res.send({message: "Successfully deleted task"})
        })
        .catch(next)
})

router.delete("/api/boards/:boardid/lists/:listid/tasks/:taskid/comments/:commentid", (req, res, next) => {
    Comments.findByIdAndRemove(req.params.commentid)
        .then(list => {
            return res.send({message: "Successfully deleted comment"})
        })
        .catch(next)
})

module.exports = router