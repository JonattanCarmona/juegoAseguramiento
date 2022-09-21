const words = ['calidad', 'inocuidad', 'poes', 'bpm', 'desinfectacion', 'desinfestacion', 'contaminacion', 'limpieza', 'plagas', 'suplementacion', 'complementacion', 'ingrediente', 'nutriente','restitucion', 'rotulacion', 'gluten', 'envase'];
const questions = ['Conjunto de caracteristicas intrinsecas y extrinsicas de un producto:', 'Es la seguridad de que no ocrurrirá una lesion o daño al consumir un alimento:', 'Siglas para: Procedimientos operativos estandarizados de sanitizacion', 'Siglas para: Buenas practicas de manofactura', 'Palabra que significa: Reducción o eliminación del numero de microorganismos mediante agentes Quimicos o métodos físicos', 'Palabra que significa: Eliminacion de plagas',
'Palabra para: la presencia de microorganismos, virus y/o parásitos, sustancias extrañas o deletéreas de origen mineral, orgánico o biológico, sustancias radioactivas y/o sustancias tóxicas en cantidades superiores a las permitidas por las normas vigentes, o que se presuman nocivas para la salud. La presencia de cualquier tipo de suciedad, restos o excrementos', 'Palabra para: la eliminación de tierra, residuos de alimentos, polvo, grasa u otra materia objetable', 'Palabra para: insectos, roedores, pájaros y otras especies menores capaces de contaminar directa o indirectamente los alimentos.', 'Palabra para: Es la adición de nutrientes a la alimentación, con el fin de producir un efecto nutricional saludable o fisiológico característico', 'Palabra para:  La adición de nutrientes a un alimento que carece de ellos o que los contiene sólo en cantidades mínimas con el propósito de producir un efecto nutricional; la complementación comprende los conceptos de adición, enriquecimiento o fortificación y suplementación, según el porcentaje del nutriente agregado, basado en las Dosis Diarias de Referencia y por porción de consumo habitual', 'Palabra para:  Cualquier sustancia, incluidos los aditivos, que se emplee en la fabricación o preparación de un alimento y esté presente en el producto final, aunque sea en forma modificada', 'Palabra para:  Cualquier sustancia normalmente consumida como un constituyente de un alimento, y que es necesaria para el crecimiento, desarrollo y mantenimiento normal del organismo o cuya deficiencia hace que se produzcan cambios bioquímicos o fisiológicos característicos', 'Palabra para: La adición a un alimento, de uno o más nutrientes, que se han perdido en el curso del proceso de fabricación, de almacenamiento y manipulación, en cantidades tales que dan lugar a la recuperación de tales pérdidas', 'Palabra para: Conjunto de inscripciones, leyendas o ilustraciones contenidas en el rótulo que informan acerca de las características de un producto alimenticio', 'Palabra para: fracción proteínica del trigo, centeno, cebada, avena o sus variedades híbridas y derivados de los mismos, que algunas personas no toleran y que es insoluble en agua y en 0,5M NaCI', 'Palabra para: cualquier recipiente que contenga alimentos, que los cubra total o parcialmente']


const wordContainer = document.getElementById('wordContainer');
const startButton = document.getElementById('startButton');
const usedLettersElement = document.getElementById('usedLetters');
let inputtext = document.getElementById("textInput");

let selectedWord;
let usedLetters;
let mistakes;
let hits;
let word;

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
    let newLetter = event.key.toUpperCase();
    if(newLetter.match(/^[a-zñ]$/i) && !usedLetters.includes(newLetter)) {
        letterInput(newLetter);
    };
};

const letterEvent2 = event => {
    let newLetter = event.data.toUpperCase();
    if (newLetter.match(/^[a-zñ]$/i) && !usedLetters.includes(newLetter)) {
        letterInput(newLetter);
        inputtext.value = '';
        
    };
    inputtext.value = '';
    
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
    word = words[i].toUpperCase();
    
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
    document.addEventListener('keydown', letterEvent);
    document.getElementById("textInput").style.display = "inline-block";
    
    inputtext.addEventListener('input', letterEvent2);
    inputtext.addEventListener('textInput', letterEvent2);
};

startButton.addEventListener('click', startGame);