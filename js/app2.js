/*-------------------------------- Constants --------------------------------*/
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
// createGameBoard()

let columnCounter = 0
let rowCounter = 0

/*---------------------------- Variables (state) ----------------------------*/
let board
let snakeHeadDirection
let foodItem


/*------------------------ Cached Element References ------------------------*/
snakeEl = document.querySelector('.snake')
boardEl = document.querySelector('.board')
rightBtn = document.querySelector('.right-btn')


/*----------------------------- Event Listeners -----------------------------*/
rightBtn.addEventListener('click', moveRight)

/*-------------------------------- Functions --------------------------------*/

function init(){
  createGameBoard()
  board = [0 ,0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]
}
init()

function moveRight(){
  currentSnakeHead = board.indexOf(1)
  board.splice(currentSnakeHead, 1, 0, 1)
  console.log(board.indexOf(1))
  console.log(board)
  // console.log(board.indexOf(1))
}