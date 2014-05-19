/* CARD GENERATOR
Built from scratch by Zafarali Ahmed
Cards can be numbered from 2 to 10 or faces J Q K A
these will be numbered from 2 to 14 respectively.
Cards can have a suit which are either black: S (♠), C (♣) ; or red: H (♥), D (♦)
these will be numbered 1 2 3 4 respectively
*/

function Deck(){
	var deck = [];
	//generate the deck:
	this.reset = function(){
		this.deck = [];
		for (var i = 2; i<15; i++){
			for(var j = 1; j<5; j++){
				deck.push(new Card(i,j));
			}
		}
	}
	this.draw = function(num){
		if(typeof num === 'undefined' || num < 1) num = 1;
		var drawn = [];
		for(var l = 0; l<num; l++){
			var idx = Math.floor(Math.random() * (deck.length-1));
			drawn.push(deck[idx]);
			deck.splice(idx,1);
		}
		return drawn;
	}
	this.size = function(){
		return deck.length;
	}
}

function Card(val, su){
	var v = val;
	var s = su;

	//returns the value of the card for display
	this.value = function(){
		if(v <= 10){
			return v;
		}else{
			switch(v){
				case 11:
				return "J";
				case 12:
				return "Q";
				case 13:
				return "K";
				case 14:
				return "A";
			}
		}
	}
	
	this.suit = function(){
		switch(s){
			case 1:
			return "S";
			case 2:
			return "C";
			case 3:
			return "H";
			case 4:
			return "D";
		}
	}

	this.color = function(){
		if(s <3) 
			return "black";
		else
			return "red";
	}

	this.rawSuit = function(){ return s; }
	//returns the raw value (allows for computations)
	this.rawValue = function(){ return v; }

	this.toString = function(){
		return this.suit()+" "+this.value()+" "+this.color();
	}
}

var g = new Deck();
g.reset();
console.log(g.size());
tmp = g.draw(2);
	for(k=0; k<tmp.length; k++){
	console.log(tmp[k].toString());
}
console.log(g.size());