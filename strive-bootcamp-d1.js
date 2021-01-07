/*
    You are in charge of building the new Assessment & Benchmarking platform for your company.
    The goal of the application is pretty simple: assess the skill level of the candidate through a serie of multi choice questions and answers.
    The application should guide the candidate through a set of questions, collect all the provided answers and show him the result of his own assessment.
    Today you are in charge of building the Backend of the Application.
    Company requirement:
    - Use Node + Express as backend technology
    - Store all the information in files (No DB allowed)
    - The codebase should be in JavaScript
    - Every part should be available in GitHub
    Backend Features:
    > POST /exams/start 
    Generate a new Exam with 5 randomly picked questions in it. The questions can be read from the questions.json file provided.
    
    {
    "_id":"5fd0de8f2bf2321fe8743f1f", // server generated
    "candidateName": "Tobia",
    "examDate": "2021-01-07T10:00:00.000+00:00", // server generated
    "isCompleted":false, // false on creation
    "name":"Admission Test",
    "totalDuration": 30, // used only in extras
    "questions":[ // randomly picked from questions.json
        {
        "providedAnswer": 0, // added when the user provides an answer (not on creation)
        "duration":60,
        "text":"This is the text of the first question",
        "answers":[
            {
            "text":"Text for the first answer",
            "isCorrect":false
            },
            {
            "text":"Text for the second answer",
            "isCorrect":true
            },{
            "text":"Text for the third answer",
            "isCorrect":false
            },{
            "text":"Text for the fourth answer",
            "isCorrect":false
            }]
        },
        {
        // second randomly picked question
        },
        {
        // third randomly picked question
        }, 
        {
        // fourth randomly picked question
        },
        {
        // fifth randomly picked question
        },         
      ]
    }
    Returns:
    Full exam object, including questions and answers. The response contains the exam id and does not contain any clue about the correct answer
    > POST /exam/{id}/answer
    Answer to a question for the given exam {id}.
    Body: 
    {
        question: 0, // index of the question
        answer: 1, // index of the answer
    } // in this case, the answer for the first question is the second choice
    When the answer is provided, the result is kept into the exam and the score is updated accordingly.
    It should not be possible to answer the same question twice.
    > GET /exams/{id}
    Returns the information about the exam, including the current score. 
    [EXTRA]
    > CRUD /questions 
    The user can add, edit, remove questions.
    > Handle Time Cap
       
    Start exam can now receive duration as parameter. The total of questions randomly picked for that exam should not exceed the specified duration
*/