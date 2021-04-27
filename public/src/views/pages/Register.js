let Register = {
    render: async() => {
        let view =`
        <section class="auth-section">
            <form class="auth-form">
                <h2 class="auth-title">Registration</h2>
                <input id="email" class="auth-input" placeholder="email">
                <input id="password" class="auth-input" placeholder="password">
                <input id="rpassword" class="auth-input" placeholder="repeat password">
                <button id="register" class="auth-button">Register</button>
            </form>
        </section>
        `

        return view
    },

    after_render: async() => {
        document.querySelector('#register').onclick = function(event){
            event.preventDefault();
            let email = document.getElementById("email");
            let password = document.getElementById("password");
            let rpassword = document.getElementById("rpassword");

            if (email.value == '' | password.value == '' | rpassword.value == '') {
                alert ('The fields cannot be empty');
            }
            else if (password.value != rpassword.value) {
                alert('The passwords dont match');
            } 
            else{
                firebase.auth().createUserWithEmailAndPassword(email.value,password.value)
                .then(async function(regUser){
                console.log("reg")
                //let lastUser = await DBGet.getUserId();
                //await firebase.database().ref("/play_queue/" + lastUser).set({ user : email.value});
                //await firebase.database().ref('/user_count/id').set(lastUser + 1);
                window.location.href="#/";
                })
                .catch(error => alert(error.message));
            }
        }
    }

}

export default Register;