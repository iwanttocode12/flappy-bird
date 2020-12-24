function Pipe() {
  this.y = 0;
  this.w = 100;
  this.x = width - (this.w);

  this.holeH = 150;
  this.leftpipe = 45;
  this.pipeDecx = 8;
  this.pipeDecy = 30;
  this.randomH = (Math.random()*(height-90-(this.holeH+(2*this.leftpipe)))) + this.leftpipe;

  this.pass = false;

  this.moveVel = 3;


  this.onPass = (bird) => {
    if(this.pass) {
      return false;
    }
    else{
      if (bird.x > this.x){
        this.pass = true;
      }
      return this.pass;
    }
  }


  this.onHit = (bird) => {
    if ((bird.x+bird.w/2>=this.x && bird.x+bird.w/2<= this.x+this.w) || 
      (bird.x-bird.w/2>=this.x && bird.x-bird.w/2<= this.x+this.w)) {
      if (bird.y-bird.h/2 < this.randomH || bird.y+bird.h/2 > (this.randomH +this.holeH)) {
        return true;
      }
    } 
    else if (bird.x+bird.w/2>=this.x-this.pipeDecx/2 && bird.x-bird.w/2<= this.x+this.pipeDecx/2+this.w) {
      if (bird.y-bird.h/2< this.randomH || bird.y+bird.h/2 > (this.randomH +this.holeH)) {
        return true;
      }
    }
    return false;
  };

  this.show = () => {
    fill(0, 255, 0);
    strokeWeight(2);
    stroke(0);
    rect(this.x, this.y, this.w, this.randomH-2);

    fill(0, 255, 0);
    strokeWeight(2);
    stroke(0);
    rect(this.x-this.pipeDecx/2, this.randomH - this.pipeDecy-2, this.w + this.pipeDecx, this.pipeDecy);

    fill(0, 255, 0);
    strokeWeight(2);
    stroke(0);
    rect(this.x, this.randomH+this.holeH+2, this.w, height);

    fill(0, 255, 0);
    strokeWeight(2);
    stroke(0);
    rect(this.x-this.pipeDecx/2, this.randomH+this.holeH+2, this.w + this.pipeDecx, this.pipeDecy);


  };

  this.update = () => {
    this.x -= this.moveVel;
  };

  this.over = () => {
    return (this.x < -this.w);
  };

}