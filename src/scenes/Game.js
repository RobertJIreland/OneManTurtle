import Phaser from 'phaser'
import Blob from './BlobButton.js'



class Game extends Phaser.Scene
{
    constructor()
    {
        super('game')

        this.grid = []
        this.gridBG;
        this.currentColor = []
        this.frames = ["orange-square.png", "yellow-square.png", "blue-square.png", "pink-square.png", "red-square.png", "green-square.png" ];
        this.moves = 25
        this.matched = []
        this.block;
    }
    
    create()
    {
        // Background & Game Board Grid
        this.add.image(400, 200, 'background')
        this.gridBG = this.add.image(675, 300, "blobs", "grid.png")

        // Blobs
        const blobOrange = new Blob(this, 325, 100, 'blobs', 'blob-orange.png')
        const blobYellow = new Blob(this, 325, 325, 'blobs', 'blob-yellow.png')
        const blobBlue = new Blob(this, 325, 525, 'blobs', 'blob-blue.png')
        const blobPink = new Blob(this, 1025, 100, 'blobs', 'blob-pink.png')
        const blobRed = new Blob(this, 1025, 325, 'blobs', 'blob-red.png')
        const blobGreen = new Blob(this, 1025, 525, 'blobs', 'blob-green.png')
        
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



        for (let blobObject of blobCollection)
        {
            blobObject.on('pointerdown', () =>
            {
                let buttonColor = blobObject.getData('color')
                this.currentColor = this.grid[0][0].getData("color")
            
                if (this.currentColor !== buttonColor)
                {   
                    this.moves--
                    this.floodFill(buttonColor, 0, 0)
                }
                
            })
        }
    }

    floodFill(buttonColor, x, y)
    {   
        if (x === 0)
        {
            this.grid[x][y].setTexture("blobs", this.frames[buttonColor])
            this.currentColor = this.grid[x + 1][y].getData('color')
            this.floodFill(buttonColor, x + 1, y)
        }

        else if (this.currentColor === buttonColor)
        {   
            console.log("hey")
            this.currentColor = this.grid[x + 1][y].getData('color')
            this.floodFill(buttonColor, x + 1, y)
        }
        // else
        // {   
        //     if (x < 13)
        //     {
        //         if(this.grid[x][y].getData('color') !== buttonColor)
        //         {   
        //             this.floodFill(buttonColor, x + 1, y)
        //         }
        //         this.grid[x][y].setTexture("blobs", this.frames[buttonColor])
        //     }
        // console.log("attempted change")
        // }
    }
}

export default Game

// first check if it isnt the color 
// second check if it is the same color
