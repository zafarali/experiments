
function main(){

//get the div which is the drop target
var dropZone = document.querySelector("#drop-zone");

//get all divs that are draggable
var dragElements = document.querySelectorAll("#drag-elements div");

//keeps the reference to the element being moved
var elementDragged = null;

//add an event listener to each draggable element
for(var i = 0, l = dragElements.length; i < l; i++){
	dragElements[i].addEventListener('dragstart', function(event) {

		//sets the effect to move and data to the text inside
		event.dataTransfer.effectAllowed = 'move';
		event.dataTransfer.setData('text', this.innerHTML);

		//sets the ref to this
		elementDragged = this; 
	});

	dragElements[i].addEventListener('dragend', function(e) {
		elementDragged = null;
	});
}

//adding the event listener to the drop zone.
dropZone.addEventListener('dragover', function(e){
	if(e.preventDefault)
		e.preventDefault();
	e.dataTransfer.dropEffect = 'move';

	return false;
});


//adds the dragover/enter classes
dropZone.addEventListener('dragenter', function(e){
	this.className = "over";
});
dropZone.addEventListener('dragleave', function(e){
	this.className = "";
});

dropZone.addEventListener('drop', function(e){
	if(e.preventDefault)
		e.preventDefault()
	if(e.stopPropagation)
		e.stopPropagation();


	this.className = "";
	this.innerHTML = "Dropped "+e.dataTransfer.getData('text');

	//remove the element from our drag-elements div
	document.querySelector('#drag-elements').removeChild(elementDragged);

	return false;
});
}
window.onload = main;
