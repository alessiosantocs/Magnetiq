/*!
CANVAS MAGNETIQ					 	 FIRST VERSION
--------------------------------------------------
Okay, this is an experimental game made in Canvas, 
HTML5 and Javascript.

Every stuff you see in here is property and produ-
ction of Alessio Santo, all rights reserved.

Don't touch anything down here please.
---------------------------------------------------
THE CODE STARTS HERE
 */
 
var lastCalledTime;
var fps;

function FPS() {

  if(!lastCalledTime) {
     lastCalledTime = new Date().getTime();
     fps = 0;
     return;
  }
  delta = (new Date().getTime() - lastCalledTime)/1000;
  lastCalledTime = new Date().getTime();
  fps = 1/delta;
  
} 


	window.requestAnimFrame = (function(){
		return  window.requestAnimationFrame   || 
    	    window.webkitRequestAnimationFrame || 
    	    window.mozRequestAnimationFrame    || 
    	    window.oRequestAnimationFrame      || 
    	    window.msRequestAnimationFrame     || 
    	    function(callback){
    	    	window.setTimeout(callback, 1000);
    	    };
	})();


/*
 --------------------------------------------------
 CREATING AN OBJECT:						  POINT
 -------------------------------------------------- */



function Point(properties){

	if(properties.x === undefined){
		properties.x = 0;
	}
	if(properties.y === undefined){
		properties.y = 0;
	}
	if(properties.radius === undefined){
		properties.radius = 4 + Math.random()*1;
	}
	if(properties.velocity === undefined){
		properties.velocity = 30;
	}
	if(properties.aggregation === undefined){
		properties.aggregation = null;
	}
	if(properties.distance === undefined){
		properties.distance = 50;
	}
	if(properties.type !== undefined){
		properties.radius = 10;
	}

	var self			= this;

	self.position    	= {
							x: properties.x,
							y: properties.y
						};						
	self.radius 		= properties.radius;
	self.velocity 		= properties.velocity;
	self.aggregation 	= properties.aggregation;
	self.distance	 	= properties.distance;
	
	
	self.setRadius 	=	function(raggio){
		self.radius=raggio;
	};

	self.setPosition 	=	function(x,y){
		self.position.x = x;
		self.position.y = y;
	};
	var internal = Math.random()*100000;
	self.muoviti = function(){
		if(self.aggregation !== undefined){
			var force = 10 * self.aggregation.radius * self.radius / self.distance;
			var velocity = force * 3;
			self.velocity = velocity;
			internal++;
    		var time = internal * 0.002 * self.velocity;
    		var center = {  x: self.aggregation.position.x, 
    						y: self.aggregation.position.y };
			self.position.x = self.distance * Math.cos(time) + center.x;
			self.position.y = self.distance * Math.sin(time) + center.y;
		}
	};
	
}
 
 
 /*
 --------------------------------------------------
 CREATING AN OBJECT:					  AGGREGATION
 -------------------------------------------------- */
function Aggregation(properties){

	if(properties.x === undefined){
		properties.x = 0;
	}
	if(properties.y === undefined){
		properties.y = 0;
	}
	if(properties.radius === undefined){
		properties.radius = 10;
	}
	if(properties.velocity === undefined){
		properties.velocity = 30;
	}
	if(properties.distance === undefined){
		properties.distance = 30;
	}
	if(properties.aggregation === undefined){
		properties.aggregation = null;
	}
	if(properties.pointer === undefined){
		properties.pointer = null;
	}

	
	var self			= this;

	self.position    	= {
							x: properties.x,
							y: properties.y
						};						
	self.radius 		= properties.radius;
	self.distance 		= properties.distance;
	self.velocity 		= properties.velocity;
	self.aggregation 	= properties.aggregation;
	self.pointer	 	= properties.pointer;
	
	var internal = Math.random()*100000;
	self.muoviti = function(){
		if(self.aggregation != null){
			var force = 10 * self.aggregation.radius * self.radius / self.distance;
			var velocity = force * 2;
			self.velocity = velocity;
			internal++;
    		var time = internal * 0.002 * self.velocity;
    		var center = {  x: self.aggregation.position.x, 
    						y: self.aggregation.position.y };
			self.position.x = self.distance * Math.cos(time) + center.x;
			self.position.y = self.distance * Math.sin(time) + center.y;
		}
	};
	
	self.reachThePointer = function(){
		if(self.pointer != null){
			var head = self.pointer.passages[self.pointer.passages.length - 1];
			var x = 0,y = 0;
			var dX = Math.abs(self.position.x - head.position.x);
			var dY = Math.abs(self.position.y - head.position.y);
			
			var coeffX = dX / 2000;
			var coeffY= dY / 2000;
			
			if(self.position.x < head.position.x){
				x = coeffX;
			}else{
				x = -coeffX;
			}
			
			if(self.position.y < head.position.y){
				y = coeffY;
			}else{
				y = -coeffY;
			}
			
			self.position.x += x;
			self.position.y += y;
			
		}

	};
}

