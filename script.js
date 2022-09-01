const words = ['seguridad', 'calidad', 'inocuidad'];
const questions = ['Se da cuando todas las personas tienen acceso físico, social y económico permanente a alimentos seguros, nutritivos y en cantidad suficiente para satisfacer sus requerimientos nutricionales y preferencias alimentarias, y así poder llevar una vida activa y saludable:', 'Conjunto de propiedades inherentes a una cosa que permite caracterizarla y valorarla con respecto a las restantes de su especie:', 'La ausencia de elementos dañinos en los alimentos, lo que garantiza un consumo seguro por parte de los humanos. Estos componentes dañinos pueden ser de carácter biológico, químico o físico:']


const wordContainer = document.getElementById('wordContainer');
const startButton = document.getElementById('startButton');
const usedLettersElement = document.getElementById('usedLetters');

let selectedWord;
let usedLetters;
let mistakes;
let hits;

const addLetter = letter => {
    const letterElement = document.createElement('span');
    letterElement.innerHTML = letter.toUpperCase();
    usedLettersElement.appendChild(letterElement);
}
const wrongLetter = () => {
    if(mistakes == 0){
        document.getElementById("ahorcado1").style.display = "none";
        document.getElementById("ahorcado2").style.display = "block";
    }
    if(mistakes == 1){
        document.getElementById("ahorcado2").style.display = "none";
        document.getElementById("ahorcado3").style.display = "block";
    }
    if(mistakes == 2){
        document.getElementById("ahorcado3").style.display = "none";
        document.getElementById("ahorcado4").style.display = "block";
    }
    if(mistakes == 3){
        document.getElementById("ahorcado4").style.display = "none";
        document.getElementById("ahorcado5").style.display = "block";
    }
    if(mistakes == 4){
        document.getElementById("ahorcado5").style.display = "none";
        document.getElementById("ahorcado6").style.display = "block";
    }
    if(mistakes == 5){
        document.getElementById("ahorcado6").style.display = "none";
        document.getElementById("ahorcado7").style.display = "block";
        window.alert("Fallaste, inténtalo nuevamente :c");
        
        endGame();
    }

    mistakes++;
}

const endGame = () => {
    document.getElementById("ahorcado7").style.display = "none";
    document.getElementById("ahorcado0").style.display = "block";
    document.removeEventListener('keydown', letterEvent);
    startButton.style.display = 'block';
    location.reload()
}

const correctLetter = letter => {
    const { children } =  wordContainer;
    for(let i = 0; i < children.length; i++) {
        if(children[i].innerHTML === letter) {
            children[i].classList.toggle('hidden');
            hits++;
        }
    }
    if(hits === selectedWord.length){
        window.alert("Acertaste, la palabra era: " + word);
        endGame();
    } 
}

const letterInput = letter => {
    if(selectedWord.includes(letter)) {
        correctLetter(letter);
    } else {
        wrongLetter();
    }
    addLetter(letter);
    usedLetters.push(letter);
};

const letterEvent = event => {
    console.log(event);
    let newLetter = event.key.toUpperCase();
    if(newLetter.match(/^[a-zñ]$/i) && !usedLetters.includes(newLetter)) {
        letterInput(newLetter);
    };
    
};

const drawWord = () => {
    selectedWord.forEach(letter => {
        const letterElement = document.createElement('span');
        letterElement.innerHTML = letter.toUpperCase();
        letterElement.classList.add('letter');
        letterElement.classList.add('hidden');
        wordContainer.appendChild(letterElement);
    });
};

const selectRandomWord = () => {
    let i = Math.floor((Math.random() * words.length));
    let word = words[i].toUpperCase();
    selectedWord = word.split('');
    document.getElementById("title").innerHTML = questions[i];
};

const drawHangMan = () => {
    document.getElementById("ahorcado0").style.display = "none";
    document.getElementById("ahorcado1").style.display = "block";
};

const startGame = () => {
    usedLetters = [];
    mistakes = 0;
    hits = 0;
    wordContainer.innerHTML = '';
    usedLettersElement.innerHTML = '';
    startButton.style.display = 'none';
    drawHangMan();
    selectRandomWord();
    drawWord();
    document.addEventListener('keypress', letterEvent);
    document.getElementById("textImput").style.display = "inline-block";
    document.getElementById("textImput").addEventListener('keypress', letterEvent);
};

startButton.addEventListener('click', startGame);