// Subject selection management
const subjectCards = document.querySelectorAll('.subject-card');
const checkboxes = document.querySelectorAll('.subject-checkbox');
const selectedCountSpan = document.getElementById('selectedCount');
const startExamBtn = document.getElementById('startExamBtn');
let selectedSubjects = [];

// Add click handlers to subject cards
subjectCards.forEach(card => {
    card.addEventListener('click', (e) => {
        if (e.target.type !== 'checkbox') {
            const checkbox = card.querySelector('.subject-checkbox');
            checkbox.click();
        }
    });
});

// Add change handlers to checkboxes
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
        const subjectCard = e.target.closest('.subject-card');
        const subject = subjectCard.dataset.subject;
        
        if (e.target.checked) {
            if (selectedSubjects.length < 4) {
                selectedSubjects.push(subject);
                subjectCard.classList.add('selected');
            } else {
                e.target.checked = false;
                alert('You can only select 4 subjects');
            }
        } else {
            selectedSubjects = selectedSubjects.filter(s => s !== subject);
            subjectCard.classList.remove('selected');
        }
        
        updateSelection();
    });
});

function updateSelection() {
    selectedCountSpan.textContent = selectedSubjects.length;
    startExamBtn.disabled = selectedSubjects.length !== 4;
}

startExamBtn.addEventListener('click', () => {
    if (selectedSubjects.length === 4) {
        sessionStorage.setItem('selectedSubjects', JSON.stringify(selectedSubjects));
        window.location.href = 'exam.html';
    }
});