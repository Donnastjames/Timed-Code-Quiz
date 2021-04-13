// //var container = document.querySelector(".container");

// container.addEventListener("click", function(event) {
//   var element = event.target;

//   // TODO: Complete function
//   if (element.matches(".box")) {
//     if(element.dataset.state === "hidden"){
//       element.dataset.state = "visible";
//       element.textContent = element.dataset.number;
//     }
//     else {
//       element.dataset.state = "hidden";
//       element.textContent = "";
//     }
//   }
// }); 

var container2 = document.querySelector(".container2");

var startQuizButton = document.querySelector(".start-button");
var answerButton = document.getElementById('.questions');

var timerElement = document.getElementById('countdown');
var mainElement = document.getElementById('main');


// This is the start button that begins the
// quiz and the countdown
startQuizButton.addEventListener("click", function(event) {
    console.log('START: startQuizButton.click()');
    var firstDivElement = document.getElementById('firstDiv');
    var firstQuestion = document.getElementById('firstQuestion');

    firstDivElement.style.display = 'none';
    firstQuestion.style.display = 'block';
    // var element = event.target;

    // if (element.matches(".container")) {
    //     if (element.dataset.state === "visible") {
    //         element.dataset.state = "hidden";
    //     }
    // }
    console.log('END: startQuizButton.click()');

    // Timer that counts down from 60 seconds

    console.log('START: countdown()');
    var timeLeft = 60;

    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {
        // As long as the `timeLeft` is greater than 1
        if (timeLeft > 1) {
        // Set the `textContent` of `timerElement` to show the remaining seconds
        timerElement.textContent = timeLeft + ' seconds remaining';
        // Decrement `timeLeft` by 1
        timeLeft--;
        } else if (timeLeft === 1) {
        // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
        timerElement.textContent = timeLeft + ' second remaining';
        timeLeft--;
        } else {
        // Once `timeLeft` gets to 0, set `timerEl` to an empty string
        timerElement.textContent = '';
        // Use `clearInterval()` to stop the timer
        clearInterval(timeInterval);
        // Call the `displayMessage()` function
        //displayMessage();
        }
        console.log('END: startcountdown()');
    }, 1000);
})