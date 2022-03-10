import Phaser from 'phaser'
import Blob from './BlobButton.js'
import MusicButton from './musicButton.js'



class Game extends Phaser.Scene
{
    constructor()
    {
        super('game')

        this.grid = []
        this.currentColor = null;
        this.frames = ["orange-square.png", "yellow-square.png", "blue-square.png", "pink-square.png", "red-square.png", "green-square.png" ];
        this.moves = 2
        this.matched = []
        this.block;
        this.text;
    }
    
    create()
    {
        // Background & Game Board Grid
        this.add.image(400, 200, 'background')
        this.gridBG = this.add.image(675, 300, "blobs", "grid.png")

        // Move Counter
        this.text = this.add.text(10, 125, 'Moves left: ' + this.moves, { fontFamily: 'CuteFont', fontSize: 50, color: 0xffffff })

        // Audio
        this.backgroundMusic = this.sound.add('audio', {
            volume: 0.3,
            loop: true
        })
        this.backgroundMusic.play()

        // Sound Effects
        this.goodSound = this.sound.add('goodSound', {
            volume: 0.5
        })
        this.badSound = this.sound.add('badSound', {
            volume: 3
        })

        // Music Button
        const musicButton = new MusicButton(this, 50, 50, 'musicButton')
        this.add.existing(musicButton)
        musicButton.on('pointerdown', () =>
        {
            if (musicButton.isTinted === false)
            {
                musicButton.setTint(0xff0000)
                this.backgroundMusic.pause()
            }
            else
            {
                musicButton.clearTint()
                this.backgroundMusic.resume()
            }
        })

        this.setup()

        // Sound Effects On Blobs
        for (let blobObject of this.blobCollection)
        {
            blobObject.on('pointerdown', () => 
            {
                let buttonColor = blobObject.getData('color')
                if (this.currentColor !== buttonColor)
                {
                    this.goodSound.play()
                }
                else
                {
                    this.badSound.play()
                }
            })
        }

        // Grid
        for (let x = 0; x < 14; x++)
        {   
            this.grid[x] = []

            for (let y = 0; y < 14; y++)
            {
                let sx = 444 + (x * 36);
                let sy = 63 + (y * 36);
                let color = Phaser.Math.Between(0, 5);

                this.block = this.add.image(sx, sy, "blobs", this.frames[color])
            

                this.block.setData('oldColor', color)
                this.block.setData('color', color)

                
                this.blobOrange.setData('color', this.frames.indexOf('orange-square.png'))
                this.blobYellow.setData('color', this.frames.indexOf('yellow-square.png'))
                this.blobBlue.setData('color', this.frames.indexOf('blue-square.png'))
                this.blobPink.setData('color', this.frames.indexOf('pink-square.png'))
                this.blobRed.setData('color', this.frames.indexOf('red-square.png'))
                this.blobGreen.setData('color', this.frames.indexOf('green-square.png'))

                this.grid[x][y] = this.block;
            }
        }

        this.currentColor =  this.grid[0][0].getData("color")

        this.checkBlocks([]);
        
        
    }
    update()
    {
        for (let blobObject of this.blobCollection)
        {
            blobObject.on('pointerdown', () =>
            {
                let buttonColor = blobObject.getData('color')
        
                if (this.currentColor !== buttonColor)
                {   
                    this.moves--
                    this.text.setText("Moves left: " +  this.moves)
                    this.checkBlocks([]);

                    for (let blocks of this.matched)
                    {
                        this.floodFill(buttonColor, blocks[0], blocks[1])
                    }
                }
            })
        }
        this.checkGameState();
    }


    checkDupe(coords, coordsToAdd)
    {   
        let test = JSON.stringify(coords)
        let allCoords = JSON.stringify(this.matched.concat(coordsToAdd))
        return allCoords.indexOf(test) === -1
    }

