//Objects
function Molecule(moleculeName, mtype){
	this.molName = moleculeName;
	this.molType = mtype;
	this.isOrganic = true;
	this.setType = function(mtype){
		this.molType = mtype;
	}
	this.setOrganic = function(bool){
		if(typeof(bool)=='boolean'){
			this.isOrganic = bool;
		}
	}
}
function Protein(proteinName, ptype){
	this.proteinName = proteinName;
	var proteinType = ptype;
	var domains = [];
	var activators = [];
	var inhibitors = [];

	//setters
	this.setType = function(ptype){
		proteinType = ptype;
	} 
	this.setActivators = function(arg){
		activators=arg;
	}
	this.setInhibitors = function(arg){
		inhibitors=arg;
	}

	//adders
	this.addActivator = function(arg){
		activators.push(arg);
	}
	this.addInhibitor = function(arg){
		inhibitors.push(arg);
	}
	this.addDomain = function(newdomain){
		domains.push(newdomain);
	}

	//getters
	this.getDomains = function(){
		return domains;
	}
	this.getName = function(){
		return proteinName;
	}
	this.getInhibitors = function(){
		return inhibitors;
	}
	this.getActivators = function(){
		return activators;
	}
	this.getType = function(){
		if(proteinType==null){
			return "Generic Protein";
		}else{
			return proteinType;
		}
	}
}//end Protein

function Reaction(reactants, products, catalyst){
	if(typeof(reactants)== undefined || typeof(products)==undefined){
		this.reactants = ['error'];
		this.products = ['error'];
	}else{
		if(reactants instanceof Protein){
			this.reactants = [reactants];
		}else if(reactants instanceof Array){
			this.reactants=reactants;
		}
		if(products instanceof Protein){
			this.products=[products];
		}else if(products instanceof Array){
			this.products=products;
		}
	}
	if(typeof(catalyst)!=undefined && catalyst.getType=='catalyst'){
		this.catalyst = catalyst;
	}
}

Reaction.prototype.toString = function(){
		var s="";
		var k=0;
		for(reactant in this.reactants){
			if(k>=1){
				s+=" + ";
			}
			s+=reactant;
			k++;
		}
		k=0;
		s+=" --"+this.catalyst.getName()+"--> ";
		for(product in this.products){
			if(k>1){
				s+=" + ";
			}
			s+=product;
			k++;
		}
		return s;
	}
//tester function for quick printing
var p = function(x){
	console.log(x);
}

var fumarate = new Molecule("Fumarate");
var malate = new Molecule("Malate");
var cat = new Protein("Fumarase", "catalyst");
var myreaction = new Reaction(fumarate,malate,cat);
p(myreaction);
