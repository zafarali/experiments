Lessons
========
##Lesson 1: Settings up the 3D Context
Lesson from [MDN](https://developer.mozilla.org/en-US/docs/Web/WebGL/Getting_started_with_WebGL)
###Basics
Refer [commit](https://github.com/zafarali/experiments/commit/c6e1c4fd6e929d311aeb4fe1e0ff32dc19a43adf)

###Resizing
By default viewport resolution is set to height and width of the element in question. Editing the `style`, `width` or `height` attributes of the canvas will change the display size but not the rendering resolution. The rendering resoltion is the number of pixels to be drawn. To change the resolution of rendering we need to use `viewport()` function to notify WebGL.
```javascript
gl.viewport(0,0,canvas.width, canvas.heigth)
```

##Lesson 2: Drawing a square (2D)
Lesson from [MDN](https://developer.mozilla.org/en-US/docs/Web/WebGL/Adding_2D_content_to_a_WebGL_context)
###Shaders 
Shaders will light the scene and draw the object. We write our code to load shaders from the HTML because it is easier. This is stored in `initShaders()`. The syntax and how the shaders work are not mentioned.  
###Loading Shaders from the DOM
The `getShader(gl,id)` function fetches the shader program from the DOM with *id* and returns the 'compiled' shader program.

####Fragment Shader
Pixels of polygons are known as *fragment*s. The job of this shader is to establish a color for each pixel. In our lesson2 we just set this to white. `gl_FragColor` is a built-in GL variable that is used to set the fragment's color.
####Vertex Shader
Defines the position and shape of each vertex

