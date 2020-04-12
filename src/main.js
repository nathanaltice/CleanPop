// Nathan Altice made this :p
// Updated: 4-10-19
// Asset Management
// Demonstrates asset groups, frame rate debug, asset performance impact, click to remove

// debug ENFORCEMENT 👊
'use strict';

// Play Scene
class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {

    }

    create() {
        // make the scene pink obv
        this.cameras.main.setBackgroundColor("#FACADE");
    }

    update() {

    }

    rotateItems(child) {

    }

    removeItem(child) {

    }

    playPop() {

    }
}

// game configuration
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [ Play ],
};

let game = new Phaser.Game(config);