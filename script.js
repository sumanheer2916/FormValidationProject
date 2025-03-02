document.getElementById("signupForm")?.addEventListener("submit", function(event) {
    event.preventDefault();

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let contact = document.getElementById("contact").value.trim();

    let isValid = true;

    if (!validateEmail(email)) {
        showError("email", "Invalid email format.");
        isValid = false;
    } else if (localStorage.getItem(email)) {
        showError("email", "Email already registered.");
        isValid = false;
    } else {
        removeError("email");
    }

    if (!validatePassword(password)) {
        showError("password", "Weak password! Use 8+ chars, uppercase, lowercase, number & symbol.");
        isValid = false;
    } else {
        removeError("password");
    }

    if (!validateContact(contact)) {
        showError("contact", "Invalid contact number! Include country code (e.g., +91).");
        isValid = false;
    } else {
        removeError("contact");
    }

    if (isValid) {
        localStorage.setItem(email, JSON.stringify({ email, password, contact }));
        alert("Signup successful! 🎉 Redirecting...");
        window.location.href = "login.html";
    }
});

document.getElementById("loginForm")?.addEventListener("submit", function(event) {
    event.preventDefault();

    let email = document.getElementById("loginEmail").value.trim();
    let password = document.getElementById("loginPassword").value.trim();

    let userData = localStorage.getItem(email);

    if (!userData) {
        showError("loginEmail", "Email not registered.");
    } else {
        let user = JSON.parse(userData);

        if (user.password !== password) {
            showError("loginPassword", "Incorrect password.");
        } else {
            sessionStorage.setItem("loggedInUser", email);
            alert("Login successful! 🎉 Redirecting to Dashboard...");
            window.location.href = "dashboard.html";
        }
    }
});

function validateEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

function validatePassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(password);
}

function validateContact(contact) {
    return /^\+\d{1,3}\d{10}$/.test(contact);
}

function showError(inputId, message) {
    document.getElementById(inputId).nextElementSibling.textContent = message;
}

function removeError(inputId) {
    document.getElementById(inputId).nextElementSibling.textContent = "";
}
