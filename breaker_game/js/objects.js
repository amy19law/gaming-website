// Created by Amy Law

// Creation & details of the objects displayed on screen
// radius = r
var animation = 0;

function Object(position, r) {

  this.total = random(3, 7); // Number of Sides randomly selected
  this.index = Math.floor(random(5)); // Random Selection for Object Colour
  this.colors = ['#FF355E', '#FF00CC', '#66FF66', '#50BFE6', '#AAF0D1']; // Potential Object Colours
  this.outlines = ['#F60032', '#CC00A3', '#00E500', '#1FA9D9', '#64E4AB']; // Potential Object Colours

  // Object Random Position & Resize
  if (position) {
    this.position = position.copy();
  } else {
    this.position = createVector(random(100, width - 100), random(100, height - 450));
  }
  if (r) {
    this.r = r * 0.5;
  } else {
    this.r = random(20, 80);
  }

  this.display = function() {
    push();

    // Object Settings
    stroke(this.outlines[this.index]);
    strokeWeight(2);
    fill(this.colors[this.index])
    translate(this.position.x, this.position.y);
    rotate(animation);
    animation = animation - 0.0002;
    beginShape();

    // Shaping Object
    for (var i = 0; i < this.total; i++) {
      var angle = map(i, 0, this.total, 0, TWO_PI);
      var r = this.r;
      var x = r * cos(angle);
      var y = r * sin(angle);
      vertex(x, y);
    }

    endShape(CLOSE);
    stroke(0);
    strokeWeight(1);
    pop();
  }

  // Remove/Resize Object
  this.shrink = function() {
    var newObject = [];
    newObject[0] = new Object(this.position, this.r);
    return newObject;
  }
}

// Created by Amy Law
