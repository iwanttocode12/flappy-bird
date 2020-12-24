var firebaseConfig = {
    apiKey: "AIzaSyC3DZjAVZiag7hEuLhUlyXptGpJxbcPQcg",
    authDomain: "flappy-bird-a4e26.firebaseapp.com",
    databaseURL: "https://flappy-bird-a4e26.firebaseio.com",
    projectId: "flappy-bird-a4e26",
    storageBucket: "flappy-bird-a4e26.appspot.com",
    messagingSenderId: "857988211453",
    appId: "1:857988211453:web:2f616964d4d727cb9d1494",
    measurementId: "G-6F4G6M2YS9"
 };
 
firebase.initializeApp(firebaseConfig);
var databaseRef = firebase.database().ref();

databaseRef.child('score').on('value', function(fbdata) {
	console.log(fbdata.node_.value_)
	document.getElementById('highscore').innerHTML = fbdata.node_.value_;
});

databaseRef.child('score').on('child_changed', function(fbdata) {
	console.log(fbdata.node_.value_)
	document.getElementById('highscore').innerHTML = fbdata.node_.value_;
});


var bird;
var pipe = [];
var play = false;
var start = 0;
var score = 0;

var die = document.createElement("AUDIO")
document.body.appendChild(die);
die.src = "audio/die.mp3";

var hit = document.createElement("AUDIO")
document.body.appendChild(hit);
hit.src = "audio/hit.mp3";

var jPoint = document.createElement("AUDIO")
document.body.appendChild(jPoint);
jPoint.src = "audio/point.mp3";

var theme = document.createElement("AUDIO")
document.body.appendChild(theme);
theme.src = "audio/theme.mp3";

theme.volume = 0.2; 
hit.volume = 0.4; 
jPoint.volume = 0.7; 
count = 0;

function setup() {
	let myCanvas = createCanvas(820, 590);
	myCanvas.parent('myContainer');

	bird = new Bird();
	pipe.push(new Pipe());

	createBackground();

	bird.show();
	pipe[0].show();
}

function draw() {
	if (play) {
		createBackground();

		for (var i=pipe.length-1; i>=0; i--) {
			pipe[i].show();
			if (!bird.isDead()) {
				pipe[i].update();
			}

			if (pipe[i].onHit(bird)) {
				bird.setDead();
			}

			if (bird.isDead()){
				play = false;
				hit.play();
				theme.pause();
				if (count==0){
					databaseRef.child('score').on('value', function(fbdata) {
						if (score > fbdata.node_.value_){
							databaseRef.child('score').set(score);
						}
					});
					count++;
				}	
				document.getElementById('score').classList.remove('score');
				document.getElementById('LoseDiv').style.display = 'block';
				document.getElementById('headDiv').style.display = 'none';
				document.getElementById('scoreDiv').style.color = 'red';
			}

			if (pipe[i].onPass(bird)) {
				score++;
				jPoint.play();
				document.getElementById('score').innerHTML = score;
			}


			if(pipe[i].over()){
				pipe.splice(i,1);
			}
		}

		bird.show();
		bird.update();

		if ((frameCount-start) % 110 == 0 && !bird.isDead()) {
	    	pipe.push(new Pipe());
	  	}
  	}
}

function keyPressed(){
	if(key == ' ') {
		if (!play){
			play = true;
			theme.play();
			theme.loop = true;
			start = frameCount;
			document.getElementById('scoreDiv').style.display = 'block';
			document.getElementById('score').innerHTML = score;
		}
		else {
			bird.jump();
		}	
	}
}

function reload(){
	location.reload();
	return false;
}

function createBackground(){
	background(87, 206, 235);
	noStroke();
	fill(245);
	ellipse(100, 200, 400, 250);
	ellipse(250, 170, 400, 250);
	ellipse(320, 210, 400, 250);
	ellipse(450, 250, 400, 250);
	ellipse(590, 160, 400, 250);
	ellipse(680, 180, 400, 250);
	ellipse(750, 200, 400, 250);

	stroke(0,0,255);
	strokeWeight(2);
	fill(169);
	rect(50, 225, 100, height);
	fill(192);
	rect(150, 170, 100, height);
	fill(211);
	rect(310, 250, 100, height);
	fill(128);
	rect(410, 205, 100, height);
	fill(192);
	rect(590, 190, 100, height);
	fill(128);
	rect(690, 235, 100, height);

	strokeWeight(1);
	stroke(192);
	noFill();
	rect(70, 250, 20, 20);
	rect(110, 250, 20, 20);
	rect(70, 290, 20, 20);
	rect(110, 290, 20, 20);
	rect(70, 330, 20, 20);
	rect(110, 330, 20, 20);

	stroke(211);
	noFill();
	rect(170, 195, 20, 20);
	rect(210, 195, 20, 20);
	rect(170, 235, 20, 20);
	rect(210, 235, 20, 20);
	rect(170, 275, 20, 20);
	rect(210, 275, 20, 20);
	rect(170, 315, 20, 20);
	rect(210, 315, 20, 20);

	stroke(220);
	noFill();
	rect(330, 275, 20, 20);
	rect(370, 275, 20, 20);
	rect(330, 315, 20, 20);
	rect(370, 315, 20, 20);

	stroke(169);
	noFill();
	rect(430, 230, 20, 20);
	rect(470, 230, 20, 20);
	rect(430, 270, 20, 20);
	rect(470, 270, 20, 20);
	rect(430, 310, 20, 20);
	rect(470, 310, 20, 20);
	rect(430, 350, 20, 20);
	rect(470, 350, 20, 20);

	stroke(211);
	noFill();
	rect(610, 215, 20, 20);
	rect(650, 215, 20, 20);
	rect(610, 255, 20, 20);
	rect(650, 255, 20, 20);
	rect(610, 295, 20, 20);
	rect(650, 295, 20, 20);
	rect(610, 335, 20, 20);
	rect(650, 335, 20, 20);

	stroke(169);
	noFill();
	rect(710, 260, 20, 20);
	rect(750, 260, 20, 20);
	rect(710, 300, 20, 20);
	rect(750, 300, 20, 20);
	rect(710, 340, 20, 20);
	rect(750, 340, 20, 20);


	noStroke();
	fill(50,205,50);
	ellipse(100, 470, 400, 200);
	ellipse(250, 440, 400, 200);
	ellipse(320, 480, 400, 200);
	ellipse(390, 450, 400, 200);
	ellipse(540, 465, 400, 200);
	ellipse(680, 445, 400, 200);
	ellipse(750, 475, 400, 200);

	stroke(0);
	strokeWeight(4);
	fill(192,252,0);
	rect(0, 500, width, 30);
	noStroke();
	fill(192,252,0);
	rect(0, 503, width, 30);
	fill(245,222,179);
	rect(0, 530, width, 60);

	stroke(0)
	strokeWeight(2);
	fill(255,223,0);
	ellipse(560, 90, 85, 85);
}

/*
1. highscore
2. music??
*/