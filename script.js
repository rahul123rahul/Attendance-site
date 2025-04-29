let subjects = {};
let isLoggedIn = false;
let currentUsername = '';

// --- Login Functionality ---
function login() {
    const usernameInput = document.getElementById('username');
    const username = usernameInput.value.trim();
    const loginError = document.getElementById('login-error');

    if (username) {
        currentUsername = username;
        isLoggedIn = true;
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('main-container').style.display = 'block';
        document.getElementById('welcome-message').textContent = `Welcome, ${username}!`;
        loadSavedData(); // Try to load any saved data for this user
    } else {
        loginError.textContent = 'Please enter your mobile number.';
    }
}

// --- Subject Management ---
function addSubject() {
    const subjectNameInput = document.getElementById('subject-name');
    const subjectName = subjectNameInput.value.trim();

    if (subjectName) {
        if (!subjects[subjectName]) {
            subjects[subjectName] = { totalClasses: 0, attendedClasses: 0 };
            displaySubjectInputs();
        } else {
            alert(`Subject "${subjectName}" already exists. You can now enter/update its attendance details.`);
            displaySubjectInputs();
        }
        subjectNameInput.value = '';
        saveData();
    } else {
        alert('Please enter a subject name.');
    }
}

function displaySubjectInputs() {
    const subjectsListDiv = document.getElementById('subjects-list');
    subjectsListDiv.innerHTML = '';

    for (const subject in subjects) {
        const subjectDiv = document.createElement('div');
        subjectDiv.innerHTML = `
            <h3>${subject}</h3>
            <div class="input-group">
                <label for="${subject}-total">Total Classes Held:</label>
                <input type="number" id="${subject}-total" value="${subjects[subject].totalClasses}" min="0" onchange="updateTotalClasses('${subject}', this.value)">
            </div>
            <div class="input-group">
                <label for="${subject}-attended">Classes Attended:</label>
                <input type="number" id="${subject}-attended" value="${subjects[subject].attendedClasses}" min="0" onchange="updateAttendedClasses('${subject}', this.value)">
            </div>
            <button class="delete-button" onclick="deleteSubject('${subject}')">Delete</button>
        `;
        subjectsListDiv.appendChild(subjectDiv);
    }
}function updateTotalClasses(subjectName, value) {
    subjects[subjectName].totalClasses = parseInt(value) >= 0 ? parseInt(value) : 0;
    saveData();
}

function updateAttendedClasses(subjectName, value) {
    subjects[subjectName].attendedClasses = parseInt(value) >= 0 ? parseInt(value) : 0;
    saveData();
}

function deleteSubject(subjectName) {
    if (confirm(`Are you sure you want to delete "${subjectName}"?`)) {
        delete subjects[subjectName];
        displaySubjectInputs();
        calculateAttendance(); // Recalculate after deletion
        saveData();
    }
}

