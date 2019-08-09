function SquareFactory () {
    this.a = '12';
}
//构建对象函数
SquareFactory.create = function (type,x,y,color) {
    // console.log()
    if (typeof SquareFactory.prototype[type]!=='function'){
        throw new Error('no this type')
    }
    
    // if (SquareFactory.prototype[type].prototype.__proto__ != SquareFactory.prototype){
    //     SquareFactory.prototype[type].prototype.__proto__ = SquareFactory.prototype
    // }
   return SquareFactory.prototype[type](x,y,color)
}
//子工厂
SquareFactory.prototype.render = function (square,color,event) {
    square.viewContent.style.position = 'absolute'
    square.viewContent.style.left = square.x*squareWidth+'px';
    square.viewContent.style.top = square.y*squareWidth+'px';
    square.viewContent.style.width = square.width+'px';
    square.viewContent.style.height = square.width+'px';
    square.viewContent.style.backgroundColor = color;

    square.collide = function () {
        return  event
    }
}

SquareFactory.prototype.Floor = function (x,y,color) {
    let floor = new Floor (x,y,squareWidth,squareWidth);
    floor.type = 'Floor';
    this.render(floor,color,squareCollide.move)
    return floor
}

SquareFactory.prototype.Wall = function (x,y,color) {
    let wall = new Wall (x,y,squareWidth,squareWidth);
    wall.type = 'Wall';
    this.render(wall,color,squareCollide.die);
    return wall
}

SquareFactory.prototype.Food = function (x,y,color) {
    let food = new Food (x,y,squareWidth,squareWidth);
    food.type = 'Food';
    this.render(food,color,squareCollide.eat);
    return food
}

SquareFactory.prototype.SnakeHead = function (x,y,color) {
    let snakeHead = new SnakeHead (x,y,squareWidth,squareWidth);
    snakeHead.type = 'SnakeHead';
    this.render(snakeHead,color,squareCollide.die);
    return snakeHead
}

SquareFactory.prototype.SnakeBody = function (x,y,color) {
    let snakeBody = new SnakeBody (x,y,squareWidth,squareWidth);
    snakeBody.type = 'SnakeBody';
    this.render(snakeBody,color,squareCollide.die);
    return snakeBody
}
