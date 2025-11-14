let c = document.querySelector(`canvas`);
let ctx = c.getContext(`2d`);

let timer = setInterval(main, 1000 / 60);

// Create falling boxes
let box = [];
for (let i = 0; i < 50; i++) {
    box[i] = new GameObject();
    box[i].x = Math.random() * c.width;
    box[i].y = Math.random() * c.height;
    box[i].vY = Math.random() * (15 - 5) + 5;
    box[i].w = box[i].vY;
    box[i].h = box[i].w;
}

// Create player array and assign Player instances
const player = [];
player[0] = new Player();
player[1] = new Player();

// Assign paddles to each player
player[0].pad = new Box();
player[1].pad = new Box();

// Position and size paddles
player[0].pad.x = 50;
player[0].pad.y = c.height - 30;
player[0].pad.w = 100;
player[0].pad.h = 20;

player[1].pad.x = c.width - 150;
player[1].pad.y = 10;
player[1].pad.w = 100;
player[1].pad.h = 20;

function main() {
    ctx.clearRect(0, 0, c.width, c.height);

    // Move and render falling boxes
    for (let i = 0; i < box.length; i++) {
        box[i].move();
        box[i].render();
        if (box[i].y > c.height) {
            box[i].y = -100;
        }
    }

    // Render player paddles
    player[0].pad.render();
    player[1].pad.render();
}
