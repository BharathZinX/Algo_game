const pseudocodeQuestions = [
    {
        title: "Kadane’s Algorithm",
        pseudocode: [
            "Start",
            "Initialize max_current and max_global to the first element of the array",
            "For each element from the second element to the end of the array:",
            "Update max_current to the maximum of the current element and max_current + current element",
            "Update max_global to the maximum of max_global and max_current",
            "Return max_global",
            "Stop"
        ],
        jumbledPseudocode: [
            "Start",
            "Update max_global to the maximum of max_global and max_current",
            "Return max_global",
            "For each element from the second element to the end of the array:",
            "Update max_current to the maximum of the current element and max_current + current element",
            "Initialize max_current and max_global to the first element of the array",
            "Stop"
        ]
    },
    // Add other questions similarly...
];

let currentQuestionIndex = 0;
let totalScore = 0;
let answers = [];
let timer;

// Shuffle function (remains unchanged)
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

// Display the current question
function displayQuestion(index) {
    const question = pseudocodeQuestions[index];
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = `
        <h2>${question.title}</h2>
        <ul id="pseudocode-list" class="pseudocode-list">
            ${question.jumbledPseudocode.map((line, i) => `<li id="line-${i}" draggable="true">${line}</li>`).join('')}
        </ul>
        <p id="result-message" style="display: none;"></p>
    `;

    // Initialize drag and drop
    document.querySelectorAll('.pseudocode-list li').forEach(item => {
        item.addEventListener('dragstart', dragStart);
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', drop);
    });

    document.getElementById('result-message').style.display = 'none';
}

// Handle drag and drop functionality
function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text');
    const draggedElement = document.getElementById(id);
    const targetElement = e.target;

    if (targetElement.tagName === 'LI' && draggedElement !== targetElement) {
        const parent = targetElement.parentNode;
        parent.insertBefore(draggedElement, targetElement.nextSibling);
    }
}

// Validate user’s solution
function validateSolution() {
    const items = Array.from(document.querySelectorAll('#pseudocode-list li'));
    const userOrder = items.map(item => item.textContent);
    const correctOrder = pseudocodeQuestions[currentQuestionIndex].pseudocode;
    const resultMessage = document.getElementById('result-message');

    let isCorrect = JSON.stringify(userOrder) === JSON.stringify(correctOrder);
    answers[currentQuestionIndex] = isCorrect;

    if (isCorrect) {
        resultMessage.textContent = "Correct!";
        resultMessage.style.color = 'green';
        totalScore++;
    } else {
        resultMessage.textContent = "Incorrect!";
        resultMessage.style.color = 'red';
    }
    resultMessage.style.display = 'block';
}

// Navigate to the next question
function nextQuestion() {
    validateSolution();

    if (currentQuestionIndex < pseudocodeQuestions.length - 1) {
        currentQuestionIndex++;
        displayQuestion(currentQuestionIndex);
        document.getElementById('prev-question').style.display = 'block';
        
        if (currentQuestionIndex === pseudocodeQuestions.length - 1) {
            document.getElementById('next-question').textContent = 'Submit';
        }
    } else {
        showResults();
    }
}

// Navigate to the previous question
function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion(currentQuestionIndex);
        document.getElementById('next-question').textContent = 'Next';
        if (currentQuestionIndex === 0) {
            document.getElementById('prev-question').style.display = 'none';
        }
    }
}

// Display the results after the final question
function showResults() {
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('navigation').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
    
    document.getElementById('final-score').textContent = `Your final score is: ${totalScore} out of ${pseudocodeQuestions.length}`;
    
    const reviewList = document.getElementById('answer-review');
    reviewList.innerHTML = pseudocodeQuestions.map((question, index) => {
        return `<li>${question.title}: ${answers[index] ? 'Correct' : 'Wrong'}</li>`;
    }).join('');
}

// Restart the quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    totalScore = 0;
    answers = [];
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('question-container').style.display = 'block';
    document.getElementById('navigation').style.display = 'block';
    document.getElementById('next-question').textContent = 'Next';
    displayQuestion(currentQuestionIndex);
}

// Timer logic
function startTimer() {
    const timerDisplay = document.getElementById('timer-display');
    let timeRemaining = 10 * 60; // 10 minutes in seconds

    timer = setInterval(() => {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;

        timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        timeRemaining--;

        if (timeRemaining < 0) {
            clearInterval(timer);
            alert("Time's up!");
            validateSolution();
            showResults();
        }
    }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
    displayQuestion(currentQuestionIndex);
    startTimer();

    document.getElementById('next-question').addEventListener('click', nextQuestion);
    document.getElementById('prev-question').addEventListener('click', prevQuestion);
});
