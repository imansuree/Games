const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");

canvas.width=innerWidth;
canvas.height=innerHeight;

const roadWidth=canvas.width*0.82;
const roadX=(canvas.width-roadWidth)/2;

const lanes=[
roadX+roadWidth*0.17,
roadX+roadWidth*0.50,
roadX+roadWidth*0.83
];

let score=0;
let speed=10;

let player={
lane:1,
y:canvas.height-180
};

let enemies=[];

let playing=true;

let dashOffset=0;

let lastLane=-1;

/* ---------- SPAWN ---------- */

function randomLane(){

let lane=
Math.floor(
Math.random()*3
);

while(
lane===lastLane &&
Math.random()>0.3
){

lane=
Math.floor(
Math.random()*3
);

}

lastLane=lane;

return lane;

}

function spawnEnemy(){

if(
Math.random()<0.75
){

enemies.push({

lane:
randomLane(),

y:
-200,

speed:
speed+
Math.random()*4,

color:
[
"#ff9800",
"#e91e63",
"#7c4dff",
"#2196f3",
"#f44336"
][
Math.floor(
Math.random()*5
)
]

});

}

}

/* MORE FREQUENT */

setInterval(()=>{

if(
playing
)
spawnEnemy();

},350);

/* ---------- CAR ---------- */

function drawCar(
x,
y,
color
){

ctx.save();

ctx.translate(
x,
y
);

ctx.fillStyle=color;

ctx.beginPath();

ctx.roundRect(
-40,
0,
80,
130,
20
);

ctx.fill();

ctx.fillStyle=
"rgba(255,255,255,.5)";

ctx.fillRect(
-20,
18,
40,
20
);

ctx.fillRect(
-20,
80,
40,
20
);

ctx.fillStyle=
"#111";

ctx.fillRect(
-44,
20,
8,
26
);

ctx.fillRect(
36,
20,
8,
26
);

ctx.fillRect(
-44,
82,
8,
26
);

ctx.fillRect(
36,
82,
8,
26
);

ctx.restore();

}

/* ---------- ROAD ---------- */

function drawRoad(){

ctx.fillStyle=
"#73d54f";

ctx.fillRect(
0,
0,
canvas.width,
canvas.height
);

ctx.fillStyle=
"#575757";

ctx.fillRect(
roadX,
0,
roadWidth,
canvas.height
);

ctx.fillStyle=
"#d7d7d7";

ctx.fillRect(
roadX,
0,
5,
canvas.height
);

ctx.fillRect(
roadX+
roadWidth-5,
0,
5,
canvas.height
);

dashOffset+=speed;

[
roadX+
roadWidth/3,

roadX+
roadWidth*2/3

].forEach(
x=>{

for(
let y=-150;
y<
canvas.height+150;
y+=180
){

ctx.fillStyle=
"white";

ctx.fillRect(
x-6,

y+
(
dashOffset%
180
),

12,

90
);

}

}
);

}

/* ---------- INPUT ---------- */

function move(d){

player.lane+=d;

player.lane=
Math.max(
0,
Math.min(
2,
player.lane
)
);

}

left.onclick=
()=>move(-1);

right.onclick=
()=>move(1);

/* ---------- COLLISION ---------- */

function crash(
e
){

return(

e.lane===player.lane

&&

e.y+120>
player.y

&&

e.y<
player.y+120

);

}

/* ---------- GAME ---------- */

function loop(){

if(
!playing
)
return;

ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);

drawRoad();

/* exhaust */

ctx.fillStyle=
"rgba(255,255,255,.4)";

ctx.beginPath();

ctx.arc(
lanes[player.lane]-10,
player.y+130,
12,
0,
7
);

ctx.arc(
lanes[player.lane]+10,
player.y+130,
12,
0,
7
);

ctx.fill();

/* player */

drawCar(
lanes[
player.lane
],
player.y,
"#16d72b"
);

/* enemies */

for(
let i=
enemies.length-1;
i>=0;
i--
){

let e=
enemies[i];

e.y+=e.speed;

drawCar(

lanes[
e.lane
],

e.y,

e.color

);

if(
crash(
e
)
){

playing=
false;

gameover
.style
.display=
"block";

}

if(
e.y>
canvas.height+150
){

enemies
.splice(
i,
1
);

score++;

}

}

speed+=0.001;

document
.getElementById(
"score"
)
.innerText=
score+
" km";

requestAnimationFrame(
loop
);

}

loop();
