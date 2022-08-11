//start the quiz

//pull start button into js canvas
var startButton = document.getElementById("start-button");

//when start button is pressed, call the function setTime()

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

var timerElement = document.getElementById("timer");


function setTime() {
    var secondsLeft = 10;
    timerElement.textContent="Time: " + secondsLeft;
    var timerInterval = setInterval(function(){
        secondsLeft--;
        timerElement.textContent="Time: " + secondsLeft;
        
        if(secondsLeft === 0) {
            // sendMessage()
            timerElement.textContent = "Time's up!";
            hideQuiz();
            showScores();
            saveName();
            clearInterval(timerInterval);
        } 
        else if (timeUp === true) {
            clearInterval(timerInterval);
            timeUp = false;
        }
    }, 1000);
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

var questionArray = [questionOne, questionTwo, questionThree];



//this is the first position in the questionArray
var questionIndexPosition = 0;

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
            questionButton.addEventListener("click", function(event) {
                var elementTarget = event.target;

                if (elementTarget.textContent === questionArray[questionIndexPosition].questionCorrect){
                
                    //SHOW CORRECT/INCORRECT

                    clearQuestion();
                    clearAnswers();
                    userScore.textContent++;
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
            })
            document.getElementById('button-list').appendChild(questionButton);
        }     
}



// Here I'm working on saving the name to storage


function saveName() {

    var saveButton = document.querySelector("#save-score");
    saveButton.addEventListener("click", saveClick);
    
}

var savedScoreArray = []; 
var updatedScoreArray;

function saveClick () {
    
    var playerName = document.getElementById('input-field').value;
    var inputField = document.getElementById('input-field');
    
    if (playerName != "") {
        var lastScreenInput = document.querySelector(".just-form");
        var newScore = document.createElement('h4');
        

        newScore.textContent = playerName;
        savedScoreArray.push(playerName);
        //localStorage.setItem("playerName", playerName);
        localStorage.setItem("saved", JSON.stringify(savedScoreArray));
        updatedScoreArray = savedScoreArray;
        console.log (updatedScoreArray);
        //console.log(savedScoreArray);
        document.getElementById('saved-scores').appendChild(newScore); 
        inputField.value = "";
        lastScreenInput.style.visibility = "hidden";
    }
}

function playAgainFunction() {
    var lastScreenInput = document.querySelector(".just-form");
    hideScores();
    lastScreenInput.style.visibility = "visible";
    hideTime();      
    showIntro();      
}

function playAgain() {
    var playAgainButton = document.getElementById("play-again");
    playAgainButton.addEventListener("click", playAgainFunction);
}


//All of these are for showing/hiding the different sections


//This clears the question
function clearQuestion() {
    var question = document.getElementById('question');
    question.removeChild(question.firstChild);
}

//This clears the answer
function clearAnswers() {
    var answers = document.getElementById('button-list');
    answers.innerHTML = "";
}

function showIntro() {
    var intro = document.querySelector(".header");
    intro.style.display = "flex";
}
function hideIntro() {
    var intro = document.querySelector(".header");
    intro.style.display = "none";
}

function showQuiz() {
    var quiz = document.querySelector(".quiz-area");
    //var timer = document.querySelector(".timer-box");
    quiz.style.display = "flex";
    //timer.style.display = "flex";
}

function hideQuiz() {
    var quiz = document.querySelector(".quiz-area");
    //var timer = document.querySelector(".timer-box");
    quiz.style.display = "none";
    //timer.style.display = "none";
}

function showTime () {
    var timer = document.querySelector(".timer-box");
    timer.style.display = "flex";
}

function hideTime () {
    var timer = document.querySelector(".timer-box");
    timer.style.display = "none";
}

function showScores () {
    var scores = document.querySelector(".highscores");
    scores.style.display = "flex";
}

function hideScores () {
    var scores = document.querySelector(".highscores");
    scores.style.display = "none";
}

// This is the end of the show/hide functions











