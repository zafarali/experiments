// Created by Zafarali Ahmed 

//this function is called when we start dragging 
function dragStart(ev){

	//here we set the 'effectAllowed' property
	ev.dataTransfer.effectAllowed = 'move';

	//here we associate some data to the dataTransfer object specifically the id of the elemnt
	ev.dataTransfer.setData('Text', ev.target.getAttribute('id'));
	
	//here we set the image that will be shown when we drag
	ev.dataTransfer.setDragImage(ev.target, 20, 20);
	return true
}

function dragEnter(ev){

	//here we prevent the default behaviour
	ev.preventDefault();
	return true;
}
function dragOver(ev){
	ev.preventDefault();
}

function dragDrop(ev){
	//we retrieve the data stored in our dataTransfer ibject
	var data = ev.dataTransfer.getData('Text');
	//to our target we append our dragged item.
	event.target.appendChild(document.getElementById(data));
	//we stop propagating the event
	ev.stopPropagation();
	return false;
}

