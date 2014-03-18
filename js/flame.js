var canvas;
var ctx;
var particles =[];
var mouse = {};
var H;
var W;
//create a canvas element that we can manipulate.
var createCanvas = function(){
	canvas = document.createElement("canvas");
	ctx = canvas.getContext("2d");
	canvas.width = W;
	canvas.height = H;
	var bod = document.body;
	console.log(bod);
	bod.appendChild(canvas);
	console.log("Canvas Created");
}
var track = function(e){
	mouse.x=e.pageX;
	mouse.y =e.pageY;
}

var particle = function(){
	this.speed = {x:-2.5+Math.random()*5,
				  y:-15+Math.random()*10};
	if(mouse.x && mouse.y){
		this.location = {x:mouse.x,y:mouse.y};
	}else{
		this.location = {x:W/2, y:H/2};
	}
	this.radius = 10+Math.random()*20;
	this.life=20+Math.random()*10;
	this.lifeRemain = this.life;
	this.r = Math.round(Math.random()*255);
	this.g = Math.round(Math.random()*255);
	this.b = Math.round(Math.random()*255);
}

var draw = function(){
	ctx.globalCompositeOperation = "source-over";
	ctx.fillStyle ="black";
	ctx.fillRect(0,0,W,H);
	ctx.globalCompositeOperation="lighter";

	for(var i = 0; i< particles.length; i++){
		var p = particles[i];
		ctx.beginPath();

		p.opacity = Math.round(p.lifeRemain/p.life*100)/100
		ctx.fillStyle = "red";
		ctx.arc(p.location.x, p.location.y, p.radius, Math.PI*2, false);
		ctx.fill();

		p.lifeRemain--;
		p.radius--;
		p.location.x +=p.speed.x;
		p.location.y += p.speed.y;


		if(p.lifeRemain<0 || p.radius<0){
			particles[i] = new particle();
		}
	}
}

var initiate = function(){
	var particleNumber = parseInt(prompt("How many particles do you want?"));
	for (var i = 0; i<particleNumber; i++){
		particles.push(new particle());
	}
	canvas.addEventListener("mousemove", track, false);
	setInterval(draw,33);
	console.log("initiated");
}

window.onload = function(){
	H = window.innerWidth;
	W = window.innerHeight;
	createCanvas();
	initiate();
	console.log("doc loaded");
}