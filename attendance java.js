04.07 5:36 PM
let loggedIn = false;
let currentMobileNumber = null;
const subjects = [];

function sendOTP() {
    const mobileNumberInput = document.getElementById('username');
    const loginError = document.getElementById('login-error');
    const mobileNumber = mobileNumberInput.value.trim();

    // Basic mobile number validation (you might want more robust validation)
    if (!/^\d{10}$/.test(mobileNumber)) {
        loginError.textContent = 'Please enter a valid 10-digit mobile number.';
        return;
    }

    // In a real application, you would send the OTP to this mobile number
    // via an SMS gateway or other service.
    console.log(`Sending OTP to: ${mobileNumber}`);
    const generatedOTP = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
    sessionStorage.setItem('otp', generatedOTP); // Store OTP temporarily (not ideal for production)
    sessionStorage.setItem('mobileNumber', mobileNumber);
    currentMobileNumber = mobileNumber;

    // Hide login section and show OTP section
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('otp-section').style.display = 'block';
    document.getElementById('otp-sent-message').textContent = `OTP sent to ${mobileNumber}.`;
    loginError.textContent = ''; // Clear any previous error
}

function verifyOTP() {
    const otpInput = document.getElementById('otp');
    const otpError = document.getElementById('otp-error');
    const enteredOTP = otpInput.value.trim();
    const storedOTP = sessionStorage.getItem('otp');
    const storedMobileNumber = sessionStorage.getItem('mobileNumber');

    if (enteredOTP === storedOTP && currentMobileNumber === storedMobileNumber) {
        // OTP is valid, proceed to the main application
        loggedIn = true;
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('main-container').style.display = 'block';
        document.getElementById('welcome-message').textContent = `Welcome, Student (${storedMobileNumber})!`;
        otpError.textContent = '';
    } else {
        otpError.textContent = 'Invalid OTP. Please try again.';
    }
}

function goBackToLogin() {
    document.getElementById('otp-section').style.display = 'none';
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('otp-error').textContent = ''; // Clear OTP error
}

function addSubject() {
    const subjectNameInput = document.getElementById('subject-name');
    const subjectName = subjectNameInput.value.trim();

    if (subjectName) {
        subjects.push({ name: subjectName, totalClasses: 0, attendedClasses: 0 });
        renderSubjectList();
        subjectNameInput.value = '';
    }
}

function renderSubjectList() {
    const subjectsListDiv = document.getElementById('subjects-list');
    subjectsListDiv.innerHTML = '';
    subjects.forEach((subject, index) => {
        const subjectDiv = document.createElement('div');
        subjectDiv.classList.add('subject-item');
        subjectDiv.innerHTML = `
            <label for="total-${index}">${subject.name} - Total Classes:</label>
            <input type="number" id="total-${index}" value="${subject.totalClasses}" min="0">
            <label for="attended-${index}">Attended:</label>
            <input type="number" id="attended-${index}" value="${subject.attendedClasses}" min="0">
        `;
        subjectsListDiv.appendChild(subjectDiv);
    });
}

function calculateAttendance() {
    const attendanceDataBody = document.getElementById('attendance-data');
    attendanceDataBody.innerHTML = '';
    let overallTotalHeld = 0;
    let overallTotalAttended = 0;

    subjects.forEach((subject, index) => {
        const totalClassesInput = document.getElementById(`total-${index}`);
        const attendedClassesInput = document.getElementById(`attended-${index}`);
        const total = parseInt(totalClassesInput.value) || 0;
        const attended = parseInt(attendedClassesInput.value) || 0;
        subject.totalClasses = total;
        subject.attendedClasses = attended;

        overallTotalHeld += total;
        overallTotalAttended += attended;

        const attendancePercentage = total > 0 ? (attended / total) * 100 : 0;
        const status = attendancePercentage >= 75 ? 'Safe' : (attendancePercentage >= 65 ? 'Likely Detained' : 'Danger');
        const isSafeSubject = attendancePercentage >= 75 ? 'Yes' : 'No';

        const row = attendanceDataBody.insertRow();
        const cell1 = row.insertCell();
        const cell2 = row.insertCell();
        const cell3 = row.insertCell();
        const cell4 = row.insertCell();
        const cell5 = row.insertCell();
        const cell6 = row.insertCell();
        const cell7 = row.insertCell();

        cell1.textContent = subject.name;
        cell2.textContent = total;
        cell3.textContent = attended;
        cell4.textContent = attendancePercentage.toFixed(2) + '%';
        cell5.textContent = status;
        cell6.textContent = isSafeSubject;
        cell7.innerHTML = `<button onclick="removeSubject(${index})">Remove</button>`;
        cell5.className = status.toLowerCase().replace(' ', '-'); // Add class for styling

    });

    // Update overall report
    const overallPercentage = overallTotalHeld > 0 ? (overallTotalAttended / overallTotalHeld) * 100 : 0;
    document.getElementById('overall-total-held').textContent = overallTotalHeld;
    document.getElementById('overall-total-attended').textContent = overallTotalAttended;
    document.getElementById('overall-percentage').textContent = overallPercentage.toFixed(2) + '%';
    document.getElementById('overall-status').textContent = overallPercentage >= 75 ? 'Overall Safe' : (overallPercentage >= 65 ? 'Overall Likely Detained' : 'Overall Danger');
    document.getElementById('overall-status').className = (overallPercentage >= 75 ? 'safe' : (overallPercentage >= 65 ? 'warning' : 'danger'));

    // Update bunking info
    const canBunk = overallTotalHeld > 0 ? Math.floor(overallTotalAttended - (0.75 * overallTotalHeld)) : 0;
    document.getElementById('can-bunk').textContent = canBunk >= 0 ? `You can bunk ${canBunk} more classes and still maintain 75% attendance.` : `You need to attend ${Math.abs(canBunk)} more classes to reach 75% attendance.`;

    const daysAttended = subjects.length > 0 ? Math.ceil(overallTotalAttended / subjects.length) : 0; // Rough estimate
    document.getElementById('days-attended').textContent = `Approximately attended classes equivalent to ${daysAttended} days (assuming one class per subject per day).`;
}

function removeSubject(index) {
    subjects.splice(index, 1);
    renderSubjectList();
    calculateAttendance(); // Recalculate after removing
}

function printReport() {
    window.print();
}
