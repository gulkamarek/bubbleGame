/************ Variables  ************/ 
// Game settings
var gameScreen = 0;
var gameTime = 10;

// Balls settings
let numberOfBub = 5;
let bubbles= []; 
let vel = 3;
// Other 
var gameStartTime = 0;

/************ Setup block  ************/ 
function setup(){
	createCanvas(600, 400);
	
	inputBubblesNumber = createInput(numberOfBub,text);
	inputBubblesNumber.position(width/2, height*0.7);
	
	inputGameTime = createInput(gameTime,text);
	inputGameTime.position(width/2, height*0.8);
	
	startButton = createButton('Start');
	startButton.position(width/2-startButton.width, height*0.9);
	startButton.mouseClicked(startPressed);
}
/************ Draw block  ************/ 
function draw(){	
	if(gameScreen == 0){
		initScreen();
	}else if(gameScreen == 1){
		playScreen();
	}else if(gameScreen == 2){
		gameOverScreen();
	}else if(gameScreen == 3){
		winScreen();
	};
}
/************ creatingBubbles ************/
function creatingBubbles(){
	for(var i=0; i<numberOfBub; i++){
		let y,x,d;
		let doesNotCollide;
		// checking positions of other bubbles
		do{
			doesNotCollide = 0;
			d = random(50,80);
			x = random(0+d/2,600-d/2);
			y = random(0+d/2,400-d/2);
			for(let j = 0; j<bubbles.length; j++){
				if(dist(bubbles[j].x,bubbles[j].y,x,y)<=(bubbles[j].d+d)/2){
					doesNotCollide += 1;
				}
			}
		}while(doesNotCollide != 0);
		bubbles[i] = new Bubble(x,y,d);
	}
}


/************ initScreen ************/
function initScreen(){
	background(0);
	textAlign(CENTER);
	fill(255);
	textSize(40);
	text("CLICK THE BUBBLES", width/2, height/2);
	textSize(20);
	textAlign(RIGHT);
	text("Number of bubbles : ", width/2, height*(0.745) );
	text("Time of the game : ", width/2, height*(0.845) );
}
/************ playScreen ************/
function playScreen(){
	background(0);
	strokeWeight(1);
	noStroke();
	fill(255);
	textAlign(CENTER);
	// timing
	timeLeft = (gameTime - ((performance.now()-gameStartTime)/1000)).toFixed(2);
	text("Time left: \n" + timeLeft, 45, 20);
	
	for(let i=bubbles.length-1; i >= 0; i--){
		bubbles[i].show();
		bubbles[i].move();

		// COLISIONS
		for(var j = 0; j<bubbles.length; j++){
			if(i!=j && bubbles[i].intersects(bubbles[j])){
				// changign color when collides
				//bubbles[i].changeColor([250, 0, 0]);
				bubbles[i].bump(bubbles[j]);
			}
		}
	}
	
	if (timeLeft<0){
		gameScreen = 2;
	}	
	
	if (timeLeft>0 && bubbles.length==0){
		gameScreen = 3;
	}	
}
/************ gameOverScreen ************/ 
function gameOverScreen(){
	background(0);
	textAlign(CENTER);
	fill(255);
	textSize(40);
	strokeWeight(1);
	noStroke();
	fill(255);
	text("GAME OVER", width/2, height/2);
	textSize(20);
	text("Click to restart", width/2, height*(0.8) );
}
/************ winScreen ************/ 
function winScreen(){
	background(0);
	textAlign(CENTER);
	fill(255);
	textSize(40);
	strokeWeight(1);
	noStroke();
	fill(255);
	text("VICTORY", width/2, height/2);
	textSize(20);
	text("Click to restart", width/2, height*(0.8) );
}



/************ Mouse clicked block ************/ 
function mouseClicked(){
	if(gameScreen == 0){
		// nothing because ther is a button :D
	}else if(gameScreen == 1){
		for(let i = 0; i < bubbles.length; i++){
			bubbles[i].clicked(mouseX,mouseY);
		}
	}else if(gameScreen == 2){
		location.reload();
	}else if(gameScreen == 3){
		location.reload();
	}
}

/************ Mouse clicked block ************/ 
function startPressed(){
	startTheGame();
};

/************ Start The Game ************/ 
function startTheGame(){
	inputBubblesNumber.hide();
	inputGameTime.hide();
	startButton.hide();
		
	numberOfBub = inputBubblesNumber.value();
	gameTime = inputGameTime.value();
	
	gameStartTime = performance.now();
	gameScreen = 1;
	creatingBubbles();
}
/************ Bubble Class ************/ 
class Bubble{
	constructor(x, y, d){
		this.x = x;
		this.y = y;
		this.d = d;
		this.bubbleColor = [0,0,0];
		this.bubbleClickCount = 0;
		//this.velX = vel - Math.round(Math.random())*2*vel;
		//this.velY = vel - Math.round(Math.random())*2*vel;
		this.startingAplha = Math.random(0, 2*Math.PI);
		this.velX = vel*Math.sin(this.startingAplha);
		this.velY = vel*Math.cos(this.startingAplha);
	}
	
