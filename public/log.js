document.querySelector('#sumbit').onclick = function(event)
{
    event.preventDefault();
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    let rpass = document.querySelector('#rpassword').value;

    if(password != rpass)
    {
        alert('Password dont match')
    }
    else if (email == '' | password == '' | rpass == '')
    {
        alert('Field cant be empty')
    }
    else
    {
        firebase.auth().createUserWithEmailAndPassword(email, password);
    }
}