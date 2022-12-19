/*-------------------------------- Constants --------------------------------*/
//! Create the game board
function createGameBoard(){
  for (let i = 0; i < 256; i++){
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
    // console.log(columnCounter, rowCounter)
    sqrEl.style.gridColumn = rowCounter 
    sqrEl.style.gridRow = columnCounter
    boardEl.appendChild(sqrEl)
  }
}
// createGameBoard()
let snakeHead = 1
let columnCounter = 0
let rowCounter = 0

/*---------------------------- Variables (state) ----------------------------*/
let board
let snakeHeadDirection
let foodItem


/*------------------------ Cached Element References ------------------------*/
let snakeEl = document.querySelector('.snake')
const boardEl = document.querySelector('.board')
const sqrEls = document.querySelectorAll('.sqr')
const controllerEl = document.querySelector('.controller')
const rightBtn = document.querySelector('.right-btn')
const leftBtn = document.querySelector('.left-btn')


/*----------------------------- Event Listeners -----------------------------*/
// sqrEls.forEach(function(sqr){
//   controllerEl.addEventListener('click', handleClick)
// })

// controllerEl.addEventListener('click', function(evt){
//   handleClick(evt.target)
// })
rightBtn.addEventListener('click', moveRight)
leftBtn.addEventListener('click', moveLeft)

/*-------------------------------- Functions --------------------------------*/

function init(){
  createGameBoard() 
  board = [0 ,0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  // for (let i = 0; i < board.length; i++){
  //   if (board[i] === 1){
  //     // console.log(board[i])
  //   }
  // }
  // snakeHead = board.indexOf(1)
  // board[]
  // renderSnake() 
  console.log(snakeEl)
}
init()

function render(){
  // updateGameBoard()
}

// function renderSnake(){
//   board.forEach((element, idx) => {
//     if (element === 1){
//       snakeEl = sqrEls[idx]
//       console.log([idx])
//     }
//   });
// }

// function updateGameBoard(){
  
//   sqrEls.forEach((element, index) => {
//     if (element === 1){
//       sqrEls[index].classList.add('.snake')
//     }
//   });
  // console.log(snakeEl)
// }


function moveRight(){
  snakeEl = board.indexOf(1)
  board.splice(snakeEl, 1, 0, 1)
  board.pop()
  console.log(board)
  // console.log(board.indexOf(1))
  render()
  console.log(board.indexOf(1))
}
console.log(board.indexOf(1))

// console.log(snakeEl)

function moveLeft(){
  snakeEl = board.indexOf(1)
  board.splice(snakeEl, 1, 1, 0,)
  board.shift()
  console.log(board)
  // console.log(board.indexOf(1))
  render()
  console.log(board.indexOf(1))
}