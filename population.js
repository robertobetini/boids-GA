class Population {
  constructor(mutRate, popmax) {
		this.mutRate = mutRate;
		this.popmax = popmax;
		this.gen = 1;
		this.population = [];
		for(let i = 0; i < this.popmax; i++) {
			let x = random(width);
			let y = random(height);
			let boid = new Boid(x, y);
			this.population.push(boid);
		}
	}
	
	// needs an array of force arrays ([alignment, cohesion, separation, seek])
	run(forceArr) {
		for(let i = this.population.length - 1; i >= 0; i--) {
			this.population[i].edges();
			this.population[i].applyForces(forceArr[i]);
			this.population[i].update();
			this.population[i].show();
		}
	}

	// returns an array with arrays [alignment, cohesion, separation]
	generateForces() {
		let allForces = [];
		let alignFac = alignSlider.value();
  	let cohesionFac = cohesionSlider.value();
		let sepFac = sepSlider.value();
		for(let i = this.population.length - 1; i >= 0; i --) {
			let alignment = this.population[i].alignment(this.population).mult(alignFac);
			let cohesion = this.population[i].cohesion(this.population).mult(cohesionFac);
			let separation = this.population[i].separation(this.population).mult(sepFac);
			let boidForces = [alignment, cohesion, separation];
			let fd = this.population[i].chkFood(food.food);
			if(fd) {
				let seek = this.population[i].seek(fd).mult(0.3);
				boidForces.push(seek);
			}
			allForces.unshift(boidForces);
		}
		return allForces;
	}

	normFitness() {
		let sum = 0;
		for(let boid of this.population) {
			sum += boid.fitness;
		}
		let fitnessArr = [];
		for(let i = 0; i < this.population.length; i++) {
			fitnessArr[i] = this.population[i].fitness / sum;
		}
		return fitnessArr;
	}

	newGeneration() {
		let fitnessArr = this.normFitness();
		let newPop = [];
		for(let i = 0; i < this.popmax; i++) {
			let indexA = pickOne(fitnessArr);
			let indexB = pickOne(fitnessArr);
			let parentA = this.population[indexA];
			let parentB = this.population[indexB];
			newPop[i] = reproduction(parentA, parentB);
		}
		// logging stuff
		let avg_maxSpeed = 0;
		let avg_maxForce = 0;
		let avg_percR = 0;
		for(let boid of this.population) {
			avg_maxSpeed += boid.dna.genes[0];
			avg_maxForce += boid.dna.genes[1];
			avg_percR += boid.dna.genes[2];
		}
		avg_maxSpeed /= this.population.length;
		avg_maxForce /= this.population.length;
		avg_percR /= this.population.length;
		console.log('Generation ' + this.gen + ':');
		console.log('Average max speed: ' + avg_maxSpeed.toFixed(2));
		console.log('Average max force: ' + avg_maxForce.toFixed(2));
		console.log('Average perception radius: ' + avg_percR.toFixed(0));

		this.population = newPop;
		this.gen++;
	}

}