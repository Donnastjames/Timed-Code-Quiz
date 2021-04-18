// Wait 2 milliseconds after answering a question,
// so the user has time to see whether their answer was correct ... 
const PAUSE_BEFORE_MOVING_ON = 1500;
// Start with variables that are used to keep track of
// the progress taking this quiz ...

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
var timeLeftInterval = null;

var currentlyHandlingClick = false;

// The following will contain elements that I need to
// keep track of, and respond to their click events ...

var introDivElement = document.getElementById("introDiv");
var startQuizButton = document.querySelector(".start-button");

var boxQuestionElement = document.getElementById("boxQuestion");
var boxDoneWithQuizElement = document.getElementById("boxDoneWithQuiz");

var correctMsgElement = document.getElementById("boxCorrectMsg");
var incorrectMsgElement = document.getElementById("boxIncorrectMsg");

var finalScoreElement = document.querySelector(".score");
var submitButton = document.getElementById("submit");
var playerInitialsInput = document.getElementById("initials");

var msgDiv = document.getElementById("msg");
var highScorePageElement = document.getElementById("highScorePage");


// The following section will contain general helper routines ...

// https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

function onCorrectClicked() {
 // Fixed the problem of clicking too many answers before the next question loads 
  if (currentlyHandlingClick) {
  return;
  }
  currentlyHandlingClick = true;
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
  if (currentlyHandlingClick) {
    return;
  }
  currentlyHandlingClick = true;
  console.log('onIncorrectClicked()');
  // Impose a penalty for clicking an incorrect answer ...
  timeLeft = Math.max(0, timeLeft - 5);
  questionIndex += 1;
  incorrectMsgElement.style.display = "block";
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
  // If ever quiz is displaying a question, it should not
  // be displaying the introDivElement ...
  introDivElement.style.display = "none";
  // Or the "all done" box either ...
  boxDoneWithQuizElement.style.display = "none";
  // Further ...
  correctMsgElement.style.display = "none";
  incorrectMsgElement.style.display = "none";
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

  // Always make sure the Question is showing before the quiz is done ...
  boxQuestionElement.style.display = "block";
  currentlyHandlingClick = false;
}

function displayDoneWithQuiz() {
  // The timer must not show if displaying
  // "Done with Quiz" block ...
  clearInterval(timeLeftInterval);
  // introDiv must not display if the quiz is done...
  introDivElement.style.display = "none";
  // or the Question box...
  boxQuestionElement.style.display = "none";
  // Display "all done" box ...
  finalScoreElement.textContent = totalCorrectScoreCount;
  boxDoneWithQuizElement.style.display = "block";
  // Further ...
  correctMsgElement.style.display = "none";
  incorrectMsgElement.style.display = "none";
  timerElement.style.display = "none";
  currentlyHandlingClick = false;
}

// Function that calls the timer 
function countdown() {
  timeLeft = 30;
  timeLeftInterval = setInterval(function () {
    const stillTakingQuiz = (timeLeft > 0) && (0 <= questionIndex) && (questionIndex < myQuizQuestions.length);

    if (stillTakingQuiz) {
      timeLeft -= 1;
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
      // Use the ternary operator to decide whether to show 'second' or 'seconds' down below ...
      timerElement.textContent = `${timeLeft} second${timeLeft === 1 ? '' : 's'} remaining`;
    } else {
      timerElement.textContent = '';
      clearInterval(timeLeftInterval);
      timeLeftInterval = null;
      displayDoneWithQuiz();
    }
  }, 1000);
}

  function displayMessage(type, message) {
    msgDiv.textContent = message;
    msgDiv.setAttribute("class", type);
  }

  submitButton.addEventListener("click", function(event) {
    console.log('submitButton.click()'); 
    var submittedInitials = playerInitialsInput.value;
    console.log('submittedInitials:', submittedInitials);
      
    if (submittedInitials === "") {
      displayMessage("Error", "Initials cannot be blank");
    } else {
      displayMessage("Success", "Registered successfully");

      localStorage.setItem("initials", submittedInitials);
      console.log('localStorage.setItem("initials")'); 
      localStorage.setItem("score", totalCorrectScoreCount);
      console.log('localStorage.setItem("score")'); 
      displayHighScorePage();
    }
    console.log('submitButton.click() finished!');
  });

  function displayHighScorePage() {
    highScorePageElement.style.display = "block";
    boxDoneWithQuizElement.style.display = "none";
    
    var initials = localStorage.getItem("initials");
    console.log('localStorage.getItem.initials', initials);
    var score = localStorage.getItem("score");
    console.log('localStorage.getItem("score")', score);
    if(!initials) {
        return;
    }

    renderedInitialsElement = document.getElementById("renderedInitials");
    playerHighScoreElement = document.getElementById("yourScore");

    renderedInitialsElement.textContent = initials;
    playerHighScoreElement.textContent = score;
  }

// The following code will start the quiz ...
startQuizButton.addEventListener("click", displayCurrentQuestion);
startQuizButton.addEventListener("click", countdown);