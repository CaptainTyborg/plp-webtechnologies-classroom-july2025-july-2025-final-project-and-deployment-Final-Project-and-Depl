// Results display
function displayResults() {
    const resultsData = sessionStorage.getItem('examResults');
    
    if (!resultsData) {
        window.location.href = 'index.html';
        return;
    }
    
    const results = JSON.parse(resultsData);
    
    // Display total score
    document.getElementById('totalScore').textContent = results.total.score;
    document.getElementById('percentage').textContent = results.total.percentage + '%';
    
    // Display subject results
    const subjectResultsContainer = document.getElementById('subjectResults');
    subjectResultsContainer.innerHTML = '';
    
    Object.keys(results).forEach(subject => {
        if (subject === 'total') return;
        
        const subjectData = results[subject];
        const card = document.createElement('div');
        card.className = 'subject-result-card';
        
        card.innerHTML = `
            <div class="subject-result-info">
                <h4>${capitalizeFirst(subject)}</h4>
                <p>Out of ${subjectData.total} questions</p>
            </div>
            <div class="subject-result-score">
                <div class="subject-score">${subjectData.score}</div>
                <div class="subject-percentage">${subjectData.percentage}%</div>
            </div>
        `;
        
        subjectResultsContainer.appendChild(card);
    });
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

window.addEventListener('load', displayResults);