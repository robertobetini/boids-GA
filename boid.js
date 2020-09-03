class Boid {
  constructor(x, y, dna) {
		this.pos = createVector(x, y);
		this.vel = p5.Vector.random2D();
		this.acc = createVector(0, 0);
		this.dna = dna || new DNA();
		this.maxSpeed = this.dna.genes[0];
		this.maxForce = this.dna.genes[1];
		this.percR = this.dna.genes[2];
		this.color = undefined;
		this.vel.setMag(this.maxSpeed);
		this.fitness = 0;
	}

	show() {
		push();
		if(debug) {
			push();
			noFill();
			stroke(0, 30);
			ellipse(this.pos.x, this.pos.y, 2 * this.percR, 2 * this.percR)
			pop();
		}
		translate(this.pos.x, this.pos.y);
		rotate(this.vel.heading() - HALF_PI);
		beginShape();
		vertex(-5, -3);
		vertex(0, 0);
		vertex(5, -3);
		vertex(0, 10);
		endShape(CLOSE);
		pop();
	}

	edges() {
		if(this.pos.x > width) {
			this.pos.x = 0;
		} else if(this.pos.x < 0) {
			this.pos.x = width;
		}
		if(this.pos.y > height) {
			this.pos.y = 0;
		} else if(this.pos.y < 0) {
			this.pos.y = height;
		}
	}

	update() {
		this.vel.add(this.acc);
		this.vel.limit(this.maxSpeed);
		this.pos.add(this.vel);
		this.acc.mult(0);
	}

	applyForces(forceArr) {
		let sum = createVector(0, 0);
		for(let force of forceArr) {
			sum.add(force);
		}
		this.acc.add(sum);
		this.acc.limit(this.maxForce);
	}

	// steering forces
	// steer = desired - velocity
	alignment(arr) {
		let steer = createVector(0, 0);
		let total = 0;
		// findind the average velocity of near boids
		for(let other of arr) {
			let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
			if(d <= this.percR) {
				steer.add(other.vel);
				total++;
			}
		}
		steer.div(total).setMag(this.maxSpeed);
		return steer.sub(this.vel);
	}

	cohesion(arr) {
		let steer = createVector(0, 0);
		let avgPos = createVector(0, 0);
		let total = 0;
		// finding the average position of near boids
		for(let other of arr) {
			let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
			if(this != other && d <= this.percR) {
				avgPos.add(other.pos);
				total++;
			}
		}
		if(total > 0) {
			avgPos.div(total);
			let desired = p5.Vector.sub(avgPos, this.pos).setMag(this.maxSpeed);
			steer = p5.Vector.sub(desired, this.vel).limit(this.maxSpeed);
		}
		return steer;
	}

	separation(arr) {
		let steer = createVector(0, 0);
		let desired = createVector(0, 0);
		for(let other of arr) {
			let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
			if(this != other && d <= this.percR) {
				// desired = this.pos - other.pos
				let mapping = map(d, 0, this.percR, this.maxSpeed, 0);
				desired.add(p5.Vector.sub(this.pos, other.pos)).setMag(mapping);
			}
		}
		desired.setMag(this.maxSpeed);
		steer = p5.Vector.sub(desired, this.vel);
		return steer;
	}

	seek(target) {
		let desired = p5.Vector.sub(target, this.pos).limit(this.maxSpeed);
		let steer = desired.sub(this.vel);
		return steer;
	}

	chkFood(arr) {
		for(let i = 0; i < arr.length; i++) {
			let d = dist(this.pos.x, this.pos.y, arr[i].x, arr[i].y);
			if(d <= this.percR) {
				return arr[i];
			}
		}
	}

}