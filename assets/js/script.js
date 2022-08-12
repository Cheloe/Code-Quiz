//start the quiz



//pull start button into js canvas
var startButton = document.getElementById("start-button");

//when start button is pressed, call the function setTime()
var saved = "saved";
var savedScoreArray = []; 
var scoreString = localStorage.getItem(saved);
if (scoreString != null) {
savedScoreArray = JSON.parse(scoreString);
}

//writes any saved scores to the high scores section again
writeScores();

startButton.addEventListener("click", function(){
    console.log(savedScoreArray);
    setTime();
    setScore();
    setQuestion();
    hideIntro();
    showQuiz();
    showTime();
})

//These are re-play checkers
var timeUp = false;
var replay = false;

//Timer
var timerInterval;
var timerElement = document.getElementById("timer");
var secondsLeft;

//counts down time, moves to next step at 0 seconds
function countDown(){
    secondsLeft--;
    timerElement.textContent="Time: " + secondsLeft;
    
    if(secondsLeft <= 0) {
        // sendMessage()
        timeUp = true;
        timerElement.textContent = "Time's up!";
        hideQuiz();
        showScores();
        saveName();
        clearInterval(timerInterval);
    } 
    else if (timeUp === true) {
        clearInterval(timerInterval);
        timeUp = false;
        //console.log(timeUp);
    }
}

function setTime() {
    secondsLeft = 30;
    timerElement.textContent="Time: " + secondsLeft;
    timerInterval = setInterval(countDown, 1000);
}


//Score

var userScore = document.getElementById("user-score");

var startingScore = 0;

//sets points to zero when timer starts
function setScore() {
    userScore.textContent = startingScore;
}
//need a function that adds points to score



var questionOne = {
    text:  "Which of these will listen for clicks?",
    questionAnswers: ["A method", "Cascading Style Sheets", "An event listener", "A header"],
    questionCorrect: "A method"
}

var questionTwo = {
    text: "Which of these means true equality?",
    questionAnswers: ["&&", "||", "===", "+"],
    questionCorrect: "==="
}

var questionThree = {
    text:  "Which of these languages is mostly concerned with style?",
    questionAnswers: ["CSS", "JavaScript", "French", "html"],
    questionCorrect: "CSS"
}

var questionFour = {
    text:  "HTML stands for _______ ?",
    questionAnswers: ["Holy Tamale Man Lamp", "HyperText Markup Language", "Ukraine", "Hamilton Tiffany Mary Larsen"],
    questionCorrect: "HyperText Markup Language"
}

var questionFive = {
    text:  "When a function is a property of an object it is called _____ ?",
    questionAnswers: ["a method", "a sticky comment box", "a function", "a real pill"],
    questionCorrect: "a method"
}

var questionArray = [questionOne, questionTwo, questionThree, questionFour, questionFive];

//this is the first position in the questionArray
var questionIndexPosition = 0;


//Go to next question, if time or questions run out, show score screen.
function nextStep (){
    clearQuestion();
    clearAnswers();
    
    questionIndexPosition++;
    //this is manually set to the total index length +1 
    
    if (questionIndexPosition === questionArray.length) {
        //call something to end the game
        questionIndexPosition = 0;
        timeUp = true; 
        hideQuiz();
        showScores();
        saveName();
        playAgain();
        //return;
    } else {
        setQuestion();
    }
}

//Hide Correct, calls next question ^
function hideCorrect () {
    var correct = document.getElementById('correct');
    correct.style.display = 'none';
    nextStep();
} 
  
//Hides Incorrect, calls next question ^^
function hideIncorrect () {
    var incorrect = document.getElementById('incorrect');
    incorrect.style.display = 'none';
    nextStep();
} 

/// Correct/Incorrect logic

function answerTriggers (event) {

    var correct = document.getElementById('correct');
    var incorrect = document.getElementById('incorrect');
    var elementTarget = event.target;

    if (elementTarget.textContent === questionArray[questionIndexPosition].questionCorrect){
        
        userScore.textContent++;
        correct.style.display="block";
        //SHOW CORRECT/INCORRECT
        setTimeout(hideCorrect, 700);

    } else {
        if (secondsLeft <= 10) {
          secondsLeft = 0;  
        } else {
        secondsLeft = secondsLeft - 10;
        }
        incorrect.style.display="block";
        //SHOW CORRECT/INCORRECT
        setTimeout(hideIncorrect, 700);
    }
}


