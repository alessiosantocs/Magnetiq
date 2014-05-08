/*!
CANVAS CONSTELLATION				 FIRST VERSION
--------------------------------------------------
Okay, this is an experimental constellation of ci-
rcles made in Canvas, HTML5 and Javascript.

Every stuff you see in here is property and produ-
ction of Alessio Santo, all rights reserved.

Don't touch anything down here please.
---------------------------------------------------
THE CODE STARTS HERE
 */
 
 
 /*
 --------------------------------------------------
 CREATING AN OBJECT:					  PORTFOLIO
 -------------------------------------------------- */
var Portfolio={
	circles: [],
	messages: [],
	lineWidth: 4,
	init: function(){
		alert("i'm ready to create circles");
	},
	setCircle:function(properties){
		if(properties.x === undefined){
			properties.x = 0;
		}
		if(properties.y === undefined){
			properties.y = 0;
		}
		if(properties.radius === undefined){
			properties.radius = 50;
		}
		if(properties.time === undefined){
			properties.time = 10;
		}
		if(properties.strokeWidth === undefined){
			properties.strokeWidth = 5;
		}
		if(properties.strokeColor === undefined){
			properties.strokeColor = "#6b6b6b";
		}
		if(properties.clip === undefined){
			properties.clip = true;
		}
		if(properties.backColor === undefined){
			properties.backColor = "#6b6b6b";
		}
		if(properties.callback === undefined){
			properties.callback = function(){};
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

		this.circles.push(new Circle({
			x: properties.x,
			y: properties.y,
			radius: 0,
			strokeWidth: properties.strokeWidth,
			strokeColor: properties.strokeColor,
			backColor: properties.backColor,
			imageSrc: properties.imageSrc,
			title: properties.title,
			descr: properties.descr,
			clip: properties.clip
		}));
		
		var l = this.circles.length;
		this.circles[l-1].born(properties.radius,properties.time,properties.callback);
		return Portfolio;
	},
	unsetCircle:function(callback){
		if(callback === undefined) callback=function(){Portfolio.circles.pop();};
		
		var questo=this;
		var l = this.circles.length;
		this.circles[l-1].die(20,callback);

		return Portfolio;
	},
	setMessage:function(properties){
		if(properties.x === undefined){
			properties.x = 0;
		}
		if(properties.y === undefined){
			properties.y = 0;
		}
		if(properties.content === undefined){
			properties.content = "Contenuto";
		}
		if(properties.color === undefined){
			properties.color = "#000";
		}
		if(properties.font === undefined){
			properties.font = "13px Arial ";
		}

		this.messages.push(new Message({
			x: properties.x,
			y: properties.y,
			content: properties.content,
			color: properties.color,
			font: properties.font
		}));
		return Portfolio;

	},
	unsetMessage:function(){
		this.messages.pop();
		return Portfolio;

	},
	oneSelected:function(){
		var index = -1;
		for(var i in Portfolio.circles){
			if(Portfolio.circles[i].clicked) index=i;
		}
		
		return index;
	}/*,
	select: function(work_id){
		alert("what a fuck!");
		$.ajax({
			type: 'POST',
			url: "PHP/script.php",
			data:{
				command:"work_info",
				id:work_id
			},
			success:function (response){
				eval(response);
			}
		});
	}*/
};

function coeffB(obj,vel){
	var b = 2*obj/vel;
	return b;
}
function coeffA(obj,vel){
	var a = -obj/(vel*vel);
	return a;
}
