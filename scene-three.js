var SceneThree = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "SceneThree" });
    },
    init: function(data) {
  //  this.message = data.message;
  this.message = "Press 'space' to start Game"
},

    preload: function() { this.load.image('background', 'assets/backtest.png');
  this.load.image('tostart', 'assets/tostart.png')},
    create: function() {
      this.add.image(400, 300, 'background')
      text = this.add.image(400, 300, 'tostart')
      var intext = "Start Game"
    /*  var text = this.add.text(
     phaserConfig.width/2,
     phaserConfig.height/2,
    this.message,
     {
         fontSize: 25,
         color: "white",
         fontStyle: "bold" //husk koverwatch
     }
 ).setOrigin(0.5);
*/ // eksempel for å gjøre det med tekst i stedet for bilder

 this.time.addEvent({
     delay: 500,
     loop: true,
     callback: () => {
       if (text.alpha === 0){
         text.alpha = 1
       }
       else{ text.alpha = 0}

     }
 })


cursors = this.input.keyboard.createCursorKeys();

    },
    update: function() {
      if(cursors.space.isDown){this.scene.start("SceneFour")}

    }

});