	changeColor(changeColor){
		this.bubbleColor = changeColor;
	}
	
	mouseOnBubble(x,y){
		let distance = dist(x, y, this.x, this.y);
		if(distance < this.d/2){
			return true;
		}else{
			return false;
		}
	}
	
	clicked(x,y){
		let distance = dist(x, y, this.x, this.y);
		if(distance-10 < this.d/2){// it is hard to click so -10 is a help for player
			this.bubbleClickCount ++;
			// move to new random place
			//this.x = random(0+this.d/2,600-this.d/2);
			//this.y = random(0+this.d/2,400-this.d/2);
			// But not to other bubble!
			let yy,xx;
			let doesNotCollide;
		
			do{
				doesNotCollide = 0;
				xx = random(0+this.d/2,600-this.d/2);
				yy = random(0+this.d/2,400-this.d/2);
				for(let j = 0; j<bubbles.length; j++){
					if(dist(bubbles[j].x,bubbles[j].y,xx,yy)<=(bubbles[j].d+this.d)/2){
						doesNotCollide += 1;
					}
				}
			}while(doesNotCollide != 0);
			
			this.x = xx;
			this.y = yy;
			
		}
		if(this.bubbleClickCount == 1){
			// gray
			this.bubbleColor=125;
		}else if(this.bubbleClickCount == 2){
			//red
			this.bubbleColor = [125,0,0];
		}else if(this.bubbleClickCount == 3){
			//disapears
			bubbles.splice(bubbles.indexOf(this),1);
		}
	}

	move(){
		this.x += this.velX;
		this.y += this.velY;
		
		if(this.x <= this.d/2 && (this.velX)< 0){
			this.velX *=-1;
		} else if(this.x >= width-this.d/2 && (this.velX) > 0){
			this.velX *=-1;
		}
		
		if(this.y <= this.d/2 && this.velY < 0){
			this.velY *=-1;
		}else if(this.y >= height-this.d/2 && this.velY > 0){
			this.velY *=-1;
		}
		
	}
	show(){
		stroke(255);
		strokeWeight(4);
		
		if(this.mouseOnBubble(mouseX,mouseY)){
			fill(255);
		}else{
			fill(this.bubbleColor);
		}
		ellipse(this.x, this.y, this.d, this.d);
		stroke('blue');
		// to see the velocity direction
		//line(this.x,this.y, this.x + this.velX*5, this.y + this.velY*5);
		stroke('white');
	}
	
	intersects(colObj){
		let distance = dist(colObj.x, colObj.y, this.x, this.y);
		if(distance <= (this.d+colObj.d)/2){
			return true;
		}else{
			return false;
		}
	}
	
	bump(colObj){		
		// vector projection of a vector v on a line between centers of colisioning circles
		// coordinates of a vector passing through the crnters of the circles
		let xLine = colObj.x - this.x;
		let yLine = colObj.y - this.y;
					 
		// coordinates of the projected vector
		let rx = (this.velX*xLine + this.velY*yLine)/ Math.pow(Math.sqrt(xLine*xLine+yLine*yLine),2) * xLine;
		let ry = (this.velX*xLine + this.velY*yLine)/ Math.pow(Math.sqrt(xLine*xLine+yLine*yLine),2) * yLine;
		//line(this.x,this.y, this.x -2*rx*5, this.y -2*ry*5);
		this.velX += -2*rx;
		this.velY += -2*ry;
		 
		 
		//rx = (colObj.velX*xLine + colObj.velY*yLine)/ Math.pow(Math.sqrt(xLine*xLine+yLine*yLine),2) * xLine;
		//ry = (colObj.velX*xLine + colObj.velY*yLine)/ Math.pow(Math.sqrt(xLine*xLine+yLine*yLine),2) * yLine;
		//line(colObj.x,colObj.y, colObj.x +2*rx, colObj.y +2*ry);
		//colObj.velX += 2*rx;
		//colObj.velY += 2*ry;
		
		/*
		// in case when the bubbles do not bounce properly the velocity should be in opposite direction to the other bubble center
		if (dist(colObj.x, colObj.y, this.x, this.y)<= (this.d+colObj.d)/2){
			
			let alpha = Math.atan(yLine/xLine);
			//this.velX = -vel/ Math.cos(alpha); 
			//this.velY = -vel/ Math.sin(alpha);
			//colObj.velX = +vel/ Math.cos(alpha); 
			//colObj.velY = +vel/ Math.sin(alpha);
			//stroke('red');
			//line(this.x,this.y, this.x + this.velX*5, this.y +this.velY*5);
			//noLoop();
			stroke('white');
		}
		*/
	}
}