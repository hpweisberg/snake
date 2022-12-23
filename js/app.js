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
  }
  sqrEls = document.querySelectorAll('.sqr')
}


/*---------------------------- Variables (state) ----------------------------*/

let boardObjs
let columnCounter = 0
let currentDirection
let foodItemIdx
let moveInterval
let rowCounter = 0
let scoreBoard = 0
let snakeBodyArr
let snakeHeadIdx
let sqrEls
let speedVal = 400

/*------------------------ Cached Element References ------------------------*/

const boardEl = document.querySelector('.board')
const downBtn = document.getElementById('.down-btn')
const leftBtn = document.getElementById('.left-btn')
const upBtn = document.getElementById('.up-btn')
const ref = document.querySelector('.ref')
const resetBtn = document.querySelector('.rest-btn')
const rightBtn = document.getElementById('.right-btn')
const scoreEl = document.querySelector('.score-board')
const win = document.querySelector('.win')

//! Audio element Refernces
const foulWhistle = new Audio('../assets/referee-whistle-blow.wav')
const swishSound = new Audio('../assets/swish-noise.mp3')


/*----------------------------- Event Listeners -----------------------------*/

document.querySelector('body').addEventListener('keydown', changeDirection)
document.getElementById('up-btn').addEventListener('click', changeDirection)
document.getElementById('right-btn').addEventListener('click', changeDirection)
document.getElementById('down-btn').addEventListener('click', changeDirection)
document.getElementById('left-btn').addEventListener('click', changeDirection)
resetBtn.addEventListener('click', reset)

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
  snakeBodyArr = []
  ref.style.display = 'none'
  win.style.display = 'none'
  generateSqrElements()
  incrementScoreBoard()
}

function render(){
  moveInterval = setInterval(() => {
    moveSnakeHead()
    generateSqrElements()
    checkForFood()
    crashDetection()
    incrementScoreBoard()
    changeSpeed()
    snakeBodyExtension()
    youWin()
  }, speedVal);
}

//! Generate/Display sqr elements

function generateSqrElements(){
  boardObjs = []
  sqrEls.forEach((el, idx) => {
    let boardObj = {
      snakeHead: snakeHeadIdx === idx ? true : false,
      food: foodItemIdx === idx ? true : false,
      snakeBod: snakeBodyArr.includes(idx) ? true : false
    }
    boardObjs.push(boardObj)
  })
  renderGameElements(boardObjs)
}

function renderGameElements(boardObjs){
  sqrEls.forEach((el, idx) => {
    if (boardObjs[idx].food){
      el.innerHTML = "<img id='food-Ball' src='../assets/ball.png'>"
      document.querySelector('#food-Ball').style.height = '25px'
      document.querySelector('#food-Ball').style.width = 'auto'
    } if (boardObjs[idx].snakeHead){
      el.innerHTML = "<img id='kobe' src='../assets/kobe.png'>"
      document.querySelector('#kobe').style.height = '40px'
      document.querySelector('#kobe').style.width = 'auto'
    } else if (boardObjs[idx].snakeBod){
      el.innerHTML = "<img id='trophy' src='../assets/trophy-ball.png'>"
      document.querySelector('#trophy').style.height = '25px'
      document.querySelector('#trophy').style.width = 'auto'
    } else if (!boardObjs[idx].snakeHead && !boardObjs[idx].food && !boardObjs[idx].snakeBodyArr){
      el.innerHTML = ''
    } 
  })
}

//! SnakeHead control/generation

function changeDirection(evt){
  if (!moveInterval) {
    render()
  }
  if (evt.key === 'ArrowUp' && currentDirection != 's' || evt.target.id === 'up-btn' && currentDirection != 's'){
    currentDirection = 'n'
  } else if (evt.key === 'ArrowRight' && currentDirection != 'w' || evt.target.id === 'right-btn' && currentDirection != 'w'){
    currentDirection = 'e'
  } else if (evt.key === 'ArrowDown' && currentDirection != 'n' || evt.target.id === 'down-btn' && currentDirection != 'n'){
    currentDirection = 's'
  } else if (evt.key === 'ArrowLeft' && currentDirection != 'e' || evt.target.id === 'left-btn' && currentDirection != 'e'){
    currentDirection = 'w'
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

//! Snake eating food

function generateFoodItem(){
  return Math.floor(Math.random() * sqrEls.length)
}

function checkForFood(){
  if (snakeHeadIdx === foodItemIdx){
    snakeBodyArr.push(1)
    do {
      foodItemIdx = generateFoodItem()
    } while (boardObjs[foodItemIdx].snakeHead || boardObjs[foodItemIdx].snakeBod)
  }
}

function snakeBodyExtension(){
  if (snakeBodyArr.length) {
    snakeBodyArr.unshift(snakeHeadIdx)
    snakeBodyArr.pop()
  }
}

//! Score/Speed control

function incrementScoreBoard(){
  scoreBoard = snakeBodyArr.length
  scoreEl.textContent = `${scoreBoard}`  
  changeSpeed()
}

function changeSpeed(){
  if (scoreBoard < 1){
    clearInterval(moveInterval)
    speedVal = 400
    render()
  } if (scoreBoard > 4){
    clearInterval(moveInterval)
    speedVal = 350
    render()
  } if (scoreBoard > 9){
    clearInterval(moveInterval)
    speedVal = 300
    render()
  } if (scoreBoard > 14){
    clearInterval(moveInterval)
    speedVal = 250
    render()
  } if (scoreBoard > 19){
    clearInterval(moveInterval)
    speedVal = 200
    render()
  } if (scoreBoard > 29){
    clearInterval(moveInterval)
    speedVal = 150
    render()
  } if (scoreBoard > 39){
    clearInterval(moveInterval)
    speedVal = 100
    render()
  } if (scoreBoard > 99){
    clearInterval(moveInterval)
    speedVal = 75
    render()
  }
}

//! Ending game functions

function hitWall(){
  if (snakeHeadIdx < 0 || snakeHeadIdx > 255){
    endGame()
  } if (sqrEls[snakeHeadIdx + 1].classList.contains('wWall')) {
    setTimeout(() => {
      if (currentDirection === 'e') {
        endGame()
      }
    }, speedVal-10)
  } if (sqrEls[snakeHeadIdx - 1].classList.contains('eWall')) {
    setTimeout(() => {
      if (currentDirection === 'w') {
        endGame()
      }
    }, speedVal-10)
  }
}

function crashDetection(){
  if (boardObjs[snakeHeadIdx].snakeBod) {
    endGame()
  } return
}

function endGame(){
  clearInterval(moveInterval)
  currentDirection = null
  boardEl.style.backgroundColor = 'red'
  ref.style.display = 'flex'
  foulWhistle.volume = .05
  foulWhistle.play()
}

function reset(){
  snakeHeadIdx = pickRandomSnakeLocation()
  foodItemIdx = generateFoodItem()
  currentDirection = null
  snakeBodyArr = []
  generateSqrElements()
  incrementScoreBoard()
  boardEl.style.backgroundColor = 'rgb(85,37,130)'
  ref.style.display = 'none'
  win.style.display = 'none'
}


//! Display win message

function youWin(){
  if (snakeBodyArr.length > 253){
    win.style.display = 'flex'
    clearInterval(moveInterval)
  }
}