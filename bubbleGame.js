/************ Variables  ************/ 
// Game settings
var gameScreen = 0;
var gameTime = 10;

// Balls settings
let numberOfBub = 3;
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
		let x = 10 +30*i;
		let d = random(40,60);
		bubbles[i] = new Bubble(random(0+d/2,600-d/2),random(0+d/2,400-d/2), d);
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
	
	for(var i=0; i < bubbles.length; i++){
		bubbles[i].show();
		bubbles[i].move();	
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
		this.velX = vel - Math.round(Math.random())*2*vel;
		this.velY = vel - Math.round(Math.random())*2*vel;
		
	}
	clicked(x,y){
		let distance = dist(x, y, this.x, this.y);
		if(distance-20 < this.d/2){// it is hard to click so -15 is a help for player
			this.bubbleClickCount ++;
			// move to new random place
			this.x = random(0+this.d/2,600-this.d/2);
			this.y = random(0+this.d/2,400-this.d/2);
		}
		if(this.bubbleClickCount == 1){
			// gray
			this.bubbleColor[0] = 125;
			this.bubbleColor[1] = 125;
			this.bubbleColor[2] = 125;
		}else if(this.bubbleClickCount == 2){
			//red
			this.bubbleColor[0] = 250;
			this.bubbleColor[1] = 0;
			this.bubbleColor[2] = 0;
		}else if(this.bubbleClickCount == 3){
			//disapears
			bubbles.splice(bubbles.indexOf(this),1);
		}
	}

	move(){
		this.x += this.velX;
		this.y += this.velY;
		
		if(this.x <= this.d/2){
			this.velX *=-1;
		} else if(this.x >= width-this.d/2){
			this.velX *=-1;
		}
		
		if(this.y <= this.d/3){
			this.velY *=-1;
		}else if(this.y >= height-this.d/2){
			this.velY *=-1;
		}
	}
	show(){
		stroke(255);
		strokeWeight(4);
		fill(this.bubbleColor);
		ellipse(this.x, this.y, this.d, this.d);
	}
}