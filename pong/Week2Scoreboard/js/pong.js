// canvas and context
var c = document.querySelector(`#pong`);
var ctx = c.getContext(`2d`);

// timer to make the game run at 60fps
var timer = setInterval(main, 1000 / 60);

// global friction variable
var fy = 0.97;

// player setup
let player = [];
let pad = [];
const colors = ['green', 'yellow'];

for (let i = 0; i < 2; i++) {
    player[i] = {
        name: `Player ${i + 1}`,
        score: 0,
        pad: new Box()
    };
    player[i].pad.w = 20;
    player[i].pad.h = 150;
    player[i].pad.x = i === 0 ? player[i].pad.w / 2 : c.width - player[i].pad.w / 2;
    player[i].pad.color = colors[i];
    pad[i] = player[i].pad;
}

// ball setup
var ball = new Box();
ball.w = 20;
ball.h = 20;
ball.vx = -2;
ball.vy = -2;
ball.color = `orange`;

// grab the two score divs once (not every frame)
const scoreDivs = document.querySelectorAll("#score div");

function main() {
    ctx.clearRect(0, 0, c.width, c.height);

    const keyMap = [
        { up: 'w', down: 's' },
        { up: 'o', down: 'l' }
    ];

    // handles paddle input
    for (let i = 0; i < pad.length; i++) {
        if (keys[keyMap[i].up]) pad[i].vy += -pad[i].force;
        if (keys[keyMap[i].down]) pad[i].vy += pad[i].force;
    }

    // apply friction + move paddles
    for (let i = 0; i < pad.length; i++) {
        pad[i].vy *= fy;
        pad[i].move();
    }

    // ball movement
    ball.move();

    // paddle boundary collision
    for (let i = 0; i < pad.length; i++) {
        const halfH = pad[i].h / 2;
        if (pad[i].y < halfH) pad[i].y = halfH;
        if (pad[i].y > c.height - halfH) pad[i].y = c.height - halfH;
    }

    // check scoring
    checkBallOutOfBounds();

    // ball collision with top/bottom walls
    if (ball.y < 0 || ball.y > c.height) {
        ball.vy = -ball.vy;
        ball.y = Math.max(0, Math.min(ball.y, c.height));
    }

    // paddle-ball collision
    for (let i = 0; i < pad.length; i++) {
        if (ball.collide(pad[i])) {
            const direction = i === 0 ? 1 : -1;
            ball.x = pad[i].x + direction * (pad[i].w / 2 + ball.w / 2);
            ball.vx = -ball.vx;
        }
    }

    // draw paddles and ball
    for (let i = 0; i < pad.length; i++) {
        pad[i].draw();
    }
    ball.draw();

    // update scores in DOM
    for (let i = 0; i < scoreDivs.length; i++) {
        scoreDivs[i].textContent = `${player[i].name}: ${player[i].score}`;
    }
}

// modular scoring logic
function checkBallOutOfBounds() {
    if (ball.x < 0) {
        player[1].score++;
        logScore();
        resetBall();
    } else if (ball.x > c.width) {
        player[0].score++;
        logScore();
        resetBall();
    }
}

function logScore() {
    console.log(`${player[0].score} | ${player[1].score}`);
}

function resetBall() {
    ball.x = c.width / 2;
    ball.y = c.height / 2;
    ball.vx *= -1;
    // randomize vertical direction slightly
    ball.vy = (Math.random() > 0.5 ? 1 : -1) * 2;
}
