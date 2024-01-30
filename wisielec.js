for(let i=0; i<=8;i++){
    let life = document.createElement('div');
    document.getElementById('life').appendChild(life).setAttribute('class', 'lif num '+i);
}

let letters = ["A", "Ą", "B", "C", "Ć", "D", "E", "Ę", "F", "G", "H", "I", "J", "K", "L", "Ł", "M", "N", "Ń", "O", "Ó", "P", "Q", "R", "S", "Ś", "T", "U", "V", "W", "X", "Y", "Z", "Ż", "Ź"];

window.onload= consoleContent();
function consoleContent(){
    let content = '';
   // cos ='';
    for(let i=0; i<letters.length; i++){
        content = content + '<div class="letters" onclick="check('+i+')" id="num'+i+'">'+letters[i]+'</div>';
        if ((i+1) % 7 ===0)content = content+ '<div style="clear:both;"></div>';
    }
    document.getElementById('console').innerHTML= content;
    //enigmaStart()
}

let randomNumber = Math.floor(Math.random()*10);
function setCategory(){
    if(randomNumber<=5){document.getElementById('category').innerHTML='KRAJE';}
    else {
        document.getElementById('category').innerHTML='PRZYSŁOWIA';
    }
}
setCategory()

let enigma1 = ['Polska', 'Ukraina', 'Wielka Brytania'];
let enigma2 = ['Widziały gały co brały', 'Bez pracy nie ma kołaczy'];
let math1 = Math.round(Math.random() * enigma1.length);
let math2 = Math.round(Math.random() * enigma2.length);
let passwordDraw ='';

function setEnigma(){
    if(randomNumber<=5){
        passwordDraw = enigma1[math1];
    }else {passwordDraw = enigma2[math2]}
}
setEnigma()

let password = passwordDraw;
password = password.toUpperCase();
let wrongLetter = 0;
let passwordLength = password.length;


let password2 = "";
for(let i=0; i<passwordLength; i++){
    if(password.charAt(i) === " ") {
        password2 = password2 + " ";
    }else {
        password2 = password2 + "-";
    }
}
function enigmaStart(){
      document.getElementById('password').innerHTML= password2;
}
enigmaStart()



String.prototype.markPosition = function (position, mark){
    if(position>this.length -1){
        return this.toString();
    }else {
        return this.substr(0, position) + mark + this.substr(position + 1);
    }enigmaStart()
};

function check(number){
    let elementButton = 'num' + number;
    let buttonStyle = document.getElementById(elementButton).style;
    let correct = false;
    for (let i=0; i<passwordLength; i++){
        if(password.charAt(i)=== letters[number]){
            password2 = password2.markPosition(i, letters[number]);
            correct = true;
        }
    }
    if(correct===true){
        buttonStyle.background = "#003300";
        buttonStyle.color = "green";
        buttonStyle.border = "2px solid green";
        buttonStyle.cursor = "deafult";
        enigmaStart()
    }
    else {
        buttonStyle.background="#330000";
        buttonStyle.color= "red";
        buttonStyle.border= "2px solid red";
        buttonStyle.cursor= "deafult";
        document.getElementById(elementButton).setAttribute('onclick', '');

        wrongLetter++;
        document.getElementsByClassName("lif num ")[9- wrongLetter].classList.add('ded');
    }
    if(password === password2){
        document.getElementById('console').innerHTML='<p style="color: green;">WYGRANA</p>' +
        '<br/> <span class="reset"  onclick="location.reload()" >JESZCZE RAZ?</span>';
    }
    if(wrongLetter >=9){
        document.getElementById('console').innerHTML='<p style="color: red;">PRZEGRANA</p>' +
        '<br/> <span class="reset" onclick="location.reload()" >JESZCZE RAZ?</span>';
    }
}