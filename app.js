

const qwerty = document.querySelector("#qwerty");   // keyboard div container
const phrase = document.querySelector("#phrase");   // div container for a phrase
const ul = phrase.firstElementChild;        // list containing letters of phrase

let guess_count = 0;

const start_button = document.querySelector(".btn__reset");
const start_screen = document.querySelector("#overlay");
const images = document.querySelectorAll("img");

const element = document.createElement("h1");

start_button.addEventListener('click', function() {
    start_screen.style.display = "none";
    start_button.textContent = "Start new round";
    reset();
    let letter_array = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(letter_array);

});

function reset() {
    let buttons = document.querySelectorAll(".chosen");
    guess_count = 0;

    for (let a = 0; a < images.length; a++) {
        images[a].style.display = '';
    }
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].className = '';
        buttons[i].disabled = false;

        let list_items = ul.getElementsByTagName("LI");
        if (list_items) {
        for (let i = 0; i < list_items.length; i++) {
                ul.removeChild(list_items[i]);
            }
        }
    }

    let b = document.getElementsByClassName("banner")[0];
    if (b != null) {
        start_screen.removeChild(b)
    }
}

const phrases = [
    "The sky is only the start",
    "Love courageously",
    "Float like a butterfly sting like a bee", //
    "Float like a butterfly sting like a bee", //
    "Hockey is the best sport", //
    "Aviate Navigate Communicate" //
];

var used = [];
// function for getting a random phrase from an array without duplicates
function getRandomPhraseAsArray(arr) {
    const l = arr.length;

    while(true) {
        let random = Math.floor(Math.random() * l);
        if (used.indexOf(random) === -1) {
            used.push(random);
            break;
        }
        if (used.length === l) {
            used = [];
        }
    }

    let phrase = arr[used[used.length - 1]];

    let letters = phrase.split('');
    return letters;
}

function addPhraseToDisplay (arr)  {
    for (let i = 0; i < arr.length; i++) {
        let list = document.createElement("LI");
        list.textContent = arr[i];
        ul.appendChild(list);
        list.className = "character";
        if (arr[i] !== ' ') {
            list.className += ' ' + 'letter';
        } else {
            list.classList.replace('character', 'space');
        }
    }
}

function banner(classname, banner, message) {
    start_screen.className = classname;
    let screen = document.getElementsByClassName(classname)[0];
    screen.style.display = "";
    banner.textContent = message;
    start_screen.appendChild(banner);
    banner.className = "banner";
}

qwerty.addEventListener('click', function(e) {

    let letters = document.querySelectorAll(".letter");

    if (e.target.tagName === 'BUTTON') {

        e.target.className = "chosen";
        e.target.disabled = true;

        var inside = false;

        for (let i = 0; i < letters.length; i++) {
            let inst = letters[i].textContent.toLocaleLowerCase();

            if (e.target.textContent === inst) {
                letters[i].className += " " + "show";
                inside = true;
            }
        }

        var included = document.querySelectorAll(".show");

        if (inside === false) {
            images[guess_count].style.display = "none";
            guess_count += 1;
        }

        if (guess_count === 5) {
            banner("lose", element, "You're out of guesses!!!");
        }

        if (letters.length === included.length) {
            banner("win", element, "You've guessed it!!!");
        }
    }
});