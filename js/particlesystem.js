var canvas;
var ctx;
var particles =[];
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

var createParticle = function(){
	//location
	this.x = Math.random()*W;
	this.y = Math.random()*H;

	//speeds
	this.vx = Math.random()*10;
	this.vy = Math.random()*10;


	//colours
	var r = Math.random()*255>>0;
	var g = Math.random()*255>>0;
	var b = Math.random()*255>>0;

	this.color="rgba("+r+","+g+","+b+",0.5)"; //alpha 0.5

	//size
	this.radius = Math.random()*20+20;

	console.log("Particle Created");
}

var draw = function(){
	ctx.globalCompositeOperation = "source-over";

	ctx.fillStyle = "rgba(0,0,0,0.3)";
	ctx.fillRect(0,0,W, H);

	ctx.globalCompositeOperation = "ligther";

	for(var t =0; t<particles.length; t++){
		var p = particles[t];
		ctx.beginPath();
		/*var gradient = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.radius);
		gradient.addColorStop(0, "white");
		gradient.addColorStop(0.4, "white");
		gradient.addColorStop(0.4, p.color);
		gradient.addColorStop(1, "black");
		*/
		ctx.fillStyle = "red";
		ctx.arc(p.x, p.y, p.radius, Math.PI*2, false);
		ctx.fill();

		p.x += p.vx;
		p.y += p.vy;

		if(p.x < -50) p.x = 500+50;
		if(p.y < -50) p.y = 500+50;
		if(p.y> W+50) p.x = -50;
		if(p.y > H+50) p.y = -50;

	}
}

var initiate = function(){
	for(var i =0; i<50; i++){
		particles.push(new createParticle());	
		console.log("Particle pushed");
	}
	console.log("initiated");
}
window.onload = function(){
H = window.innerWidth;
W = window.innerHeight;
console.log(H+" "+W);
createCanvas();
initiate();
setInterval(draw,33);
console.log("doc loaded");
}