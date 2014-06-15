/*
Created by Zafarali Ahmed
Guided Tutorial from Mozilla Developer Network
*/

var gl,//stores the Canvas Context, in this case the webGL context
	horizAspect = 480.0/640.0 //stores the aspect ratio
var lastSquareUpdateTime= 0;

var squareRotation = 0.0 //stores the rotation of the square
var squareXOffset = 0.0;
var squareYOffset = 0.0;
var squareZOffset = 0.0;

var xIncValue = 0.2;
var yIncValue = -0.4;
var zIncValue = 0.3;

function start(){

	//gets the element from the DOM
	var canvas = document.getElementById("glcanvas");
	
	gl = initWebGL(canvas);	//function to initialize context

	if(gl){
		gl.clearColor(0,0,0,1);	//set color to black, opaque

		gl.enable(gl.DEPTH_TEST);  //enables depth testing

		gl.depthFunc(gl.LEQUAL);  //allows near things to obscure far things

		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)//clears color and depth buffers

	}
	console.log("started");
	initBuffers();
	initShaders();
	setInterval(drawScene,15);

}

function initWebGL(canvas){
	gl = null;
	try{
		//gets context from the canvas element
		gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
	}catch(e){console.log(e);}

	if(!gl){
		alert("Unable to initialze WebGL");
		gl = null;
	}
	return gl;
}

function initShaders(){

	var fragmentShader = getShader(gl, "shader-fs");
	var vertexShader = getShader(gl, "shader-vs");

	//create a shader program
	shaderProgram = gl.createProgram();
	//attach the individual compontents to the shader program
	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	gl.linkProgram(shaderProgram);

	//gets the 'LINK_STATUS' parameter from the shader program
	if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)){
		//checks to see if the program linked successfully
		alert("failed to load shader program");
	}

	gl.useProgram(shaderProgram);
	vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
	gl.enableVertexAttribArray(vertexPositionAttribute);

	vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
	gl.enableVertexAttribArray(vertexColorAttribute);

}

function getShader(gl, id){
	var shaderScript,
		theSource,
		currentChild,
		shader;

	shaderScript = document.getElementById(id);

	if(!shaderScript){
		return null;
	}

	//we read the text of 'id' into theSource
	theSource="";
	currentChild = shaderScript.firstChild;
	while(currentChild){
		if(currentChild.nodeType==currentChild.TEXT_NODE){
			theSource+=currentChild.textContent;
		}
		currentChild = currentChild.nextSibling;
	}

	if(shaderScript.type=='x-shader/x-fragment'){
		shader=gl.createShader(gl.FRAGMENT_SHADER);
	}else if(shaderScript.type=='x-shader/x-vertex'){
		shader=gl.createShader(gl.VERTEX_SHADER);
	}else{
		//unknown shader type
		return null;
	}

	gl.shaderSource(shader,theSource);

	//compile the shader program
	gl.compileShader(shader);

	if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
		console.log(gl.getShaderInfoLog(shader)+" (.) shaderid "+id);
		alert("an error occured. check log");
		return null;
	}
	return shader;
}

function initBuffers(){

	//creates a buffer object to store the vertices of the square
	squareVerticesBuffer = gl.createBuffer();

	//bindBuffer binds to the context
	gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);

	var vertices = [1.0, 1.0, 0.0,
					-1.0, 1.0, 0.0,
					1.0,-1.0,0.0,
					-1.0,-1.0,0.0];

	//establishes the vertices for the object
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	var colors = [
			1.0, 1.0, 1.0, 1.0, //white
			1.0, 0.0, 0.0, 1.0, //red
			0.0, 1.0, 0.0, 1.0, //green
			0.0, 0.0, 1.0, 1.0, //blue
			];

	squareVerticesColorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesColorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
}


function drawScene(){
	//this function renders the scene once we have buffered everything

	//clears the background
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	perspectiveMatrix = makePerspective(45, //45deg field of view
		horizAspect, //width:height ratio
		0.1, 
		100.0); //we want to see objects between 0.1 and 100 units from camera only

	//establishes the position of the square as the center
	loadIdentity();
	//moves away from the camera by 6 units
	mvTranslate([-0.0,0.0,-6.0]);
	
	//allows us to save current mv matrix by rotating around x and z axis
	mvPushMatrix();
	mvRotate(squareRotation, [1,0,1]);
	mvTranslate([squareXOffset, squareYOffset, squareZOffset]);

	gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);
	
	//configures the buffer
	gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0,0)
	
	//use the colors stored in the buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesColorBuffer);
	gl.vertexAttribPointer(vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);

	setMatrixUniforms();

	//draws the square as a bunch of triangles
	//reads items 0 through 4 in the squareVerticesBuffer
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

	//we restore the original matrix
	mvPopMatrix();

	//uses the amout of time passed since we last animated to determine roation
	var currentTime = (new Date).getTime();
	if(lastSquareUpdateTime){
		var delta = currentTime - lastSquareUpdateTime;
		squareRotation += (30*delta)/1000.0;
		squareXOffset += xIncValue * ((30 * delta) / 1000.0);
    	squareYOffset += yIncValue * ((30 * delta) / 1000.0);
    	squareZOffset += zIncValue * ((30 * delta) / 1000.0);
    
    	if (Math.abs(squareYOffset) > 2.5) {
      		xIncValue = -xIncValue;
      		yIncValue = -yIncValue;
      		zIncValue = -zIncValue;
    	}
	}

	lastSquareUpdateTime = currentTime;
}