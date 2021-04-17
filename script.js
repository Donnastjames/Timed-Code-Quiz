// Wait 2 milliseconds after answering a question,
// so the user has time to see whether their answer was correct ... 
const PAUSE_BEFORE_MOVING_ON = 1500;
// Start with variables that are used to keep track of
// our progress taking this quiz ...

var questionIndex = 0;

var myQuizQuestions = [
  {
      question: "What are used to store multiple values in a single variable?",
      possibleAnswers: ["Objects", "Arrays", "Elements", "Variables"],
      correctAnswer: "Arrays",
  },
  {
      question: "What are variables that can contain many values?",
      possibleAnswers: ["Function", "Element", "Variable", "Objects"],
      correctAnswer: "Objects",
  },
  {
      question: "What is a block of code designed to perform a particular task?",
      possibleAnswers: ["Function", "Element", "Variable", "Object"],
      correctAnswer: "Function",
  },
  {
      question: "What is a container for storing data values?",
      possibleAnswers: ["Function", "Element", "Variable", "Object"],
      correctAnswer: "Variable",
  },
];

var totalCorrectScoreCount = 0;
var timerElement = document.getElementById("countdown");
var timerBoxElement = document.getElementById("timerBox");
var timeLeft = 30;

// The following will contain elements that I need to
// keep track of, and respond to their click events ...

var introDivElement = document.getElementById("introDiv");
var startQuizButton = document.querySelector(".start-button");

var boxQuestionElement = document.getElementById("boxQuestion");
var boxDoneWithQuizElement = document.getElementById("boxDoneWithQuiz");

var correctMsgElement = document.getElementById("boxCorrectMsg");
var incorrectMsgElment = document.getElementById("boxIncorrectMsg");

var finalScore = document.querySelector(".score");


// The following section will contain general helper routines ...

// https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

function onCorrectClicked() {
  console.log('onCorrectClicked()');
  totalCorrectScoreCount += 1;
  questionIndex += 1;
  correctMsgElement.style.display = "block";
  setTimeout(function () {
    if (questionIndex < myQuizQuestions.length) {
      displayCurrentQuestion();
    } else {
      displayDoneWithQuiz();
    }
  },
  PAUSE_BEFORE_MOVING_ON);
}

function onIncorrectClicked() {
  console.log('onIncorrectClicked()');
  // TODO: subtract from timer
  questionIndex += 1;
  incorrectMsgElment.style.display = "block";
  setTimeout(function() {
    if (questionIndex < myQuizQuestions.length) {
      displayCurrentQuestion();
    } else {
      displayDoneWithQuiz();
    }
  },
  PAUSE_BEFORE_MOVING_ON);
}

function introDivElement () {
    timerBoxElement.style.display = "none";
}

function displayCurrentQuestion() {
  // If ever we are displaying a question, we don't want to
  // be displaying the introDivElement ...
  introDivElement.style.display = "none";
  // And we don't want to be displaying the "all done" box either ...
  boxDoneWithQuizElement.style.display = "none";
  // Further ...
  correctMsgElement.style.display = "none";
  incorrectMsgElment.style.display = "none";
  timerBoxElement.style.display = "block";

  if (questionIndex < 0 || questionIndex >= myQuizQuestions.length) {
    throw new Error('displayCurrentQuestion() called with an index out of range:', questionIndex);
  }

  const currentQuestionObj = myQuizQuestions[questionIndex];

  removeAllChildNodes(boxQuestionElement);
  var questionTextNode = document.createTextNode(currentQuestionObj.question);
  boxQuestionElement.appendChild(questionTextNode);

  // https://stackoverflow.com/questions/48247532/create-an-array-of-buttons-javascript
  for (let i = 0; i < currentQuestionObj.possibleAnswers.length; i += 1) {
    var btn = document.createElement("button");
    var buttonTextNode = document.createTextNode(currentQuestionObj.possibleAnswers[i]);
    btn.appendChild(buttonTextNode);
    boxQuestionElement.appendChild(btn);

    if (currentQuestionObj.possibleAnswers[i] === currentQuestionObj.correctAnswer) {
      btn.addEventListener("click", onCorrectClicked);
    } else {
      btn.addEventListener("click", onIncorrectClicked);
    }
  }

  // Always make sure we are showing the Question before we're done here ...
  boxQuestionElement.style.display = "block";
}

function displayDoneWithQuiz() {
  // If we are done with our quiz, we don't want to
  // be displaying the introDivElement ...
  introDivElement.style.display = "none";
  // And we don't want to show the question box either ...
  boxQuestionElement.style.display = "none";
  // We want to display the "all done" box ...
  boxDoneWithQuizElement.style.display = "block";
  // Further ...
  correctMsgElement.style.display = "none";
  incorrectMsgElment.style.display = "none";
  timerElement.style.display = "none";
}

// Function that calls the timer 
function countdown() {
    timeLeft = 30;
    var timeInterval = setInterval(function () {
      if (timeLeft > 1) {
        timerElement.textContent = timeLeft + ' seconds remaining';
        timeLeft--;
      } else if (timeLeft === 1) {
        timerElement.textContent = timeLeft + ' second remaining';
        timeLeft--;
      } else {
        timerElement.textContent = '';
        clearInterval(timeInterval);
        displayDoneWithQuiz();
      }
      if (questionIndex > myQuizQuestions.length) {
        timerElement.textContent = '';  
        clearInterval(timeInterval);
        displayDoneWithQuiz();
      }
    }, 1000);
  }


// Function that updates the score count and saves the count to local storage
// function saveScore() {
//     console.log("saveScore");
//     localStorage.setItem("saveScore", totalCorrectScoreCount);
// }


// // Gets the stored value in local storage 
// function getSavedScore() {
//     console.log("getSavedScore");
//     var storedScores = localStorage.getItem("saveScore");
//     if (storedScores === null) {
//         totalCorrectScoreCount = 0;
//     } else {
//         totalCorrectScoreCount = storedScores;
//     }
    
//     // Display total score
//     score.textContent = storedScores;
// }


// The following code will start the quiz ...

startQuizButton.addEventListener("click", displayCurrentQuestion);
startQuizButton.addEventListener("click", countdown);