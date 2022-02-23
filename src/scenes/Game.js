import Phaser from 'phaser'
import Blob from './BlobButton.js'



class Game extends Phaser.Scene
{
    constructor()
    {
        super('game')

        this.grid = []
        this.gridBG;
        this.currentColor = ''
        this.frames = ["orange-square.png", "yellow-square.png", "blue-square.png", "pink-square.png", "red-square.png", "green-square.png" ];
        this.moves = 25
        this.matched = []
    }
    
    create()
    {
        // Background & Game Board Grid
        this.add.image(400, 200, 'background')
        this.gridBG = this.add.image(675, 300, "blobs", "grid.png")

        // Blobs
        // Orange
        const blobOrange = new Blob(this, 325, 100, 'blobs', 'blob-orange.png')
        const blobYellow = new Blob(this, 325, 325, 'blobs', 'blob-yellow.png')
        const blobBlue = new Blob(this, 325, 525, 'blobs', 'blob-blue.png')
        const blobPink = new Blob(this, 1025, 100, 'blobs', 'blob-pink.png')
        const blobRed = new Blob(this, 1025, 325, 'blobs', 'blob-red.png')
        const blobGreen = new Blob(this, 1025, 525, 'blobs', 'blob-green.png')
        
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

                let block = this.add.image(sx, sy, "blobs", this.frames[color])
            

                block.setData('oldColor', color)
                block.setData('color', color)
                block.setData("x", sx);
                block.setData("y", sy);
                
                blobOrange.setData('color', this.frames.indexOf('orange-square.png'))
                blobYellow.setData('color', this.frames.indexOf('yellow-square.png'))
                blobBlue.setData('color', this.frames.indexOf('blue-square.png'))
                blobPink.setData('color', this.frames.indexOf('pink-square.png'))
                blobRed.setData('color', this.frames.indexOf('red-square.png'))
                blobGreen.setData('color', this.frames.indexOf('green-square.png'))
                

                this.grid[x][y] = block;
                this.currentColor = this.grid[0][0]
            }
        }
        blobOrange.on('pointerdown', () =>
        {
            let newColor = blobOrange.getData('color')
            let oldColor = this.grid[0][0].getData('color')

            if (newColor === this.currentColor)
            {
                console.log("Same Color")
            }

            else if (oldColor !== newColor)
            {
                console.log("different colors")
                this.currentColor = newColor
                this.matched = []
                this.moves--
                console.log(this.currentColor)
                // floodFill()
            }
        })
        blobYellow.on('pointerdown', () =>
        {
            let newColor = blobYellow.getData('color')
            let oldColor = this.grid[0][0].getData('color')
            
            if (newColor === this.currentColor)
            {
                console.log("Same Color")
            }

            else if (oldColor !== newColor)
            {
                console.log("different colors")
                this.currentColor = newColor
                this.matched = []
                this.moves--
                console.log(this.currentColor)
                // floodFill()
            }
        })
        blobBlue.on('pointerdown', () =>
        {
            let newColor = blobBlue.getData('color')
            let oldColor = this.grid[0][0].getData('color')
            
            if (newColor === this.currentColor)
            {
                console.log("Same Color")
            }

            else if (oldColor !== newColor)
            {
                console.log("different colors")
                this.currentColor = newColor
                this.matched = []
                this.moves--
                console.log(this.currentColor)
                // floodFill()
            }
        })
        blobPink.on('pointerdown', () =>
        {
            let newColor = blobPink.getData('color')
            let oldColor = this.grid[0][0].getData('color')
            
            if (newColor === this.currentColor)
            {
                console.log("Same Color")
            }

            else if (oldColor !== newColor)
            {
                console.log("different colors")
                this.currentColor = newColor
                this.matched = []
                this.moves--
                console.log(this.currentColor)
                // floodFill()
            }
        })
        blobRed.on('pointerdown', () =>
        {
            let newColor = blobRed.getData('color')
            let oldColor = this.grid[0][0].getData('color')
            
            if (newColor === this.currentColor)
            {
                console.log("Same Color")
            }

            else if (oldColor !== newColor)
            {
                console.log("different colors")
                this.currentColor = newColor
                this.matched = []
                this.moves--
                console.log(this.currentColor)
                // floodFill()
            }
        })
        blobGreen.on('pointerdown', () =>
        {
            let newColor = blobGreen.getData('color')
            let oldColor = this.grid[0][0].getData('color')
            console.log("CurrentColor", this.currentColor)
            
            if (newColor === this.currentColor)
            {
                console.log("Same Color")
            }

            else if (oldColor !== newColor)
            {
                console.log("different colors")
                this.currentColor = newColor
                this.matched = []
                this.moves--
                console.log(this.currentColor)
                // floodFill()
            }
        })
        // const floodFill = (oldColor, newColor, x, y) =>
        // {

        // }
    }
}

export default Game