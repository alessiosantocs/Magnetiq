/*
 --------------------------------------------------
 MANAGING AN OBJECT:			   CANVAS#portfolio
 -------------------------------------------------- */
function drawCanvas(selector){
	var canvas = $(selector)[0]; 
	var ctx;
	var circle;
	var img = document.getElementById('back_canvas');
    if (canvas.getContext){
		ctx = canvas.getContext("2d");

	// disegno le linee
		ctx.fillStyle="transparent";
		ctx.strokeStyle="#c1c1c1";
		ctx.lineWidth=Portfolio.lineWidth;
		ctx.beginPath();
		for(var c in Portfolio.circles ){
			circle=Portfolio.circles[c];

			if(c==0) ctx.moveTo(circle.x,circle.y);
			else ctx.lineTo(circle.x,circle.y);
		}
		ctx.stroke();
		ctx.closePath();

	// disegno i contorni
				
		for(var c in Portfolio.circles ){
			circle=Portfolio.circles[c];

			ctx.fillStyle=circle.strokeColor;

			ctx.beginPath();
			ctx.strokeStyle="#eaeaea";
			ctx.lineWidth=1;
			ctx.moveTo(circle.x,0);
			ctx.lineTo(circle.x,canvas.height);
			ctx.stroke();
			ctx.fill();		
			
			ctx.beginPath();
			ctx.arc(circle.x,circle.y,circle.radius + circle.strokeWidth,0,Math.PI * 2, false);
			ctx.fill();		
		}

		
		ctx.closePath();
		
		var imgload = document.getElementById("pre_load");

	// disegno i cerchi e li rendo maschere

		ctx.fillStyle="#6b6b6b";
		

		for(var c in Portfolio.circles ){
			circle=Portfolio.circles[c];
			ctx.fillStyle=circle.backColor;
		
            ctx.save();
			ctx.beginPath();
			ctx.arc(circle.x,circle.y,circle.radius,0,Math.PI * 2, false);
			ctx.fill();
						
			if(circle.clip){
				ctx.clip();
				ctx.drawImage(img,CanvasImage.x,CanvasImage.y);	
			}
			
			if(circle.loading & circle.loading){
				ctx.beginPath();
				ctx.drawImage(imgload,circle.x - 8,circle.y - 8);	
				ctx.closePath();
			}

			ctx.restore();
		}

// Drawing messages

		ctx.beginPath();

		for(var m in Portfolio.messages ){
			message=Portfolio.messages[m];
			
			ctx.font = message.font;
			ctx.fillStyle=message.color;

			ctx.fillText(message.content, message.x, message.y);
		}
		ctx.closePath();


		
	}
}
function initCanvas(selector){
	var canvas = $(selector)[0]; 
	var left = $(selector).offset().left;
	var top = $(selector).offset().top;
	var ctx;
	
    if (canvas.getContext){
		ctx = canvas.getContext("2d");
		var clear=setInterval(function(){
			canvas.width=canvas.width;
			drawCanvas(selector);
			left = $(selector).offset().left;
			top = $(selector).offset().top;
		},10);

		var shaking=setInterval(function(){
			canvas.width=canvas.width;
			drawCanvas(selector);
			for(var c in Portfolio.circles ){
				var plusX = (Math.random()*4 - 2)/5;
				var plusY = (Math.random()*4 - 2)/5;
				cerchio = Portfolio.circles[c];
				cerchio.setPosition(cerchio.x + plusX,cerchio.y + plusY);
			}

		},50);
		
	}
}