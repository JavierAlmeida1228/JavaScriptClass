// Canvas and context setup
var c = document.querySelector(`#pong`);
var ctx = c.getContext(`2d`);

// Run game at 60 frames per second
var timer = setInterval(main, 1000 / 60);

// Global friction variable
var fy = 0.97;

// Score tracking
var score1 = 0;
var score2 = 0;

// Cooldown timer for ball reset
var cooldown = 0;
var cooldownDuration = 60; // 60 frames = 1 second
var pendingVX = 0;
var pendingVY = 0;

// Player 1 setup (left paddle)
var p1 = new Box();
p1.w = 20;
p1.h = 150;
p1.x = p1.w / 2;
p1.y = c.height / 2;
p1.color = "blue";
p1.force = 2;

// Player 2 setup (right paddle)
var p2 = new Box();
p2.w = 20;
p2.h = 150;
p2.x = c.width - p2.w / 2;
p2.y = c.height / 2;
p2.color = "green";
p2.force = 2;

// Ball setup
var ball = new Box();
ball.w = 20;
ball.h = 20;
ball.color = "orange";

// Reset ball: randomize = false for initial launch
function resetBall(randomize = false) {
    ball.x = c.width / 2;
    ball.y = c.height / 2;

    let speed = 6; // Increased speed
    cooldown = randomize ? cooldownDuration : 0;

    if (randomize) {
        pendingVX = Math.random() < 0.5 ? -speed : speed;
        pendingVY = (Math.random() * 6) - 3;
    } else {
        pendingVX = speed;
        pendingVY = 0;
    }

    ball.vx = 0;
    ball.vy = 0;
}

// Initial launch
resetBall(false);

function main() {
    // Clear canvas
    ctx.clearRect(0, 0, c.width, c.height);

    // Player 1 controls (W/S)
    if (keys[`w`]) p1.vy += -p1.force;
    if (keys[`s`]) p1.vy += p1.force;
    p1.vy *= fy;
    p1.move();

    // Player 2 controls (O/L)
    if (keys[`o`]) p2.vy += -p2.force;
    if (keys[`l`]) p2.vy += p2.force;
    p2.vy *= fy;
    p2.move();

    // Ball movement with cooldown
    if (cooldown > 0) {
        cooldown--;
    } else if (ball.vx === 0 && ball.vy === 0) {
        ball.vx = pendingVX;
        ball.vy = pendingVY;
    }

    ball.move();

    // Keep paddles on screen
    p1.y = Math.max(p1.h / 2, Math.min(c.height - p1.h / 2, p1.y));
    p2.y = Math.max(p2.h / 2, Math.min(c.height - p2.h / 2, p2.y));

    // Ball collision with top/bottom
    if (ball.y < 0) {
        ball.y = 0;
        ball.vy = -ball.vy;
    }
    if (ball.y > c.height) {
        ball.y = c.height;
        ball.vy = -ball.vy;
    }

    // Ball exits left → Player 2 scores
    if (ball.x + ball.w < 0) {
        score2++;
        resetBall(true);
    }

    // Ball exits right → Player 1 scores
    if (ball.x > c.width + ball.w) {
        score1++;
        resetBall(true);
    }

    // Ball collision with paddles
    if (ball.collide(p1)) {
        ball.x = p1.x + p1.w / 2 + ball.w / 2;
        ball.vx = Math.abs(ball.vx);
    }
    if (ball.collide(p2)) {
        ball.x = p2.x - p2.w / 2 - ball.w / 2;
        ball.vx = -Math.abs(ball.vx);
    }

    // Draw paddles and ball
    p1.draw();
    p2.draw();
    ball.draw();

    // Draw scores
    ctx.fillStyle = "black";
    ctx.font = "24px Arial";
    ctx.fillText(`Player 1: ${score1}`, 50, 30);
    ctx.fillText(`Player 2: ${score2}`, c.width - 180, 30);
}
