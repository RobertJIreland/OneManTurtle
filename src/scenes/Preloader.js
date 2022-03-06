import Phaser from 'phaser'
import backgroundImage from '../../assets/backgrounds-3.png'
import blobsImage from '../../assets/blobs.png'
import blobsJson from '../../assets/blobs.json'
import musicButton from '../../assets/music-button.png'


class Preloader extends Phaser.Scene
{
    constructor()
    {
        super("preloader")
    }
    preload()
    {
        // Background
        this.load.image('background', backgroundImage)

        // Blobs, Blocks, & Grid
        this.load.atlas('blobs', blobsImage, blobsJson)

        // Music Button
        this.load.image('musicButton', musicButton)
    }
    create()
    {
        this.scene.start("game")
    }
}

export default Preloader