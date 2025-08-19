var name = document.getElementById('name').value;
var email = document.getElementById('email').value;
var password = document.getElementById('pass').value;
var button = document.getElementById('butn');

button.addEventListener('click', function() {
    fetch('http://localhost:3000/api/signup', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })
    })
})