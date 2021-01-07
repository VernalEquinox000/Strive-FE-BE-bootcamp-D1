const express = require("express")
const path = require("path")
const { join } = require("path")
const uniqid = require("uniqid")
const { readDB, writeDB } = require("../../lib/fs-utilities")


const {check, validationResult} = ("express-validator")

const router = express.Router()

const questionsFilePath = join(__dirname, "../../lib/questions.json")
console.log(questionsFilePath)
const examsFilePath = join(__dirname, "exams.json")


//POST /exams/start 
// Generate a new Exam with 5 randomly picked questions in it. 
// The questions can be read from the questions.json file provided.
router.post("/start", async (req, res, next) => {
    try {
        const questionsDB = await readDB(questionsFilePath)
        const examsDB = await readDB(examsFilePath)
        console.log(questionsDB)
        const randomQuestions = []
        
        for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * questionsDB.length)
            randomQuestions.push(questionsDB[randomIndex])

        }
        
            console.log(randomQuestions)
        
        
        /* for (let k = 0; k <= randomQuestions.length; k++) {
            console.log(randomQuestions[k].questions.answers)
        } */

        const newExam = {
            _id: uniqid(),
            ...req.body,
            examDate: new Date(), // server generated
            isCompleted:false, // false on creation
            totalDuration: 30, // used only in extras
            questions: randomQuestions
        }

        console.log(newExam)
        examsDB.push(newExam)
        console.log(examsDB)
        await (writeDB (examsFilePath, examsDB))
        res.status(201).send({_id: newExam._id})

    } catch (error) {
        next(error)
    }
})


//POST /exam/{id}/answer
/* Answer to a question for the given exam {id}.
    Body: 
    {
        question: 0, // index of the question
        answer: 1, // index of the answer
    } // in this case, the answer for the first question is the second choice
    When the answer is provided, the result is kept into the exam and the score is updated accordingly.
    It should not be possible to answer the same question twice. */
router.post("/:id/answer", async (req, res, next) => {
    try {
        const examsDB = await readDB(examsFilePath)
        const idFromRequest = req.params.id
        //const exam = examsDB.find(exam => exam._id === idFromRequest)

        const examIndex = examsDB.findIndex(
        exam => exam._id === idFromRequest
        )
        console.log(examIndex)
        if (examIndex !== -1) {
            examsDB[examIndex].examAnswers.push({
                ...req.body,
                createdAt: new Date()
            })

            /* add script:
            const answerIndex = answers.findIndex(answer => answer.isCorrect === true )
            if (answerIndex === examAnswers.answer) {
            score = score + 1
            examsDB[examIndex].score.push
            }
            else {score}

            */
            await writeDB(examsFilePath, examsDB)
            res.status(201).send(examsDB[examIndex])
    } else {
        const error = new Error()
        error.httpStatusCode = 404
        next(error)
        }
    } catch (error) {
        next(error)
    }
})

//GET /exams/{id}
//Returns the information about the exam, including the current score. 
router.get("/:id", async (req, res, next) => {
    try {
        const examsDB = await readDB(examsFilePath)
        const selectedExam = examsDB.filter(
            exam => exam._id === req.params.id)
        if (examsDB.length > 0) {

            res.send(selectedExam)
        } else {
            const err = new Error()
            err.httpStatusCode = 404
            next (err)
        }
    } catch (error) {
        next (error)
    }
    
})


module.exports = router