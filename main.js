// 定义弹球计数变量

const para = document.querySelector('p');
const pop = document.querySelector('a');
let count = 0;
let number= 0; // 定义球的数量

// 分数
const spa = document.querySelector('span');
let defen = 0;

// 按钮
const btn = document.querySelector('button');

// 设置画布

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// 生成随机数的函数

function random(min,max) {
  const num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

// 生成随机颜色值的函数

function randomColor() {
  const color = 'rgb(' +
    random(0, 255) + ',' +
    random(0, 255) + ',' +
    random(0, 255) + ')';
  return color;
}

// 定义 Shape 构造器

function Shape(x, y, velX, velY, exists) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exists = exists;
}

// 定义 Ball 构造器，继承自 Shape

function Ball(x, y, velX, velY, exists, color, size) {
  Shape.call(this, x, y, velX, velY, exists);

  this.color = color;
  this.size = size;
}

Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;

// 定义彩球绘制函数

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};

// 定义彩球更新函数

Ball.prototype.update = function() {
  if((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
};

// 定义碰撞检测函数

Ball.prototype.collisionDetect = function() {
  for(var j = 0; j < balls.length; j++) {
    if(this !== balls[j]) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size && balls[j].exists) {
        balls[j].color = this.color = randomColor();
      }
    }
  }
};

// 定义 EvilCircle 构造器, 继承自 Shape

function EvilCircle(x, y, exists) {
  Shape.call(this, x, y, 20, 20, exists);

  this.color = 'white';
  this.size = 10;
}

EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle;


// 定义 EvilCircle 绘制方法

EvilCircle.prototype.draw = function() {
  ctx.beginPath();
  ctx.strokeStyle = this.color;
  ctx.lineWidth = 3;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();
};


// 定义 EvilCircle 的边缘检测（checkBounds）方法

EvilCircle.prototype.checkBounds = function() {
  if((this.x + this.size) >= width) {
    this.x -= this.size;
  }

  if((this.x - this.size) <= 0) {
    this.x += this.size;
  }

  if((this.y + this.size) >= height) {
    this.y -= this.size;
  }

  if((this.y - this.size) <= 0) {
    this.y += this.size;
  }
};

// 定义 EvilCircle 控制设置（setControls）方法

EvilCircle.prototype.setControls = function() {
  window.onkeydown = e => {
    switch(e.key) {
      case 'a':
      case 'A':
      case 'ArrowLeft':
        this.x -= this.velX;
        break;
      case 'd':
      case 'D':
      case 'ArrowRight':
        this.x += this.velX;
        break;
      case 'w':
      case 'W':
      case 'ArrowUp':
        this.y -= this.velY;
        break;
      case 's':
      case 'S':
      case 'ArrowDown':
        this.y += this.velY;
        break;
    }
  };
};

// 定义 EvilCircle 冲突检测函数

EvilCircle.prototype.collisionDetect = function() {
  for(let j = 0; j < balls.length; j++) {
    if( balls[j].exists ) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].exists = false;
        
        var FastBallBig = 10; // 大的快球
        var SlowBallBig = 5;  // 慢的快球
        var FastBallSmall = 20; // 快的小球
        var SlowBallSmall = 15; // 慢的小球
        //球的得分机制
        if ( this.size > 15 && dx > 10){
          count += 10;
          para.textContent = '得分是：' + count;
        }else if( this.size > 15 && dx < 10 ){
          count += 5;
          para.textContent = '得分是：' + count;
        }else if( this.size < 15 && dx > 10 ){
          count += 20;
          para.textContent = '得分是：' + count;
        }else if( this.size < 15 && dx < 10 ){
          count += 15;
          para.textContent = '得分是：' + count;
        }

        number--;
      }
    }
  }
};

// 定时游戏一分钟
var time = 0;
var Stop = true; // 用来判断 游戏停止
var t = setInterval(clock,1000);
var clock = function(){
  time++;
  if( time == 60 ){
    clearInterval( t );
    time = 0;
    Stop = false;
    return;
  }
}
t = setInterval(clock,1000);

// 定义时间
var newDate = new Date();

