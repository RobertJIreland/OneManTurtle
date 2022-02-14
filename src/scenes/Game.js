import Phaser from 'phaser'


class Game extends Phaser.Scene
{
    constructor()
    {
        super('game')
    }

    create()
    {
    this.gridBG;

        // Background & Game Board Grid
        this.add.image(400, 200, 'background')
        this.gridBG = this.add.image(675, 300, "blobs", "grid.png")

        // Blobs
        // Orange
        this.blobOrange = this.add.image(325, 100, "blobs", "blob-orange.png")
        this.blobOrange.setAngle(90)
        this.blobOrange.setDisplaySize(100, 100)
        // Yellow
        this.blobYellow = this.add.image(325, 325, "blobs", "blob-yellow.png")
        this.blobYellow.setAngle(90)
        this.blobYellow.setDisplaySize(100, 100)
        // Blue
        this.blobBlue = this.add.image(325, 525, "blobs", "blob-blue.png")
        this.blobBlue.setAngle(90)
        this.blobBlue.setDisplaySize(100, 100)
        // Pink
        this.blobPink = this.add.image(1025, 100, "blobs", "blob-pink.png")
        this.blobPink.setAngle(90)
        this.blobPink.setDisplaySize(100, 100)
        // Red
        this.blobRed = this.add.image(1025, 325, "blobs", "blob-red.png")
        this.blobRed.setAngle(90)
        this.blobRed.setDisplaySize(100, 100)
        // Green
        this.blobGreen = this.add.image(1025, 525, "blobs", "blob-green.png")
        this.blobGreen.setDisplaySize(100, 100)

        // Grid
        this.grid = [];
        this.frames = ["orange-square.png", "yellow-square.png", "blue-square.png", "pink-square.png", "red-square.png", "green-square.png" ];

        for (let x = 0; x < 14; x++)
        {
            this.grid[x] = []

        for (let y = 0; y < 14; y++)
        {
            let sx = 444 + (x * 36);
            let sy = 63 + (y * 36);
            let color = Phaser.Math.Between(0, 5);

            let block = this.add.image(sx, sy, "blobs", this.frames[color])

            block.setData("oldColor", color);
            block.setData("color", color);
            block.setData("x", sx);
            block.setData("y", sy);

            this.grid[x][y] = block;
        }
        }
        

    }
}

export default Game