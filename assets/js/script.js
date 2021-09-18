// For Buttons
const highScore = document.getElementById('highScore');
const start = document.getElementById('start');
const home = document.getElementById('home');

// For Sections
const intro = document.getElementById('intro');
const quiz = document.getElementById('quiz');
const hsPage = document.getElementById('hsPage');
const inpKey = document.getElementById('inpKey');
const subBtn = document.getElementById('submitBtn');
const goHome = document.getElementById('goHome');
const clrBtn = document.getElementById('clrBtn')

// Some References
const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const scoreEl = document.querySelector('#score');
const timerEl = document.getElementById('timer');
const submitEl = document.getElementById("submitPage");
const finalScore = document.getElementById("finalScore");
const scoreList = document.getElementById("scoreList")


// Some Variables
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
const correct_bonus = 10;
const max_questions = 4;
let timeLeft;

// Question and Answer List
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
        question: "Which of these data types are used in JavaScript?",
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

// Home Page Screen
function homePage() {
    intro.style.display = "flex"
    quiz.style.display = "none";
    hsPage.style.display = "none";
}

// Order of the Quiz
function startQuiz() {
    questionCounter = 0;
    intro.style.display = "none";
    availableQuestions = [... questions];
    timer();
    quiz.style.display = "flex";
    getNewQuestion(); 
};

function submitPage() {
    finalScore.innerText = score;
    intro.style.display = "none";
    quiz.style.display = "none";
    hsPage.style.display = "none";
    timerEl.style.display = "none";
    submitEl.style.display = "flex";
}

// High Score Screen Function
function highscoreScreen() {
    intro.style.display = "none";
    quiz.style.display = "none";
    hsPage.style.display = "block";
    timerEl.style.display = "none";
    submitEl.style.display = "none";
}

function clearBtn() {
    scoreList.innerText = "";
    intro.style.display = "none";
    quiz.style.display = "none";
    hsPage.style.display = "block";
    timerEl.style.display = "none";
}

// Function to get a new question
getNewQuestion = () => {
    if(questionCounter > 3){
        submitPage();
    }
    questionCounter++;
    const questionIndex = questionInOrder();
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

// Number generater for new question function
var questionInOrder = function() {
    for (i = 0; i < 4; i++) {
        return i;
    }
}

// Function for the score
function setCounterText() {
    scoreEl.textContent = score;
}

// Additional function for the score
choices.forEach(choice => {
    choice.addEventListener("click", e => {
       //if(acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        var correctAnswer = (questions[questionCounter - 1].answer);
        if ((selectedAnswer === '1' && correctAnswer === 1) || (selectedAnswer === '2' && correctAnswer === 2)
         || (selectedAnswer === '3' && correctAnswer === 3) || (selectedAnswer === '4' && correctAnswer === 4)) {
            score = score + 5;
            setCounterText();
        } else {
            timeLeft = timeLeft - 10;
        }
        getNewQuestion();
    });
});

// Function for the timer
function timer() {
    timeLeft = 60;

    var timeInterval = setInterval(function() {
        if (timeLeft >= 0) { 
            timerEl.innerText = timeLeft;
            timeLeft--;
        } else {
            submitPage();
        }
    }, 1000);
}


subBtn.onclick = function() {
    const name = inpKey.value;
    const points = finalScore.textContent;
    
    if(name) {
        localStorage.setItem(name, points);
    }
};

clrBtn.onclick = function() {
    localStorage.clear();
}


for (let j = 0; j < localStorage.length; j++) {
    const key = localStorage.key(j);
    const value = localStorage.getItem(key);

    scoreList.innerHTML += `${key}: ${value}<br/>`;
};

// Event Listeners for buttons
start.addEventListener("click", startQuiz)
highScore.addEventListener("click", highscoreScreen)
home.addEventListener("click", homePage)
goHome.addEventListener("click", homePage)
clrBtn.addEventListener("click", clearBtn)