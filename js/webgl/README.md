Lessons
========
##Lesson 1: Setting up the 3D Context
Lesson from [MDN](https://developer.mozilla.org/en-US/docs/Web/WebGL/Getting_started_with_WebGL)
###Basics
Refer [commit](https://github.com/zafarali/experiments/commit/c6e1c4fd6e929d311aeb4fe1e0ff32dc19a43adf)
```javascript
gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
```
###Resizing
By default viewport resolution is set to height and width of the element in question. Editing the `style`, `width` or `height` attributes of the canvas will change the display size but not the rendering resolution. The rendering resoltion is the number of pixels to be drawn. To change the resolution of rendering we need to use `viewport()` function to notify WebGL.
```javascript
gl.viewport(0,0,canvas.width, canvas.heigth)
```

##Lesson 2: Drawing a square (2D)
Lesson from [MDN](https://developer.mozilla.org/en-US/docs/Web/WebGL/Adding_2D_content_to_a_WebGL_context). Code added is found here: [commit](https://github.com/zafarali/experiments/commit/53197a506a54480b210d2dfe4f00240295bdc5a9)
###Shaders 
Shaders will light the scene and draw the object. We write our code to load shaders from the HTML because it is easier. This is stored in `initShaders()`. The syntax and how the shaders work are not mentioned.  
###Loading Shaders from the DOM
The `getShader(gl,id)` function fetches the shader program from the DOM with *id* and returns the 'compiled' shader program.

####Fragment Shader
Pixels of polygons are known as *fragment*s. The job of this shader is to establish a color for each pixel. In our lesson2 we just set this to white. `gl_FragColor` is a built-in GL variable that is used to set the fragment's color.
####Vertex Shader
Defines the position and shape of each vertex
###Object Creation
The object needs to be created using a buffer that has all the vertices. We build the buffer using `initBuffers()`
###Matrices
To deal with matrices we use [Sylvester](http://sylvester.jcoglan.com/) and the extension known as glUtils.js of unknown source.

##Lesson 3: Adding Color
Lesson from [MDN](https://developer.mozilla.org/en-US/docs/Web/WebGL/Using_shaders_to_apply_color_in_WebGL).

###Color
Each vertice of the GL object has a position and a color. By default computations will make them have gradients. We use an array to hold the vertext colors and add new code to the `initBuffers()` function as shown in this [commit](https://github.com/zafarali/experiments/commit/8ed50fcf965b2a47496eed7995776a6fcfafe78e). To use these colors we update the vertex shader in our DOM as shown in this [commit](https://github.com/zafarali/experiments/commit/61a8afb3ad1ef7c8c0a73ff4997c8cdb6b58af0c). We then update `initShaders()` to use the color attribute in the shader program and the `drawScene()` function to use the colors when drawing the square as seen in [commit](https://github.com/zafarali/experiments/commit/6ece56d1ab6e142db26cdcb2c19ce6990db68c0e).


