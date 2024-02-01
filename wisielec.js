const USER_LIFE_NUMBER = 9;
const CATEGORY_BUCKET = 10;
let letters = ['A', 'Ą', 'B', 'C', 'Ć', 'D', 'E', 'Ę', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'Ł', 'M', 'N', 'Ń', 'O', 'Ó', 'P', 'Q', 'R', 'S', 'Ś', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Ż', 'Ź'];
let enigma1 = ['Polska', 'Ukraina', 'Wielka Brytania'];
let enigma2 = ['Widziały gały co brały', 'Bez pracy nie ma kołaczy'];
let randomNumber;
let password = '';
let password2 = '';


let wrongLetter = 0;
window.onload = consoleContent();
drawHearts();
setCategory()
setEnigma()
setPassword2();

enigmaStart()

function setCategory() {
    randomNumber = Math.floor(Math.random() * CATEGORY_BUCKET);
    let categoryDiv = document.getElementById('category');
    if (randomNumber <= CATEGORY_BUCKET / 2) {
        categoryDiv.innerHTML = 'KRAJE';
    } else {
        categoryDiv.innerHTML = 'PRZYSŁOWIA';
     }
 }


function setEnigma() {
    let math1 = Math.round(Math.random() * (enigma1.length - 1));
    let math2 = Math.round(Math.random() * (enigma2.length - 1));
    let passwordDraw = '';
    if (randomNumber <= CATEGORY_BUCKET / 2) {
         passwordDraw = enigma1[math1];
    } else {
        passwordDraw = enigma2[math2]
    }
    password = passwordDraw.toUpperCase();
 }


String.prototype.markPosition = function (position, mark) {
    if (position > this.length - 1) {
        return this.toString();
    } else {
        return this.substring(0, position) + mark + this.substring(position + 1);
    }
};


function setPassword2() {
    for (let i = 0; i < password.length; i++) {
        if (password.charAt(i) === " ") {
            password2 = password2 + " ";
        } else {
            password2 = password2 + "-";
        }
     }
 }


function drawHearts() {
    for (let i = 0; i <= 8; i++) {
        let life = document.createElement('div');
        document.getElementById('life').appendChild(life).setAttribute('class', 'lif num ' + i);
    }
}

function enigmaStart() {
    document.getElementById('password').innerHTML = password2;
 }


function consoleContent() {
    let content = '';
    for (let i = 0; i < letters.length; i++) {
        content = content + '<div class="letters" onclick="check(' + i + ')" id="num' + i + '">' + letters[i] + '</div>';
        if ((i + 1) % 7 === 0) {
            content = content + '<div style="clear:both;"></div>';
        }
    }
    setConsoleContent(content);
}

function setConsoleContent(content) {
    document.getElementById('console').innerHTML = content;
}

function check(number) {
    let elementButton = document.getElementById('num' + number);
     let correct = false;
    for (let i = 0; i < password.length; i++) {
        if (password.charAt(i) === letters[number]) {
             password2 = password2.markPosition(i, letters[number]);
             correct = true;
         }
     }
    if (correct === true) {
        elementButton.classList.add("correctAnswer");
         enigmaStart()
    } else {
        elementButton.classList.add("wrongAnswer");
        elementButton.removeAttribute('onclick');

         wrongLetter++;
        document.getElementsByClassName("lif num")[USER_LIFE_NUMBER - wrongLetter].classList.add('ded');
     }
    if (password === password2) {
        setConsoleContent(generateSpan('green', 'WYGRANA'));
    }
    if (wrongLetter >= USER_LIFE_NUMBER) {
        setConsoleContent(generateSpan('red', 'PRZEGRANA'))
     }
}

function generateSpan(color, title) {
    return `<p style="color: ${color};">${title}</p><br/>
            <span class="reset" onclick="location.reload()" >JESZCZE RAZ?</span>`
}