/*-------------------------------- Constants --------------------------------*/

const gameBoard = [ // X-axis - 17 / play area 15
                    // Y-axis - 14 / play area 12
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
]

/*-------------------------------- Variables --------------------------------*/
let snake = {
  head: 1, 
  body: [],
}
let food = 100
let topWall = 2
let rightWall = 2
let bottomWall = 2
let leftWall = 2
let score = 0
let win, lose, pause




/*------------------------ Cached Element References ------------------------*/
const playerEl = document.querySelector('.player')
const foodEl = document.querySelector('.food')
const controllerEl = document.querySelector('.controller')
const controllerBtnUp = document.querySelector('.up-btn')
const controllerBtnRight = document.querySelector('.right-btn')
const controllerBtnDown = document.querySelector('.down-btn')
const controllerBtnLeft = document.querySelector('.left-btn')
const startBtn = document.querySelector('.start-btn')
const resetBtn = document.querySelector('.reset-btn')
const scoreEl = document.querySelector('.score')
// console.log(typeof controllerBtnUp)

/*----------------------------- Event Listeners -----------------------------*/
// controllerEl.addEventListener('keypress', function(evt){
//   console.log('test')
// })

controllerBtnUp.addEventListener('click', function(evt){
  moveUp()
  checkForFood()
  updateScoreBoard()
  render()
})

// playerEl.for(function(evt){
//   console.log('testyy')
// })

/*-------------------------------- Functions --------------------------------*/
init()

function init(){
  snake = {
    head: 1,
    body: [],
  }
  board = null
  score = 0
  render()
}

function render(){
  updateGameBoard()
  updateScoreBoard()
}

function moveUp(){
  // playerEl.
  console.log('I want to move up')
}
function moveRight(){
  // playerEl.
  console.log('I want to move right')
}
function moveDown(){
  // playerEl.
  console.log('I want to move down')
}
function moveLeft(){
  // playerEl.
  console.log('I want to move left')
}

function checkForFood(){
  console.log('is there food here?')
}

function updateGameBoard(){
  console.log('game board is updated')
}

function updateScoreBoard(){
  console.log('scoreboard is updated')
}
