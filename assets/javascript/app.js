// $(document).ready(() => {

// });




//variables to store the HTML tags
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

//on click function to make start button disappear on click 
$('#start').on('click', function() {
    $('#start').remove();
    createQuiz();

});

//on click function for answer buttons
$(document).on('click', '.answer-button', function(e) {
    answerClicked(e);
});

//variables
var currentQuestion = 0;



//array of object literals to hold all of the quiz questions
var questions = [
    {
        question: "I am a question?",
        answers: [
            "Answer a",
            "Answer b",
            "Answer c"
        ],
        correctAnswer: "Answer a"
    },
    {
        question: "I am another question?!",
        answers: [
            "Answer a",
            "Answer b",
            "Answer c"
        ],
        correctAnswer: "Answer b"
    }
]


function createQuiz() {

    $('#quiz-question').html('<h2>' + questions[currentQuestion].question + '</h2>');
    for (var i=0; i<questions[currentQuestion].answers.length; i++){
        $('#quiz-question').append('<button class="answer-button" id="button-' + i + '" data-name="'+ questions[currentQuestion].answers[i]+'">' + questions[currentQuestion].answers[i] + '</button>');
        if (questions[currentQuestion].answers[i] === questions[currentQuestion].correctAnswer){
            $('#button-'+i).attr("data-is-correct",true);
        }
    }
}

function answerClicked(e) {
    console.log(e);
    console.log(e.currentTarget.dataset.name);
    console.log(e.currentTarget.dataset.isCorrect);
    
    // if ()
}




