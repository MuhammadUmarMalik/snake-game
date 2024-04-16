//Game Constants & variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('music/food.mp3');
const gameoverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mpeg');
let board = document.querySelector('.board');
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let SnakeArr = [
    { x: 13, y: 15 }
];
food = { x: 6, y: 7 };



//Game Functions 
function main(ctime) {
    window.requestAnimationFrame(main);
    console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    // function for runing game
    updateEngine();
}

function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < SnakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
    return false;
}

function updateEngine() {
    //part 1: Updating Snake Array & Food
    if (isCollide(SnakeArr)) {
        gameoverSound.play();
        moveSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Press any key to play again !");
        SnakeArr = [
            { x: 13, y: 15 }
        ];
        musicSound.play();
        score = 0;
    }

    //if you have eaten the food and increament and regenerate food
    if (SnakeArr[0].y === food.y && SnakeArr[0].x === food.x) {
        SnakeArr.unshift({ x: SnakeArr[0].x + inputDir.x, y: SnakeArr[0].y + inputDir.y });
        score +=1;
        scoreBox.innerHTML="Score : " +score;
        foodSound.play();
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    // moving the snake
    for (let i = SnakeArr.length - 2; i >= 0; i--) {

        SnakeArr[i + 1] = {...SnakeArr[i] };
    }
    SnakeArr[0].x += inputDir.x;
    SnakeArr[0].y += inputDir.y;


    //part 2: Display Snake and Food
    board.innerHTML = "";
    SnakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    // Display Food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}







//Game main logic starts here
musicSound.play();
// let hiscore = localStorage.getItem("hiscore");
// if(hiscore === null){
//     hiscoreval = 0;
//     localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
// }
// else{
//     hiscoreval = JSON.parse(hiscore);
//     hiscoreBox.innerHTML = "HiScore: " + hiscore;
// }


window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 } //start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log('ArrowUp');
            inputDir.x = 0;
            inputDir.y = -1;

            break;

        case "ArrowDown":
            console.log('ArrowUp');
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log('ArrowLeft');
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log('ArrowRight');
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
})