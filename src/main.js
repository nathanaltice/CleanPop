// Nathan Altice made this :p
// Updated: 1/13/24
// Asset Management
// A Phaser 3 example to help you spark joy by cleaning up round objects
// Demonstrates multi-asset loading, object groups, interactive (clickable) objects, tweens

// To show how object counts affect FPS, increase the for loop counter in create()
// and analyze your rendering performance in the Chrome Dev console
// See: https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference#rendering

// debug ENFORCEMENT 👊
'use strict'

// Play Scene
class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    preload() {
        // load an asset path to save a bunch of typing
        this.load.path = './assets/img/'
        // load multiple images
        // we can omit the extension property b/c they are all .png)
        // see: https://phaser.io/examples/v3/view/loader/image/load-image
        this.load.image([
            { key: '8ball' },
            { key: 'basketball' },
            { key: 'cd' },
            { key: 'joy' },
            { key: 'kiwi' },
            { key: 'laserdisc' },
            { key: 'soccer' },
            { key: 'tennis' },
            { key: 'volleyball' },
        ])
        // load audio
        this.load.path = './assets/audio/'
        this.load.audio('pop01', 'pop01.mp3')
        this.load.audio('pop02', 'pop02.mp3')
        this.load.audio('pop03', 'pop03.mp3')
        this.load.audio('mail', 'mail.mp3')
    }

    create() {
        // make the scene pink obv
        this.cameras.main.setBackgroundColor('#FACADE')

        // create a circles group to hold our...circles
        this.circles = this.add.group()
        // lay down random circles (change the loop index to a high value to destroy your FPS)
        let circleSet = ['8ball', 'basketball', 'cd', 'kiwi', 'laserdisc', 'soccer', 'tennis', 'volleyball']
        for (let i = 0; i < 10; i++) {
            // get some random numbers for circle properties
            let randX = Math.random() * game.config.width
            let randY = Math.random() * game.config.height
            let randRotation = Math.random() * 360
            
            // pick a random circle image and create it inside 'circles' group
            let rndSelection = Math.floor(Math.random() * circleSet.length)
            // create( [x] [, y] [, key] [, frame] [, visible] [, active])
            let circle = this.circles.create(randX, randY, circleSet[rndSelection])
            circle.rotation += randRotation
            
            // make circle interactive so we can click (and remove) it
            // https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.GameObject.html#setInteractive
            circle.setInteractive({
                useHandCursor: true,
            })
            
            // call a function when the mouse clicks on the interactive object
            // https://photonstorm.github.io/phaser3-docs/Phaser.Input.Events.html#event:GAMEOBJECT_POINTER_DOWN__anchor
            circle.on('pointerdown', this.removeItem)
        }

        // print instructions on screen
        let style = {
            fontFamily: 'Futura',
            fontSize: '28px',
            color: '#FFFFFF',
        }
        // https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Text.html#setShadow__anchor
        this.instructions = this.add.text(game.config.width/2, game.config.height/2, 'CLICK circles to CLEAN UP', style).setOrigin(0.5).setShadow(2, 2, '#333')

        // add a very special guest
        this.joy = this.add.sprite(game.config.width/2, game.config.height, 'joy').setOrigin(0.5, 0)
    }

    update() {
        // rotate all the children in the 'circles' group
        this.circles.rotate(0.05)
        
        // rotateAround(point, angle)
        //this.circles.rotateAround({x: game.config.width/2, y: game.config.height/2}, -0.005)
    }

    // remove clicked item
    removeItem(pointer, localX, localY, event) {
        let sceneContext = this.scene  // get scene context before we kill the object
        sceneContext.playPop()         // play pop sound
        this.destroy()                 // destroy the child obj

        // check for special guest if all circles are gone
        if(!sceneContext.circles.getLength()) {
            sceneContext.sparkJoy()
        }  
    }

    // did you tidy up like I asked you to?
    sparkJoy() {
        // get rid of the previous text
        this.instructions.destroy()
        
        // setup new text
        let style = {
            fontFamily: 'Futura',
            fontSize: '80px',
            color: '#FFFFFF',
        }
        let sparkJoy = this.add.text(0 - game.config.width/2, game.config.height/2, 'JOY SPARKED', style).setOrigin(0.5).setShadow(2, 2, '#333')
        
        // tween in new text
        this.tweens.add({
            targets: sparkJoy,
            x: game.config.width/2,
            ease: 'Bounce',
            duration: 1500,
            repeat: 0,
            yoyo: false
        })
        
        // tween in special guest
        this.tweens.add({
            targets: this.joy,
            y: game.config.height/2,
            ease: 'Bounce.easeOut',
            duration: 1000
        })
        
        // play audio cue
        this.sound.play('mail', { volume: 0.75 })
    }

    // play a randomized pop sound
    playPop() {
        switch(Math.floor(Math.random() * 3)) {
            case 0:
                this.sound.play('pop01')
                break
            case 1:
                this.sound.play('pop02')
                break
            case 2:
                this.sound.play('pop03')
                break
            default:
                console.log('Error: Invalid Sound')
        }
    }
}

// game configuration
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [ Play ],
}

let game = new Phaser.Game(config)