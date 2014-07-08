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

### Pit Stop 1: Other methods
So far we only focused on the `.text()` method but there are a variety of other methods we can use for example: `.attr()` and`.style()` Each of these takes an inital argument of the 'html attribute' or 'css attribute' respectively and a function or string to set it to. 