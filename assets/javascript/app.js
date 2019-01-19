// $(document).ready(() => {

// });




//variables to store the HTML tags
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

//on click function to make start button disappear on click 
$('#start').on('click', function() {
    $('#start').remove();
    game.createQuiz();
    console.log("you have this many questions: " + questions.length);
});

//on click function for answer buttons
$(document).on('click', '.answer-button', function(e) {
    game.answerClicked(e);

    //clear the timer from the screen and clear the countdown with clearInterval
    $('#timer').html("");
    clearInterval(gameTimer);
});

//variables
var currentQuestion = 0;
var numCorrect = 0;
var numIncorrect = 0;
var numUnanswered = 0;
var gameTimer = 0;


//array of object literals to hold all of the quiz questions - 8 questions
var questions = [
    {
        question: "I am question 1",
        answers: [
            "Answer a",
            "Answer b",
            "Answer c"
        ],
        correctAnswer: "Answer a"
    },
    {
        question: "I am question 2?!",
        answers: [
            "Answer a",
            "Answer b",
            "Answer c"
        ],
        correctAnswer: "Answer b"
    }
]




//game object to contain all off the game's functionality 
var game = {
    createQuiz: function () {
        //display the timer
        $('#timer').html("<h3>Time Remaining: <span id='countdowntimer'>5 </span> seconds</h3>");
        //start the timer
        var timeRemaining = 5;
        gameTimer = setInterval(function(){
        timeRemaining--;
        $('#countdowntimer').text(timeRemaining);
        if(timeRemaining <= 0)
            game.timeUp();
        },1000);

        
        //display the current question + answers and add the proper attributes to each answer
        $('#quiz-question').html('<h2>' + questions[currentQuestion].question + '</h2>');
        for (var i=0; i<questions[currentQuestion].answers.length; i++){
            $('#quiz-question').append('<button class="answer-button" id="button-' + i + '" data-name="'+ questions[currentQuestion].answers[i]+'">' + questions[currentQuestion].answers[i] + '</button>');
            if (questions[currentQuestion].answers[i] === questions[currentQuestion].correctAnswer){
                $('#button-'+i).attr("data-is-correct",true);
            }
        }
    },

    nextQuestion: function () {
        $('#quiz-question').html("<h2>I'm going to be the next question!!!</h2>");
        //add one to the currentQuestion variable
        currentQuestion++
        console.log("The next question is "+currentQuestion);
        //if currentQuestion=questions.length then show results, else run the createQuiz function per usual
        if (currentQuestion === questions.length){
            game.showResults();
        } else {
            game.createQuiz();
        }

    },

    answerClicked: function(e) {
        console.log(e);
        console.log(e.currentTarget.dataset.name);
        console.log(e.currentTarget.dataset.isCorrect);
        
        

        //if the answer clicked isCorrect dataset is "true" then run the a correct function, else run an incorrect function to display info and then move on to the next question
        if (e.currentTarget.dataset.isCorrect === "true"){
            $('#quiz-question').html("<h2>That's right! " + e.currentTarget.dataset.name + ' is correct.</h2>');
        } else {
            $('#quiz-question').html("<h2>That's incorrect!</h2>");
            $('#quiz-question').append("<h2>" + questions[currentQuestion].correctAnswer + ' was correct.</h2>');
        }

        //setTimeout to move to next question after 3 seconds
        setTimeout(game.nextQuestion, 3000);

    },

    timeUp: function() {
        //clear the timer from the screen and clear the countdown with clearInterval
        $('#timer').html("");
        clearInterval(gameTimer);

        //display that time is up and the correct answer
        $('#quiz-question').html("<h2>Time's up!</h2>");
        $('#quiz-question').append("<h2>" + questions[currentQuestion].correctAnswer + ' was correct.</h2>');

        //setTimeout to move to next question after 3 seconds
        setTimeout(game.nextQuestion, 3000);

    },

    showResults: function() {
        $('#quiz-question').html("<h2>Nice work! Here's the results.</h2>");

    },

    resetGame: function() {

    }

};











