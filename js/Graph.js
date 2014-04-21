function Graph(){
	var nodesList = {};

	//adders
	this.addNode = function(content, key){
		var newNode = new Node(content,key);
		nodesList[key]=newNode;
	}

	//getters
	this.getNode = function(key){
		return nodesList[key];
	}

	/*this.contains = function(targetNode){
		for(node in nodesList){
			if(node.getContent()==targetNode.getContent()){
				return true;
			}
		}
		return false;
	}*/
	this.size = function(){
		return nodesList.length;
	}

	this.addEdge = function(from, to, weight){
		if(typeof(weight)!='number'){
			weight=1;
		}

		//if(!this.contains(from)){
			//this.addNode(from);
		//}
		//if(!this.contains(to)){
		//	this.addNode(to);
		//}

		nodesList[from.getKey()].addNeighbour(to,weight);
	}

	this.getNodes = function(){
		return nodesList;
	}
}

function Node(content,key){
	var content = content;
	var key = key;
	var neighbours = {};
	//getters

	this.getContent = function(){
		return content;
	}
	this.getNeighbours = function(){
		return this.neighbours;
	}
	//adders
	this.addNeighbour = function(node,weight){
		if(typeof(weight)!='number'){
			this.neighbours[node] = 1;
		}else{
			this.neighbours[node]=weight;
		}
	}
	this.getKey = function(){
		return key;
	}
	this.getWeight = function(between){
		return this.neighbours[between];
	}
	//setters
	this.setContent = function(newcontent){
		content = newcontent
	}
}

//testing

var p = function(o){
	console.log(o);
}
var g = new Graph();
p(g.size());

var mynode1 = new Node("hello", 2);
var mynode2 = new Node("bye", 1);
g.addNode(mynode1);
g.addNode(mynode2);
g.addEdge(mynode1,mynode2, 4);
var no = g.getNodes();
for(x in no){
	p(x.getContent());
}