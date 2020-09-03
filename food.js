class Food {
  constructor(num, size) {
		this.food = [];
		this.size = size;
		for(let i = 0; i < num; i++) {
			let x = random(width);
			let y = random(height);
			let newfood = createVector(x, y);
			this.food.push(newfood);
		}
	}

	feed(arr) {
		for(let i = 0; i < arr.length; i++) {
			for(let j = this.food.length - 1; j >= 0; j--)  {
				let d = dist(arr[i].pos.x, arr[i].pos.y, this.food[j].x, this.food[j].y);
				if(d <= this.size) {
					this.food.splice(j, 1);
					arr[i].fitness++;
					let x = random(width);
					let y = random(height);
					let newfood = createVector(x, y);
					this.food.push(newfood);
				}
			}
		}
	}

	show() {
		push();
		fill(0, 200, 0, 200);
		for(let el of this.food) {
			ellipse(el.x, el.y, 2 * this.size, 2 * this.size);
		}
		pop();
	}

}