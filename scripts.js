// Setting up initial variables
const grid = document.querySelector(".grid")
const startButton = document.getElementById("start")
const scoreDisplay = document.getElementById("score")
const scoreDisplayGameOver = document.getElementById("score2")
const playerNmae = document.getElementById("playerName")
const playerName2 = document.getElementById("playerName2")
const gameOverModal = document.querySelector(".modal-gaveOver")
const btnCloseGameOver = document.getElementById("btn-closeGameOver")

let squares = []
let currentSnake = [2, 1, 0] // Starting position of the snake
let direction = 1
const sirka = 20 // with of the square
let appleIndex = 0
let score = 0
let intervalTime = 900
let speed = 0.4
let timerId = 0

// localStorage
localStorage.setItem("score", `${score}`)
localStorage.getItem


function createGameBoard() {
  //create 100 of these elements with a for loop
  for (let i = 0; i < sirka * sirka; i++) {
    //create <div> element
    const square = document.createElement("div")
    //Add styling to the <div> element
    square.classList.add("square")
    //Appending <div> element to the grid
    grid.appendChild(square)
    //push it into a new squares empty array
    squares.push(square)
  }
}

createGameBoard()
// Adding styling to each element in the "currentSnake" Array
currentSnake.forEach((index) => squares[index].classList.add("snake"))

function startGame() {
  let inputs = document.getElementById("inputField").value
  playerNmae.innerText = `Player: ${inputs[0].toUpperCase()}${inputs.slice(1, inputs.length).toLowerCase()}`
  //remove the snake
  currentSnake.forEach((index) => squares[index].classList.remove("snake"))
  //remove the apple
  squares[appleIndex].classList.remove("apple")
  clearInterval(timerId)
  currentSnake = [2, 1, 0]
  score = 0
  //re add new score to browser
  scoreDisplay.textContent = score
  direction = 1
  intervalTime = 1000
  generateApple()
  //readd the class of snake to our new currentSnake
  currentSnake.forEach((index) => squares[index].classList.add("snake"))
  timerId = setInterval(move, intervalTime)
}

function move() {
    // Checking WallCollisons
    // wall checking by scrimba & Ania
  if (
    (currentSnake[0] + sirka >= sirka * sirka && direction === sirka) || //if snake has hit bottom
    (currentSnake[0] % sirka === sirka - 1 && direction === 1) || //if snake has hit right wall
    (currentSnake[0] % sirka === 0 && direction === -1) || //if snake has hit left wall
    (currentSnake[0] - sirka < 0 && direction === -sirka) || //if snake has hit top
    squares[currentSnake[0] + direction].classList.contains("snake")
  ){
    playerName2.innerText = `${playerNmae.innerText.slice(7, playerNmae.innerText.length)}`
    scoreDisplayGameOver.innerText = `${score}`
    gameOverModal.style.display = "flex"
    return clearInterval(timerId)
  }

  //remove last element from our currentSnake array
  const tail = currentSnake.pop()
  //remove styling from last element
  squares[tail].classList.remove("snake")
  //add square in direction we are heading
  currentSnake.unshift(currentSnake[0] + direction)
  //add styling so we can see it

  //deal with snake head gets apple
  if (squares[currentSnake[0]].classList.contains("apple")) {
    //remove the class of apple
    squares[currentSnake[0]].classList.remove("apple")
    //grow our snake by adding class of snake to it
    squares[tail].classList.add("snake")
    //grow our snake array
    currentSnake.push(tail)
    //generate new apple
    generateApple()
    // generate random score max 100
    score += getRandomScore(100)
    //display our score
    scoreDisplay.textContent = score
    //speed up our snake
    clearInterval(timerId);
    intervalTime = intervalTime * speed
    timerId = setInterval(move, intervalTime)
  }

  squares[currentSnake[0]].classList.add("snake")
}

function generateApple() {
  do {
    appleIndex = Math.floor(Math.random() * squares.length)
  } while (squares[appleIndex].classList.contains("snake"))
  squares[appleIndex].classList.add("apple")
}

generateApple();

function control(e){
    switch(e.keyCode){
        case 39:
            direction = 1
            break
        case 38:
            direction = -sirka
            break
        case 37:
            direction = -1
            break
        case  40:
            direction = +sirka
            break
    }
}

function getRandomScore(max) {
    return Math.floor(Math.random() * max)
  }

document.addEventListener("keyup", control)
// startButton.addEventListener("click", startGame)


// Modal Control
const startModal = document.querySelector(".modal-start")
const restartBtn = document.getElementById("restart")
startButton.addEventListener("click", function(){
    startGame()
    startModal.style.display = "none";
})
restartBtn.addEventListener("click", function(){
    startGame()
})

btnCloseGameOver.addEventListener("click", function(){
  gameOverModal.style.display = "none"
})
