function init(){
	main();
var canvas				 = document.getElementById('progressbar');
var	context 			 = canvas.getContext('2d');
var	destinationUrl = document.getElementsByTagName('form')[0].getAttribute('action');
var	list 					 = [];
var	totalSize			 = 0;
var	totalProgress	 = 0;
console.log(canvas,context,destinationUrl,list,totalSize,totalProgress);

//draws the progressbar
function drawProgress(progress){
	context.clearRect(0, 0, canvas.width, canvas.height);

	context.beginPath();
	context.strokeStyle = 'blue';
	context.fillStyle = 'blue';
	context.fillRect(0, 0, progress*500, 20);
	context.closePath();

	context.font = '16px Verdana';
	context.fillStyle = 'red';
	context.fillText('Uploading...', 50, 15);

}

function processFiles(filelist){
	if(!filelist || !filelist.length) return;

	totalSize = 0;
	totalProgress = 0;

	for(var i = 0, l = filelist.length; i < l && i < 5; i++) {
		list.push(filelist[i]);
		totalSize += filelist[i].size;
	}
	uploadNext();
}

function handleComplete(size){
	totalProgress += size;
	drawProgress(totalProgress/totalSize);
	uploadNext();
}

function handleProgress(e){
	var progress = totalProgress + e.loaded;
	drawProgress(progress/totalSize);
}

function uploadFile(file){
	var xhr = new XMLHttpRequest();

	xhr.open('POST', destinationUrl);
	xhr.onload = function(){
		fileContent.innerHTML += this.responseText;
		handleComplete(file.size);
	}
	xhr.onerror = function(){
		fileContent.innerHTML += this.responseText;
		handleComplete(file.size);
	}
	xhr.upload.onprogress = function(event){
		handleProgress(event);
	}
	xhr.upload.onloadstart = function(e){}

	var formData = new FormData();
	formData.append('uploadedFile', file);
	xhr.send(formData);
}

function uploadNext(){
	if(list.length){
		fileContent.innerHTML += 'uploading... 1 of '+list.length-1;
		var nextFile = list.shift();
		uploadFile(nextFile);
	}else{
		fileContent.innerHTML += 'no more files to upload!';
	}
}

dropZone.addEventListener('drop', function(e){
	if(e.preventDefault) e.preventDefault();
	if(e.stopPropagation) e.stopPropagation();

	this.className = "";

	//we retrieve a list of files associated with the dataTransfer object
	var files = e.dataTransfer.files;

	//here we check that there is actually something in the list
	if(files.length > 0){
		processFiles(files);
		//readText(files[0]); //call a function to read the text;
	}
});
}
window.onload = init;