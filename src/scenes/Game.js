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
        this.matched = []
        this.moves = 25
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

        // Generates blocks in grid and renders instructions
        this.setup()
        this.instructions = this.add.image(675, 300, 'instructions')

    }
    update()
    {
        this.text.setText('Moves left: ' + this.moves)
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

        // recursive check if we find blocks touching with matching colors
        if (reCheck === true)
        {
            this.checkBlocks(coordsToAdd)
        }

        this.matched = coordsToAdd
        return coordsToAdd
    }
    
    floodFill(buttonColor, blocks)
    {   
        for (let block of blocks)
        {
            let x = block[0]
            let y = block[1]
            this.grid[x][y].setTexture('blobs', this.frames[buttonColor])
            this.grid[x][y].setData('color', buttonColor)
            this.currentColor = buttonColor
        }
    }

    blobClick(blobColor)
    {
        let blocksToFill = this.checkBlocks(this.matched)
        if (this.currentColor !== blobColor)
        {
            this.moves--
            this.goodSound.play()
            this.floodFill(blobColor, blocksToFill)
            
            this.checkWon()
        }
        else
        {
            this.badSound.play()
        }
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

        for (let x = 0; x < 14; x++)
        {   
            this.grid[x] = []

            for (let y = 0; y < 14; y++)
            {
                let sx = 444 + (x * 36);
                let sy = 63 + (y * 36);
                let color = Phaser.Math.Between(0, 5);

                this.block = this.add.image(sx, sy, "blobs", this.frames[color])

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

        for (let blobObject of this.blobCollection)
        {
            blobObject.setInteractive()
            blobObject.on('pointerdown', () => 
            {
                this.instructions.destroy()
                this.blobClick(blobObject.getData('color'))
            })
        }
        this.currentColor = this.grid[0][0].getData('color')
    }

    checkWon()
    {
        for (let x = 0; x < 14; x++)
        {
            for (let y = 0; y < 14; y++)
            {
                if (this.grid[x][y].getData('color') !== this.currentColor)
                {
                    return false
                }
            }
        }
        for (let blobObject of this.blobCollection)
        {
            blobObject.removeInteractive()
        }
        for (let block of this.grid)
        {
            this.tweens.add
            ({
                targets: block,
                duration: 1500,
                x: 584,
                y: 169,
                ease: 'Bounce.easeOut',
            })
        }
        let youWinText = this.add.text(525, 100, "You Win! \nTry again?", { fontFamily: 'CuteFont', fontSize: 100, color: 0xffffff })
        let yesButton = this.add.text(525, 300, "Yes", { fontFamily: 'CuteFont', fontSize: 100, color: 0xffffff })
        let noButton = this.add.text(725, 300, "No", { fontFamily: 'CuteFont', fontSize: 100, color: 0xffffff })

        yesButton.setInteractive()
        yesButton.on('pointerdown', () =>
        {
            yesButton.destroy()
            noButton.destroy()
            youWinText.destroy()
            this.moves = 25
            this.matched = []
            this.setup()
        })
            noButton.setInteractive()
            noButton.on('pointerdown', () =>
            {
                this.badSound.play()
            })
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
            let tryAgainText = this.add.text(525, 100, "So close! \nTry again?", { fontFamily: 'CuteFont', fontSize: 100, color: 0xffffff })
            let yesButton = this.add.text(525, 300, "Yes", { fontFamily: 'CuteFont', fontSize: 100, color: 0xffffff })
            let noButton = this.add.text(725, 300, "No", { fontFamily: 'CuteFont', fontSize: 100, color: 0xffffff })

            yesButton.setInteractive()
            yesButton.on('pointerdown', () =>
            {
                yesButton.destroy()
                noButton.destroy()
                tryAgainText.destroy()
                this.moves = 25
                this.matched = []
                this.setup()
            })
            noButton.setInteractive()
            noButton.on('pointerdown', () =>
            {
                this.badSound.play()
            })
        }
    }
}
export default Game