function Track(q,device){

	function Passage(x,y){
		this.position = {
			x: x,
			y: y
		};
	}

	var self = this;
	
	self.out = false;
	self.passages = [];
	var lastX = q.width + 50, lastY = q.height + 50;
	
	for(var i = 0; i < 50; i++){
		self.passages.push(new Passage(q.width + 50, q.height +  50));
	}

	self.initialize = function(){
		
		if(device == "desktop"){
			q.addEventListener("mousemove",function(e){
				e.preventDefault();
				lastX = e.pageX;
				lastY = e.pageY;
				
			});
	
			q.addEventListener("mouseover",function(e){
				e.preventDefault();
				//console.log("entrato");
				//self.out = false;
			});
			q.addEventListener("mouseout",function(e){
				e.preventDefault();
				//console.log("uscito");
				self.out = true;
			});
		}

		if(device == "mobile"){
			
			q.addEventListener("touchmove",function(e){
				e.preventDefault();
				var touch = e.touches[0];
				lastX = touch.pageX;
				lastY = touch.pageY;
			});
		
			q.addEventListener("touchstart",function(e){
				e.preventDefault();
				//self.passages = [];
				/*for(var i = 0; i < 50; i++){
						self.passages.push(new Passage(e.pageX,e.pageY));
				}*/
			});
		}
		
		self.update = function (){
			var head = self.passages[self.passages.length - 1];
			var x = 0,y = 0;
			var dX = Math.abs(lastX - head.position.x);
			var dY = Math.abs(lastY - head.position.y);
			
			var coeffX = dX / 15;
			var coeffY= dY / 15;
			
			if(lastX > head.position.x){
				x = coeffX;
			}else{
				x = -coeffX;
			}
			
			if(lastY > head.position.y){
				y = coeffY;
			}else{
				y = -coeffY;
			}
			
			head.position.x += x;
			head.position.y += y;
		
			for(var i = 0; i < self.passages.length - 1; i++){
					self.passages[i].position.y = self.passages[i + 1].position.y;
					self.passages[i].position.x = self.passages[i + 1].position.x;
			}
			
		};
		
	};
	self.initialize();
	
}





