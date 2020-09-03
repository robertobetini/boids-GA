# boids-GA
Boid simulation with genetic algorithm. The concecpt of boid was first developed by Craig Reynolds.
Each boid has a perception radius and is being affected by the following steering forces:


• Cohesion: each boid will try to get as near as possible of its fellows within the perception radius.

• Separtaion: each boid will try to get as far as possible of its fellows within the perception radius.

• Alignment: each boid will try to follow the direction of its fellows within the perception radius.


Combining these 3 forces can produce creative and unexpected behaviors patterns, and you can change the magnitude of each one by changind the sliders' values.
You can find more information in https://www.red3d.com/cwr/boids/.

But then we have the genetic algorithm into the scene.
Each boid will also seek for "food", which is represented by the green circles appearing randomly in the canvas, and when it's within the boids perception, they'll seek for the food, and if it eats, it will increase it's fitness score by 1, and after some time (some frames, actually), a new generation of boids will replace the older one.
At the end of each generation, each boid will have a fitness score, which is greather than 0, and the properties of new ones will be picked randomly based on the fitness score. So, the higher the boid's score, the higher chance it will have to be picked and have it's properties passed to a new generation.
It's fun changing the forces' values and see what happens.

The properties that are built into the boid's DNA is it's MAX SPEED, MAX FORCE (magnitude) and PERCEPTION RADIUS.
The higher ther MAX SPEED is, the faster the boid will try to move, and the MAX FORCE will define how well it will steer and accelerate.
The PERCEPTION RADIUS let the boid 'knows' when there's food or another boid near it.
