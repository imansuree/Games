const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

/* ---------- ROAD ---------- */

const roadWidth=
canvas.width*0.86;

const roadX=
(canvas.width-roadWidth)/2;

const lanes=[

roadX+
roadWidth*(1/6),

roadX+
roadWidth*(3/6),

roadX+
roadWidth*(5/6)

];

/* ---------- GAME ---------- */

let score=0;

let speed=8;

let dashOffset=0;

let playing=true;

let lastLane=-1;

let player={

lane:1,

y:
canvas.height-170

};

let enemies=[];

/* ---------- RANDOM ---------- */

function randomLane(){

let lane=
Math.floor(
Math.random()*3
);

while(

lane===lastLane

&&

Math.random()>.3

){

lane=
Math.floor(
Math.random()*3
);

}

lastLane=lane;

return lane;

}

/* ---------- SPAWN ---------- */

function spawnEnemy(){

if(
Math.random()<0.85
){

enemies.push({

lane:
randomLane(),

y:
-120,

speed:
speed+
Math.random()*3,

color:

[
"#ff9800",
"#f44336",
"#7c4dff",
"#2196f3",
"#ffeb3b"

][

Math.floor(
Math.random()*5
)

]

});

}

}

setInterval(()=>{

if(
playing
)
spawnEnemy();

},350);

/* ---------- DRAW CAR ---------- */

function drawCar(
x,
y,
color
){

const W=52;
const H=92;

ctx.save();

ctx.translate(
x,
y
);

/* body */

ctx.fillStyle=color;

ctx.beginPath();

ctx.roundRect(
-W/2,
0,
W,
H,
14
);

ctx.fill();

/* shine */

const g=
ctx.createLinearGradient(
0,
0,
0,
H
);

g.addColorStop(
0,
"rgba(255,255,255,.25)"
);

g.addColorStop(
1,
"transparent"
);

ctx.fillStyle=g;

ctx.fill();

/* windows */

ctx.fillStyle=
"rgba(220,240,255,.7)";

ctx.fillRect(
-14,
14,
28,
14
);

ctx.fillRect(
-14,
58,
28,
14
);

/* wheels */

ctx.fillStyle=
"#111";

[
18,
58

].forEach(v=>{

ctx.fillRect(
-W/2-4,
v,
6,
18
);

ctx.fillRect(
W/2-2,
v,
6,
18
);

});

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

/* road */

ctx.fillStyle=
"#666";

ctx.fillRect(
roadX,
0,
roadWidth,
canvas.height
);

/* borders */

ctx.fillStyle=
"#ddd";

ctx.fillRect(
roadX,
0,
4,
canvas.height
);

ctx.fillRect(
roadX+
roadWidth-
4,
0,
4,
canvas.height
);

/* lane markers */

dashOffset+=speed;

[
roadX+
roadWidth/3,

roadX+
roadWidth*2/3

].forEach(
x=>{

for(

let y=-160;

y<
canvas.height+200;

y+=180

){

ctx.fillStyle=
"white";

ctx.fillRect(

x-5,

y+
(
dashOffset%
180
),

10,

80

);

}

});

}

/* ---------- CONTROLS ---------- */

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

document
.addEventListener(
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

/* ---------- COLLISION ---------- */

function crash(e){

return(

e.lane===
player.lane

&&

e.y+80>
player.y

&&

e.y<
player.y+80

);

}

/* ---------- LOOP ---------- */

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

/* smoke */

ctx.fillStyle=
"rgba(255,255,255,.25)";

ctx.beginPath();

ctx.arc(
lanes[
player.lane
]-8,

player.y+100,

10,

0,

7

);

ctx.arc(

lanes[
player.lane
]+8,

player.y+100,

10,

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

"#18d13c"

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
crash(e)
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

canvas.height+120

){

enemies.splice(
i,
1
);

score++;

}

}

/* increase difficulty */

speed+=0.0008;

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
