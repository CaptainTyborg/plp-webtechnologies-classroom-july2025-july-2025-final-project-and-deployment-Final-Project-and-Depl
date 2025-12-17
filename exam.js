// Exam management
let questions = {};
let selectedSubjects = [];
let currentSubject = '';
let currentQuestionIndex = 0;
let userAnswers = {};
let timeRemaining = 120 * 60; // 120 minutes in seconds
let timerInterval;

// Initialize exam
async function initExam() {
    // Get selected subjects
    const stored = sessionStorage.getItem('selectedSubjects');
    if (!stored) {
        window.location.href = 'subjects.html';
        return;
    }
    
    selectedSubjects = JSON.parse(stored);
    
    // Load questions
    await loadQuestions();
    
    // Setup UI
    setupSubjectTabs();
    currentSubject = selectedSubjects[0];
    loadQuestion();
    startTimer();
    setupCalculator();
    setupModals();
}

async function loadQuestions() {
    try {
        const response = await fetch('questions.json');
        const allQuestions = await response.json();
        
        // Filter questions for selected subjects
        selectedSubjects.forEach(subject => {
            if (allQuestions[subject]) {
                questions[subject] = allQuestions[subject];
                userAnswers[subject] = new Array(allQuestions[subject].length).fill(null);
            }
        });
    } catch (error) {
        console.error('Error loading questions:', error);
        alert('Error loading questions. Please try again.');
    }
}

function setupSubjectTabs() {
    const tabsContainer = document.getElementById('subjectTabs');
    tabsContainer.innerHTML = '';
    
    selectedSubjects.forEach((subject, index) => {
        const tab = document.createElement('div');
        tab.className = 'subject-tab' + (index === 0 ? ' active' : '');
        tab.textContent = capitalizeFirst(subject);
        tab.onclick = () => switchSubject(subject);
        tabsContainer.appendChild(tab);
    });
}

function setupQuestionGrid() {
    const gridContainer = document.getElementById('questionGrid');
    gridContainer.innerHTML = '';
    
    const numQuestions = questions[currentSubject].length;
    
    for (let i = 0; i < numQuestions; i++) {
        const btn = document.createElement('div');
        btn.className = 'question-number';
        if (i === currentQuestionIndex) btn.classList.add('active');
        if (userAnswers[currentSubject][i] !== null) btn.classList.add('answered');
        btn.textContent = i + 1;
        btn.onclick = () => goToQuestion(i);
        gridContainer.appendChild(btn);
    }
}

function switchSubject(subject) {
    currentSubject = subject;
    currentQuestionIndex = 0;
    
    // Update tabs
    document.querySelectorAll('.subject-tab').forEach((tab, index) => {
        tab.classList.toggle('active', selectedSubjects[index] === subject);
    });
    
    loadQuestion();
}

function loadQuestion() {
    const question = questions[currentSubject][currentQuestionIndex];
    const totalQuestions = questions[currentSubject].length;
    
    document.getElementById('currentSubject').textContent = capitalizeFirst(currentSubject);
    document.getElementById('questionNumber').textContent = currentQuestionIndex + 1;
    document.getElementById('totalQuestions').textContent = totalQuestions;
    document.getElementById('questionText').textContent = question.question;
    
    // Load options
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    const options = ['A', 'B', 'C', 'D'];
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        if (userAnswers[currentSubject][currentQuestionIndex] === index) {
            optionDiv.classList.add('selected');
        }
        
        optionDiv.innerHTML = `
            <div class="option-label">${options[index]}</div>
            <div class="option-text">${option}</div>
        `;
        
        optionDiv.onclick = () => selectOption(index);
        optionsContainer.appendChild(optionDiv);
    });
    
    // Update navigation buttons
    document.getElementById('prevBtn').disabled = currentQuestionIndex === 0;
    document.getElementById('nextBtn').disabled = currentQuestionIndex === totalQuestions - 1;
    
    // Update question grid
    setupQuestionGrid();
}

function selectOption(optionIndex) {
    userAnswers[currentSubject][currentQuestionIndex] = optionIndex;
    
    document.querySelectorAll('.option').forEach((opt, index) => {
        opt.classList.toggle('selected', index === optionIndex);
    });
    
    setupQuestionGrid();
}

function goToQuestion(index) {
    currentQuestionIndex = index;
    loadQuestion();
}

document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
});

