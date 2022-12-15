/*-------------------------------- Constants --------------------------------*/


/*-------------------------------- Variables --------------------------------*/

let snake = {
  head: 1, 
  body: [],
}

let gameBoard = [ // X-axis - 17 / play area 15
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

let food = 100
let topWall = 2
let rightWall = 2
let bottomWall = 2
let leftWall = 2
let score = 0
let win, lose, pause

let columnCounter = 0
let rowCounter = -1


/*------------------------ Cached Element References ------------------------*/
const boardEl = document.querySelector('.board')
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
  checkForSnakeBody()
  checkForWall()
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
  // boardEl = null
  score = 0
  render()
}

function render(){
  updateGameBoard()
  updateScoreBoard()
}

for (let i = 0; i < 255; i++){
  let sqrEl = document.createElement('div')
  sqrEl.classList.add('sqr')
  sqrEl.id = (i)
  rowCounter++
  if (i % 16 === 0){
    columnCounter++
  }
  if (rowCounter === 16){
    rowCounter = 0
  }
  console.log(columnCounter, rowCounter)
  sqrEl.style.gridColumn = rowCounter 
  sqrEl.style.gridRow =  columnCounter
  boardEl.appendChild(sqrEl)
}


function handleMovment(){
  if(setTimeout){
    console.log('time out, move in same direction')
  } else{
    moveUp()
    moveRight()
    moveDown()
    moveLeft()
  }
  render()
}

function moveUp(){
  playerEl.
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

function checkForSnakeBody(){
  console.log('is there a snake body here?')
}

function checkForWall(){
  console.log('is there a wall here?')
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
