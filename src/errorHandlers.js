const { response } = require("express")

const notFoundHandler = (err, req, res, next) => {
  if (err.httpStatusCode === 404) {
    res.status(404).send("Error! Not found!")
    next(err)
  }
}

const unauthorizedHandler = (err, req, res, next) => {
  if (err.httpStatusCode === 401) {
    res.status(401).send("Not authorized! Not found!")
    next(err)
  }
}

const forbiddenHandler = (err, req, res, next) => {
  if (err.httpStatusCode = 403) {
    res.status(403).send("Error! Forbidden!")
  } next(err)
}

const badRequestHandler = (err, req, res, next) => {
  if (err.httpStatusCode = 400) {
    res.status(400).send("Error Bad request!")
  } next(err)
    
}

const catchAllHandler = (err, req, res, next) => {
  if (!res.headerSent) {
    res.status(err.httpStatusCode || 500).send("Generic Server Eror!")
  }
}

module.exports = {
  notFoundHandler,
  unauthorizedHandler,
  forbiddenHandler,
  badRequestHandler,
  catchAllHandler
}