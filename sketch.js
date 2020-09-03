var boids = [];
var popmax = 50;
const mutRate = 0.04;
var alignSlider, cohesionSlider, sepSlider;
var population, food;
var target;
var lifetime = 400;
var debug = true;
  
function setup() {
  createCanvas(800, 600);
  population = new Population(mutRate, popmax);
  alignSlider = createSlider(0, 3, 1, 0.1);
  cohesionSlider = createSlider(0, 3, 1, 0.1);
  sepSlider = createSlider(0, 3, 1, 0.1);
  food = new Food(10, 5);
}
  
function draw() {
  background(215);
  food.show();
  food.feed(population.population);
  // generating arrays of forces
  let allForces = population.generateForces();
  // applying forces, updating and displaying boids
  population.run(allForces);
  text('Alignment factor: ' + alignSlider.value(), 10, 15);
  text('Cohesion factor: ' + cohesionSlider.value(), 10, 30);
  text('Separation factor: ' + sepSlider.value(), 10, 45);
  text('Generation: ' + population.gen, 10, 60);
  text(lifetime - frameCount % lifetime, 10, height - 15);

  // generating a new population
  if(frameCount % lifetime == 0) {
    population.newGeneration();
  }
}

function reproduction(parentA, parentB) {
  newDNA = parentA.dna.crossover(parentB.dna);
  newDNA.mutate(mutRate);
  let x = random(width);
  let y = random(height);
  return new Boid(x, y, newDNA);
}

// pick one function shown on the improved pool selection video by the coding train
// https://www.youtube.com/watch?v=ETphJASzYes&list=PLRqwX-V7Uu6bJM3VgzjNV5YxVxUwzALHV&index=8
function pickOne(list) {
  let index = 0;
  let r = random();
  while(r > 0) {
    r -= list[index];
    index++;
  }
  index--;
  // this function returns the index because I've put the normalized fitness in a separated array
  return index;
}