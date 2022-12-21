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
    if (columnCounter === 1){
      sqrEl.classList.add ('nWall')
    }
    if (columnCounter === 16){
      sqrEl.classList.add ('sWall')
    }
    if (rowCounter === 1){
      sqrEl.classList.add ('wWall')
    }
    if (rowCounter === 0){
      sqrEl.classList.add ('eWall')
    }
    // console.log(columnCounter)
  }
  sqrEls = document.querySelectorAll('.sqr')
  // wallEl
}
// createGameBoard()
let columnCounter = 0
let rowCounter = 0

/*---------------------------- Variables (state) ----------------------------*/
// let board
let snakeHeadIdx
let foodItemIdx
let snakeBody
let chnageSnakeHeadDirection
let sqrEls
let moveInterval
let currentDirection
let boardObjs
let scoreBoard = 0
let leftWallEl = [0, 16, 32, 48, 52, 64, 80, 96, 112, 128, 144, 160, 176, 192, 208, 224, 240]
let northWallEl = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
let speedVal = 0

// let foodItem


/*------------------------ Cached Element References ------------------------*/
// let snakeEl = document.querySelector('.snake')
const boardEl = document.querySelector('.board')
const controllerEl = document.querySelector('.controller')
const rightBtn = document.querySelector('.right-btn')
const upBtn = document.querySelector('.up-btn')
const downBtn = document.querySelector('.down-btn')
const leftBtn = document.querySelector('.left-btn')
const resetBtn = document.querySelector('.rest-btn')
const scoreEl = document.querySelector('.score-board')


/*----------------------------- Event Listeners -----------------------------*/
// sqrEls.forEach(function(sqr){
//   controllerEl.addEventListener('click', handleClick)
// })

// controllerEl.addEventListener('click', function(evt){
//   handleClick(evt.target)
// })
// rightBtn.addEventListener('click', moveRight)
// leftBtn.addEventListener('click', moveLeft)
document.querySelector('body').addEventListener('keydown', changeDirection)
document.querySelector('.controller').addEventListener('click', changeDirection)
resetBtn.addEventListener('click', reset)
// controllerEl.addEventListener('click', function(evt){
//   if (evt.target(rightBtn)){
//     console.log('right click')
//   }
// })


/*-------------------------------- Functions --------------------------------*/
init()
// let sqrEls = document.querySelectorAll('.sqr')
function init(){
  createGameBoard() 
  // snakeHeadIdx = pickRandomSnakeLocation()
  snakeHeadIdx = pickRandomSnakeLocation()
  foodItemIdx = generateFoodItem()
  currentDirection = null
  snakeBody = []
  generateSqrElements()
  incrementScoreBoard()
}

function render(){
  // updateGameBoard()
  moveInterval = setInterval(() => {
    // changeDirection()
    moveSnakeHead()
    console.log(snakeHeadIdx, 'snakeheadidx')
    console.log(currentDirection, 'currentDir')
    generateSqrElements()
    checkForFood()
    crashDetection()
    incrementScoreBoard()
    changeSpeed()
    // hitWall()
    snakeBodyExtension()
    console.log(boardObjs[snakeHeadIdx].snakeBod.length)

  }, 1000);
}
function generateSqrElements(){
  boardObjs = []
  sqrEls.forEach((el, idx) => {
    let boardObj = {
      snakeHead: snakeHeadIdx === idx ? true : false,
      food: foodItemIdx === idx ? true : false,
      snakeBod: snakeBody.includes(idx) ? true : false
    }
    boardObjs.push(boardObj)
  })
  renderGameElements(boardObjs)
}

function renderGameElements(boardObjs){
  sqrEls.forEach((el, idx) => {
    if (boardObjs[idx].food){
      el.style.backgroundImage = "url('../assets/ball.png')"
      el.style.backgroundPosition = 'center'
      el.style.backgroundSize = 'cover'
      el.style.backgroundRepeat = 'no-repeat'
    } if (boardObjs[idx].snakeHead){
      // el.style.backgroundColor = 'yellowgreen'
      el.style.backgroundImage = "url('../assets/kobe.png')"
      el.style.backgroundPosition = 'center'
      el.style.backgroundSize = 'cover'
      el.style.backgroundRepeat = 'no-repeat'
    } else if (boardObjs[idx].snakeBod){
      el.style.backgroundImage = "url('../assets/trophy-ball.png')"
      el.style.backgroundPosition = 'center'
      el.style.backgroundSize = 'cover'
      el.style.backgroundRepeat = 'no-repeat'
    }
    else if (!boardObjs[idx].snakeHead && !boardObjs[idx].food && !boardObjs[idx].snakeBody){
      el.style.backgroundColor = ''
      el.style.backgroundImage = ''
      el.style.backgroundPosition = 'center'
      el.style.backgroundSize = 'cover'
      el.style.backgroundRepeat = 'no-repeat'
    } 
  })
}

