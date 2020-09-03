class DNA {
  constructor(maxSpeed, maxForce, perceptionRadius) {
		// adding variability to boids properties
		this.maxSpeed = maxSpeed || random(0, 6);
		this.maxForce = maxForce || random(0.01, 1);
		this.percR = perceptionRadius || random(10, 250);
		this.genes = [this.maxSpeed, this.maxForce, this.percR];
		this.mutArr = [random(0, 6), random(0.01, 1), random(10, 250)];
	}
	
	crossover(other) {
		// mixing the genetic material
		let newGenes = [];
		for(let i = 0; i < this.genes.length; i++) {
			let prob = random();
			if(prob < 0.5) {
				newGenes.push(this.genes[i]);
			} else {
				newGenes.push(other.genes[i]);
			}
		}
		let newDNA = new DNA(newGenes[0], newGenes[1], newGenes[2]);
		return newDNA;
	}

	// mutation
	mutate(mutationRate) {
		for(let i = 0; i < this.genes.length; i++) {
			let r = random();
			if(r < mutationRate) {
				this.genes[i] = this.mutArr[i];
			}
		}
	}
}