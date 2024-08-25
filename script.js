document.getElementById('togglePassword').addEventListener('click', function() {
    var passwordField = document.getElementById('password');
    var passwordType = passwordField.getAttribute('type');

    if (passwordType === 'password') {
        passwordField.setAttribute('type', 'text');
    } else {
        passwordField.setAttribute('type', 'password');
    }
});

function checkPassword() {
    var password = document.getElementById('password').value;
    var strengthMeter = document.getElementById('strengthMeter');
    var strengthFill = document.createElement('div');
    strengthFill.className = 'strength-meter-fill';
    strengthMeter.innerHTML = ''; // Clear previous fill
    strengthMeter.appendChild(strengthFill);

    let strength = 0;

    // Check length
    var length = document.getElementById('length');
    if (password.length >= 8) {
        strength += 1;
        length.style.color = 'green';
    } else {
        length.style.color = 'red';
    }

    // Check for numbers
    var numbers = document.getElementById('numbers');
    if (/\d/.test(password)) {
        strength += 1;
        numbers.style.color = 'green';
    } else {
        numbers.style.color = 'red';
    }

    // Check for lowercase letters
    var lowercase = document.getElementById('lowercase');
    if (/[a-z]/.test(password)) {
        strength += 1;
        lowercase.style.color = 'green';
    } else {
        lowercase.style.color = 'red';
    }

    // Check for uppercase letters
    var uppercase = document.getElementById('uppercase');
    if (/[A-Z]/.test(password)) {
        strength += 1;
        uppercase.style.color = 'green';
    } else {
        uppercase.style.color = 'red';
    }

    // Check for special characters
    var specialChars = document.getElementById('specialChars');
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        strength += 1;
        specialChars.style.color = 'green';
    } else {
        specialChars.style.color = 'red';
    }

    // Update the strength meter fill based on the strength score
    if (strength <= 2) {
        strengthMeter.className = 'strength-meter weak';
    } else if (strength <= 4) {
        strengthMeter.className = 'strength-meter medium';
    } else {
        strengthMeter.className = 'strength-meter strong';
    }

    // Send password to server for evaluation (this part remains unchanged)
    var data = {
        action: 'evaluate_password',
        password: password
    };

    fetch('http://localhost:8000', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        // Update strength based on response
        var strengthText = document.getElementById('strength');
        if (data.strength === 'Strong') {
            strengthText.style.color = 'green';
        } else {
            strengthText.style.color = 'red';
        }
        strengthText.textContent = `Password strength: ${data.strength}`;

        // Update time to crack based on response
        var timeToCrack = document.getElementById('time_to_crack');
        if (data.time_to_crack !== 'None') {
            timeToCrack.textContent = `Estimated time to crack: ${data.time_to_crack}`;
        } else {
            timeToCrack.textContent = '';
        }

        // Update password properties
        document.getElementById('length').textContent = `Length: ${data.properties.length}`;
        document.getElementById('numbers').textContent = `Numbers: ${data.properties.has_numbers}`;
        document.getElementById('lowercase').textContent = `Lowercase letters: ${data.properties.has_lowercase}`;
        document.getElementById('uppercase').textContent = `Uppercase letters: ${data.properties.has_uppercase}`;
        document.getElementById('specialChars').textContent = `Special characters: ${data.properties.has_special}`;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
