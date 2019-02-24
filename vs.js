/*
==================================================================================

	NOTE:
	It would be not recommended to use variables 
	with identical name like "this.Identity" when using inheritance.

	The code below serves only demonstration purposes. It could be improved.
	
	

==================================================================================





==================================
	STRUCTURE:
	
		God
		 |
		 /\
		/  \
	    Angel  Devil
	       |     |
	GoodHuman  BadHuman
==================================
*/

//*


"use strict";



function God(name)
{
	//Inherits from global Object

	this.Identity = name;
	this.isGod = true;
}


function Angel(name)
{
	//Inherits from "God".
	//Calls temporarily the God constructo/function
	God.call(this); 
	
	this.Identity = name;
	this.isAngel = true;
}



function Devil(name)
{
	//Inherits from "God"
	God.call(this);

	this.Identity = name;
	this.isDevil = true;
}



function GoodHuman(name)
{
	//Inherits from "Angel"
	Angel.call(this);
	
	this.Identity = name;
	this.isGoodHuman = true;
}



function BadHuman(name)
{
	//Inherits from "Devil"
	Devil.call(this);
	
	this.Identity = name;
	this.isBadHuman = true;
}



//	==================
//	Prototype Chaining
//	==================

Angel.prototype = Object.create(God.prototype); 
Angel.prototype.constructor = Angel; 		



Devil.prototype = Object.create(God.prototype); 
Devil.prototype.constructor = Devil; 			



GoodHuman.prototype = Object.create(Angel.prototype); 	
GoodHuman.prototype.constructor = GoodHuman;		



BadHuman.prototype = Object.create(Devil.prototype); 
BadHuman.prototype.constructor = BadHuman; 	



//	==============================
//	Prototype Methods & Attributes
//	==============================

Angel.prototype.hasSword 	= "Flame Sword";
Devil.prototype.hasTrident 	= "Trident of Darkness";


//Method creates copies an instance
God.prototype.createsClone = function()
{
	return new this.constructor("Clone of " + this.Identity);
}



//	=========
//	Instances
//	=========

var Hannibal_Lecter 	= new BadHuman	("Hannibal_Lecter");
var Santa_Claus 	= new GoodHuman	("Santa_Claus");
var Dead_Son_Goku 	= new Angel	("Dead_Son_Goku");
var Shinigami 		= new Devil	("Shinigami");
var Zeus		= new God	("Zeus");


//Instance of a global object!
var Global_Object 	= new Object();




//	=====
//	Flags
//	=====

var Flag = 
{
	//Generates dynamically flag variables within the object "Flag"
	generating: function(fromFileNames)
	{
		
		for(var nameID = 0; nameID < fromFileNames.length; nameID++)
		{
			this[fromFileNames[nameID].name] = false;
		}
		
	},
	
	//Activates and deactivates Flags which is used to identify the needed image (e.g. interface) 
	settingTo: function(type)
	{
		
		for(var object in this)
		{
			
			if(object === type)
			{
				
				//This is the wanted object (by clicking the one in Diagram or the specific button)
				this[object] = true;

				
			}
			else if(object != 'settingTo')
			{
				
				//Preventing function overwriting
				this[object] = false;
				
				
			}	
			
		}
		
	}
	
}//Flag




//	===================
//	Interface - Console
//	===================

console.log("--------------------START-----------------------");

console.dir(Hannibal_Lecter);
console.dir(Santa_Claus);
console.dir(Dead_Son_Goku);
console.dir(Shinigami);
console.dir(Zeus);
console.dir(Global_Object);

console.log("---------------------END------------------------");



//	==============================
//	Interface - Initialize Diagram
//	==============================

function initTable()
{
	/*
		Position numbers are:
		 1  2  3  4  5
		 6  7  8  9 10
		11 12 13 14 15
		16 17 18 19 20
	*/
	var positions 	= document.getElementsByClassName('table-position');
	var cells	= document.getElementsByTagName('TD'); 
	var maxNumOfPos = cells.length;
	var picID	= 0;
	var pictures	= 0;
	var clone	= 0;
	var normal 	= "images/normal/";
	

	//Fill the table-cells with pictures
	for(var num = 0; num < maxNumOfPos; num++, picID++)
	{
		//Getting picture name(s)
		pictures = positions[picID].name;
		
		//Make an array of picture names
		pictures = pictures.split(" "); 

		//If there is more than one picture within a cell, then...
		if(pictures.length > 1)
		{
			//Preparing style attributes to overlapp pictures
			cells[num].style.position 	= "relative"; 	//TD
			positions[picID].style.position = "absolute";	//IMG
			positions[picID].style.top 	= "0";		//IMG
			positions[picID].style.right 	= "0";		//IMG
		

			//Copying/cloning the actual <img> tag
			var clone = positions[picID].cloneNode(true);
			
			
			
			//Adding now more than one pic into the table cell
			for(var pic = 0; pic < pictures.length; pic++)
			{
				
				//Full folder path of the picture
				positions[picID].src = normal + pictures[pic];
				
				//IMG tag can only hold one picture
				positions[picID].name = pictures[pic];

				//If not the last picture, then...
				if(pic < pictures.length-1)
				{
					//Append the picture to the cell
					cells[num].appendChild(clone);
					
					//Amount of pictures now in general increased
					picID++;
					
				}
				

			}
			
		}
		else
		{
			//Just one picture in one cell needed
			positions[picID].src = normal + pictures[0];
		}


	}

}


