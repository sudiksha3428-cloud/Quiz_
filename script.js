const questions = {
  easy: [
    { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Hyperlink Text Management Language"], answer: 0 },
    { question: "Which CSS property changes text color?", options: ["font-color", "text-color", "color", "background-color"], answer: 2 },
    { question: "What year was JavaScript created?", options: ["1995", "2000", "1990", "2005"], answer: 0 },
    { question: "Which HTML tag creates a hyperlink?", options: ["link", "a", "href", "url"], answer: 1 },
    { question: "CSS stands for?", options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style System", "Colorful Style Sheets"], answer: 1 }
  ],
  medium: [
    { question: "Which method adds an element to the end of an array?", options: ["push()", "pop()", "shift()", "unshift()"], answer: 0 },
    { question: "What does '===' mean in JavaScript?", options: ["Assignment", "Loose equality", "Strict equality", "Not equal"], answer: 2 },
    { question: "Which CSS property controls spacing between elements?", options: ["padding", "margin", "spacing", "gap"], answer: 1 },
    { question: "What is the DOM?", options: ["Data Object Model", "Document Object Model", "Digital Output Method", "Data Output Method"], answer: 1 },
    { question: "Which HTML tag is used for largest heading?", options: ["h6", "h1", "heading", "header"], answer: 1 }
  ],
  hard: [
    { question: "What is a closure in JavaScript?", options: ["A function with access to outer scope", "A closed browser tab", "A CSS property", "An HTML element"], answer: 0 },
    { question: "Which CSS property creates a flexible box layout?", options: ["display: flex", "display: grid", "display: block", "display: inline"], answer: 0 },
    { question: "What does async/await do?", options: ["Handles asynchronous operations", "Creates animations", "Styling elements", "Database connection"], answer: 0 },
    { question: "What is hoisting in JavaScript?", options: ["Lifting heavy objects", "Variable declarations moved to top", "CSS animation effect", "HTML validation"], answer: 1 },
    { question: "Which is not a JavaScript data type?", options: ["String", "Boolean", "Float", "Object"], answer: 2 }
  ]
};

let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timer;

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const currentQEl = document.getElementById('current-q');
const totalQEl = document.getElementById('total-q');
const finalScoreEl = document.getElementById('final-score');
const resultMessageEl = document.getElementById('result-message');

document.querySelectorAll('.level-btn').forEach(btn => {
  btn.addEventListener('click', (e) => startQuiz(e.target.dataset.level));
});

document.getElementById('restart-btn').addEventListener('click', resetQuiz);

function startQuiz(level) {
  currentQuestions = questions[level].slice(0, 10);
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 30;
  totalQEl.textContent = currentQuestions.length;
  
  startScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');
  
  loadQuestion();
  startTimer();
}

function loadQuestion() {
  const q = currentQuestions[currentQuestionIndex];
  questionEl.textContent = q.question;
  currentQEl.textContent = currentQuestionIndex + 1;
  optionsEl.innerHTML = '';
  
  q.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.textContent = option;
    button.classList.add('option-btn');
    button.addEventListener('click', () => selectAnswer(index));
    optionsEl.appendChild(button);
  });
}

function selectAnswer(selectedIndex) {
  clearInterval(timer);
  const correctIndex = currentQuestions[currentQuestionIndex].answer;
  const buttons = optionsEl.querySelectorAll('.option-btn');
  
  buttons.forEach((btn, index) => {
    btn.classList.add('disabled');
    if (index === correctIndex) btn.classList.add('correct');
    if (index === selectedIndex && selectedIndex!== correctIndex) btn.classList.add('wrong');
  });
  
  if (selectedIndex === correctIndex) score++;
  scoreEl.textContent = score;
  
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuestions.length) {
      timeLeft = 30;
      loadQuestion();
      startTimer();
    } else {
      showResults();
    }
  }, 1500);
}

function startTimer() {
  timeEl.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      selectAnswer(-1);
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.add('hidden');
  resultScreen.classList.remove('hidden');
  finalScoreEl.textContent = score;
  
  let message = score >= 8? "Excellent work!" : score >= 5? "Good job!" : "Keep practicing!";
  resultMessageEl.textContent = message;
}

function resetQuiz() {
  resultScreen.classList.add('hidden');
  startScreen.classList.remove('hidden');
}