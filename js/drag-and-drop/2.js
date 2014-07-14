function main(){

var dropZone = document.querySelector("#drop-file-zone");
var fileContent = document.querySelector("#file-content");

//allows us to capture the drag in a dataTransfer event
dropZone.addEventListener('dragover', function(e){
	if(e.preventDefault) e.preventDefault();
	if(e.stopPropagation) e.stopPropagation();

	e.dataTransfer.dropEffect = 'copy';
});


//Standard class coloring as earlier.
dropZone.addEventListener('dragenter', function(e) {
  this.className = "over";
});

dropZone.addEventListener('dragleave', function(e) {
  this.className = "";
});

dropZone.addEventListener('drop', function(e){
	if(e.preventDefault) e.preventDefault();
	if(e.stopPropagation) e.stopPropagation();

	this.className = "";

	//we retrieve a list of files associated with the dataTransfer object
	var files = e.dataTransfer.files;

	//here we check that there is actually something in the list
	if(files.length > 0){
		readText(files[0]); //call a function to read the text;
	}
});

function readText (file) {
	var reader = new FileReader();

	//attach a callback function to be executed when the reader completes its load
	reader.onloadend = function(e){
		//we check if the event ready state is done.
		if(e.target.readyState == FileReader.DONE){
			//get the contents from the reader and display it
			var content = reader.result;
			fileContent.innerHTML = "File: "+file.name+"\n\n  "+content;
		}
	}

	//pass the file into the function below.
	reader.readAsText(file);
}
}
window.onload = main;