// 定义json数据
var test=[
  {name:"null",defen:"0",tame:"null"},
  {name:"null",defen:"0",tame:"null"},
  {name:"null",defen:"0",tame:"null"},
]

// 点击 保存事件
document.getElementById("btn").onclick = function() {btnFunction()};
function btnFunction(){
  var input = document.getElementById("play");
  var name = input.value;
  var defen = count;
  var time = newDate.toLocaleString();
  // 把获取的数据 在json中添加
  var newJson={"name":name,"defen":defen,"time":time};
  test.push(newJson);
  
  // sort 会直接对原数据排序
  test.sort(down);
  console.log( JSON.stringify( this.test) )

  // 删除原来表格中的数据 把新数据写入表格中
  tabDel();
  addtitle();
  tab();

  // 关闭弹窗 
  t = setInterval(clock, 1000);
  close();
  Stop = true;

  count = 0;
  para.textContent = '得分是：' + count;
  SBall();
  requestAnimationFrame(loop);
  console.log( number );
}

// 降序排列
function down(a, b) {
  return b.defen-a.defen
}


// 循环遍历表格
tab = function(){ 
  var tbody = document.getElementById('table');
  for(var i = 0;i < 3; i++){ //遍历json数据 
    var trow = getDataRow(test[i]); //定义一个方法,返回tr数据
    tbody.appendChild(trow);  
  }
}

// 添加表格标题 th部分
function addtitle(){
  var tbody = document.getElementById('table');
  var trow = title(); //定义一个方法,返回tr数据
  tbody.appendChild(trow);
}

function title() { 
  var row = document.createElement('tr'); //创建行
  
  var nameCell = document.createElement('th');//创建第二列 姓名
  nameCell.innerHTML = "姓名：";
  row.appendChild(nameCell);
  
  var defenCell = document.createElement('th');//创建第三列 得分
  defenCell.innerHTML = "得分:";
  row.appendChild(defenCell);

  var timeCell = document.createElement('th');//创建第四列 时间
  timeCell.innerHTML = "时间:";
  row.appendChild(timeCell);

  return row; //返回tr数据
}

function tabDel(){
  table = document.getElementById('table');
  var pObjs = table.childNodes;
  for (var i = pObjs.length-1; i > 0; i--) { 
    // 倒序删除 
    table.removeChild(pObjs[i]);
  }
}

function getDataRow(test){

  var row = document.createElement('tr'); //创建行
      
  var nameCell = document.createElement('td');//创建第一列 姓名
  nameCell.innerHTML = test.name;
  row.appendChild(nameCell);
  
  var defenCell = document.createElement('td');//创建第二列 得分
  defenCell.innerHTML = test.defen;
  row.appendChild(defenCell);

  var timeCell = document.createElement('td');//创建第三列 时间
  timeCell.innerHTML = test.time;
  row.appendChild(timeCell);
    
  return row; //返回tr数据	 
}


// 定义一个数组，生成并保存所有的球，
const balls = [];
function SBall(){
  
  while( number < 25) {
    const size = random(10,20);
    let ball = new Ball(
      // 为避免绘制错误，球至少离画布边缘球本身一倍宽度的距离
      random(0 + size, width - size),
      random(0 + size, height - size),
      random(-7, 7),
      random(-7, 7),
      true,
      randomColor(),
      size
    );
    balls.push(ball);
    number++;
  }2555550
  0
}


// 弹窗触发
function popup() {
  Box.style.display="block";
  spa.textContent = "最后得分" + count;
}
// 关闭弹窗
function close() {
  Box.style.display="none";
}
// 关闭按钮，关闭弹窗
pop.onclick = function(){
  close();
} 


// 定义一个循环来不停地播放

let evil = new EvilCircle(random(0, width), random(0, height), true);
evil.setControls();

function loop() {
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0, 0, width, height);

  for(let i = 0; i < balls.length; i++) {
    if(balls[i].exists) {
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
    }
  }

  // 判断定时器 是否停止 停止则 停止 loop()
  if ( !Stop ){
    popup();
    Stop == true
    return;
  }
  
  SBall();
  evil.draw();
  evil.checkBounds();
  evil.collisionDetect();
  requestAnimationFrame(loop);  
}

loop();
