//定义全局变量
const positionX = 200;
const positionY = 100;
const squareWidth = 15;
const rowX = 30;
const rowY = 30;
let intervalTime = 400;
const score = document.getElementById('score');
//方块构造函数
function Square (x,y,width,heihgt,dom) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.heihgt = heihgt;
    this.viewContent = dom || document.createElement('div');
}

// 创建元素对应的构造函数
let Ground = _tools.getSingle(Square);
let Wall = _tools.personalInherit(Square);
let Floor = _tools.personalInherit(Square);
let Food = _tools.getSingle(Square);
let Snake = _tools.getSingle();
let SnakeHead = _tools.getSingle(Square);
let SnakeBody = _tools.personalInherit(Square);
let Game = _tools.getSingle();

const squareCollide = {
    move:'move',
    eat:'eat',
    die:'die'
}