//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let highScoresButton = document.getElementById("highScores");
let saveButton = document.getElementById("save");
let lbcontainer = document.querySelector(".leader-board-container");
let clear = document.getElementById("clear");
let returnScreen = document.getElementById("return-screen");
let scoreList = document.querySelector(".highScoresList");

let initialInput;
let questionCount;
let scoreCount = 0;
let count = 75;
let countdown;

//Questions and Options array
const quizArray = [
  {
    id: "0",
    question: "What is not a commonly used data type?",
    options: ["strings", "booleans", "alerts","numbers"],
    correct: "alerts",
  },
  {
    id: "1",
    question: "What is the condition in an if/else statement enclosed with?",
    options: ["quotes", "curly brackets", "parenthesis", "square brackets"],
    correct: "parenthesis",
  },
  {
    id: "2",
    question: "In JavaScript, what can arrays store?",
    options: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    correct: "all of the above",
  },
  {
    id: "3",
    question: "What do string values need to be enclosed with when being assigned to variables?",
    options: ["commas", "curly brackets", "quotes", "parenthesis"],
    correct: "quotes",
  },
  {
    id: "4",
    question: "What useful tool is used during development and debugging for printing content to the debugger?",
    options: ["JavaScript", "terminal/bash", "for loops", "console.log"],
    correct: "console.log",
  },
];

//Save Score
save.addEventListener("click", (event) => {
  event.preventDefault();

  scoreContainer.classList.add("hide");
  lbcontainer.classList.remove("hide");

  initialInput = document.querySelector("#initials").value;
  localStorage.setItem("Initials",initialInput);
  localStorage.setItem("Score",scoreCount);

  // Create & display list
  let initials = localStorage.getItem("Initials");
  let score = localStorage.getItem("Score")
  let scoreListEl = document.createElement("li");
  scoreListEl.textContent = initials + " ~ " + score;
  scoreList.appendChild(scoreListEl);

});

//Clear High Scores
clear.addEventListener("click", () => {
  localStorage.clear();
  scoreList.textContent = "";
});

//Return Home
returnScreen.addEventListener("click", () => {
  startScreen.classList.remove("hide");
  lbcontainer.classList.add("hide");
});

//Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    //increment questionCount
    questionCount += 1;
    
    //if last question
    if (questionCount == quizArray.length) {
      //hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      
      //user score
      userScore.innerHTML =
        "Final Score: " + scoreCount;
    } 
    else if(count == 0) {
      return;
    }
    else {
      //display questionCount
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      
      //display quiz
      quizDisplay(questionCount);
      clearInterval(countdown);
      timerDisplay();
    }
  })
);

//Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  
  //Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });

  //display current question card
  quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
  //randomly sort questions
  quizArray.sort(() => Math.random() - 0.5);
  //generate quiz
  for (let i of quizArray) {
    //randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    
    //question number
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
    
    //question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    
    //options
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");
  
  //if user clicked answer == correct option stored in object
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    count-=10;
    
    //For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }
  //clear interval(stop timer)
  // clearInterval(countdown);
  
  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
}

//initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 75;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

//when user click on start button
highScoresButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  lbcontainer.classList.remove("hide");
  initial();
});

//when user click on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

//hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};

