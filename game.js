const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");

canvas.width=innerWidth;
canvas.height=innerHeight;

const ROAD_RATIO=0.78;

const roadWidth=
canvas.width*ROAD_RATIO;

const roadX=
(canvas.width-roadWidth)/2;

/* TRUE 3 LANES */
const lanes=[
roadX+roadWidth*(1/6),
roadX+roadWidth*(3/6),
roadX+roadWidth*(5/6)
];

let player={
lane:1,
y:canvas.height-180,
w:60,
h:100
};

let enemies=[];

let score=0;

let speed=10;

let roadOffset=0;

let playing=true;

function drawCar(
x,
y,
color
){

ctx.fillStyle=color;

ctx.beginPath();

ctx.roundRect(
x-35,
y,
70,
110,
16
);

ctx.fill();

ctx.fillStyle="white";

ctx.fillRect(
x-20,
y+15,
40,
14
);

ctx.fillRect(
x-20,
y+72,
40,
14
);

}

/* SPAWN IN 3 LANES */
function spawnEnemy(){

enemies.push({

lane:
Math.floor(
Math.random()*3
),

y:-150

});

}

setInterval(()=>{

if(
playing
)
spawnEnemy();

},900);

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

function drawRoad(){

ctx.fillStyle=
"#777";

ctx.fillRect(
roadX,
0,
roadWidth,
canvas.height
);

/* 2 DIVIDERS = 3 LANES */

roadOffset+=speed;

const dividers=[
roadX+
roadWidth/3,

roadX+
roadWidth*2/3
];

dividers.forEach(
x=>{

for(
let i=-1;
i<14;
i++
){

ctx.fillStyle=
"white";

ctx.fillRect(
x-6,

i*140+
(
roadOffset%
140
),

12,

80
);

}

});

}

function hit(
a,
b
){

return(

a.lane===
b.lane

&&

b.y+100>
a.y

&&

b.y<
a.y+100

);

}

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

drawCar(
lanes[
player.lane
],
player.y,
"lime"
);

for(
let i=
enemies.length-1;
i>=0;
i--
){

let e=
enemies[i];

e.y+=speed;

drawCar(

lanes[
e.lane
],

e.y,

[
"orange",
"purple",
"red"
][
e.lane
]

);

if(
hit(
player,
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
canvas.height
){

enemies
.splice(
i,
1
);

score++;

}

}

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
