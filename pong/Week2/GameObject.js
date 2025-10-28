class GameObject
{
    constructor()
    {
        this.x = 100
        this.y = 100
        this.w = 100
        this.h = 100
        this.color = `purple`
        this.vX = 0
        this.vY = 0 

    }
    render()
    {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x,this.y,this.w,this.h)
    }
    move()
    {
        this.x += this.vX
        this.y += this.vY
        
    }
}