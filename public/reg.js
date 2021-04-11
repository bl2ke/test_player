document.querySelector('#sumbit').onclick = function(event)
{
    event.preventDefault();
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error){
        let errorCode = error.code;
        let errorMessage = error.message;
        alert("Error: " + errorCode + '\n' + "Message: " + errorMessage);
        return true;
    });
    console.log("Вошёл")
    return true;
}

