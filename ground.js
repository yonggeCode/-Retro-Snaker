let ground = new Ground (positionX,positionY,rowX*squareWidth,rowY*squareWidth)

ground.init = function () {
    let square = null;
    let table = []

    this.viewContent.style.position = 'absolute'
    this.viewContent.style.left = this.x+'px';
    this.viewContent.style.top = this.y+'px';
    this.viewContent.style.width = this.width+'px';
    this.viewContent.style.height = this.width+'px';
    this.viewContent.style.backgroundColor = '#f0f';
    document.body.appendChild(this.viewContent);
    //创建二维数组，对应放入方块对象
    for (let y = 0; y < rowY; y++) {
        table[y] = new Array (rowX);
        for(let x = 0; x < rowX; x++) {
            if(x==0 || x==rowX-1 || y==0 || y==rowY-1){
                square = SquareFactory.create ('Wall',x,y,'#34495e');
            }else {
                square = SquareFactory.create ('Floor',x,y,'#12CBC4');
            }
            table[y][x] = square;
            this.viewContent.appendChild(square.viewContent);
        }
    }

    this.groundTable = table;
}
//方块的操作方法
ground.remove = function (x,y) {
   let curSquear = this.groundTable[y][x];
   this.viewContent.removeChild(curSquear.viewContent);
   this.groundTable[y][x] = null;
}
ground.append = function (square) {
    this.viewContent.appendChild(square.viewContent);
    this.groundTable[square.y][square.x] = square;
}
ground.change =function (...squareArr) {
    squareArr.forEach(ele => {
        ground.remove(ele.x,ele.y);
        ground.append(ele);
    })
}