function MagnetiqWorld(){
//	CONTROL VARIABLES
	console.log(screen.width);
	var menudiv	= document.getElementById("menu");
	var start 	= document.getElementById("start-game");
	var status 	= document.getElementById("game-status");
	var frameps	= document.getElementById("fps_count");
	var fxExp 	= {};
	
	var self 		= this;
	var gameStatus 	= "pause";
	var explosion;
	var canvas = document.getElementById("magnetiq");	
	var pre_canvas = document.createElement("canvas");	

	var galaxy			= [];
	var collectables	= [];
	var aggregations	= [];

	var ctx = pre_canvas.getContext("2d");
	var ctx_def = canvas.getContext("2d");
	
	var coll_eff;
	var UserProfile = {
		lifes: 3,
		collision: false,
		immunity: false,
		collids: function(){
			UserProfile.lifes--;
			UserProfile.collision = true;
			
			explosion = document.createElement("img");
			explosion.src = "images/explosion.svg?time=" + new Date();

			if(UserProfile.lifes == 0){
				UserProfile.endGame();
			}
			clearTimeout(coll_eff);
			coll_eff = window.setTimeout(function(){
				UserProfile.collision = false;
			}, 1000); 
		},
		endGame: function(){
			UserProfile.lifes == 0;
			gameStatus = "pause";
			for(var i in aggregations)
				aggregations[i].pointer = null;
			menudiv.style.display = "block";
		},
		gain: function(what){
			if(what=="lifeup"){
				UserProfile.lifes++;
			}
		},
		aggr: function(obj){
			UserProfile.immunity = true;
			var blackHole = window.setInterval(function(){
				var somealive = false;

				for(var i in galaxy){
					var point = galaxy[i];
					if(point.aggregation == obj){
						somealive = true;
						point.distance = point.distance/1.05;
						if(point.distance <= 8) delete galaxy[i];
					}
				}
				if(!somealive){
					clearInterval(blackHole);
					console.log("normale");
					UserProfile.immunity = false;
				}
			},10);
		},
	    isTouchDevice: function() {
	        if(navigator.userAgent.match(/NetFront|iPhone|Opera Mini|IEMobile|iPad|iPod|BlackBerry|Android/i)) 
	        	return "mobile";
	        else 
	        	return "desktop";
	    },
		pointer:{}

	};
	canvas.width 	= pre_canvas.width 	= window.innerWidth;
	canvas.height	= pre_canvas.height = window.innerHeight;
	
	UserProfile.pointer = new Track(canvas, UserProfile.isTouchDevice());
	


	self.initialize = function(){
	
		function level(){
			aggregations = [];
			galaxy = [];
			aggregations.push(new Aggregation({
				x: -50, 
				y: -50
			}));
			for(var i = 0; i < 100; i++){
				
				var verse = Math.random()*2;
				//var velocity = 5 + Math.random()*5;
				var distance = 50 + i*4;
				addPoint({
					x: 0, y: 0,
					//velocity: velocity,
					distance: distance
				});
			}
						
			
		}
		
		function pauseMenu(){
			aggregations = [];
			galaxy = [];
			aggregations.push(new Aggregation({
				x: 300, 
				y: 300
			}));
			for(var i = 0; i < 100; i++){
				
				var verse = Math.random()*2;
				//var velocity = 5 + Math.random()*5;
				var distance = 50 + i*4;
				addPoint({
					x: 300, y: 300,
					//velocity: velocity,
					distance: distance
				});
			}

		}

		
		start.addEventListener("click", function(){
			if(gameStatus=="pause"){
				level();
				menudiv.style.display = "none";

				UserProfile.lifes = 3;
				for(var i in aggregations) aggregations[i].pointer = UserProfile.pointer;
								
				gameStatus = "running";
			}
		});
		
		
		
		var framepersecond = setInterval(function(){
			frameps.innerHTML = Math.floor(fps) + " FPS";
		},600);
		
		var secure;
		function updateAll(){
			for(var i in galaxy){
				galaxy[i].muoviti();
			}
			
			for(var i in aggregations){
				aggregations[i].muoviti();
				aggregations[i].reachThePointer();
			}
			
			if(gameStatus == "running") UserProfile.pointer.update();			

			collisions();
			
			drawCanvas();
			
			FPS();
		
			status.innerHTML = gameStatus;

			secure = requestAnimFrame(updateAll);
		
		}
		updateAll();
						
		
		function collisions(){
			if(gameStatus == "running" && !UserProfile.immunity){
				var head = UserProfile.pointer.passages[UserProfile.pointer.passages.length - 1];
				for(var i in galaxy){
					var obj = galaxy[i];
					var collision = Math.sqrt( Math.pow(head.position.x - obj.position.x , 2) + Math.pow(head.position.y - obj.position.y , 2) );
					
					if(collision <= obj.radius +3){
						fxExp = {x:obj.position.x, y: obj.position.y};
						UserProfile.collids();
						delete galaxy[i];
					}
				}

				for(var i in aggregations){
					var obj = aggregations[i];
					var collision = Math.sqrt( Math.pow(head.position.x - obj.position.x , 2) + Math.pow(head.position.y - obj.position.y , 2) );
					
					if(collision <= obj.radius +3){
						
						UserProfile.aggr(obj);					
						//delete galaxy[i];
					}
				}
				
				for(var i in collectables){
					var obj = collectables[i];
					var collision = Math.sqrt( Math.pow(head.position.x - obj.position.x , 2) + Math.pow(head.position.y - obj.position.y , 2) );
					
					if(collision <= obj.radius +3){
						UserProfile.gain("lifeup");
						delete collectables[i];
					}
				}
			}
		}
		
		function drawPointer(){
			var pointer_color = "#aeff00";
			var pointer = UserProfile.pointer;
			
			if(UserProfile.collision){
				var n = new Date().getTime();
				if(n % 2 != 0) pointer_color = "transparent";
				
				
			}
			ctx.fillStyle = pointer_color;
			ctx.strokeStyle = pointer_color;
			ctx.lineWidth = 1;
			
			
			ctx.beginPath();

			for(var i in  pointer.passages){
				var normal = pointer.passages[i]; 
				
				if(i == 0){
				 	ctx.moveTo(normal.position.x , normal.position.y);
				}else{
					var previous = pointer.passages[i-1];
				
					ctx.quadraticCurveTo(previous.position.x , 
							previous.position.y , 
							previous.position.x + (normal.position.x - previous.position.x) / 2 , 
							previous.position.y + (normal.position.y - previous.position.y) / 2);
				}			
			}
			ctx.stroke();
			ctx.closePath();
			
			for(var i = 0; i < UserProfile.lifes - 1; i++){
				ctx.beginPath();
				var length = pointer.passages.length - 8;

				var passage = pointer.passages[length - i * 8];
				ctx.arc(passage.position.x, passage.position.y, 3, 0, Math.PI * 2, false);
				ctx.fill();
			}				
			ctx.beginPath();
			var head = pointer.passages[pointer.passages.length - 1];
			ctx.arc(head.position.x, head.position.y, 5, 0, Math.PI * 2, false);
			ctx.fill();
		}
		
		function pre_drawCanvas() {
			ctx.clearRect(0,0,canvas.width,canvas.height);
			if(UserProfile.collision){
				ctx.beginPath();
				ctx.drawImage(explosion,fxExp.x - 50,fxExp.y - 50);
				ctx.closePath();
			}
			if(gameStatus == "running") drawPointer();
			
			ctx.fillStyle = "#ff0000";
			for(var i in galaxy){
				var obj = galaxy[i];
				ctx.beginPath();
				ctx.arc(obj.position.x, obj.position.y, obj.radius, 0, Math.PI * 2, false);
				ctx.fill();
			}
				
			for(var i in collectables){
				var obj = collectables[i];
				ctx.beginPath();
				ctx.fillStyle = "#c7fb6c";
				ctx.arc(obj.position.x, obj.position.y, obj.radius, 0, Math.PI * 2, false);
				ctx.fill();
			}
				
			for(var i in aggregations){
				
				var obj = aggregations[i];
				
				ctx.beginPath();
				ctx.fillStyle = "#57d0f3";
				
				//ctx.drawImage(blueball,obj.position.x - 5 ,obj.position.y - 5);
				ctx.arc(obj.position.x, obj.position.y, 10, 0, Math.PI * 2, false);
				ctx.fill();
			}
		}
	
		function drawCanvas(){
			pre_drawCanvas();
			ctx_def.clearRect(0,0,canvas.width,canvas.height);
			ctx_def.drawImage(pre_canvas,0,0);
		}
		
		var addPoint = function(properties){
			var distance = 1000000;
			var closest;
			var proto = properties;
			for(var i in aggregations){
				var obj = aggregations[i];
				var tmp_distance = Math.sqrt( Math.pow(proto.x - obj.x , 2) + Math.pow(proto.y - obj.y , 2) );
				if(tmp_distance < distance){
					closest = obj;
					distance = tmp_distance;
				}
			}
			properties.aggregation = obj;
			
			if(properties.type == "special"){
				collectables.push(new Point(properties));
				collectables[collectables.length-1].muoviti();
			}else{
				galaxy.push(new Point(properties));
				galaxy[galaxy.length-1].muoviti();
			}
		};
		
		pauseMenu();
	};
	self.initialize();

}

