// Created by Amy Law

var animation = 0
// Function to Create Confetti Element
function Confetti(index) {
  
  // Element Setting
  this.x = random(width);
  this.y = random(-500, -50);
  this.z = random(0, 50);
  this.length = 25;
  this.speed = random(5, 10);

  // Element Colouring 
  this.colors = ['#6CD9CC', '#FB6578', '#FE5A8F', '#FC9574', '#9A8DF2']; // Potential Element Colours
  this.index = index;

  // Making the Elements Fall from Top to Bottom of Screen
  this.fall = function() {
    this.y = this.y + this.speed;
    if (this.y > height) {
      this.y = random(-200, -100);
      this.speed = random(10, 20);
    }
  }

  // Displaying the Confetti Elements with Animation
  this.show = function() {
    strokeWeight(3);
    stroke(this.colors[this.index]);
    line(this.x, this.y, this.x - this.length / 3, this.y + this.length);
    stroke(0);
    strokeWeight(1);
    rotate(animation);
    animation = animation - 0.000001;
  }

}

// Created by Amy Law