document.getElementById('nextBtn').addEventListener('click', () => {
    const totalQuestions = questions[currentSubject].length;
    if (currentQuestionIndex < totalQuestions - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
});

// Timer
function startTimer() {
    updateTimerDisplay();
    
    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();
        
        if (timeRemaining <= 300) { // Last 5 minutes
            document.getElementById('timer').classList.add('warning');
        }
        
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            autoSubmitExam();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const hours = Math.floor(timeRemaining / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);
    const seconds = timeRemaining % 60;
    
    const display = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    document.getElementById('timeDisplay').textContent = display;
}

function pad(num) {
    return num.toString().padStart(2, '0');
}

// Calculator
function setupCalculator() {
    const calcBtn = document.getElementById('calculatorBtn');
    const calcModal = document.getElementById('calculatorModal');
    const closeCalc = document.getElementById('closeCalculator');
    
    calcBtn.onclick = () => calcModal.classList.add('active');
    closeCalc.onclick = () => calcModal.classList.remove('active');
    
    calcModal.onclick = (e) => {
        if (e.target === calcModal) {
            calcModal.classList.remove('active');
        }
    };
    
    // Calculator logic
    let calcDisplay = document.getElementById('calcDisplay');
    let currentValue = '0';
    let previousValue = '';
    let operation = '';
    
    document.querySelectorAll('.calc-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const value = btn.textContent;
            
            if (btn.classList.contains('calc-number')) {
                if (currentValue === '0' && value !== '.') {
                    currentValue = value;
                } else {
                    currentValue += value;
                }
                calcDisplay.textContent = currentValue;
            } else if (btn.classList.contains('calc-operator')) {
                if (value === '←') {
                    currentValue = currentValue.slice(0, -1) || '0';
                    calcDisplay.textContent = currentValue;
                } else {
                    if (previousValue && operation) {
                        calculate();
                    }
                    previousValue = currentValue;
                    currentValue = '0';
                    operation = value;
                }
            } else if (btn.classList.contains('calc-clear')) {
                currentValue = '0';
                previousValue = '';
                operation = '';
                calcDisplay.textContent = currentValue;
            } else if (btn.classList.contains('calc-equals')) {
                calculate();
            }
        });
    });
    
    function calculate() {
        const prev = parseFloat(previousValue);
        const current = parseFloat(currentValue);
        let result = 0;
        
        switch (operation) {
            case '+': result = prev + current; break;
            case '−': result = prev - current; break;
            case '×': result = prev * current; break;
            case '÷': result = prev / current; break;
        }
        
        currentValue = result.toString();
        calcDisplay.textContent = currentValue;
        previousValue = '';
        operation = '';
    }
}

// Submit modal
function setupModals() {
    const submitBtn = document.getElementById('submitBtn');
    const submitModal = document.getElementById('submitModal');
    const cancelSubmit = document.getElementById('cancelSubmit');
    const confirmSubmit = document.getElementById('confirmSubmit');
    
    submitBtn.onclick = () => {
        const totalAnswered = countAnsweredQuestions();
        const totalQuestions = selectedSubjects.length * 40;
        
        document.getElementById('answeredCount').textContent = totalAnswered;
        document.getElementById('totalQuestionsCount').textContent = totalQuestions;
        
        submitModal.classList.add('active');
    };
    
    cancelSubmit.onclick = () => submitModal.classList.remove('active');
    
    confirmSubmit.onclick = () => {
        clearInterval(timerInterval);
        submitExam();
    };
    
    submitModal.onclick = (e) => {
        if (e.target === submitModal) {
            submitModal.classList.remove('active');
        }
    };
}

function countAnsweredQuestions() {
    let count = 0;
    selectedSubjects.forEach(subject => {
        count += userAnswers[subject].filter(a => a !== null).length;
    });
    return count;
}

function autoSubmitExam() {
    alert('Time is up! Your exam will be submitted automatically.');
    submitExam();
}

function submitExam() {
    // Calculate scores
    const results = {};
    let totalScore = 0;
    
    selectedSubjects.forEach(subject => {
        let correct = 0;
        questions[subject].forEach((q, index) => {
            if (userAnswers[subject][index] === q.correct) {
                correct++;
            }
        });
        
        results[subject] = {
            score: correct,
            total: questions[subject].length,
            percentage: Math.round((correct / questions[subject].length) * 100)
        };
        
        totalScore += correct;
    });
    
    results.total = {
        score: totalScore,
        total: selectedSubjects.length * 40,
        percentage: Math.round((totalScore / (selectedSubjects.length * 40)) * 100)
    };
    
    sessionStorage.setItem('examResults', JSON.stringify(results));
    window.location.href = 'results.html';
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Initialize when page loads
window.addEventListener('load', initExam);