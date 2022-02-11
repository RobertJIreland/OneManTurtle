import Phaser from 'phaser'
import Preloader from './scenes/Preloader.js'
import Game from './scenes/Game.js'

const config =
{
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics:
    {
        default: "arcade",
        arcade:
        {
            gravity: {y: 0},
            debug: false,
        }
    },
    scene: [Preloader, Game]
};

const game = new Phaser.Game(config);