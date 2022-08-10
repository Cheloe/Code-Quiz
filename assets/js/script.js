//start the quiz

//pull start button into js canvas
var startButton = document.getElementById("start-button");

//when start button is pressed, call the function setTime()

startButton.addEventListener("click", function(){

    setTime();
    setScore();
    setQuestion();
    hideIntro();
    showQuiz();
})


//Timer

var timerElement = document.getElementById("timer");

function setTime() {
    var secondsLeft = 5;
    timerElement.textContent="Time: " + secondsLeft;
    var timerInterval = setInterval(function(){
        secondsLeft--;
        timerElement.textContent="Time: " + secondsLeft;

        if(secondsLeft === 0) {
            
            // sendMessage()
            timerElement.textContent = "Time's up!";
            clearInterval(timerInterval);
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

// var startButton = document.getElementById("start-button");

// //when start button is pressed, call the function setTime()

// startButton.addEventListener("click", function(){

//     setTime();
//     setScore();
// })

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
                // console.log("fire");
                // console.log(elementTarget.textContent);
                // console.log(nextQuestion.questionCorrect);
                if (elementTarget.textContent === questionArray[questionIndexPosition].questionCorrect){
                    // console.log("hello");
                    // console.log(elementTarget.textContent);
                    // console.log(nextQuestion.questionCorrect);
                    clearQuestion();
                    clearAnswers();
                    userScore.textContent++;
                    questionIndexPosition++;
                    //this is manually set to the total index length +1 
                    if (questionIndexPosition === questionArray.length) {
                        //call something to end the game
                        questionIndexPosition = 0;
                        return;
                    } else {
                    setQuestion();
                    }
                }
            })
            document.getElementById('button-list').appendChild(questionButton);
        }     
}

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
    var timer = document.querySelector(".timer-box");
    quiz.style.display = "flex";
    timer.style.display = "flex";
}

function hideQuiz() {
    var quiz = document.querySelector(".quiz-area");
    var timer = document.querySelector(".timer-box");
    quiz.style.display = "none";
    timer.style.display = "none";
}





    //Referencing position in html
    // var questionElement = getElementById ("question-text");
    // var choiceOne = getElementById ("choice-one");
    // var choiceTwo = getElementById ("choice-two");
    // var choiceThree = getElementById ("choice-three");
    // var choiceFour = getElementById ("choice-four");


    //this will fill the html elements with the corresponding values from each object (aka quiz question)
    
    // for (var i=0; i<questionArray.length; i++) {

    // } 

//when user clicks start, timer(done), score set(done), question one is injected

//if click-event target === questionCorrect, 
    //score goes up
    //some other feedback that they were correct
    //clear question
    //next question

    //else
        //feedback
        //time goes down
        //clear question
        //next question

//there could be an array of all questionObjects, and when you add a new question you concatenate it to the array

// var questionArray = [];

