function Graph(){

}

function Node(content,key){
	var content = content;
	this.key = key;
	var neighbours = [];
	//getters
	this.getContent = function(){
		return content;
	}
	this.getNeighbours = function(){
		return neighbours;
	}
	//adders
	this.addNeighbours = function(node,weight){
		if(typeof(weight)!='number'){
		neighbours[node] = 1;
		}else{
		neighbours[node]=weight;
		}
	}
	//setters
	this.setContent = function(newcontent){
		content = newcontent
	}
}