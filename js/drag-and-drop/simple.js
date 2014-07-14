function dragStart(ev){
	ev.dataTransfer.effectAllowed = 'move';
	ev.dataTransfer.setData('Text', ev.target.getAttribute('id'));
	ev.dataTransfer.setDragImage(ev.target, 20, 20);
	return true
}

function dragEnter(ev){
	ev.preventDefault();
	return true;
}
function dragOver(ev){
	ev.preventDefault();
}

function dragDrop(ev){
	var data = ev.dataTransfer.getData('Text');
	event.target.appendChild(document.getElementById(data));
	ev.stopPropagation();
	return false;
}

