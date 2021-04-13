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

const container2 = document.querySelector(".container2");

const startQuizButton = document.querySelector(".start-button");
const answerButton = document.getElementById('.questions');

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
})