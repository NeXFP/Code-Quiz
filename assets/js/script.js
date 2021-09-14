const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "What is the correct syntax for referring to an external script called?",
        choice1: "<script href>",
        choice2: "<script name>",
        choice3: "<script file>",
        choice4: "<script src>",
        answer: 4
    },
    {
        question: "Which of these data types are used JavaScript?",
        choice1: "Booleans",
        choice2: "Flexbox",
        choice3: "Comments",
        choice4: "None of the above",
        answer: 1
    },
    {
        question: "Which of the following is a form of a looping structure in JavaScript?",
        choice1: "Flex Wrap",
        choice2: "P tags",
        choice3: "Do-While",
        choice4: "Divs",
        answer: 3
    },
    {
        question: "Which errors can you find in JavaScript?",
        choice1: "Load-time errors",
        choice2: "All of the above",
        choice3: "Logic errors",
        choice4: "Runtime errors",
        answer: 2
    } 
];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [... questions];
    console.log(availableQuestions);
    getNewQuestion(); 
};

getNewQuestion = () => {
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });
    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        getNewQuestion();
    });
});

startGame();