// --- Attendance Calculation and Reporting ---
function calculateAttendance() {
    const attendanceDataBody = document.getElementById('attendance-data');
    attendanceDataBody.innerHTML = '';

    let overallTotalHeld = 0;
    let overallTotalAttended = 0;

    for (const subject in subjects) {
        const totalClasses = subjects[subject].totalClasses;
        const attendedClasses = subjects[subject].attendedClasses;
        let attendancePercentage = 0;
        if (totalClasses > 0) {
            attendancePercentage = (attendedClasses / totalClasses) * 100;
        }

        overallTotalHeld += totalClasses;
        overallTotalAttended += attendedClasses;

        const row = attendanceDataBody.insertRow();
        const subjectCell = row.insertCell();
        const totalClassesCell = row.insertCell();
        const attendedClassesCell = row.insertCell();
        const percentageCell = row.insertCell();
        const statusCell = row.insertCell();
        const subjectSafeCell = row.insertCell();
        const actionCell = row.insertCell();

        subjectCell.textContent = subject;
        totalClassesCell.textContent = totalClasses;
        attendedClassesCell.textContent = attendedClasses;
        percentageCell.textContent = attendancePercentage.toFixed(2) + '%';

let subjects = {};
let isLoggedIn = false;
let currentUsername = '';

// --- Login Functionality ---
function login() {
    const usernameInput = document.getElementById('username');
    const username = usernameInput.value.trim();
    const loginError = document.getElementById('login-error');

    if (username) {
        currentUsername = username;
        isLoggedIn = true;
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('main-container').style.display = 'block';
        document.getElementById('welcome-message').textContent = `Welcome, ${username}!`;
        loadSavedData(); // Try to load any saved data for this user
    } else {
        loginError.textContent = 'Please enter your mobile number.';
    }
}

// --- Subject Management ---
function addSubject() {
    const subjectNameInput = document.getElementById('subject-name');
    const subjectName = subjectNameInput.value.trim();

    if (subjectName) {
        if (!subjects[subjectName]) {
            subjects[subjectName] = { totalClasses: 0, attendedClasses: 0 };
            displaySubjectInputs();
        } else {
            alert(`Subject "${subjectName}" already exists. You can now enter/update its attendance details.`);
            displaySubjectInputs();
        }
        subjectNameInput.value = '';
        saveData();
    } else {
        alert('Please enter a subject name.');
    }
}

function displaySubjectInputs() {
    const subjectsListDiv = document.getElementById('subjects-list');
    subjectsListDiv.innerHTML = '';

    for (const subject in subjects) {
        const subjectDiv = document.createElement('div');
        subjectDiv.innerHTML = `
            <h3>${subject}</h3>
            <div class="input-group">
                <label for="${subject}-total">Total Classes Held:</label>
                <input type="number" id="${subject}-total" value="${subjects[subject].totalClasses}" min="0" onchange="updateTotalClasses('${subject}', this.value)">
            </div>
            <div class="input-group">
                <label for="${subject}-attended">Classes Attended:</label>
                <input type="number" id="${subject}-attended" value="${subjects[subject].attendedClasses}" min="0" onchange="updateAttendedClasses('${subject}', this.value)">
            </div>
            <button class="delete-button" onclick="deleteSubject('${subject}')">Delete</button>
        `;
        subjectsListDiv.appendChild(subjectDiv);
    }
}function updateTotalClasses(subjectName, value) {
    subjects[subjectName].totalClasses = parseInt(value) >= 0 ? parseInt(value) : 0;
    saveData();
}

function updateAttendedClasses(subjectName, value) {
    subjects[subjectName].attendedClasses = parseInt(value) >= 0 ? parseInt(value) : 0;
    saveData();
}

function deleteSubject(subjectName) {
    if (confirm(`Are you sure you want to delete "${subjectName}"?`)) {
        delete subjects[subjectName];
        displaySubjectInputs();
        calculateAttendance(); // Recalculate after deletion
        saveData();
    }
}

// --- Attendance Calculation and Reporting ---
function calculateAttendance() {
    const attendanceDataBody = document.getElementById('attendance-data');
    attendanceDataBody.innerHTML = '';

    let overallTotalHeld = 0;
    let overallTotalAttended = 0;

    for (const subject in subjects) {
        const totalClasses = subjects[subject].totalClasses;
        const attendedClasses = subjects[subject].attendedClasses;
        let attendancePercentage = 0;
        if (totalClasses > 0) {
            attendancePercentage = (attendedClasses / totalClasses) * 100;
        }

        overallTotalHeld += totalClasses;
        overallTotalAttended += attendedClasses;

        const row = attendanceDataBody.insertRow();
        const subjectCell = row.insertCell();
        const totalClassesCell = row.insertCell();
        const attendedClassesCell = row.insertCell();
        const percentageCell = row.insertCell();
        const statusCell = row.insertCell();
        const subjectSafeCell = row.insertCell();
        const actionCell = row.insertCell();

        subjectCell.textContent = subject;
        totalClassesCell.textContent = totalClasses;
        attendedClassesCell.textContent = attendedClasses;
        percentageCell.textContent = attendancePercentage.toFixed(2) + '%';

        let status = '';
        if (attendancePercentage >= 75) {
            status = '<span class="safe">Safe</span>';
        } else if (attendancePercentage >= 65) {
            status = '<span class="likely-detained">Likely Detained</span>';
        } else {
            status = '<span class="unsafe">Unsafe</span>';
        }
        statusCell.innerHTML = status;

        const isSubjectSafe = (totalClasses > 0) && (attendedClasses / totalClasses >= 0.25);
        subjectSafeCell.textContent = isSubjectSafe ? 'Yes' : 'No';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.onclick = () => deleteSubject(subject);
        actionCell.appendChild(deleteButton);
    }

    // Overall Report
    let overallPercentage = 0;
    if (overallTotalHeld > 0) {
        overallPercentage = (overallTotalAttended / overallTotalHeld) * 100;
    }
    document.getElementById('overall-total-held').textContent = overallTotalHeld;
    document.getElementById('overall-total-attended').textContent = overallTotalAttended;
    document.getElementById('overall-percentage').textContent = overallPercentage.toFixed(2) + '%';

    let overallStatusText = '';
    if (overallPercentage >= 75) {
        overallStatusText = '<span class="safe">Overall Safe</span>';
    } else if (overallPercentage >= 65) {
        overallStatusText = '<span class="likely-detained">Overall Likely Detained</span>';
    } else {
        overallStatusText = '<span class="unsafe">Overall Unsafe</span>';
    }
    document.getElementById('overall-status').innerHTML = overallStatusText;

    // Bunking and Attendance Info
    const canBunkElement = document.getElementById('can-bunk');
    const daysAttendedElement = document.getElementById('days-attended');

    if (overallPercentage >= 75 && overallTotalHeld > 0) {
        const allowedAbsent = Math.floor(overallTotalHeld - (0.75 * overallTotalHeld));
        canBunkElement.textContent = `You can bunk up to ${allowedAbsent} more classes while maintaining 75% attendance (approximately).`;
    } else if (overallPercentage < 75 && overallTotalHeld > 0) {
        const classesNeeded = Math.ceil((0.75 * overallTotalHeld) - overallTotalAttended);
        daysAttendedElement.textContent = `You need to attend approximately ${classesNeeded} more classes to reach 75% attendance.`;
        canBunkElement.textContent = '';
    } else {
        canBunkElement.textContent = '';
        daysAttendedElement.textContent = '';
    }
}

function printReport() {
    window.print();
}

// --- Local Storage for Data Persistence (Simulated per User) ---
function saveData() {
    if (isLoggedIn && currentUsername) {
        localStorage.setItem(`attendanceData_${currentUsername}`, JSON.stringify(subjects));
    }
}

function loadSavedData() {
    if (isLoggedIn && currentUsername) {
        const savedData = localStorage.getItem(`attendanceData_${currentUsername}`);
        if (savedData) {
            subjects = JSON.parse(savedData);
            displaySubjectInputs();
            calculateAttendance();
        }
    }
}

// Initial display (will be the login screen)￼Enter        let status = '';
        if (attendancePercentage >= 75) {
            status = '<span class="safe">Safe</span>';
        } else if (attendancePercentage >= 65) {
            status = '<span class="likely-detained">Likely Detained</span>';
        } else {
            status = '<span class="unsafe">Unsafe</span>';
        }
        statusCell.innerHTML = status;

        const isSubjectSafe = (totalClasses > 0) && (attendedClasses / totalClasses >= 0.25);
        subjectSafeCell.textContent = isSubjectSafe ? 'Yes' : 'No';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.onclick = () => deleteSubject(subject);
        actionCell.appendChild(deleteButton);
    }

    // Overall Report
    let overallPercentage = 0;
    if (overallTotalHeld > 0) {
        overallPercentage = (overallTotalAttended / overallTotalHeld) * 100;
    }
    document.getElementById('overall-total-held').textContent = overallTotalHeld;
cument.getElementById('overall-total-attended').textContent = overallTotalAttended;
    document.getElementById('overall-percentage').textContent = overallPercentage.toFixed(2) + '%';

    let overallStatusText = '';
    if (overallPercentage >= 75) {
        overallStatusText = '<span class="safe">Overall Safe</span>';
    } else if (overallPercentage >= 65) {
        overallStatusText = '<span class="likely-detained">Overall Likely Detained</span>';
    } else {
        overallStatusText = '<span class="unsafe">Overall Unsafe</span>';
    }
    document.getElementById('overall-status').innerHTML = overallStatusText;

    // Bunking and Attendance Info
    const canBunkElement = document.getElementById('can-bunk');
    const daysAttendedElement = document.getElementById('days-attended');

    if (overallPercentage >= 75 && overallTotalHeld > 0) {
        const allowedAbsent = Math.floor(overallTotalHeld - (0.75 * overallTotalHeld));
        canBunkElement.textContent = `You can bunk up to ${allowedAbsent} more classes while maintaining 75% attendance (approximately).`;
    } else if (overallPercentage < 75 && overallTotalHeld > 0) {
        const classesNeeded = Math.ceil((0.75 * overallTotalHeld) - overallTotalAttended);
        daysAttendedElement.textContent = `You need to attend approximately ${classesNeeded} more classes to reach 75% attendance.`;
        canBunkElement.textContent = '';
    } else {
        canBunkElement.textContent = '';
