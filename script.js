const quizData = [
    {
        question: "3 + 2 - 4?",
        a: "4",
        b: "1",
        c: "3",
        d: "7",
        correct: "b",
    },

    {
        question: "3 * 3 + 3?",
        a: "4",
        b: "1",
        c: "9",
        d: "12",
        correct: "d",
    },

    {
        question: "5 + 2 - 4?",
        a: "4",
        b: "1",
        c: "3",
        d: "7",
        correct: "c",
    },

    {
        question: "1 + 1 - 1?",
        a: "4",
        b: "1",
        c: "3",
        d: "7",
        correct: "b",
    },
];


const startButton = document.getElementById('startButton');
const infoBox = document.querySelector('.info_box');
const continueButton = document.querySelector('.restart');
const exitButton = document.querySelector('.quit');
const quizContainer = document.querySelector('.quiz-container');
const answerList = document.getElementById('answerList');
const submitBtn = document.getElementById('submit');

let currentQuiz = 0;
let score = 0;

function showElement(element) {
    element.style.display = 'block';
}

function hideElement(element) {
    element.style.display = 'none';
}

function loadQuiz() {
    const currentQuizData = quizData[currentQuiz];
    const questionEl = document.getElementById('question');
    questionEl.innerText = currentQuizData.question;

    answerList.innerHTML = '';
    for (const option in currentQuizData) {
        if (option !== 'question' && option !== 'correct') {
            const li = document.createElement('li');
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'answer';
            input.id = option;
            input.className = 'answer';

            const label = document.createElement('label');
            label.htmlFor = option;
            label.id = `${option}_text`;
            label.textContent = currentQuizData[option];

            li.appendChild(input);
            li.appendChild(label);
            answerList.appendChild(li);
        }
    }
}

function deselectAnswers() {
    const answerEls = document.querySelectorAll('.answer');
    answerEls.forEach((answerEl) => (answerEl.checked = false));
}

function getSelected() {
    let answer;
    const answerEls = document.querySelectorAll('.answer');
    answerEls.forEach((answerEl) => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}

startButton.addEventListener('click', () => {
    hideElement(startButton.parentElement);
    showElement(infoBox);
});

continueButton.addEventListener('click', () => {
    hideElement(infoBox);
    showElement(quizContainer);
    loadQuiz();
});

exitButton.addEventListener('click', () => {
    hideElement(quizContainer);
    showElement(startButton.parentElement);
});

let scores = []; // Array to store test takers' scores

submitBtn.addEventListener('click', () => {
    const answer = getSelected();
    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++;
        }
        currentQuiz++;
        if (currentQuiz < quizData.length) {
            loadQuiz();
            //ADDED STUFF:
            scores.push(score)
            window.location.href="/results";
        } else {
            hideElement(quizContainer);
            const resultContainer = document.createElement('div');
            resultContainer.innerHTML = `<h2>You answered ${score}/${quizData.length} questions correctly</h2>
            <button onclick="location.reload()">Next Section</button>`;
            document.body.appendChild(resultContainer);
        }
    }
});

