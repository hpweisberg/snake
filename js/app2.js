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
  sqrEls = document.querySelectorAll('.sqr')
}
// createGameBoard()
let columnCounter = 0
let rowCounter = 0

/*---------------------------- Variables (state) ----------------------------*/
// let board
let snakeHeadIdx
let foodItemIdx
let snakeBody = []
let chnageSnakeHeadDirection
let sqrEls
let moveInterval
let currentDirection
let boardObjs
let scoreBoard

// let foodItem


/*------------------------ Cached Element References ------------------------*/
// let snakeEl = document.querySelector('.snake')
const boardEl = document.querySelector('.board')
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
document.querySelector('body').addEventListener('keydown', changeDirection)

/*-------------------------------- Functions --------------------------------*/
init()
// let sqrEls = document.querySelectorAll('.sqr')
function init(){
  createGameBoard() 
  // snakeHeadIdx = pickRandomSnakeLocation()
  snakeHeadIdx = pickRandomSnakeLocation()
  foodItemIdx = generateFoodItem()
  currentDirection = null
  generateSqrElements()
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
    hitWall()
  }, 700);
}
function generateSqrElements(){
  boardObjs = []
  sqrEls.forEach((el, idx) => {
    let boardObj = {
      snakeHead: snakeHeadIdx === idx ? true : false,
      food: foodItemIdx === idx ? true : false,
      snakeBody: snakeBody === idx ? true : false
    }
    boardObjs.push(boardObj)
  })
  renderGameElements(boardObjs)
}

function renderGameElements(boardObjs){
  sqrEls.forEach((el, idx) => {
    if (boardObjs[idx].food){
      el.style.backgroundColor = 'red'
    } if (boardObjs[idx].snakeHead){
      // el.style.backgroundColor = 'yellowgreen'
      el.style.backgroundImage = "url('../assets/kobe.png')"
      el.style.backgroundPosition = 'center'
      el.style.backgroundSize = 'contain'
      el.style.backgroundRepeat = 'no-repeat'
    } if (boardObjs[idx].snakeBody){
      el.style.backgroundColor = 'yellow'
    }
    else if (!boardObjs[idx].snakeHead && !boardObjs[idx].food && !boardObjs[idx].snakeBody){
      el.style.backgroundColor = ''
    } 
  })
}

function changeDirection(evt){
  if (!moveInterval) {
    render()
  }
  if (evt.key === 'ArrowUp' && currentDirection != 's'){
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
    console.log(snakeBody)
    console.log('eat food')
    // snakeBody last part - 1
  }
}

function snakeBodyExtension(){
  snakeBody.forEach(el => {
    
  });
}


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
  if (currentDirection === 'w'){
    while (snakeHeadIdx === sqrEls[0, 16, 32, 48, 52]){
      console.log('Game Over')
    }
  }
}


console.log(sqrEls)