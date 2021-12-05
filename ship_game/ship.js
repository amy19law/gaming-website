// Splash Page for Instructions
const splash = document.querySelector('.splash');

document.addEventListener('DOMContentLoaded', (e)=>{
    setTimeout(()=>{
        splash.classList.add('display-none');
        splashPage = true
    }, 1500);
})

// Set JavaScript Elements
var c = document.createElement("canvas");
var ctx = c.getContext("2d");
c.width = window.innerWidth; c.height = window.innerHeight * 0.6;
document.body.appendChild(c);

// Map Setting
var p = [];
while (p.length < 300){
    while(p.includes(val = Math.floor(Math.random()*300)));
    p.push(val);
}

// Creating Lerp
var curve = (a,b,c) => a + (b-a) * (1-Math.cos(c*Math.PI))/2;

// Creating the Waves in the Game
var waves = x=>{
    x = x * 0.01 % 255;
    return curve(p[Math.floor(x)], p[Math.ceil(x)], x - Math.floor(x));
}

// Creating the Hills in the Game
var hills = x=>{
    x = x * 0.01 % 1000;
    return curve(p[Math.floor(x)], p[Math.ceil(x)], x - Math.floor(x));
}

// Ship/Player Settings
var Ship =  function(){
    this.x = c.width/2;
    this.y = 0;
    this.shipSpeed = 0;
    this.rotation = 0;
    this.rotationSpeed = 0;

    // Load in Image
    this.img = new Image();
    this.img.src = "ship.png";

    this.draw = function(){
        var playerPosition =  c.height - waves(t + this.x) * 0.25; // Player Position 
        var frontPosition =  c.height - waves(t+5 + this.x) * 0.25; // Position in Front of Player

        // When Player is on the "Sea", setting position of the player
        var shipAtSea = 0;
        if(playerPosition-12 > this.y){
            this.shipSpeed += 0.1;
        }else{
            this.shipSpeed -= this.y - (playerPosition-12);
            this.y = playerPosition - 12;
            shipAtSea = 1;
        }

        // Deciding the Angle of the Player based on position in front
        var shipAngle = Math.atan2((frontPosition-12) - this.y, (this.x+5) - this.x);
        this.y += this.shipSpeed;

        // Check for Player Error Leading to End of Game
        if(!shipActive || shipAtSea && Math.abs(this.rotation) > Math.PI * 0.5){
            shipActive = false;
            this.rotationSpeed = 5;
            keys.ArrowUp = 1;
            this.x -= speed * 5;
        }

        // When Player is active and on the sea, allow rotations
        if(shipAtSea && shipActive){
            this.rotation -= (this.rotation - shipAngle) * 0.80;
            this.rotationSpeed = this.rotationSpeed - (shipAngle - this.rotation);
        }
        this.rotationSpeed += (keys.ArrowLeft - keys.ArrowRight) * 0.05;
        this.rotation -= this.rotationSpeed * 0.1;
        if(this.rotation > Math.PI) this.rotation = -Math.PI;
        if(this.rotation < -Math.PI) this.rotation = Math.PI;
        ctx.save();
        ctx.translate(this.x, this.y - 3);
        ctx.rotate(this.rotation); // Rotation
        ctx.drawImage(this.img, -10, -20, 90, 40); // Size & Location of Ship
        ctx.restore();
    }
}

// Set Keys
onkeydown = d => keys[d.key] = 1;
onkeyup = d => keys[d.key] = 0;

// Game Variables
var ship = new Ship();
var t = 0;
var speed = 0;
var shipActive = true;
var keys = {ArrowUp: 0, ArrowDown: 0, ArrowLeft: 0, ArrowRight: 0};
var score = 0;
var appendScore = document.getElementById("score");

// Game Function 
function startGame(){
    // When Player is Active, Score Counter is Active
    if (shipActive == true){
        score++; 
        appendScore.innerHTML = score
    }

    // Speed of Ship
    speed -= (speed - (keys.ArrowUp - keys.ArrowDown)) * 0.01;
    t += 10 * speed;

    // Set Background
    var my_gradient = ctx.createLinearGradient(0, 0, 100, 600);
    my_gradient.addColorStop(0, "DeepSkyBlue");
    my_gradient.addColorStop(1, "white");
    ctx.fillStyle = my_gradient;
    ctx.fillRect(0, 0, c.width, c.height);

    // Set Hills
    ctx.fillStyle = "rgba(168, 147, 125,0.75)";
    ctx.beginPath();
    ctx.moveTo(0, c.height);
    for (let i = 0; i < c.width; i++)
        ctx.lineTo(i, c.height*0.8 - hills(t + i*5) * 0.1);
    ctx.lineTo(c.width, c.height);
    ctx.fill();


    // Set Land
    ctx.fillStyle = "rgba(128,128,128,0.3)";
    ctx.beginPath();
    ctx.moveTo(0, c.height);
    for (let i = 0; i < c.width; i++)
        ctx.lineTo(i, c.height*0.6 - hills(t + i*2) * 1);
    ctx.lineTo(c.width, c.height);
    ctx.fill();

    // Set Sea
    ctx.fillStyle = "#007bae";
    ctx.beginPath();
    ctx.moveTo(0, c.height);
    for (let i = 0; i < c.width; i++)
        ctx.lineTo(i, c.height - waves(t + i) * 0.25);
    ctx.lineTo(c.width, c.height);
    ctx.fill();

    // Draw Ship
    ship.draw();
    
    // If Ship Error, Run endGame Function
    if(ship.x < 0)
       endGame();
    requestAnimationFrame(startGame);

}

// Function to Restart Game
function restartGame(){
    ship = new Ship();
    t = 0;
    speed = 0;
    shipActive = true;
    keys = {ArrowUp:0, ArrowDown:0, ArrowLeft:0, ArrowRight:0};
    score = 0
}

// Show Final Score in an Alert, when Game Over 
function endGame() {
    alert("FINAL SCORE: " + score);
    restartGame();
}

startGame();