const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var username = getParameterByName('name');
var displayName = username.toUpperCase();

function show() {
    document.getElementById("name").innerHTML = "WELCOME, " + displayName;
    document.getElementById("gameSelect").innerHTML = displayName + ", PLEASE SELECT A GAME!";
}

// Mouse Effect Colours
let effectArray = [];
const colours = [
    'white',
    'rgba(171,183,183,0.3)',
    'rgba(191,191,191, 0.8)',
    'rgba(46,49,49,0.6)',
];

const maxSize = 40;
const minSize = 0;

// Mouse Positions
let mouse = {
	x: null,
	y: null
}

window.addEventListener('mousemove', 
	function(event){
		mouse.x = event.x;
		mouse.y = event.y;
});

// Creating Constructor Function for Mouse Effect
function Effect (x, y, directionX, directionY, size, colour){
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.colour = colour;
}

// Add Draw Method to Mouse Effect Prototype
Effect.prototype.draw = function (){

    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI * 2, false);
    ctx.fillStyle = this.colour;
	ctx.fill();
}

// Add Update Method to Mouse Effect Prototype
Effect.prototype.update = function(){
    if (this.x + this.size*2 > canvas.width || this.x - this.size*2 < 0){
			this.directionX = -this.directionX;
	} if (this.y + this.size*2 > canvas.height || this.y - this.size*2 < 0){
		this.directionY = -this.directionY;
	}
    this.x +=this.directionX;
    this.y += this.directionY;


    // Mouse Interactivity
    let mouseRadius = 50;
    if (mouse.x - this.x < mouseRadius 
    && mouse.x - this.x >-mouseRadius 
    && mouse.y - this.y < mouseRadius 
    && mouse.y - this.y >-mouseRadius) {
	    if (this.size < maxSize){
		    this.size += 3;
            this.x -=1.5;
	    } 
    }
    else if (this.size > minSize){
		    this.size -= .1;
    }
    if (this.size < 0) {
        this.size = 0;
    }
    this.draw();
}

// Create Mouse Effect Array 
function init(){
    effectArray = [];
    console.log(colours[Math.floor(Math.random() * colours.length)]);
    for (let i=0; i<1000; i++){
        let size = 0;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * .2) - .1;
        let directionY = (Math.random() * .2) - .1;
        let colour = colours[Math.floor(Math.random() * colours.length)];
        effectArray.push(new Effect(x, y, directionX, directionY, size, colour));
    }
}

// Animation Loop
function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0,0,innerWidth,innerHeight);
	
	for (let i = 0; i < effectArray.length; i++){
		effectArray[i].update();
	}
}
init();
animate();

// Resizing 
window.addEventListener('resize',
	function(){
		canvas.width = innerWidth;
		canvas.height = innerHeight;
		init();
	}
);

// Setting Mouse Position 
setInterval(function(){
	mouse.x = undefined;
	mouse.y = undefined;
}, 1000);

const splash = document.querySelector('.splash');

document.addEventListener('DOMContentLoaded', (e)=>{
    setTimeout(()=>{
        splash.classList.add('display-none');
        splashPage = true
    }, 2000);
})

show()