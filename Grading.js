let gradingValues = {
    O: 10,
    A: 9,
    B: 8,
    C: 7,
    D: 6,
    E: 5,
    P: 4,
    F: 0
};
let addedRows = []; // Global array to keep track of added rows

function customizeGrading() {
    const gradingDiv = document.getElementById('gradingContainer');
    gradingDiv.innerHTML = ''; // Clear previous content

    const gradingCard = document.createElement('div');
    gradingCard.className = 'card';
    gradingCard.innerHTML = `
        <div class="card-content">
            <h3>Customize Grading System</h3>
            <table>
                <thead>
                    <tr>
                        <th>Grade</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody id="gradingTableBody">
                    <!-- Rows will be populated here -->
                </tbody>
            </table>
            <div class="button-container">
                <button class="btn" onclick="addGradingRow()">Add</button>
                <button class="bten" onclick="undoLastRow()">Undo</button>
                <button class="btnn" onclick="saveGrading()">Apply</button>
            </div>
        </div>
    `;

    // Populate the grading table with current grading values
    const tbody = gradingCard.querySelector('#gradingTableBody');
    for (const [grade, value] of Object.entries(gradingValues)) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td contenteditable="true">${grade}</td>
            <td contenteditable="true">${value}</td>
        `;
        tbody.appendChild(newRow);
    }

    gradingDiv.appendChild(gradingCard);
}

function addGradingRow() {
    const tbody = document.getElementById('gradingTableBody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td contenteditable="true"></td>
        <td contenteditable="true"></td>
    `;
    tbody.appendChild(newRow);
    addedRows.push(newRow);
}

function undoLastRow() {
    const tbody = document.getElementById('gradingTableBody');
    if (addedRows.length > 0) {
        const lastRow = addedRows.pop(); // Remove the last row from the stack
        tbody.removeChild(lastRow); // Remove the last row from the table
    } else {
        alert("No rows to undo.");
    }
}

function saveGrading() {
    const tbody = document.getElementById('gradingTableBody');
    const rows = tbody.getElementsByTagName('tr');

    gradingValues = {}; // Reset grading values

    for (let row of rows) {
        const grade = row.cells[0].innerText.trim();
        const value = parseFloat(row.cells[1].innerText.trim());
        if (grade && !isNaN(value)) {
            gradingValues[grade] = value; // Store in temporary variable
        }
    }

    // Update the semester cards with the new grading system
    updateSemesterCards();

    // Hide the grading card
    const gradingDiv = document.getElementById('gradingContainer');
    gradingDiv.innerHTML = ''; // Clear the grading card
}

// Function to update semester card grade dropdowns
function updateSemesterCards() {
    const semesterCards = document.querySelectorAll('.card');

    // Get grades sorted in descending order of values
    const sortedGrades = Object.keys(gradingValues).sort(
        (a, b) => gradingValues[b] - gradingValues[a]
    );

    semesterCards.forEach(card => {
        const gradeDropdowns = card.querySelectorAll('select');

        gradeDropdowns.forEach(select => {
            // Update the dropdown options in descending order
            select.innerHTML = sortedGrades
                .map(
                    grade =>
                        `<option value="${gradingValues[grade]}">${grade}</option>`
                )
                .join('');
        });
    });
}

