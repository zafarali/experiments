//Objects
function Molecule(moleculeName, mtype){
	this.molName = moleculeName;
	this.molType = mtype;
	this.setType = function(mtype){
		this.molType = mtype;
	}
}
function Protein(proteinName, domains){
	this.proteinName = proteinName;
	var proteinType = null;
	if(typeof(domains)===undefined){
		var domains = [];
	}else{
		var domains = domains;
	}
	var activators = [];
	var inhibitors = [];
	this.setType = function(ptype){
		proteinType = ptype;
	} 
	this.setActivators = function(arg){
		activators=arg;
	}
	this.setInhibitors = function(arg){
		inhibitors=arg;
	}
	this.addActivator = function(arg){
		activators.push(arg);
	}
	this.addInhibitor = function(arg){
		inhibitors.push(arg);
	}
	this.addDomain = function(newdomain){
		domains.push(newdomain);
	}
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

}
//tester function for quick printing
var p = function(x){
	console.log(x);
}


