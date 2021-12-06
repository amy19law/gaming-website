// Created by Amy Law

// Create Player/Bar
// radius = r, height = h
function Player() {
    // Player Setting (Size & Position)
    this.r = 150;
    this.h = 20;
    this.position = createVector(width / 2 - this.r / 2, height - 40);
    this.isMovingLeft = false;
    this.isMovingRight = false;
  
    // Player Setting (Colour)
    this.display = function() {
      strokeWeight(2);
      stroke('#E0E0E0');
      rect(this.position.x, this.position.y, this.r, this.h);
      stroke(0);
      strokeWeight(0);
      fill('#E8E8E8')
    }
  
    // Player Movement
    this.update = function() {
      if (this.isMovingLeft) {
        this.move(-20);
      } else if (this.isMovingRight) {
        this.move(20);
      }
    }
  
    this.move = function(step) {
      this.position.x += step;
    }
  
    // Check for Edge of Screen
    this.check = function() {
      if (this.position.x <= 0) this.position.x = 0;
      else if (this.position.x + this.r >= width) this.position.x = width - this.r;
    }
  }

// Created by Amy Law
