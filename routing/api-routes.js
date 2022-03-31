const router = require("express").Router()
const fs = require("fs")
const { monitorEventLoopDelay } = require("perf_hooks")
var dbJson = require("../db/db.json")

router.get("/notes",(req, res)=>{
    dbJson = JSON.parse(fs.readFileSync("./db/db.json","utf8"))
    res.json(dbJson)
})


router.post("/notes",(req, res)=>{
    let noteModule = {
        title: req.body.title,
        text: req.body.text,
        id: Math.floor(Math.random()*1000000)
    }

    dbJson.push(noteModule)
    fs.writeFileSync('./db/db.json',JSON.stringify(dbJson),(err)=>{
        if (err) throw err
    })
    res.json(dbJson)
})



module.exports = router
