import Phaser from 'phaser'

export default class MusicButton extends Phaser.GameObjects.Image
{
    constructor (scene, x, y, texture)
    {
        super (scene, x, y, texture, 'MusicButton')

        this.setDisplaySize(75, 75)
        this.setInteractive()
        this.isTint = false
    }
}