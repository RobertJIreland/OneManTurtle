import Phaser from 'phaser'


class Game extends Phaser.Scene
{
    constructor()
    {
        super('game')
    }

    create()
    {
        // Background & Game Board Grid
        this.add.image(400, 200, 'background')
        this.gridBG = this.add.image(675, 300, "blobs", "grid.png")

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
    }
}

export default Game