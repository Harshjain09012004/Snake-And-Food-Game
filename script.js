const canva = document.getElementById("myCanvas");
const ctx = canva.getContext("2d");
let play = false;

let snake = [[0, 0]];
ctx.fillStyle = "red";
ctx.fillRect(0, 0, 20, 20);

// Placing the initial food
let foodX = 440, foodY = 355;
ctx.beginPath();
ctx.arc(foodX, foodY, 6, 0, 2 * Math.PI);
ctx.fillStyle = "pink";
ctx.fill();

function colorSnake(){
    ctx.clearRect(0, 0, 800, 550);

    ctx.fillStyle = "red";
    // if(snake[0][0]==)
    for(let i = 0;i<snake.length;i++){
        // X, Y, Height, Width
        ctx.fillRect(snake[i][0], snake[i][1], 20, 20);
    }
}


function generateFood(){
    let X = foodX, Y = foodY;
    
    if(X==-1 & Y==-1){
      X = parseInt(Math.random()*780);
      Y = parseInt(Math.random()*530);
  
      //To Put the food in center at any cell
      X/=10; X*=10; X+=9;
      Y/=10; Y*=10; Y+=9;
      foodX = X, foodY = Y;
    }

    ctx.beginPath();
    ctx.arc(X, Y, 6, 0, 2 * Math.PI);
    ctx.fillStyle = "pink";
    ctx.fill();
}

function checkSelfCollision(X, Y){
  for(let i=0;i<snake.length;i++){
    if(snake[i][0]==X & snake[i][1]==Y) endGame();
  }
}

let direction = "R", score = 0, timer;
const scoreTag = document.getElementById("score");

function moveSnake()
{
    let X = snake[0][0], Y = snake[0][1];

    if(direction=="R") X+=20;
    else if(direction=="L") X-=20;
    else if(direction=="T") Y-=20;
    else Y+=20;

    if(X<0 | Y<0 | X>780 | Y>530) endGame();

    if(foodX>=X & foodY>=Y & foodX<X+20 & foodY<Y+20){
      foodX = foodY = -1; score++;
      scoreTag.innerText = `Score : ${score}`;
    }
    else snake.pop(); 

    //Checking if the snake collide with itself
    checkSelfCollision(X, Y);

    //Adding new block at the head of the snake list
    snake.unshift([X, Y]);

    //Coloring the new snake on canvas
    colorSnake();

    //Adding the food on the canvas
    generateFood();
}

const statusTag = document.getElementById("state");

function playGame(){
    if(play) return;
    play = true;

    colorSnake(); generateFood();

    statusTag.innerText = 'Status : Game is Going on';
    timer = setInterval(() => {
        moveSnake();
    }, 100);
}

function endGame(){
    clearInterval(timer);
    direction = "R";

    snake = [[0, 0]]; play = false;
    statusTag.innerText = 'Status : Game is Over'
}

function resetGame(){
    clearInterval(timer);
    direction = "R";

    snake = [[0, 0]]; play = false;
    colorSnake(); generateFood();
    statusTag.innerText = 'Status : Start a new Game';
}

const startBtn = document.getElementById("start");
startBtn.addEventListener("click", playGame);

const resetBtn = document.getElementById("reset");
resetBtn.addEventListener("click", resetGame)

document.addEventListener('keydown', (event) => {
  const key = event.key;

  switch (key){
    case "ArrowLeft":
      if(direction=="R") break;
      direction = "L"
      break;

    case "ArrowRight":
      if(direction=="L") break;
      direction = "R"
      break;

    case "ArrowUp":
      if(direction=="D") break;
      direction = "T"
      break;

    case "ArrowDown":
      if(direction=="T") break;
      direction = "D"
      break;

    default:
      console.log("Invalid Move");
  }
});