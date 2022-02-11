import Phaser from 'phaser'


class Game extends Phaser.Scene
{
    constructor()
    {
        super('game')
    }

    create()
    {   
        // Background
        this.add.image(400, 200, 'background')
        // this.gridBG = this.add.image(400, 600, "grid.png")
    }
}

export default Game