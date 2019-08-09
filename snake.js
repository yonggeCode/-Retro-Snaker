let snake = new Snake();
snake.head = null;
snake.tail = null;
snake.snakeList = null;
snake.direction = ''
//定义一个方向对象
snake.directionNum = {
    left:{
        x:-1,
        y:0
    },
    right:{
        x:1,
        y:0
    },
    top:{
        x:0,
        y:-1
    },
    bottom:{
        x:0,
        y:1
    }
}

snake.init = function () {
    let snakeHead = SquareFactory.create('SnakeHead',3,1,'red')
    let snakeBody1 = SquareFactory.create('SnakeBody',2,1,'green')
    let snakeBody2 = SquareFactory.create('SnakeBody',1,1,'green')
    ground.change(snakeHead,snakeBody1,snakeBody2)

    this.head = snakeHead;
    this.tail = snakeBody2;
    
    snakeHead.previous = null;
    snakeHead.next = snakeBody1;
    snakeBody1.previous = snakeHead;
    snakeBody1.next = snakeBody2;
    snakeBody2.previous = snakeBody1;
    snakeBody2.next = null;

    this.direction = this.directionNum.right;
   
}

snake.getNextSquare = function () {
    let nextSquare = ground.groundTable[this.head.y + this.direction.y][this.head.x + this.direction.x];
    snake.strategies[nextSquare.collide()](nextSquare);
}

//三种碰撞函数
snake.strategies = {
    move:function (nextSquare,type) {
        //目标方块为食物，目标方块变头，原头变新身体，重新链表新头和新身体
        //目标方块为地板，目标方块变头，原头变新身体，重新链表新头和新身体，原尾巴变为新地板，新尾巴是原尾巴的previous
        let newBody = SquareFactory.create('SnakeBody',snake.head.x,snake.head.y,'green');
        let newHead = SquareFactory.create('SnakeHead',nextSquare.x,nextSquare.y,'red');    
        let newFloor = SquareFactory.create('Floor',snake.tail.x,snake.tail.y,'#12CBC4');
        //新头连接
        newHead.previous = null;
        newHead.next = newBody;
        //新身体连接
        newBody.previous = newHead;
        newBody.next = snake.head.next;
        newBody.next.previous = newBody;
        //更换新头
        snake.head = newHead;

        ground.change(newBody,newHead)
        
        if(!type){
            //没吃到食物时，更换新尾巴
            snake.tail = snake.tail.previous;
            snake.tail.next = null ;      
            ground.change(newFloor);
        }
        game.controlFlag = true;
    },
    eat:function (nextSquare) {
        this.move(nextSquare,true);
        game.createFood();
        game.score += 10
        score.innerText = game.score;
        game.intervalTime -= 10;
        game.start();
        game.controlFlag = true;
    },
    die:function () {
        clearInterval(game.timer)
        confirm(`得分：${game.score}`)
        game.reStart()
        game.controlFlag = true;
    }
}

snake.remove = function () {
    let next = snake.head
    while(next){
        let newFloor = SquareFactory.create('Floor',next.x,next.y,'#12CBC4');
        ground.change(newFloor)
        next = next.next;
    }
}