//Building Diagram
initTable();


//Generating and Initializing Flags
Flag.generating(document.getElementsByClassName('table-position'));




//	=============================
//	Interface - Highlight Diagram
//	=============================


function highlighting(img)
{
	var positions 	= document.getElementsByClassName('table-position');
	var coloured 	= "images/coloured/";
	var normal 	= "images/normal/";
	var pictureIDs	= [];
	var picture	= 0;		
	
	
	//Getting connected picture IDs
	pictureIDs = img.id.split(" ");
	
	
	//Reseting every image to normal/default version 
	for(var pic = 0; pic < positions.length; pic++)
	{
		positions[pic].src = normal + positions[pic].name;
	}
	
	
	//Add colured(highlighted) pictures
	for(var id = 0; id < pictureIDs.length; id++)
	{
		
		//Getting picture file name
		picture = positions[pictureIDs[id]].name;
		
		//Setting folder in which highlighted picture file is found
		picture = coloured + picture;
		
		//Showing highlighted picture in Browser
		positions[pictureIDs[id]].src = picture;
		
	}
	

}




//	====================
//	Interface - Web Text
//	====================


function WebInterface(copy, buffer)
{
	
	if(Flag['God.png'])
	{
		
		showData(Zeus, copy, buffer);
		
	}
	else if(Flag['Angel.png'])
	{
		
		showData(Dead_Son_Goku, copy, buffer);
		
	}
	else if(Flag['Devil.png'])
	{
		
		showData(Shinigami, copy, buffer);
		
	}
	else if(Flag['GoodHuman.png'])
	{
		
		showData(Santa_Claus, copy, buffer);
		
	}
	else if(Flag['BadHuman.png'])
	{
		
		showData(Hannibal_Lecter, copy, buffer);
		
	}
	
}



function showData(Instance, copy, buffer)
{
	var Interface = 0;
	
	
	if(copy)
	{
		//If copy button is pressed: Switching to second interface and creating an copy of an instance
		Interface	= document.getElementsByClassName('buffer-content');
		Instance	= Instance.createsClone();
		
	}
	else if(buffer)
	{
		//If buffer button is pressed: Just switching to second interface
		Interface	= document.getElementsByClassName('buffer-content');
	}
	else
	{
		//If an object on diagram is clicked: Show content within main interface
		Interface	= document.getElementsByClassName('main-content');
		
	}
	
	
	//Instance name:
	Interface[0].innerHTML = Instance.Identity;
	//Instance Of:
	Interface[1].innerHTML = Object.getPrototypeOf(Instance).constructor.name;


	//Cleaning content of "Properties:"
	Interface[2].innerHTML = "";


	//Properties:
	for(var property in Instance)
	{

		//Sepreting all properties with an comma
		Interface[2].innerHTML += property + ", ";
	}
	

	//Prototype Of:
	//Prototype Chain:
	if(Object.getPrototypeOf(Instance) === God.prototype)
	{
		Interface[3].innerHTML = "Object";
		Interface[4].innerHTML = "Object";
	}
	else if(Object.getPrototypeOf(Instance) === Angel.prototype || Object.getPrototypeOf(Instance) === Devil.prototype)
	{
		Interface[3].innerHTML = "God";
		Interface[4].innerHTML = "God, Object";
	}
	else if(Object.getPrototypeOf(Instance) === GoodHuman.prototype)
	{
		Interface[3].innerHTML = "Angel";
		Interface[4].innerHTML = "Angel, God, Object";
	}
	else if(Object.getPrototypeOf(Instance) === BadHuman.prototype)
	{
		Interface[3].innerHTML = "Devil";
		Interface[4].innerHTML = "Devil, God, Object";
	}
	
	
}
//*/
