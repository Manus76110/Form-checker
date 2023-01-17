const form = document.querySelector('form');
const inputs = document.querySelectorAll
    ('input[type="text"], input[type="password"]');
const progressBar = document.getElementById("progress-bar");
let pseudo, email, password, confirmPass;

const errorDisplay = (tag, message, valid) => {
    const container = document.querySelector("." + tag + "-container");
    const span = document.querySelector("." + tag + "-container > span");

    if (!valid) {
        container.classList.add("error");
        span.textContent = message;
    } else {
        container.classList.remove("error");
        span.textContent = message
    }
}

const pseudoChecker = (value) => {
    if (value.length > 0 && (value.length < 5 || value.length > 20)
    ) {
        errorDisplay("pseudo", "Le pseudo doit faire entre 5 et 20 caractères");
        pseudo = null;

    } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
        errorDisplay("pseudo", "Le pseudo ne doit pas contenir de caractère speciaux");
        pseudo = null;
    } else {
        errorDisplay("pseudo", "", true);
        pseudo = value
    }
}

const emailChecker = (value) => {
    if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
        errorDisplay('email', "le mail n'est pas valide");
        email = null;
    } else {
        errorDisplay('email', "", true);
        email = value;
    }
}

const passwordChecker = (value) => {
    progressBar.classList = "";

    if (!value.match(
        /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
    )) {
        errorDisplay("password", "Minimum 8 caractères, une majuscule, un chiffre et un caractère special");
        progressBar.classList.add('progressRed');
        password = null;
    } else if (value.length < 12) {
        progressBar.classList.add('progressBlue');
        errorDisplay('password', "", true)
        password = value;
    } else {
        progressBar.classList.add('progressGreen');
        errorDisplay('password', "", true)
        password = value;
    }
    if (confirmPass) confirmChecker(confirmPass)
};

const confirmChecker = (value) => {
    if (value !== password) {
        errorDisplay("confirm", "Les mots de passe ne correspondent pas");
        confirmPass = false;
    } else {
        errorDisplay('confirm', "", true);
        confirmPass = true;
    }
}


inputs.forEach((input) => {
    input.addEventListener("input", (evt) => {
        switch (evt.target.id) {
            case "pseudo":
                pseudoChecker(evt.target.value)
                break;
            case "email":
                emailChecker(evt.target.value)
                break;
            case "password":
                passwordChecker(evt.target.value)
                break;
            case "confirm":
                confirmChecker(evt.target.value)
                break;
            default: nul;
        }
    });
});

form.addEventListener("submit", (evt) => {
    evt.preventDefault();

    if (pseudo && email && password && confirmPass) {
        const data = {
            pseudo: pseudo,
            email: email,
            password: password,
        };
        console.log(data);

        inputs.forEach((input) => (input.value = ""));
        progressBar.classList = "";

        pseudo = null;
        email = null;
        password = null;
        confirmPass = null;

        alert('Inscription validée !')
    } else {
        alert("Veuillez remplir correctement les champs s'il vous plait")
    }
})