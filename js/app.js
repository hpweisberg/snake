/*-------------------------------- Constants --------------------------------*/


/*-------------------------------- Variables --------------------------------*/
const snake = {
  head: 1, 
  body: [],
}
let food = 100
let topWall = 1
let rightWall = 1
let bottomWall = 1
let leftWall = 1
let score = 0



/*------------------------ Cached Element References ------------------------*/
const playerEl = document.querySelector('.player')
const foodEl = document.querySelector('.food')
const controllerBtnUp = document.querySelector('.up-btb')
const controllerBtnRight = document.querySelector('.right-btb')
const controllerBtnDown = document.querySelector('.down-btb')
const controllerBtnLeft = document.querySelector('.left-btb')
const scoreEl = document.querySelector('.score')


/*----------------------------- Event Listeners -----------------------------*/



/*-------------------------------- Functions --------------------------------*/

function init(){
  snake = {
    head: 1,
    body: 2,
  }
}