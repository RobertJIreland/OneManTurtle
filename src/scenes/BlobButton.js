import Phaser from 'phaser'


export default class Blob extends Phaser.GameObjects.Image
{
    constructor(scene, x, y, texture, frame,)
    {
        super(scene, x, y, texture, frame, 'Blob')
        
        this.setAngle(90)
        this.setDisplaySize(100, 100)
        this.setInteractive()
        this.setDataEnabled()
        // this.on('pointerdown', () =>
        // {   
        //     console.log(block)
        // })
    }
}
