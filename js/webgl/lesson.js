/*
Created by Zafarali Ahmed
Guided Tutorial from Mozilla Developer Network
https://developer.mozilla.org/en-US/docs/Web/WebGL/Getting_started_with_WebGL
*/

//stores the Canvas Context, in this case the webGL context
var gl;


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