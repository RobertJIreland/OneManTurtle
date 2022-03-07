import Phaser from 'phaser'
import Blob from './BlobButton.js'
import MusicButton from './musicButton.js'



class Game extends Phaser.Scene
{
    constructor()
    {
        super('game')

        this.grid = []
        this.gridBG;
        this.currentColor = null;
        this.frames = ["orange-square.png", "yellow-square.png", "blue-square.png", "pink-square.png", "red-square.png", "green-square.png" ];
        this.moves = 25
        this.matched = [[0,0]]
        this.block;
    }
    
    create()
    {
        // Background & Game Board Grid
        this.add.image(400, 200, 'background')
        this.gridBG = this.add.image(675, 300, "blobs", "grid.png")

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

        // Blobs
        const blobOrange = new Blob(this, 325, 100, 'blobs', 'blob-orange.png')
        const blobYellow = new Blob(this, 325, 325, 'blobs', 'blob-yellow.png')
        const blobBlue = new Blob(this, 325, 525, 'blobs', 'blob-blue.png')
        const blobPink = new Blob(this, 1025, 100, 'blobs', 'blob-pink.png')
        const blobRed = new Blob(this, 1025, 325, 'blobs', 'blob-red.png')
        const blobGreen = new Blob(this, 1025, 525, 'blobs', 'blob-green.png')

        // lol
        blobGreen.setAngle(0)
        
        const blobCollection = 
        [
            blobOrange,
            blobYellow,
            blobBlue,
            blobPink,
            blobRed,
            blobGreen
        ]
        
        this.add.existing(blobOrange)
        this.add.existing(blobYellow)
        this.add.existing(blobBlue)
        this.add.existing(blobPink)
        this.add.existing(blobRed)
        this.add.existing(blobGreen)

        

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

                
                blobOrange.setData('color', this.frames.indexOf('orange-square.png'))
                blobYellow.setData('color', this.frames.indexOf('yellow-square.png'))
                blobBlue.setData('color', this.frames.indexOf('blue-square.png'))
                blobPink.setData('color', this.frames.indexOf('pink-square.png'))
                blobRed.setData('color', this.frames.indexOf('red-square.png'))
                blobGreen.setData('color', this.frames.indexOf('green-square.png'))
                

                this.grid[x][y] = this.block;
            }
        }


        this.currentColor =  this.grid[0][0].getData("color")

        for (let blobObject of blobCollection)
        {
            blobObject.on('pointerdown', () =>
            {
                let buttonColor = blobObject.getData('color')
            
                if (this.currentColor !== buttonColor)
                {   
                    this.goodSound.play()
                    this.moves--
                    this.floodFill(buttonColor, 0, 0)
                }
                else
                {
                    this.badSound.play()
                }
                // this.currentColor = this.grid[0][0].getData("color")
            
                // let rightColor = this.grid[1][0].getData("color")

                // if (this.currentColor === rightColor)
                // {
                //     this.matched.push([1,0])
                // }
                // console.log(this.matched)

                // check surrounding blocks for each block in matched

                let coordsToAdd = []
                coordsToAdd = this.checkBlocks(coordsToAdd);
                // need to work on not adding duplicate coords
                // if a new block is connected and the same color, then we need to check that block too
                this.matched = this.matched.concat(coordsToAdd)
                console.log(this.matched)
                // update colors for blocks in matched array
                for (let blocks of this.matched)
                { 
                    this.floodFill(buttonColor, blocks[0], blocks[1])
                }
            })
        }
    }


    checkDupe(coords, coordsToAdd)
    {
        let b = JSON.stringify(coords)
        let test = JSON.stringify(this.matched.concat(coordsToAdd))
        return test.indexOf(b) === -1
    }

    checkBlocks(coordsToAdd)
    {
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
            this.matched = this.matched.concat(coordsToAdd)
            this.checkBlocks([])
        }
        return coordsToAdd
    }
    

    floodFill(buttonColor, x, y)
    {   
        this.grid[x][y].setTexture("blobs", this.frames[buttonColor])
        this.currentColor = buttonColor
    }
}

export default Game

