
//defined in global scope
var world = 'world';


//self executing function
(function(w,d){
	//attaches hello to the global scope
	w.hello = 'hello';

	//prints 'hello world'
	console.log(w.hello+' '+w.world);

	//attaches bye to the private scope
	var bye = 'bye';
})(window, document);

//prints 'hello world'
console.log(hello+' '+world);

//will throw an error because bye is not defined in the global scope
console.log(bye);