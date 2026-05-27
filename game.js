const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");

canvas.width=innerWidth;
canvas.height=innerHeight;

const lanes=[
canvas.width*.3,
canvas.width*.5,
canvas.width*.7
];

let player={
lane:1,
y:canvas.height-180,
w:70,
h:120
};

let enemies=[];

let score=0;
let speed=8;
let playing=true;

function spawnEnemy(){

enemies.push({
lane:Math.floor(Math.random()*3),
y:-150
});

}

setInterval(()=>{
if(playing)spawnEnemy();
},1000);

function drawCar(x,y,color){

ctx.fillStyle=color;

ctx.fillRoundRect(
x-35,
y,
70,
120,
20
);

ctx.fill();
}

function move(dir){

player.lane+=dir;

if(player.lane<0)
player.lane=0;

if(player.lane>2)
player.lane=2;

}

left.onclick=()=>move(-1);
right.onclick=()=>move(1);

document.addEventListener("keydown",e=>{

if(e.key==="ArrowLeft")
move(-1);

if(e.key==="ArrowRight")
move(1);

});

function collide(a,b){

return(
Math.abs(a-b)<60
);

}

function loop(){

if(!playing)
return;

ctx.fillStyle="#777";

ctx.fillRect(
canvas.width*.2,
0,
canvas.width*.6,
canvas.height
);

for(let i=0;i<20;i++){

ctx.fillStyle="white";

ctx.fillRect(
canvas.width*.5-5,
i*80,
10,
40
);

}

drawCar(
lanes[player.lane],
player.y,
"lime"
);

enemies.forEach(e=>{

e.y+=speed;

drawCar(
lanes[e.lane],
e.y,
"orange"
);

if(
e.y>player.y-60 &&
collide(
lanes[e.lane],
lanes[player.lane]
)
){

playing=false;

gameover.style.display=
"block";

}

});

score+=0.02;

document
.getElementById(
"score"
)
.innerText=
score.toFixed(1)
+" km";

requestAnimationFrame(
loop
);

}

loop();
