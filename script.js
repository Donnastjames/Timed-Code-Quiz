// Wait 2 milliseconds after answering a question,
// so the user has time to see whether their answer was correct ... 
const PAUSE_BEFORE_MOVING_ON = 1500;

// Allow 30 seconds for the user to take the quiz ...
const TIME_ALLOWED_FOR_TAKING_QUIZ = 30; // seconds

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
var timeLeft = TIME_ALLOWED_FOR_TAKING_QUIZ;
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

var goBackAndRestartButton = document.getElementById("goBack");
var clearScoreButton = document.getElementById("clearScore");


// The following section will contain general helper routines ...

function displayOnlyThisBox(boxElement) {
  introDivElement.style.display = "none";
  boxQuestionElement.style.display = "none";
  boxDoneWithQuizElement.style.display = "none";
  highScorePageElement.style.display = "none";
  
  // When you start to display a new box,
  // You don't want to be showing either
  // the correct or incorrect message anymore ...
  correctMsgElement.style.display = "none";
  incorrectMsgElement.style.display = "none";

  boxElement.style.display = "block";
}

function showCorrectMsg() {
  correctMsgElement.style.display = "block";
  incorrectMsgElement.style.display = "none";
}

function showIncorrectMsg() {
  correctMsgElement.style.display = "none";
  incorrectMsgElement.style.display = "block";
}

function displayTimeLeft() {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
  // Use the ternary operator to decide whether to show 'second' or 'seconds' down below ...
  timerElement.textContent = `${timeLeft} second${timeLeft === 1 ? '' : 's'} remaining`;
  timerBoxElement.style.display = "block";
}

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
  totalCorrectScoreCount += 1;
  questionIndex += 1;
  showCorrectMsg();
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
  // Impose a penalty for clicking an incorrect answer ...
  timeLeft = Math.max(0, timeLeft - 5);
  questionIndex += 1;
  showIncorrectMsg();
  setTimeout(function() {
    if (questionIndex < myQuizQuestions.length) {
      displayCurrentQuestion();
    } else {
      displayDoneWithQuiz();
    }
  },
  PAUSE_BEFORE_MOVING_ON);
}

function displayIntro() {
  timeLeft = TIME_ALLOWED_FOR_TAKING_QUIZ;
  clearInterval(timeLeftInterval);
  totalCorrectScoreCount = 0;
  timeLeftInterval = null;
  questionIndex = 0;
  displayOnlyThisBox(introDivElement);
}

function displayCurrentQuestion() {
  displayOnlyThisBox(boxQuestionElement);
  displayTimeLeft();

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

  currentlyHandlingClick = false;
}

function displayDoneWithQuiz() {
  // The timeLeftInterval's function must not be called after
  // the displaying the "Done with Quiz" block ...
  clearInterval(timeLeftInterval);
  displayOnlyThisBox(boxDoneWithQuizElement);
  finalScoreElement.textContent = totalCorrectScoreCount;
  // Don't display any older initials or messages until maybe later...
  playerInitialsInput.value = '';
  msgDiv.textContent = '';
  currentlyHandlingClick = false;
}

// Function that calls the timer 
function countdown() {
  timeLeft = TIME_ALLOWED_FOR_TAKING_QUIZ;
  timeLeftInterval = setInterval(function () {
    const stillTakingQuiz = (timeLeft > 0) && (0 <= questionIndex) && (questionIndex < myQuizQuestions.length);

    if (stillTakingQuiz) {
      timeLeft -= 1;
      displayTimeLeft();
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
  var submittedInitials = playerInitialsInput.value;
    
  if (submittedInitials === "") {
    displayMessage("Error", "Initials cannot be blank");
  } else {
    localStorage.setItem("initials", submittedInitials);
    localStorage.setItem("score", totalCorrectScoreCount);
    displayHighScorePage();
  }
});

function displayHighScorePage() {
  displayOnlyThisBox(highScorePageElement);
  
  var initials = localStorage.getItem("initials");
  var score = localStorage.getItem("score");

  renderedInitialsElement = document.getElementById("renderedInitials");
  playerHighScoreElement = document.getElementById("yourScore");

  if (initials) {
    renderedInitialsElement.textContent = `Your initials: ${initials}`; 
    playerHighScoreElement.textContent = `Your score: ${score}`;
  } else {
    renderedInitialsElement.textContent = '';
    playerHighScoreElement.textContent = '';
  }
  
}

clearScoreButton.addEventListener("click", function() {
  localStorage.removeItem("initials");
  localStorage.removeItem("score");
  displayHighScorePage();
});

// The following code will start the quiz ...
startQuizButton.addEventListener("click", displayCurrentQuestion);
startQuizButton.addEventListener("click", countdown);

// The following code will re-start the quiz ...
goBackAndRestartButton.addEventListener("click", displayIntro);

