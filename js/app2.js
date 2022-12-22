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
let speedVal = 1000

// let foodItem


/*------------------------ Cached Element References ------------------------*/
// let snakeEl = document.querySelector('.snake')
const boardEl = document.querySelector('.board')
const controllerEl = document.querySelector('.controller')
const rightBtn = document.getElementById('.right-btn')
const upBtn = document.getElementById('.up-btn')
const downBtn = document.getElementById('.down-btn')
const leftBtn = document.getElementById('.left-btn')
const resetBtn = document.querySelector('.rest-btn')
const scoreEl = document.querySelector('.score-board')
const ref = document.querySelector('.ref')
const win = document.querySelector('.win')

const foulWhistle = new Audio('../assets/referee-whistle-blow.wav')
const swishSound = new Audio('../assets/swish-noise.mp3')


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
document.getElementById('up-btn').addEventListener('click', changeDirection)
document.getElementById('right-btn').addEventListener('click', changeDirection)
document.getElementById('down-btn').addEventListener('click', changeDirection)
document.getElementById('left-btn').addEventListener('click', changeDirection)
resetBtn.addEventListener('click', reset)
// controllerEl.addEventListener('click', function(evt){
//   if (evt.target(rightBtn)){
//     console.log('right click')
//   }
// })


/*-------------------------------- Functions --------------------------------*/
init()

function init(){
  createGameBoard() 
  if (currentDirection === null){
    clearInterval(moveInterval)
  }
  snakeHeadIdx = pickRandomSnakeLocation()
  foodItemIdx = generateFoodItem()
  currentDirection = null
  snakeBody = []
  ref.style.display = 'none'
  win.style.display = 'none'
  generateSqrElements()
  incrementScoreBoard()
}

function render(){
  console.log(speedVal)
  console.log(moveInterval)
  moveInterval = setInterval(() => {
    console.log('after intervallklklk')
    moveSnakeHead()
    console.log(snakeHeadIdx, 'snakeheadidx')
    console.log(currentDirection, 'currentDir')
    generateSqrElements()
    checkForFood()
    crashDetection()
    incrementScoreBoard()
    changeSpeed()
    snakeBodyExtension()
    console.log(scoreBoard)
    console.log(speedVal)
    youWin()
  }, speedVal);
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
      // el.innerHTML = "<img id='kobe' src='../assets/kobe.png'>"
      // document.querySelector('#kobe').style.height = '50px'
      // document.querySelector('#kobe').style.width = 'auto'
      // el.style.backgroundPosition = 'center'
      // el.style.backgroundSize = '200%'
      // el.style.backgroundRepeat = 'no-repeat'
      // el.style.overflow = 'visible'
      // el.style.height = '40px'
      el.style.backgroundImage = "url('../assets/kobe.png')"
      el.style.backgroundPosition = 'center'
      el.style.backgroundSize = 'contain'
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
      el.innerHTML = ''
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
  console.log(evt.target.id)
  if (evt.key === 'ArrowUp' && currentDirection != 's' || evt.target.id === 'up-btn' && currentDirection != 's'){
    currentDirection = 'n'
    console.log('up is pressed')
  } else if (evt.key === 'ArrowRight' && currentDirection != 'w' || evt.target.id === 'right-btn' && currentDirection != 'w'){
    currentDirection = 'e'
    console.log('right is pressed')
  } else if (evt.key === 'ArrowDown' && currentDirection != 'n' || evt.target.id === 'down-btn' && currentDirection != 'n'){
    currentDirection = 's'
    console.log('down is pressed')
  } else if (evt.key === 'ArrowLeft' && currentDirection != 'e' || evt.target.id === 'left-btn' && currentDirection != 'e'){
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
    console.log('eat food')
  }
}

function snakeBodyExtension(){
    if (snakeBody.length) {
      snakeBody.unshift(snakeHeadIdx)
      snakeBody.pop()
    }
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
    changeSpeed()
  }

  function changeSpeed(){
    if (scoreBoard === 0){
      clearInterval(moveInterval)
      speedVal = 700
      render()
    } if (scoreBoard > 4){
      clearInterval(moveInterval)
      speedVal = 650
      render()
    } if (scoreBoard > 9){
      clearInterval(moveInterval)
      speedVal = 600
      render()
    } if (scoreBoard > 14){
      clearInterval(moveInterval)
      speedVal = 550
      render()
    } if (scoreBoard > 19){
      clearInterval(moveInterval)
      speedVal = 500
      render()
    } if (scoreBoard > 24){
      clearInterval(moveInterval)
      speedVal = 450
      render()
    } if (scoreBoard > 29){
      clearInterval(moveInterval)
      speedVal = 400
      render()
    } if (scoreBoard > 34){
      clearInterval(moveInterval)
      speedVal = 350
      render()
    } if (scoreBoard > 39){
      clearInterval(moveInterval)
      speedVal = 300
      render()
    } if (scoreBoard > 44){
      clearInterval(moveInterval)
      speedVal = 250
      render()
    } if (scoreBoard > 49){
      clearInterval(moveInterval)
      speedVal = 200
      render()
    }
  }

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
    console.log(snakeHeadIdx)
    endGame()
  } if (sqrEls[snakeHeadIdx+1].classList.contains('wWall')) {
    setTimeout(() => {
      if (currentDirection === 'e') {
        endGame()
      }
    }, speedVal-10)
  } if (sqrEls[snakeHeadIdx-1].classList.contains('eWall')) {
    setTimeout(() => {
      if (currentDirection === 'w') {
        endGame()
      }
    }, speedVal-10)
  }
}

// function reset(){
//   moveInterval = setInterval(() => {
//   snakeHeadIdx = pickRandomSnakeLocation()
//   foodItemIdx = generateFoodItem()
//   currentDirection = null
//   snakeBody = []
//   generateSqrElements()
//   speedVal = 800
//   incrementScoreBoard()
//   boardEl.style.backgroundColor = 'rgb(85,37,130)'
//   ref.style.display = 'none'
//   // render()
//   }, speedVal);
// }

// function reset(){
//   init()
// }

function reset(){
  // render()
  // moveInterval = setInterval(() => {
  //     snakeHeadIdx = pickRandomSnakeLocation()
  //     foodItemIdx = generateFoodItem()
  //     currentDirection = null
  //     snakeBody = []
  //     generateSqrElements()
  //     speedVal = 800
  //     incrementScoreBoard()
  //     boardEl.style.backgroundColor = 'rgb(85,37,130)'
  //     ref.style.display = 'none'
  //     // render()
  //     }, speedVal);
  snakeHeadIdx = pickRandomSnakeLocation()
  foodItemIdx = generateFoodItem()
  currentDirection = null
  snakeBody = []
  generateSqrElements()
  // speedVal = 800
  incrementScoreBoard()
  boardEl.style.backgroundColor = 'rgb(85,37,130)'
  ref.style.display = 'none'
  win.style.display = 'none'
}

function endGame(){
  setInterval = null
  currentDirection = null
  boardEl.style.backgroundColor = 'red'
  clearInterval(moveInterval)
  console.log('play again?')
  ref.style.display = 'flex'
  foulWhistle.volume = .5
  foulWhistle.play()
}

function youWin(){
  if (snakeBody.length === 254){
    win.style.display = 'flex'
    clearInterval(moveInterval)
  }
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