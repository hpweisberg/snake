
/*-------------------------------- Constants --------------------------------*/


/*-------------------------------- Variables --------------------------------*/


// let board = 
let board
let snakeHead
let snakeBody
let food
  
let foodBank
let topWall = 2
let rightWall = 2
let bottomWall = 2
let leftWall = 2
let score
let win, lose, pause, loction

let columnCounter = 0
let rowCounter = 0
// let sqrEl
// let snakeIdx = sqrEl.findIndex(idx => snake === 'snake')



/*------------------------ Cached Element References ------------------------*/
const boardEl = document.querySelector('.board')
let snakeEl = document.querySelector('.snake')
const foodEl = document.querySelector('.food')
const controllerEl = document.querySelector('.controller')
const controllerBtnUp = document.querySelector('.up-btn')
const controllerBtnRight = document.querySelector('.right-btn')
const controllerBtnDown = document.querySelector('.down-btn')
const controllerBtnLeft = document.querySelector('.left-btn')
const startBtn = document.querySelector('.start-btn')
const resetBtn = document.querySelector('.reset-btn')
const scoreEl = document.querySelector('.score')
const grid = document.getElementsByClassName('sqr')
// console.log(typeof controllerBtnUp)

/*----------------------------- Event Listeners -----------------------------*/
// controllerEl.addEventListener('keypress', function(evt){
//   console.log('test')
// })

// controllerBtnUp.addEventListener('click', function(evt){
//   moveUp()
//   // checkForSnakeBody()
//   // checkForWall()
//   // checkForFood()
//   // updateScoreBoard()
//   // render()
// })

const clickSqr = boardEl.addEventListener('click', evt => {
  console.log(evt.target.id)
  // console.log(sqrEl.target.id)
})

controllerBtnRight.addEventListener('click', function(evt){
  moveRight(evt)
})
// playerEl.for(function(evt){
//   console.log('testyy')
// })

/*-------------------------------- Functions --------------------------------*/
// console.log(snakeEl.getAttribute('id'))
function init(){
  board = [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  snakeHead = 1
  snakeBody = false
  food = false
  foodBank = 250

  score = 0
  createGameBoard()
  render()
}
init()

// let snakeBoardLocation = snakeEl.target.sqrEl

function render(){
  updateGameBoard()
  updateScoreBoard()
}

// function createGameBoard(){
//   board.forEach((arr, idx) =>{
//     let arrIdx = idx
//     arr.forEach((el, idx) =>{
//       squareDiv = document.createElement('div')
//       boardEl.appendChild(squareDiv).setAttribute('id', `row:${arrIdx}`)
//       squareDiv.setAttribute('class', `column:${idx}`)
//     })
//   })
// }

//! Create the game board
function createGameBoard(){
  for (let i = 0; i < 256; i++){
    sqrEl = document.createElement('div')
    sqrEl.classList.add('sqr')
    sqrEl.id = (i)
    rowCounter++
    if (i % 16 === 0){
      columnCounter++
    }
    if (rowCounter === 16){
      rowCounter = 0
    }
    // console.log(columnCounter, rowCounter)
    sqrEl.style.gridColumn = rowCounter 
    sqrEl.style.gridRow = columnCounter
    boardEl.appendChild(sqrEl)
  }
}

//! Player movment
function handleMovment(evt){
  const sqrEl = evt.target.id
  if(setTimeout){
    console.log('time out, move in same direction')
  } else{
    moveUp(sqrEl)
    moveRight(sqrEl)
    moveDown(sqrEl)
    moveLeft(sqrEl)
  }
  render ()
}

// function moveUp(){
//   // playerEl.style.gridColumn = ((playerEl.style.gridColumn) - 1)
//   // playerEl.style.grid = playerEl.style.grid[16]
//   // playerEl.getAttribute('id')
//   console.log(snakeEl.getAttribute('id'))
//   playerEl.style.gridRowStart--
//   // playerEl.setAttribute.gridRow - 16
//   // console.log('I want to move up')
//   // console.log(playerEl.style)
// }

function moveRight(idx){
  board.splice(idx, 1, snakeHead)
  // console.log(snakeEl.target.id)
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
  board.forEach((sqrEl, idx) => {
    if (moveRight()){
      board.sqrEl.snakeHead[idx] }
      console.log(board[snakeHead])
    }
  )
  
  console.log('game board is updated')
}

function updateScoreBoard(){
  console.log('scoreboard is updated')
}
