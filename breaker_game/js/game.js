const splash = document.querySelector('.splash');

document.addEventListener('DOMContentLoaded', (e)=>{
    setTimeout(()=>{
        splash.classList.add('display-none');
        splashPage = true
    }, 1500);
})

// Declaring Variables 
var player;
var ball;
var objects = [];
var gameStart = true;
var userWin = false;
var instructions;
var winner;
var confetti = [];

// Game Setup
function setup() {
  createCanvas(windowWidth, windowHeight);
  ellipseMode(CENTER);
  textAlign(CENTER);
  noFill();
  stroke(0);

  // Run Player & Ball,
  player = new Player();
  ball = new Ball();

  // Randomise Confetti 
  for (var i = 0; i < 100; i++) {
    confetti[i] = new Confetti(Math.floor(random(5)));
  }

  // Run Objects & Text
  createObjects(random(20, 40)); // Produce 40 Objects
  createText();
}

// Set & Execute Game Settings while Program is Running
function draw() {
  background("black");

  // Object Setting
  for (var i = objects.length - 1; i >= 0; i--) {
    if (ball.hits(objects[i])) {
      if (objects[i].r >= 40) {
        var createObjects = objects[i].shrink();
        objects = objects.concat(createObjects);
      }
      objects.splice(i, 1);
      ball.direction.y *= -1;
      break;
    }
    objects[i].display();
  }

  // Player Setting
  player.display();
  if (!gameStart) player.check();
  if (!gameStart) player.update();

  // Ball Setting
  if (ball.meets(player)) {
    if (ball.direction.y > 0) ball.direction.y *= -1; // Change Ball Direction when Player Met
  }

  ball.display();
  if (!gameStart) ball.check();
  if (!gameStart) ball.update();

  if (ball.position.y > height) {
    ball.position = createVector(player.position.x + player.r, height - 500);
    gameStart = true;
    ball.shadows = []; // Create Shadow Effect
  }

  if (objects.length === 0) { // Run Functions when all Objects are Hit
    userWin = true;
    gameStart = true;
  }

  // Settings for if User Wins
  if (userWin) {
    winner.style('display', 'block'); // Display Text when True
    for (var i = 0; i < confetti.length; i++) { // Display Confetti Animation
      confetti[i].fall();
      confetti[i].show();
    }
  } else {
    winner.style('display', 'none'); // Hide Text when False
  }
    
  // Settings for Starting Game
  if (gameStart) {
    instructions.style('display', 'block'); // Display Text when True
  } else {
    instructions.style('display', 'none'); // Hide Text when False
  }
}

// Function for Creating Text that will be displayed
function createText() {
  instructions = createP("PRESS ENTER TO PLAY");
  instructions.style('display', 'none');
  instructions.position(width / 2 - 150, 800);
  
  winner = createP('YOU WON!');
  winner.style('display', 'none');
  winner.position(width / 2 - 50, 400);
}

// Creating Objects and pushing to display
function createObjects(n) {
  for (var i = 0; i < n; i++) {
    objects.push(new Object());
  }
}
  
// Functions for Key Presses & Releases
function keyReleased() {
  player.isMovingRight = false; // Stop Moving Right when Key is Released 
  player.isMovingLeft = false; // Stop Moving Left when Key is Released 
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) { // Move Player Left when 'Left Arrow Key' is Pressed
    player.isMovingLeft = true;
  } else if (keyCode === RIGHT_ARROW) { // Move Player Right when 'Right Arrow Key' is Pressed
    player.isMovingRight = true;
  } else if (keyCode === ENTER) { // Start Game when 'Enter Key' is Pressed
    if (objects.length === 0) createObjects(random(20, 40)); // // Produce 40 Objects
    gameStart = false;
    userWin = false;
    gameRestart = false;
  }
}