//canvas and context
var c = document.querySelector(`#pong`)
var ctx = c.getContext(`2d`)

//timer to make the game run at 60fps
var timer = setInterval(main, 1000/60)

//global friction variable
var fy = .97
// player setup
let player = []
let pad = []
const colors = ['green', 'yellow'];
for (let i = 0; i < 2; i++) {
    player[i] = new Player(`Player ${i + 1}`);
    player[i].pad = new Box();
    player[i].pad.w = 20;
    player[i].pad.h = 150;
    player[i].pad.x = i === 0 ? player[i].pad.w / 2 : c.width - player[i].pad.w / 2;
    player[i].pad.color = colors[i];
    player[i].score = 0;
    pad[i] = player[i].pad;
}
//ball setup not gonna add a for loop here cause we only have 1
var ball = new Box();
ball.w = 20
ball.h = 20
ball.vx = -2
ball.vy = -2
ball.color = `orange`
function main()
{
    //erases the canvas
    ctx.clearRect(0,0,c.width,c.height)
    

   const keyMap = [
        { up: 'w', down: 's' },
        { up: 'o', down: 'l' }
    ];

    // handle paddle input, friction, movement, and boundary collision
    for (let i = 0; i < pad.length; i++) {
        if (keys[keyMap[i].up]) pad[i].vy += -pad[i].force;
        if (keys[keyMap[i].down]) pad[i].vy += pad[i].force;
    }
    //applies friction
    pad[0].vy *= fy
    pad[1].vy *= fy
    //player movement
    pad[0].move();
    pad[1].move();
    //ball movement
    ball.move()

    //p1 collision

    for(let i = 0; i < pad.length; i++)
    {
        const halfH = pad[i].h /2
        if (pad[i].y < halfH)
        {
            pad[i].y = halfH
        }
        if (pad[i].y > c.height - halfH)
            {
                pad[i].y = c.height -halfH;
            }
    }

    //ball collision 
    // Can also be made into ball scoring. 
    if(ball.x < 0)
    {
        ball.x = c.width/2
        ball.y  =c.height/2
        player[1].score += 1
        console.log(player[0].score + " | " + player[1].score)
    }
    if(ball.x > c.width)
    {
        ball.x = c.width
        ball.vx = -ball.vx
        player[0].score += 1
        console.log(player[0].score + " | " + player[1].score)
    }
    if(ball.y < 0)
    {
        ball.y = 0
        ball.vy = -ball.vy
    }
    if(ball.y > c.height)
    {
        ball.y = c.height
        ball.vy = -ball.vy
       
    }

    //p1 with ball collision
    for(let i = 0; i < pad.length; i++)
    {
        if(ball.collide(pad[i]))
        {
            const direction = i === 0? 1: -1; /// Just learned how to do this, thanks to help from AI and self study
            ball.x = pad[i].x + direction  * (pad[i].w/2 +ball.w/2);
            ball.vx = -ball.vx;
        }
    }
    
    //draw the objects
    pad[1].draw()
    pad[0].draw()
    ball.draw()
    const scoreDivs = document.querySelectorAll("#score div");
    for (let i = 0; i < scoreDivs.length; i++) {
    scoreDivs[i].textContent = `Player ${i + 1}: ${player[i].score}`;
}
}