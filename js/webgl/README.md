Lessons
========
#Lesson 1: Settings up the 3D Context
Lesson from [MDN](https://developer.mozilla.org/en-US/docs/Web/WebGL/Getting_started_with_WebGL)
##Basics
Refer [commit](https://github.com/zafarali/experiments/commit/c6e1c4fd6e929d311aeb4fe1e0ff32dc19a43adf)

##Resizing
By default viewport resolution is set to height and width of the element in question. Editing the `style`, `width` or `height` attributes of the canvas will change the display size but not the rendering resolution. The rendering resoltion is the number of pixels to be drawn. To change the resolution of rendering we need to use `viewport()` function to notify WebGL.
```javascript
gl.viewport(0,0,canvas.width, canvas.heigth)
```

##Shaders 
Shaders will light the scene and draw the object. We write our code to load shaders from the HTML because it is easier. This is stored in `initShaders()`
