/************ Variables  ************/ 
// Game settings
var gameScreen = 0;
var initialTime = 3;
var timeLeft = 0 ;

// Balls settings
let bubbles= []; 
let numberOfBub = 5;

/************ Setup block  ************/ 
function setup(){
	createCanvas(600, 400);
	
	creatingBalls();
	
}
/************ Draw block  ************/ 
function draw(){	
	if(gameScreen == 0){
		initScreen();
	}else if(gameScreen == 1){
		playScreen();
	}else if(gameScreen = 2){
		gameOverScreen();
	}
}

function creatingBalls(){
		for(var i=0; i<numberOfBub; i++){
			let x = 10 +30*i;
			bubbles[i] = new Bubble(random(0,600),random(0,400), random(20,40));
		}
	}
/************ initScreen ************/
function initScreen(){
	background(0);
	textAlign(CENTER);
	fill(255);
	textSize(40);
	text("KILL THE BUBBLES", width/2, height/2);
	textSize(20);
	text("Click to start the game", width/2, height*(0.8) );
}
	
/************ playScreen ************/ 
function playScreen(){
	background(0);
	let timeEnd = (timeLeft-millis()/1000).toFixed(2);
	strokeWeight(1);
	noStroke();
	fill(255);
	text("Time left: \n" + timeEnd, 45, 20);
	for(var i=0; i < bubbles.length; i++){
		bubbles[i].show();
		bubbles[i].move();	
	}
	if (timeEnd<0){
		gameScreen =2;
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
/************ Mouse clicked block ************/ 
function mouseClicked(){
	if(gameScreen == 0){
		timeLeft = millis()/1000 + initialTime;
		gameScreen = 1;
	}else if(gameScreen == 1){
		for(let i = 0; i < bubbles.length; i++){
			bubbles[i].clicked(mouseX,mouseY);
		}
	}else if(gameScreen == 2){
		timeLeft = millis()/1000 + initialTime;
		gameScreen = 1;
	}
}
/************ Bubble class ************/ 
class Bubble{
	constructor(x, y, d){
		this.x = x;
		this.y = y;
		this.d = d;
		this.bubbleColor = [0,0,0];
		this.bubbleClickCount = 0;
		this.velX = 3;
		this.velY = 3;
	}
	clicked(x,y){
		let distance = dist(x, y, this.x, this.y);
		if(distance < this.d/2){
			this.bubbleClickCount ++;
			// move to new random place
			this.x = random(0,600);
			this.y = random(0,400);
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
		if(this.x < this.d/2){
			this.x=this.x+3;
		} else if(this.x > width-this.d/2){
			this.x=this.x-3;
		}
		
		if(this.y < this.d/3){
			this.y = this.y + 2;
		}else if(this.y > height-this.d/2){
			this.y = this.y - 2;
		}
	}
	show(){
		stroke(255);
		strokeWeight(4);
		fill(this.bubbleColor);
		ellipse(this.x, this.y, this.d, this.d);
	}
}