//This adds quetions and answers to the page
function setQuestion() {


        console.log(questionIndexPosition);

        //This is the current position of the index in the question array.
        var nextQuestion = questionArray[questionIndexPosition];

        var questionText = document.createElement('h2');

        questionText.textContent = nextQuestion.text;

        document.getElementById('question').appendChild(questionText);

        for(var i=0; i<nextQuestion.questionAnswers.length; i++) {
            var questionButton = document.createElement('button');
            questionButton.textContent = nextQuestion.questionAnswers[i];
            questionButton.className = 'choice';
            questionButton.addEventListener("click", answerTriggers);
            document.getElementById('button-list').appendChild(questionButton);
        }     
}



// Here I'm working on saving the name to storage


function saveName() {

    var saveButton = document.querySelector("#save-score");
    saveButton.addEventListener("click", saveClick);
    
}


//var updatedScoreArray;

function saveClick () {
    
    var playerName = document.getElementById('input-field').value;
    var inputField = document.getElementById('input-field');
    var thisScore = document.getElementById ('user-score');
    var newScore = document.createElement('h4');
    newScore.textContent = playerName + " : " + thisScore.innerText + " points";

    //var score = document.getElementById("user-score").textContent;
    if (playerName != "") {
        var lastScreenInput = document.querySelector(".just-form");
        
        savedScoreArray.push(playerName);
        document.getElementById('high-scores').appendChild(newScore);
        
        //localStorage.setItem("playerName", playerName);
        localStorage.setItem(saved, JSON.stringify(savedScoreArray));
        //updatedScoreArray = savedScoreArray;
        inputField.value = "";
        lastScreenInput.style.visibility = "hidden";
        
    }
}

function writeScores (){
    if (savedScoreArray != null) {
    for(var i=0; i<savedScoreArray.length; i++) {
        var newScore = document.createElement('h4');
        document.getElementById('high-scores').appendChild(newScore); 
    }}
}

function playAgainFunction() {
    var inputField = document.getElementById('input-field');
    var lastScreenInput = document.querySelector(".just-form");
    inputField.value = "";
    hideScores();
    lastScreenInput.style.visibility = "visible";
    hideTime();      
    showIntro();      
}

function playAgain() {
    var playAgainButton = document.getElementById("play-again");
    playAgainButton.addEventListener("click", playAgainFunction);
}

var clearScoresButton = document.getElementById("clear-scores");
clearScoresButton.addEventListener("click", clearScoresFunction);

function clearScoresFunction() {
    localStorage.clear();
    var whatever = document.getElementById('high-scores');
    whatever.innerHTML = "";
    
}


    



//All of these are for showing/hiding the different sections


//clears the question
function clearQuestion() {
    var question = document.getElementById('question');
    if (question.firstChild != undefined) {
    question.removeChild(question.firstChild);
    }
}

//clears the answer
function clearAnswers() {
    var answers = document.getElementById('button-list');
    answers.innerHTML = "";
}

//shows the first page
function showIntro() {
    var intro = document.querySelector(".header");
    intro.style.display = "flex";
}

//hides the first page
function hideIntro() {
    var intro = document.querySelector(".header");
    intro.style.display = "none";
}

//shows the questions
function showQuiz() {
    var quiz = document.querySelector(".quiz-area");
    //var timer = document.querySelector(".timer-box");
    quiz.style.display = "flex";
    //timer.style.display = "flex";
}

//hides the questions
function hideQuiz() {
    var quiz = document.querySelector(".quiz-area");
    //var timer = document.querySelector(".timer-box");
    quiz.style.display = "none";
    //timer.style.display = "none";
}


//shows the time box
function showTime () {
    var timer = document.querySelector(".timer-box");
    timer.style.display = "flex";
}

//hides the time box
function hideTime () {
    var timer = document.querySelector(".timer-box");
    timer.style.display = "none";
}

//shows the scores
function showScores () {
    var scores = document.querySelector(".highscores");
    scores.style.display = "flex";
}

//hides the scores
function hideScores () {
    var scores = document.querySelector(".highscores");
    scores.style.display = "none";
}

// This is the end of the show/hide functions












