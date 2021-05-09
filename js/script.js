/*
Take array directly Array.from
*/
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = [];

let questions = [{
        question: "What is the capital of Libiya ?",
        choice1: 'Nebraska',
        choice2: 'Addis Abba',
        choice3: 'Beirut',
        choice4: 'Lhasa',
        answer: 3
    },
    {
        question: "Which one is one of the baltic country ?",
        choice1: 'Poland',
        choice2: 'Belarus',
        choice3: 'Lithuania',
        choice4: 'Slovenia',
        answer: 4
    },
    {
        question: "Which is the highest mountain in the world ?",
        choice1: 'Mt. Olympus',
        choice2: 'Mt. Fuji',
        choice3: 'Mt. Everest',
        choice4: 'Mt. NagaParbat',
        answer: 3
    },
    {
        question: "Which is the longest river in the world ?",
        choice1: 'Nile',
        choice2: 'Amazon',
        choice3: 'Thames',
        choice4: 'Indus',
        answer: 1
    }
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

// Starting the game
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]; //spread operator => ...
    getNewQuestion();
}

//Getting question
getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('./end.html'); //This is not working because of security concerns
    }
    questionCounter++;
    progressText.innerHTML = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number']; //See dataset
        choice.innerText = currentQuestion['choice' + number];
    })

    availableQuestions.splice(questionIndex, 1); //See Array.splice

    acceptingAnswers = true;
}

//Logic for choice
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false;
        const selectedChoice = e.target; // don't know what this target is
        const selectedAnswer = selectedChoice.dataset['number'];
        //Let Ternery Operator
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }
        //This just shows us the green text on options when correct option is selected
        selectedChoice.parentElement.classList.add(classToApply); //Gotta learn about this classList.add

        setTimeout(() => {
            //This just shows us the red text on options when incorrect option selected
            selectedChoice.parentElement.classList.remove(classToApply); //don't know about classList.remove
            getNewQuestion();
        }, 1000)
    })
})

//Incrementing score
incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
}

startGame();