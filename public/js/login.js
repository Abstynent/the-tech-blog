const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#userEmail').value.trim();
    const password = document.querySelector('#userPassword').value.trim();

    if(email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if(response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert("Incorrect email or password, please try again.");
        }
    }
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);