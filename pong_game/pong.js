const splash = document.querySelector('.splash');

document.addEventListener('DOMContentLoaded', (e)=>{
    setTimeout(()=>{
        splash.classList.add('display-none');
        splashPage = true
    }, 1500);
})

// Variables
var gameSets = [7];
var movements = {
	stationary: 0,
	moveUp: 1,
	moveDown: 2,
	moveLeft: 3,
	moveRight: 4
};
 
// Game Settings
var pongGame = {
	initialize: function () {
		this.c = document.querySelector('canvas');
		this.ctx = this.c.getContext('2d');

		this.c.width = 4050;
		this.c.height = 1925;

		this.c.style.width = (this.c.width / 2) + 'px';
		this.c.style.height = (this.c.height / 2) + 'px';

		this.player = Objects.new.call(this, 'left');
		this.rival = Objects.new.call(this, 'right');
		this.orb = Ball.new.call(this);

		this.rival.speed = 11;
		this.active = this.inactive = false;
		this.switch = this.rival;
		this.clock = this.round = 0;
		this.color = 'darkslategrey';

		mainGame.starterScreen();
		mainGame.keyEvent();
	},

	starterScreen: function () {
		// Draw All Objects
		mainGame.draw();

		this.ctx.font = '100px Arial';
		this.ctx.fillStyle = 'white';

		// Draw Box Behind Instructions
		this.ctx.fillRect(
			this.c.width / 2 - 700,
			this.c.height / 2 - 950,
			1400,
			150
		);

        // Text Colour
		this.ctx.fillStyle = 'darkslategrey';

		// Draw Instructions Text
		this.ctx.fillText('PRESS A KEY TO PLAY',
			this.c.width / 2,
			this.c.height / 2 - 840
		);
	},

    endGame: function (text) {

		mainGame.ctx.font = '50px Courier New';
		GamainGameme.ctx.fillStyle = this.color;

		// Draw Box Behind Instructions
		mainGame.ctx.fillRect(
			mainGame.c.width / 2 - 350,
			mainGame.c.height / 2 - 48,
			700,
			100
		);

		mainGame.ctx.fillStyle = 'white';

		// Draw End of Game Text
		mainGame.ctx.fillText(text,
			mainGame.c.width / 2,
			mainGame.c.height / 2 + 15
		);

		setTimeout(function () {
			mainGame = Object.assign({}, pongGame);
			mainGame.initialize();
		}, 3000);
	},

	// Update Game Objects
	update: function () {
		if (!this.inactive) {

            // Move player if a keyboard event occurs
			if (this.player.move === movements.moveUp) this.player.y -= this.player.speed;
			else if (this.player.move === movements.moveDown) this.player.y += this.player.speed;

			// // Player Collision with Boundaries
			if (this.player.y <= 0) this.player.y = 0;
			else if (this.player.y >= (this.c.height - this.player.height)) this.player.y = (this.c.height - this.player.height);

            // Player & Ball Collisions
			if (this.orb.x - this.orb.width <= this.player.x && this.orb.x >= this.player.x - this.player.width) {
				if (this.orb.y <= this.player.y + this.player.height && this.orb.y + this.orb.height >= this.player.y) {
					this.orb.x = (this.player.x + this.orb.width);
					this.orb.moveX = movements.moveRight;
				}
			}

            // Ball Collision with Boundaries
			if (this.orb.x <= 0) mainGame.reset.call(this, this.rival, this.player);
			if (this.orb.x >= this.c.width - this.orb.width) mainGame.reset.call(this, this.player, this.rival);
			if (this.orb.y <= 0) this.orb.moveY = movements.moveDown;
			if (this.orb.y >= this.c.height - this.orb.height) this.orb.moveY = movements.moveUp;

            // Start of new round, ball to selected side and random direction
			if (mainGame.delay.call(this) && this.switch) {
				this.orb.moveX = this.switch === this.player ? movements.moveLeft : movements.moveRight;
				this.orb.moveY = [movements.moveUp, movements.moveDown][Math.round(Math.random())];
				this.orb.y = Math.floor(Math.random() * this.c.height - 200) + 200;
				this.switch = null;
			}

			// Move ball in certain direction based on movements
			if (this.orb.moveY === movements.moveUp) this.orb.y -= (this.orb.speed / 1.5);
			else if (this.orb.moveY === movements.moveDown) this.orb.y += (this.orb.speed / 1.5);
			if (this.orb.moveX === movements.moveLeft) this.orb.x -= this.orb.speed;
			else if (this.orb.moveX === movements.moveRight) this.orb.x += this.orb.speed;

			// Rival Movements
			if (this.rival.y > this.orb.y - (this.rival.height / 2)) {
				if (this.orb.moveX === movements.moveRight) this.rival.y -= this.rival.speed / 1.5;
				else this.rival.y -= this.rival.speed / 4;
			}
			if (this.rival.y < this.orb.y - (this.rival.height / 2)) {
				if (this.orb.moveX === movements.moveRight) this.rival.y += this.rival.speed / 1.5;
				else this.rival.y += this.rival.speed / 4;
			}

			// Rival Collisons
			if (this.rival.y >= this.c.height - this.rival.height) this.rival.y = this.c.height - this.rival.height;
			else if (this.rival.y <= 0) this.rival.y = 0;

			// Rival & Ball Collisions
			if (this.orb.x - this.orb.width <= this.rival.x && this.orb.x >= this.rival.x - this.rival.width) {
				if (this.orb.y <= this.rival.y + this.rival.height && this.orb.y + this.orb.height >= this.rival.y) {
					this.orb.x = (this.rival.x - this.orb.width);
					this.orb.moveX = movements.moveLeft;
				}
			}
		}

		// Player Check Win
		if (this.player.score === gameSets[this.round]) {
			if (!gameSets[this.round + 1]) {
				this.inactive = true;
				setTimeout(function () { mainGame.endGame('Winner!'); }, 1000);
			} else {
				this.color = colors;
				this.player.score = this.rival.score = 0;
				this.player.speed += 0.5;
				this.rival.speed += 1; 
				this.orb.speed += 1;
				this.round += 1;
			}
		}
		// Rival Check Win
		else if (this.rival.score === gameSets[this.round]) {
			this.inactive = true;
			setTimeout(function () { mainGame.endGame('Game Over!'); }, 1000);
		}
	},

	// Draw Objects to Canvas Element
	draw: function () {
		// Clear Canvas
		this.ctx.clearRect(
			0,
			0,
			this.c.width,
			this.c.height
		);

		this.ctx.fillStyle = this.color;

		// Draw Background
		this.ctx.fillRect(
			0,
			0,
			this.c.width,
			this.c.height
		);

		this.ctx.fillStyle = 'white';

		// Draw the Player
		this.ctx.fillRect(
			this.player.x,
			this.player.y,
			this.player.width,
			this.player.height
		);

		// Draw the Rival
		this.ctx.fillRect(
			this.rival.x,
			this.rival.y,
			this.rival.width,
			this.rival.height
		);

		// Draw the Ball
		if (mainGame.delay.call(this)) {
			this.ctx.fillRect(
				this.orb.x,
				this.orb.y,
				this.orb.width,
				this.orb.height
			);
		}

		// Draw Middle Line
		this.ctx.beginPath();
		this.ctx.setLineDash([7, 15]);
		this.ctx.moveTo((this.c.width / 2), this.c.height - 50);
		this.ctx.lineTo((this.c.width / 2), 150);
		this.ctx.lineWidth = 30;
		this.ctx.strokeStyle = 'white';
		this.ctx.stroke();

		this.ctx.font = '100px Arial';
		this.ctx.textAlign = 'center';

		// Draw Players Score
		this.ctx.fillText(
			this.player.score.toString(),
			(this.c.width / 2) - 100,
			100
		);

		// Draw Rivals Score
		this.ctx.fillText(
			this.rival.score.toString(),
			(this.c.width / 2) + 100,
			100
		);
	},

    // Create Game Loop
	loop: function () {
		mainGame.update();
		mainGame.draw();

		if (!mainGame.inactive) requestAnimationFrame(mainGame.loop);
	},

	keyEvent: function () {
		document.addEventListener('keydown', function (key) {
			// Start Game when Key Pressed
			if (mainGame.active === false) {
				mainGame.active = true;
				window.requestAnimationFrame(mainGame.loop);
			}

			// Key Events (Up Key)
			if (key.keyCode === 38) mainGame.player.move = movements.moveUp;

			// Key Events (Down Key)
			if (key.keyCode === 40) mainGame.player.move = movements.moveDown;
		});

		// Stop Movement
		document.addEventListener('keyup', function (key) { mainGame.player.move = movements.stationary; });
	},

    	// Delay
	delay: function() {
		return ((new Date()).getTime() - this.clock >= 900);
	},

	// Reset Game
	reset: function(winner, loser) {
		winner.score++;
        this.orb = Ball.new.call(this, this.orb.speed);
		this.switch = loser;
		this.clock = (new Date()).getTime();
	},
};

// Player & Rival Object Settings
var Objects = {
	new: function (gameHalf) {
		return {
            x: gameHalf === 'left' ? 150 : this.c.width - 150,
			y: (this.c.height / 2) - 35,
			width: 35,
			height: 200,
			move: movements.stationary,
			speed: 10,
            score: 0,
		};
	}
};

// Ball Settings
var Ball = {
	new: function (increaseSpeed) {
		return {
            x: (this.c.width / 2)- 25,
			y: (this.c.height / 2)- 25,
			//radius: 10,
			width: 50,
			height: 50,
			moveX: movements.stationary,
			moveY: movements.stationary,
			speed: increaseSpeed || 12,
		};
	}
};

var mainGame = Object.assign({}, pongGame);
mainGame.initialize();