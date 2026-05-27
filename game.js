const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const roadWidth = canvas.width * 0.6;
const roadX = (canvas.width - roadWidth) / 2;

const lanes = [
roadX + roadWidth*0.2,
roadX + roadWidth*0.5,
roadX + roadWidth*0.8
];

let player = {
lane:1,
y:canvas.height-180,
w:60,
h:100
};

let enemies=[];

let score=0;
let speed=8;
let roadOffset=0;
let playing=true;

function roundedRect(x,y,w,h,r,color){

ctx.fillStyle=color;

ctx.beginPath();

ctx.moveTo(x+r,y);

ctx.lineTo(x+w-r,y);

ctx.quadraticCurveTo(
x+w,y,
x+w,y+r
);

ctx.lineTo(
x+w,
y+h-r
);

ctx.quadraticCurveTo(
x+w,
y+h,
x+w-r,
y+h
);

ctx.lineTo(
x+r,
y+h
);

ctx.quadraticCurveTo(
x,
y+h,
x,
y+h-r
);

ctx.lineTo(
x,
y+r
);

ctx.quadraticCurveTo(
x,
y,
x+r,
y
);

ctx.closePath();

ctx.fill();

}

function drawCar(x,y,color){

roundedRect(
x-30,
y,
60,
100,
15,
color
);

ctx.fillStyle="white";

ctx.fillRect(
x-20,
y+15,
40,
15
);

ctx.fillRect(
x-20,
y+70,
40,
15
);

}

function spawnEnemy(){

enemies.push({
lane:Math.floor(
Math.random()*3
),
y:-120
});

}

setInterval(()=>{

if(playing)
spawnEnemy();

},1000);

function move(dir){

player.lane+=dir;

player.lane=
Math.max(
0,
Math.min(
2,
player.lane
)
);

}

left.onclick=()=>move(-1);
right.onclick=()=>move(1);

document.addEventListener(
"keydown",
e=>{

if(
e.key==="ArrowLeft"
)
move(-1);

if(
e.key==="ArrowRight"
)
move(1);

}
);

function drawRoad(){

ctx.fillStyle="#808080";

ctx.fillRect(
roadX,
0,
roadWidth,
canvas.height
);

roadOffset+=speed;

for(
let i=-1;
i<15;
i++
){

ctx.fillStyle="white";

ctx.fillRect(
canvas.width/2-6,
i*120+
(
roadOffset%
120
),
12,
70
);

}

}

function collision(a,b){

return (
a.lane===b.lane &&
b.y+100>a.y &&
b.y<a.y+100
);

}

function loop(){

if(!playing)
return;

ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);

drawRoad();

drawCar(
lanes[player.lane],
player.y,
"lime"
);

for(
let i=enemies.length-1;
i>=0;
i--
){

let e=
enemies[i];

e.y+=speed;

drawCar(
lanes[e.lane],
e.y,
"orange"
);

if(
collision(
player,
e
)
){

playing=false;

gameover.style.display=
"block";

}

if(
e.y>
canvas.height+100
){

enemies.splice(
i,
1
);

score++;

}

}

document
.getElementById(
"score"
).innerText=
score+" km";

requestAnimationFrame(
loop
);

}

loop();
