function Bird() {
	this.y = (height-90) / 3;
  	this.x = 64;
  	this.h = 42;
  	this.w = 46;

  	this.gravity = 3.5;
  	this.acc = 75;
  	this.vel = 0;

  	this.dead = false;
  	this.jump = false;

    this.isDead = () => {
    	return this.dead;
    }

    this.setDead = () => {
    	this.dead = true;
    }

	this.show = () => {
		stroke(0);
		strokeWeight(2);
		if (this.dead) {
			if (frameCount % 30 >= 15) {
    			fill(255, 255, 0);
				ellipse(this.x, this.y, this.w, this.h);
				fill(255);
				ellipse(this.x+10, this.y-8, 9, 9);
				fill(0);
				ellipse(this.x+10, this.y-8, 1, 1);
				fill(240,230,140);
				ellipse(this.x-6, this.y+2, 21, 15);
				stroke(255,165,0);
				fill(255,165,0);
				triangle(this.x+17, this.y-1, this.x+29, this.y+3, this.x+17, this.y+3);
				fill(255,165,0);
				triangle(this.x+17, this.y+3, this.x+29, this.y+3, this.x+17, this.y+7);
				stroke(0);
				line(this.x+17, this.y+3, this.x+30, this.y+3);
  			}
  			else {
  				fill(255, 0, 0);
				ellipse(this.x, this.y, this.w, this.h);
				fill(255);
				ellipse(this.x+10, this.y-8, 9, 9);
				fill(0);
				ellipse(this.x+10, this.y-8, 1, 1);
				fill(178,34,34);
				ellipse(this.x-6, this.y+2, 21, 15);
				stroke(139,0,0);
				fill(139,0,0);
				triangle(this.x+17, this.y-1, this.x+29, this.y+3, this.x+17, this.y+3);
				fill(139,0,0);
				triangle(this.x+17, this.y+3, this.x+29, this.y+3, this.x+17, this.y+7);
				stroke(0);
				line(this.x+17, this.y+3, this.x+30, this.y+3);
  			}
		}else {
			fill(255, 255, 0);
			ellipse(this.x, this.y, this.w, this.h);
			fill(255);
			ellipse(this.x+10, this.y-8, 9, 9);
			fill(0);
			ellipse(this.x+10, this.y-8, 1, 1);
			fill(240,230,140);
			ellipse(this.x-6, this.y+2, 21, 15);
			stroke(255,165,0);
			fill(255,165,0);
			triangle(this.x+17, this.y-1, this.x+29, this.y+3, this.x+17, this.y+3);
			fill(255,165,0);
			triangle(this.x+17, this.y+3, this.x+29, this.y+3, this.x+17, this.y+7);
			stroke(0);
			line(this.x+17, this.y+3, this.x+30, this.y+3);
		}
	}

	this.jump = () => {
		if (!this.dead) {
			this.y += (this.vel - this.acc);
		}
	}

	this.update = () => {
		if (!this.dead) {
			this.y += (this.vel + this.gravity);
		}

		if (this.y > height-90-this.h/2){
			this.y = height-90-this.h/2;
			this.dead = true;
		}

		if (this.y < 0+this.h/2){
			this.y = 0+this.h/2;
		}
	}
}