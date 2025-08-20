var button = document.getElementById('btn');


button.addEventListener('click', function(event) {
      event.preventDefault(); 
var firstName = document.getElementById('name').value;
var email = document.getElementById('email').value;
var password = document.getElementById('pass').value;

    fetch('http://localhost:3000/api/signup', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: firstName,
            email: email,
            password: password
        })
    }).then((resp) => {
        return resp.json();
    }).then((data) => {
        console.log(data);
        console.log(data.token);
        localStorage.setItem('token', data.token);
        document.getElementById('name').value  = "";
        document.getElementById('email').value = "";
        document.getElementById('pass').value  = "";
    })
})