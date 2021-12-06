// Created by Amy Law
// Creating the Ball & Settings
// radius = r, velocity = vel

function Ball(position) {
  
    // Starting Ball Position
    if (position) {
      this.position = position.copy();
    } else {
      this.position = createVector(width / 2, height - 350);
    }
  
    // Create Ball (Size)
    this.r = 35;
    this.vel = createVector(1, random(1, 2)).mult(4);
    this.direction = createVector(1, 1);
    this.ballShadows = [];
  
    // Create Shadow Effect
    this.update = function() {
      var ballShadow = this.position.copy();
      this.ballShadows.push(ballShadow);
  
      if (this.ballShadows.length > 5) {
        this.ballShadows.splice(0, 1);
      }
  
      this.position.x += this.vel.x * this.direction.x;
      this.position.y += this.vel.y * this.direction.y;
    }
  
    // Ball & Shadow Setting 
    this.display = function() {
      for (var i = this.ballShadows.length - 1; i >= 0; i--) {
        var shadowColour = 'rgba(169,169,169, ' + i / this.ballShadows.length + ')'; // Set Shadow Colour & Length
        fill(shadowColour);
        ellipse(this.ballShadows[i].x, this.ballShadows[i].y, (this.r + i) * 2, (this.r + i) * 2);
      }
  
      // Ball Setting (Colour)
      stroke('#E0E0E0');
      strokeWeight(4);
      fill('#E8E8E8');
      ellipse(this.position.x, this.position.y, this.r * 2, this.r * 2);
    }
  
    // Check for Edge of Screen
    this.check = function() {
      if (this.position.x > width - this.r && this.direction.x > 0) {
        this.direction.x *= -1;
      }
      if (this.position.x < this.r && this.direction.x < 0) {
        this.direction.x *= -1;
      }
      if (this.position.y < this.r && ball.direction.y < 0) this.direction.y *= -1;
    }
  
    // If Ball Meets Player/Bar 
    this.meets = function(player) {
      if (player.position.y - this.position.y > 0 && player.position.y - this.position.y < this.r && ball.position.x > player.position.x - ball.r && ball.position.x < player.position.x + player.r + ball.r) {
        return true;
      } else {
        return false;
      }
    }
  
    // If Ball Hits Object
    this.hits = function(object) {
      var d = dist(this.position.x, this.position.y, object.position.x, object.position.y);
      if (d < object.r + this.r) {
        return true;
      } else {
        return false;
      }
    }
  }
  
// Created by Amy Law