    checkBlocks(coordsToAdd)
    {
        if (this.matched.length === 0)
        {
            this.matched.push([0, 0])
        }

        let reCheck = false
        for (let blocks of this.matched)
        {
            if (blocks[0] < 13)
            {
                let coords = [blocks[0] + 1, blocks[1]]
                let rightColor = this.grid[blocks[0] + 1][blocks[1]].getData("color")

                if (rightColor === this.currentColor)
                {
                    if (this.checkDupe(coords, coordsToAdd))
                    {
                        coordsToAdd.push(coords)
                        reCheck = true
                    }
                }
            }
            if (blocks[0] > 0)
            {   
                let coords = [blocks[0] - 1, blocks[1]]
                let leftColor = this.grid[blocks[0] - 1][blocks[1]].getData('color')

                if (leftColor === this.currentColor)
                {
                    if (this.checkDupe(coords, coordsToAdd))
                    {
                        coordsToAdd.push(coords)
                        reCheck = true
                    }
                }
            }
            if (blocks[1] > 0)
            {   
                let coords = [blocks[0], blocks[1] - 1]
                let upColor = this.grid[blocks[0]][blocks[1] - 1].getData('color')

                if (upColor === this.currentColor)
                {
                    if (this.checkDupe(coords, coordsToAdd))
                    {
                        coordsToAdd.push(coords)
                        reCheck = true
                    }
                }
            }
            if (blocks[1] < 13)
            {
                let coords = [blocks[0], blocks[1] + 1]
                let downColor = this.grid[blocks[0]][blocks[1] + 1].getData('color')

                if (downColor === this.currentColor)
                {
                    if (this.checkDupe(coords, coordsToAdd))
                    {
                        coordsToAdd.push(coords)
                        reCheck = true
                    }
                }
            }
        }

        if (reCheck === true)
        {
            console.log('m', this.matched.length)
            console.log('c', coordsToAdd.length)
            this.checkBlocks(coordsToAdd)
        }else{
            console.log('m', this.matched.length)
            console.log('c', coordsToAdd.length)
            this.matched = this.matched.concat(coordsToAdd)
        }

    }
    
    floodFill(buttonColor, x, y)
    {   
        this.grid[x][y].setTexture("blobs", this.frames[buttonColor])
        this.currentColor = buttonColor
    }

    setup()
    {
        // Blobs
        this.blobOrange = new Blob(this, 325, 100, 'blobs', 'blob-orange.png')
        this.blobYellow = new Blob(this, 325, 325, 'blobs', 'blob-yellow.png')
        this.blobBlue = new Blob(this, 325, 525, 'blobs', 'blob-blue.png')
        this.blobPink = new Blob(this, 1025, 100, 'blobs', 'blob-pink.png')
        this.blobRed = new Blob(this, 1025, 325, 'blobs', 'blob-red.png')
        this.blobGreen = new Blob(this, 1025, 525, 'blobs', 'blob-green.png')

        // Array of blobs for the onClick event 
        this.blobCollection = 
        [
            this.blobOrange,
            this.blobYellow,
            this.blobBlue,
            this.blobPink,
            this.blobRed,
            this.blobGreen
        ]

        // lol
        this.blobGreen.setAngle(0)
        
        // Adds blobs to the scene 
        this.add.existing(this.blobOrange)
        this.add.existing(this.blobYellow)
        this.add.existing(this.blobBlue)
        this.add.existing(this.blobPink)
        this.add.existing(this.blobRed)
        this.add.existing(this.blobGreen)
    }

    checkGameState()
    {   
        if (this.moves === 0)
        {
            for (let blobObject of this.blobCollection)
            {
                blobObject.removeInteractive()
            }
            for (let block of this.grid)
            {
                this.tweens.add
                ({
                    targets: block,
                    scaleX: 0,
                    scaleY: 0,
                    duration: 1500,
                    ease: 'Power3'
                })
            }
            this.add.text(525, 100, "So close! \nTry again?", { fontFamily: 'CuteFont', fontSize: 100, color: 0xffffff })
            let yesButton = this.add.text(525, 200, "Yes", { fontFamily: 'CuteFont', fontSize: 100, color: 0xffffff })
            yesButton.setInteractive()
            
        }
    }
}
export default Game

