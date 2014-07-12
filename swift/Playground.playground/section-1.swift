// Playground - noun: a place where people can play

//variables are defined with 'var' keyword
var thisIsAVariable = 100

//constants are defined with the 'let' keyword
let thisIsAConstant = 100

//swift has automatic type inference. However you can be explicit!

let myInteger = 70
let myDouble = 70.0
let explicitDouble: Double = 70 //here we specified the type after the colon
let explicitFloat: Float = 4




//type conversion is not automatic
let label = "The following is a number: "
let width = 94
//here we convert the int into a String.
let fullLabel = label+String(width)

//here is a shorthand to convert ints-> stings on the fly
let shortHand = "The following is a number: \(width)"




// creating an array as usual.
var myArray = [ "Apples", "Bannanas", "Mangos", "Oranges", "Peaches", "Grapes" ]

//access/reassign as usual
myArray[1]
myArray[2] = "Cheese"

//creating a dictionary/associatve array
var myDict = [
    "Hello": "A greeting",
     "Bye" : "A parting comment"
]
//access and reassign/insert as usual
myDict["Hello"]
myDict["World"] = "Where everybody lives"

//empty arrays and dictionaries are created as follows:
let emptyStringArray = [String]()
let emptyDictionary = [Int:String]()





