/* CARD GENERATOR
Built from scratch by Zafarali Ahmed
Cards can be numbered from 2 to 10 or faces J Q K A
these will be numbered from 2 to 14 respectively.
Cards can have a suit which are either black: S (♠), C (♣) ; or red: H (♥), D (♦)
these will be numbered 1 2 3 4 respectively
*/

function Deck(){
	var deck = [];

	//reset or generate the new deck:
	this.reset = function(){
		this.deck = [];
		for (var i = 2; i<15; i++){
			for(var j = 1; j<5; j++){
				deck.push(new Card(i,j));
			}
		}
	}

	//draw a random num of cards from the deck
	this.draw = function(num){
		if(typeof num === 'undefined' || num < 1) num = 1;
		var drawn = []; //holds the cards drawn so far
		
		for(var l = 0; l<num; l++){
			//generates a random index to draw
			var idx = Math.floor(Math.random() * (deck.length-1));
			drawn.push(deck[idx]);
			deck.splice(idx,1);
		}

		return drawn;
	}

	//returns the size of the deck
	this.size = function(){
		return deck.length;
	}
}

function Card(val, su){
	var v = val;//value or face
	var s = su;//the suit

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
	
	//returns the suit of the card for display
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

	//returns the color of the card
	this.color = function(){
		if(s <3) 
			return "black";
		else
			return "red";
	}

	//returns the raw suit (1,2,3,4)
	this.rawSuit = function(){ return s; }

	//returns the raw value (allows for computations)
	this.rawValue = function(){ return v; }

	//string representation
	this.toString = function(){
		return this.suit()+" "+this.value()+" "+this.color();
	}
}

