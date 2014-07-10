D3 (Data Driven Documents)
==============================
Useful Resources:
1. [D3 API](https://github.com/mbostock/d3/wiki/API-Reference)  
2. [D3 Tutorials by Scott Murray](http://alignedleft.com/tutorials/d3)  
3. [Interactive Data for the Web by Scotty Murray](http://chimera.labs.oreilly.com/books/1230000000345/index.html)  
4. 
### Getting Your Feet Wet
Let's start right off the bat with a simple example:
```javascript
d3.select('body') //selects the <body> tag
	.append('p') //create and append a <p>aragraph tag
	.text('An amazing story unfolds...') //adds text to the <p> tag created
```
This demonstrates how D3 works with manipulating DOM elements. Something to note:

- `.select()` is a selector which returns a reference to an element on the DOM. *(Alternative: `.selectAll()` exists to return (a reference to) a pseudoarray of elements. [A Subclass of Array](http://bost.ocks.org/mike/selection/#subclass))*  

#### Where's the Data at?
D3 handles various kinds of data: arrays, matrices (i.e. arrays of arrays), numbers, strings, objects, JSON and even CSV files. binding data to our d3 object requires the use of `.data()` method to be called on a selection of DOM elements (i.e. the pseudoarray mentioned above). **TLDR: Select first, data next**  

Assume we have a page with 4 `<p>` elements. We want to add the text 'A Journey Begins 1', 'A Journey Begins 2' to each of them. Our dataset in this case would be defined `var dataset = [ 1, 2, 3, 4 ];` Check out the [example code](https://github.com/zafarali/experiments/commit/6f6bb9c2d4d73475b5e9e232916406351c896e1d#diff-d5639eaa4564b25357332b8c8df0cb16R10) *(Note that all of this is wrapped in a `window.onload()` event which would not be necessary if we didn't have anything on the page. -- more on that later)*  

``javascript
d3.select('body') 								// select the body
	.selectAll('p') 								// select all p's in the body
	.data(data)											// bind the data
	.text(function(d,i){						// call .text() and pass in a function
		return 'A Journey Begins '+d; //here we use 'd' or datum to pass in each data piece.
	});
```

### `.enter()` and `.exit()`
Let's begin with some more concrete examples now. Remember in the previous example there was this annoying piece of code `window.onload = ...` we can get rid of this by leveraging the power of the `.enter()` function. I indent out the definition for highlighting purposes.  
- **`.enter()` is the place where data that doesn't have an element to be bound to goes.** (kinda)  
Since we have now established the *select first, data next* approach, what happens if there aren't enough elements on the page?  
This is where the `.enter()` function comes into play. Now lets not have anything in our body (no `<p>` elements). [Check it](https://github.com/zafarali/experiments/commit/e338ffaafb98e65fb0dbcf88ce8bfefd4616130b#diff-d5639eaa4564b25357332b8c8df0cb16R10) out:
```javascript
var data = [ 1, 2, 3, 4 ];
d3.select('body')										//select the 'body'
	.selectAll('p')										//select all 'p's
	.data(data)												//bind the data
	.enter()													//use the 'enter()' function
	.append('p')											//append the extra 'p's we need
	.text(function(d, i){							//pass in a function with d and i
		return 'A Journey Begins '+d;		//Return our desired text
	});
```
Ok lets move on.  
  
Wait. I didn't mention anything about the `.exit()` function! That is because it's not reall useful in this context. But imagine you had more `<p>`'s in your body than you needed and you wanted to remove them? Thats where 	`.exit()` comes in. If you bind your data and there are more elements than needed, the remaining elements can be accessed via the `.exit()` method. Example:
```javascript
var data = [ 1, 2, 3, 4, 5 ];
d3.select('body')
	.selectAll('p')
	.data(data)
	.text(function(d){
		return 'A Journey Begins '+d;
	}).exit() 			//access the exit() elements
	.remove()				//remove them!
```
[Check commit here](https://github.com/zafarali/experiments/commit/d6f1511bd9bac9b3e07950bf8f5ecf2f91570279#diff-d5639eaa4564b25357332b8c8df0cb16R9)  

#### Pit Stop 1: Other methods
So far we only focused on the `.text()` method but there are a variety of other methods we can use for example: `.attr()` and`.style()` Each of these takes an inital argument of the 'html attribute' or 'css attribute' respectively and a function or string to set it to. 

In [2-Barchart.html](https://github.com/zafarali/experiments/commit/036c859c01d53634c56e8abbb55f7354ef7e0207#diff-88823e4f424d50c354efce77a9ba8235) we see a barchart being made using the knowledge we have so far.

### SVG
*Note: I Assume here some familliarity with SVG and how it is encoded. Ideally you should know about `circ` and `rect` and their properties and how to style them. [Refer to this tutorial if you want to know more - An SVG Primer by Scott Murray](http://alignedleft.com/tutorials/d3/an-svg-primer)*
The same logic applies here but this time with SVGs. We `.select()` the `<body>` and append an `<svg>` on it and modify its `height` and `width` attributes. Then we `selectAll()` of the `<rect>`s i it. `data()` bind  the `dataset` and `enter()`. Now we `append()` the required number of rectangles and modify their attributes just like before! [This commit](https://github.com/zafarali/experiments/commit/2ba609898e05553fd0a17ea9b6a279b35be0fc29#diff-88823e4f424d50c354efce77a9ba8235R29) shows all.

### Basic Transitions
Transitions occur when an attribute is changed. There are three key aspects `.transition()`, `.duration(t)` and `.delay(t)`. `.transition()` signifies that everything after the function call will be animated. The `.duration(t)` changes the default length of the animation and `.delay(t)` changes the delay after which is appears. The last two can take in functions and output animations based on the data. In [this commit](https://github.com/zafarali/experiments/commit/ade15baa7c715b0f0d5584d66d241bb3a92d8647#diff-88823e4f424d50c354efce77a9ba8235R35) notice how I moved around and added default attributes to the `append()`ed `<rect>` before applying the transition and then specifying the changed `width` to which it would animate to.

### Text
For easier manipulation and to make sure we are referencing the same SVG element we use the following code:
```javascript
var svg = d3.select('body')
						.append('svg')
						.attr('height', 400)
						.attr('width', 400)
```
Now using the same `.enter()` process after `.data()` binding the `dataset` we can append text and move it around to make it visually pleasing. The final Barchart created is shown [here](https://github.com/zafarali/experiments/blob/master/js/d3/2-Barchart.html).  
*Note: Function passing allows us to manipulate the SVG elements in all kinds of ways. For example we can manipulate the color to mean different things. The possibilities are quite endless with data and d3!*

#### Scaling
So far, data that would have a value of 400 would be mapped to a `rect` with `width` of 400, that means that if your data increases your widest `rect` will be very wide! Scaling is a way to map your data into a viable relative output. D3 comes with a few built in scales. These can be accessed using `var scale = d3.scale.linear()` which in this case returns to you a linear scale. By default this mapping occurs 1:1 so inputting `scale(100)` and `scale(5000)` returns 100 and 5000 respectively. By calling `.domain()` and `.range()` with starter/ending values D3 will automatically scale things for you.
