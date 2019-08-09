let game = new Game();
game.timer = null;
game.score = 0;
game.newFood = null;
game.intervalTime = intervalTime;
game.init = function () {
    ground.init();
    snake.init ();
    game.createFood();
    game.control();
}
game.controlFlag = true;
game.control = function () {
    let start = document.getElementsByClassName('start')[0];
    let pause = document.getElementsByClassName('pause')[0];
    start.onclick = function () {
        game.start();
    }
    pause.onclick = function () {
        clearInterval(game.timer);
    }
    document.onkeydown = function (e) {
        //方向正确 不予当前方向相反 边界不能撞墙 节流
        if(e.keyCode == 37 && snake.direction != snake.directionNum.right && snake.head.x !== 1 && game.controlFlag){
            game.controlFlag = false;
            snake.direction = snake.directionNum.left;
        }else if(e.keyCode == 38 && snake.direction != snake.directionNum.bottom && snake.head.y !== 1 && game.controlFlag){
            game.controlFlag = false;
            snake.direction = snake.directionNum.top;
        }else if(e.keyCode == 39 && snake.direction != snake.directionNum.left && snake.head.x !== rowX - 2 && game.controlFlag){
            game.controlFlag = false;
            snake.direction = snake.directionNum.right;
        }else if(e.keyCode == 40 && snake.direction != snake.directionNum.top && snake.head.y !== rowY - 2 && game.controlFlag){
            game.controlFlag = false;
            snake.direction = snake.directionNum.bottom;
        }
    }
}
game.start=function () {
    clearInterval(game.timer);
    game.timer = setInterval(function () {
        snake.getNextSquare();
    },game.intervalTime)
}

game.createFood = function () {
    let flag = true;
    let foodX,foodY
    while (flag) {
        let key = true;
        foodX = _tools.getRandomNum(1,rowX-2);
        foodY = _tools.getRandomNum(1,rowY-2);

        for(let next = snake.head; next; next = next.next){
            if(foodX == next.x && foodY == next.y){
                key = false;
                break;
            }
        }
        if(key == true){
            flag = false;
        }
    }
    
    this.newFood = SquareFactory.create('Food',foodX,foodY,'deeppink');
    ground.change(this.newFood);
}

game.reStart = function () {
    snake.remove();
    game.removeFood();
    this.score = 0;
    score.innerText = 0;
    snake.init();
    game.createFood();
    game.intervalTime = intervalTime;
    
}

game.removeFood = function () {
    let newFloor = SquareFactory.create('Floor',this.newFood.x,this.newFood.y,'#12CBC4');
    ground.change(newFloor);
}
game.init()

