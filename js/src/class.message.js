/*
 --------------------------------------------------
 CREATING AN OBJECT:						MESSAGE
 -------------------------------------------------- */
function Message(properties){
	if(properties.x === undefined){
		properties.x = 0;
	}
	if(properties.y === undefined){
		properties.y = 0;
	}
	if(properties.content === undefined){
		properties.content = 50;
	}
	if(properties.color === undefined){
		properties.color = "#000";
	}
	if(properties.font === undefined){
		properties.font = "";
	}
	
	this.x      	= properties.x;
	this.y      	= properties.y;
	this.content  	= properties.content;
	this.color		= properties.color;
	this.font		= properties.font;
	//this.max_width	= m_w;
	
	
	this.born 	=	function(){
		// Code wasn't here
	};
	this.die  	=	function(){
		// Code wasn't here
	};	
}
 
var CanvasImage = {
	src: "",
	x: 0,
	y: 0
};