function changeDirection(evt){
  if (!moveInterval) {
    render()
    console.log(evt)
  }
  if (evt.key === 'ArrowUp' && currentDirection != 's' || evt.target.id === upBtn && currentDirection != 's'){
    currentDirection = 'n'
    console.log('up is pressed')
  } else if (evt.key === 'ArrowRight' && currentDirection != 'w'){
    currentDirection = 'e'
    console.log('right is pressed')
  } else if (evt.key === 'ArrowDown' && currentDirection != 'n'){
    currentDirection = 's'
    console.log('down is pressed')
  } else if (evt.key === 'ArrowLeft' && currentDirection != 'e'){
    currentDirection = 'w'
    console.log('left is pressed')
  }
}

// function checkForBtnClick(evt){
//   if (rightBtn){

//   }
// }

function moveSnakeHead(){
  if (currentDirection === 'n'){
    snakeHeadIdx = snakeHeadIdx - 16
  } if (currentDirection === 'e'){
    snakeHeadIdx = snakeHeadIdx + 1
  } if (currentDirection === 's'){
    snakeHeadIdx = snakeHeadIdx + 16
  } if (currentDirection === 'w'){
    snakeHeadIdx = snakeHeadIdx - 1
  } 
  hitWall()
}

function pickRandomSnakeLocation(){
  return Math.floor(Math.random() * sqrEls.length)
}

function generateFoodItem(){
  return Math.floor(Math.random() * sqrEls.length)
}

function checkForFood(){
  
  if (snakeHeadIdx === foodItemIdx){
    snakeBody.push(1)
    foodItemIdx = generateFoodItem()
    // console.log(snakeBody)
    console.log('eat food')
    // snakeBody last part - 1
  }
}

function snakeBodyExtension(){
    if (snakeBody.length) {
      snakeBody.unshift(snakeHeadIdx)
      snakeBody.pop()
    }
    // console.log(snakeBody)
  }

  function crashDetection(){
    if (boardObjs[snakeHeadIdx].snakeBod) {
        console.log('crash!!')
        endGame()
    }
  }
  
  function incrementScoreBoard(){
    scoreBoard = snakeBody.length
    scoreEl.textContent = `${scoreBoard}`  
  }

  function changeSpeed(){
    if (scoreBoard < 5){
      speedVal === 1000
    }
  }
  console.log(speedVal)

console.log(boardObjs[snakeHeadIdx].snakeBod.length)

function moveRight(){
  // snakeEl = board.indexOf(1)
  // board.splice(snakeEl, 1, 0, 1)
  // board.pop()
  // console.log(board)
  // // console.log(board.indexOf(1))
  // render()
  // console.log(board.indexOf(1))
}
// console.log(board.indexOf(1))

// console.log(snakeEl)

function moveLeft(){
  // snakeEl = board.indexOf(1)
  // board.splice(snakeEl, 1, 1, 0,)
  // board.shift()
  // console.log(board)
  // // console.log(board.indexOf(1))
  // render()
  // console.log(board.indexOf(1))
}

function hitWall(){
  if (snakeHeadIdx < 0 || snakeHeadIdx > 255){
    // console.log(sqrEls[snakeHeadIdx].classList.contains('nWall'))
    console.log(snakeHeadIdx)
    // boardEl.style.backgroundColor = 'red'
    endGame()
  } if (sqrEls[snakeHeadIdx+1].classList.contains('wWall')) {
    setTimeout(() => {
      if (currentDirection === 'e') {
        console.log('did it wokr?')
        endGame()
      }
    }, "900")
  } if (sqrEls[snakeHeadIdx-1].classList.contains('eWall')) {
    setTimeout(() => {
      if (currentDirection === 'w') {
        console.log('did it wokr?')
        endGame()
      }
    }, "900")
  }
}
// }

function reset(){
  snakeHeadIdx = pickRandomSnakeLocation()
  foodItemIdx = generateFoodItem()
  currentDirection = null
  snakeBody = []
  generateSqrElements()
  boardEl.style.backgroundColor = 'rgb(85,37,130)'
}

function endGame(){
  setInterval = null
  currentDirection = null
  boardEl.style.backgroundColor = 'red'
  clearInterval()
  console.log('play again?')
  
}

// moveInterval = setInterval(() => {
//   // changeDirection()
//   moveSnakeHead()
//   console.log(snakeHeadIdx, 'snakeheadidx')
//   console.log(currentDirection, 'currentDir')
//   generateSqrElements()
//   checkForFood()
//   crashDetection()
//   // hitWall()
//   snakeBodyExtension()
// }, 1000);


// console.log(sqrEls)