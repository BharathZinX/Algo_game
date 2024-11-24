    const pseudocodeQuestions = [
        
        {
            title: "Depth-First Search (DFS) in a Graph",
            pseudocode: [
                "Start",
                "Initialize a stack and mark all nodes as unvisited",
                "Push the starting node onto the stack and mark it as visited",
                "While the stack is not empty:",
                "Pop a node from the stack and process it",
                "For each unvisited neighbor of the popped node, push it onto the stack and mark it as visited",
                "Stop"
            ],
            jumbledPseudocode: [
                "Start",
                "Push the starting node onto the stack and mark it as visited",
                "Pop a node from the stack and process it",
                "For each unvisited neighbor of the popped node, push it onto the stack and mark it as visited",
                "Initialize a stack and mark all nodes as unvisited",
                "While the stack is not empty:",
                "Stop"
            ]
        },
        {
            title: "Binary Search",
            pseudocode: [
                "Start",
                "Set low to 0 and high to the length of the array minus 1",
                "While low is less than or equal to high:",
                "Calculate mid as the average of low and high",
                "If the target is equal to the element at mid, return mid",
                "If the target is less than the element at mid, set high to mid - 1",
                "Otherwise, set low to mid + 1",
                "If the target is not found, return -1",
                "Stop"
            ],
            jumbledPseudocode: [
                "Start",
                "Calculate mid as the average of low and high",
                "Set low to 0 and high to the length of the array minus 1",
                "If the target is not found, return -1",
                "If the target is equal to the element at mid, return mid",
                "While low is less than or equal to high:",
                "If the target is less than the element at mid, set high to mid - 1",
                "Otherwise, set low to mid + 1",
                "Stop"
            ]
        },
        {
            title: "Merging Two Sorted Arrays",
            pseudocode: [
                "Start",
                "Initialize pointers i and j to 0 for both arrays",
                "Initialize an empty result array",
                "While both pointers are within bounds of their respective arrays:",
                "Compare elements at pointers i and j",
                "Append the smaller element to the result array and advance the pointer",
                "Append remaining elements from either array to the result array",
                "Return the result array",
                "Stop"
            ],
            jumbledPseudocode: [
                "Start",
                "Append remaining elements from either array to the result array",
                "Initialize pointers i and j to 0 for both arrays",
                "Initialize an empty result array",
                "While both pointers are within bounds of their respective arrays:",
                "Append the smaller element to the result array and advance the pointer",
                "Compare elements at pointers i and j",
                "Return the result array",
                "Stop"
            ]
        },
        {
            title: "Finding the Longest Palindromic Substring",
            pseudocode: [
                "Start",
                "Initialize start and max_length to 0",
                "For each character in the string:",
                "Expand around the character and check for odd-length palindromes",
                "Expand around the gap between this character and the next character for even-length palindromes",
                "Update start and max_length based on the longest palindrome found",
                "Extract and return the substring from start with length max_length",
                "Stop"
            ],
            jumbledPseudocode: [
                "Start",
                "Initialize start and max_length to 0",
                "Expand around the gap between this character and the next character for even-length palindromes",
                "For each character in the string:",
                "Extract and return the substring from start with length max_length",
                "Expand around the character and check for odd-length palindromes",
                "Update start and max_length based on the longest palindrome found",
                "Stop"
            ]
        },
        {
            title: "Finding the Minimum Value in an Array",
            pseudocode: [
                "Start",
                "Set min = array[0]",
                "For each element in the array:",
                "If the current element < min, update min",
                "Return min",
                "Stop"
            ],
            jumbledPseudocode: [
                "Start",
                "Set min = array[0]",
                "Return min",
                "For each element in the array:",
                "If the current element < min, update min",
                "Stop"
            ]
        }
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
