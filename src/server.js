const express = require("express")
const listEndPoints = require("express-list-endpoints")
const cors = require("cors")


const examsRouter = require("./services/exams") 

const {
    notFoundHandler,
    unauthorizedHandler,
    forbiddenHandler,
    badRequestHandler,
    catchAllHandler,
} = require("./errorHandlers")

const server = express()

const port = process.env.PORT || 3001

const loggerMiddleware = (req, res, next) => {
    console.log(`${req.method} ${req.url} ${new Date()}`)
    next()
}

const errorMiddleware = (err, req, res, next) => { }

server.use(express.json())
server.use(cors())

//ROUTE
server.use("/exams", examsRouter)

//ERROR HANDLERS
server.use(badRequestHandler)
server.use(unauthorizedHandler)
server.use(forbiddenHandler)
server.use(notFoundHandler)
server.use(catchAllHandler)

console.log(listEndPoints(server))

server.listen(port, () => {
    console.log("Running locally on port", port)
})