var router = require("express").Router()
var Boards = require("../models/board")

router.get("/api/boards", (req, res, next) => {
    Boards.find({creatorId: req.session.uid})
        .then(boards => {
            return res.send(boards)
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