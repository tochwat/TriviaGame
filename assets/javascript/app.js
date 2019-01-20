$(document).ready(() => {

//variables to store the HTML tags
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

//on click function to make start button disappear on click 
$('#start').on('click', function() {
    $('#start').remove();
    game.createQuiz();
    $('#info').css('display', 'block');
});

$(document).on('click', '#reset', function() {
    game.resetGame();
});

//on click function for answer buttons
$(document).on('click', '.answer-button', function(e) {
    game.answerClicked(e);
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
        question: "Why did President Theodore Roosevelt establish the national forest and park systems in the early 20th century?",
        answers: [
            "To create more areas for the establishment of American Indian reservations",
            "To clear the timberlands for use as industrial areas",
            "To manage the use of resources and control industrial development in wilderness areas",
            "To stimulate development of a tourist industry to help bring revenue to the states"
        ],
        correctAnswer: "To manage the use of resources and control industrial development in wilderness areas",
        image: "assets/images/yosemite.gif"
    },
    {
        question: "What was the first national park in America?",
        answers: [
            "Death Valley",
            "Yosemite",
            "Acadia",
            "Yellowstone"
        ],
        correctAnswer: "Yellowstone",
        image: "assets/images/yellowstone.gif"
    },
    {
        question: "Through which national park does the Continental Divide not pass?",
        answers: [
            "Yellowstone",
            "Yosemite",
            "Rocky Mountain",
            "Glacier"

        ],
        correctAnswer: "Yosemite",
        image: "assets/images/yosemite2.gif"
    },
    {
        question: "Who was the sixteenth President of the United States of America?",
        answers: [
            "Abraham Lincoln",
            "John Quincy Adams",
            "Millard Fillmore",
            "James Buchanan"
        ],
        correctAnswer: "Abraham Lincoln",
        image: "assets/images/lincoln.gif"
    },
    {
        question: "Independence Day was first established as a holiday by Congress in what year?",
        answers: [
            "1853",
            "1776",
            "1938",
            "1870"
        ],
        correctAnswer: "1870",
        image: "assets/images/independence.gif"
    },
    {
        question: "Who was the first president to live in the White House?",
        answers: [
            "John Adams",
            "Thomas Jefferson",
            "George Washington",
            "James Madison"
        ],
        correctAnswer: "John Adams",
        image: "assets/images/john-adams.jpg"
    },
    {
        question: "Where was the first Fourth of July celebration with a fireworks display held?",
        answers: [
            "New York, New York",
            "Boston, Massachusetts",
            "Washington, DC",
            "Charleston, South Carolina"
        ],
        correctAnswer: "Boston, Massachusetts",
        image: "assets/images/4thofjuly.gif"
    },
    {
        question: "Who was the only President to serve more than two terms?",
        answers: [
            "Franklin D. Roosevelt",
            "George Washington",
            "Theodore Roosevelt",
            "Ulysses S. Grant"
        ],
        correctAnswer: "Franklin D. Roosevelt",
        image: "assets/images/roosevelt.gif"
    },
]




//game object to contain all off the game's functionality 
var game = {
    createQuiz: function () {
        //display the timer
        $('#timer').html("<h3>Time Remaining: <span id='countdowntimer'>20 </span> seconds</h3>");
        //start the timer
        var timeRemaining = 20;
        gameTimer = setInterval(function(){
        timeRemaining--;
        $('#countdowntimer').text(timeRemaining);
        if(timeRemaining <= 0)
            game.timeUp();
        },1000);

        
        //display the current question + answers and add the proper attributes to each answer
        $('#quiz-question').html('<h2>' + questions[currentQuestion].question + '</h2>');
        for (var i=0; i<questions[currentQuestion].answers.length; i++){
            $('#quiz-question').append('<div><button type="button" class="btn btn-primary btn-lg btn-block answer-button" id="button-' + i + '" data-name="'+ questions[currentQuestion].answers[i]+'">' + questions[currentQuestion].answers[i] + '</button></div>');
            if (questions[currentQuestion].answers[i] === questions[currentQuestion].correctAnswer){
                $('#button-'+i).attr("data-is-correct",true);
            }
        }
    },

    nextQuestion: function () {
        $('#quiz-question').html("<h2>I'm going to be the next question!!!</h2>");
        //add one to the currentQuestion variable
        currentQuestion++
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
        
        
        //clear the timer from the screen and clear the countdown with clearInterval
        $('#timer').html("");
        clearInterval(gameTimer);

        //if the answer clicked isCorrect dataset is "true" then run the a correct function, else run an incorrect function to display info and then move on to the next question
        if (e.currentTarget.dataset.isCorrect === "true"){
            $('#quiz-question').html("<h2>Correct! " + e.currentTarget.dataset.name + '</h2>');
            //append img to match the answer
            $('#quiz-question').append("<div class='answer-img-block'><img class='answer-img' src=" + questions[currentQuestion].image + "></div>");

            numCorrect++;
            console.log("Correct total: " + numCorrect);

        } else {
            $('#quiz-question').html("<h2>Incorrect!</h2>");
            $('#quiz-question').append("<h2>Correct Answer: " + questions[currentQuestion].correctAnswer + '</h2>');
            //append img to match the answer
            $('#quiz-question').append("<div class='answer-img-block'><img class='answer-img' src=" + questions[currentQuestion].image + "></div>");

            numIncorrect++;
            console.log("Incorrect total: " + numIncorrect);
        }

        //setTimeout to move to next question after 5 seconds
        setTimeout(game.nextQuestion, 5000);

    },

    timeUp: function() {
        //clear the timer from the screen and clear the countdown with clearInterval
        $('#timer').html("");
        clearInterval(gameTimer);

        //display that time is up and the correct answer
        $('#quiz-question').html("<h2>Time's up!</h2>");
        $('#quiz-question').append("<h2>" + questions[currentQuestion].correctAnswer + ' was correct.</h2>');
        //append img to match the answer
        $('#quiz-question').append("<div class='answer-img-block'><img class='answer-img' src=" + questions[currentQuestion].image + "></div>");

        numUnanswered++;
        console.log("Unanswered total: " + numUnanswered);

        //setTimeout to move to next question after 3 seconds
        setTimeout(game.nextQuestion, 3000);

    },

    showResults: function() {
        $('#quiz-question').html("<h2>Nice work! Here's the results.</h2>");
        $('#quiz-question').append("<h2>Correct Answers: " + numCorrect + "</h2>");
        $('#quiz-question').append("<h2>Incorrect Answers: " + numIncorrect + "</h2>");
        $('#quiz-question').append("<h2>Unanswered: " + numUnanswered + "</h2>");
        $('#quiz-question').append("<button id='reset' class='btn btn-primary'>Reset</button>");
    },

    resetGame: function() {
        currentQuestion = 0;
        numCorrect = 0;
        numIncorrect = 0;
        numUnanswered = 0;

        game.createQuiz();
    }

};



});