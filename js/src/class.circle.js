/*
 --------------------------------------------------
 CREATING AN OBJECT:						 CIRCLE
 -------------------------------------------------- */
 
var overOK  = false;
var hoverObj = {};


function Circle(properties){
	if(properties.x === undefined){
		properties.x = 0;
	}
	if(properties.y === undefined){
		properties.y = 0;
	}
	if(properties.radius === undefined){
		properties.radius = 50;
	}
	if(properties.strokeWidth === undefined){
		properties.strokeWidth = 5;
	}
	if(properties.strokeColor === undefined){
		properties.strokeColor = "#6b6b6b";
	}
	if(properties.backColor === undefined){
		properties.backColor = "#6b6b6b";
	}
	if(properties.clip === undefined){
		properties.clip = true;
	}
	if(properties.imageSrc === undefined){
		properties.imageSrc = "";
	}
	if(properties.title === undefined){
		properties.title = "Titolo";
	}
	if(properties.descr === undefined){
		properties.descr = "Descrizione";
	}

	this.x      		= properties.x;
	this.y      		= properties.y;
	this.title      	= properties.title;
	this.descr      	= properties.descr;
	this.radius 		= properties.radius;
	this.strokeWidth 	= properties.strokeWidth;
	this.strokeColor 	= properties.strokeColor;
	this.clip 			= properties.clip;
	this.backColor 		= properties.backColor;
	this.imageSrc 		= properties.imageSrc;
	this.loading		= false;
	var OGGETTO			= this;
	
	this.setRadius 	=	function(raggio){
		this.radius=raggio;
	};
	this.born 	=	function(radius,time,callback){
		var i = 0;
		var raggio = radius, tempo = time;
		var y = 0,a = coeffA(raggio,tempo),b = coeffB(raggio,tempo);
				
		var anim = setInterval(function(){
			i++;
			y = a*i*i + b*i;
			OGGETTO.setRadius(y);
			if(y>=raggio){
				clearInterval(anim);
				callback();
			}
		},10);
	};

	this.setPosition 	=	function(x,y){
		this.x = x;
		this.y = y;
	};

	this.die  		=	function(time,callback){
		if(callback === undefined) callback = function(){};

		var questo=this;
		var i = time-5;
		var raggio = this.radius+5, tempo = time;
		var y = 0,a = coeffA(raggio,tempo),b = coeffB(raggio,tempo);
				
		var anim = setInterval(function(){
			i++;
			y = a*i*i + b*i;
			questo.setRadius(y);
			if(y<=0){ 
				clearInterval(anim);
				callback();
			}
		},10);
	};
	this.clicked = false;
	this.action_click = function(){

		for(var f in Portfolio.circles){
			Portfolio.circles[f].clip = false;
			Portfolio.circles[f].radius = 10;
		}
		OGGETTO.lookAt(70,20);
		
		var minus = 0;
		
		$("#current_msg").css("text-align","left");

	   	if(Portfolio.circles[f] == OGGETTO){
	    	minus = -170 - $("#current_msg").width();
	    	$("#current_msg").css("text-align","right");
	    }
		$("#current_msg").css("left",OGGETTO.x + minus + $("#portfolio").offset().left + 85);
		
		$("#current_msg").css("top",OGGETTO.y + $("#portfolio").offset().top - 35);
		$("#current_msg .title").html(OGGETTO.title);
		$("#current_msg .description").html(OGGETTO.descr);

		OGGETTO.clicked = true;
		OGGETTO.clip = true;
		CanvasImage.src = OGGETTO.imageSrc;
		var img = document.getElementById("back_canvas");

		img.src = OGGETTO.imageSrc;	
						
		$("#back_canvas").ready(function(){
			img = document.getElementById("back_canvas");
			CanvasImage.x = OGGETTO.x - img.width/2;
			CanvasImage.y = OGGETTO.y - img.height/2;
		});
		$("#bar_value").css("margin-left",indexZoom * $("#bar_value").width());

	};
	this.action_dblClick = function(){
		for(var c in works){
			if(works[c].src == OGGETTO.imageSrc) indexZoom = c;
		}
		//$("#portfolio").css("opacity","0");
		$("#portfolio").css("z-index","-1000");
		$("#current_msg").css("opacity","0");
		$("#canv_message").css("opacity","0");
		$("#descr_container").css("z-index","1000");
		$("#top_mark").html("<img src='images/mini-arrow.png' alt='arrow' />Back to <b>works</b>");
		description = true;
		describe(indexZoom);
		window.setTimeout(function(){
			$("#descr_container .work_descr").css("margin-left","0%");
			$("#descr_container").css("background","#f4f4f4");
		},500);
	};
	this.move = false;
	this.action_move = function(){
		if(!OGGETTO.move){
			for(var f in Portfolio.circles){
				if(!Portfolio.circles[f].clicked){
					Portfolio.circles[f].radius =10 ;
				}
			}
			OGGETTO.lookAt(20,20) ;
			var img = document.getElementById("pre_back_canvas");
			img.src = OGGETTO.imageSrc;	
		}
		OGGETTO.move=true;
				
	};
	this.lookAt 	=	function(radius,time,callback){
		if(radius === undefined){
			radius = 20;
		}
		if(time === undefined){
			time = 20;
		}
		if(callback === undefined){
			callback = function(){};
		}

		var i = 0;
		var raggio = radius, tempo = time;
		var y = 0,a = coeffA(raggio,tempo),b = coeffB(raggio,tempo);
		var start = OGGETTO.radius;		
		var anim = setInterval(function(){
			i++;
			y = a*i*i + b*i;
			if(y > start) OGGETTO.radius = y;
			if(y>=raggio){
				clearInterval(anim);
				callback();
			}
		},10);
	};
	
}
 
