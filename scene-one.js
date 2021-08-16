var SceneOne = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "SceneOne" });
    },
    init: function() {},
    preload: function() {
      this.load.image('sky', 'assets/sky.png');
      this.load.image('ground', 'assets/platform.png');
      this.load.image('star', 'assets/star.png');
      this.load.spritesheet('dude', 'assets/spritetest.png', { frameWidth: 250, frameHeight: 340 }); // skal kanskkje være 340
      this.load.image('block', 'assets/blackbox.png');
      this.load.image('upplat', 'assets/upplat.png');
      this.load.image('enemy', 'assets/bomb.png');
    },
    create: function() {
      this.cameras.main.setBackgroundColor('#ccccff');
      let boundariesW = 1200

      platforms = this.physics.add.staticGroup();
      platforms.create(400, 568, 'ground').setScale(4).refreshBody();
      platforms.create(200, 425, 'ground').setScale(0.75).refreshBody();;
      platforms.create(1000, 500, 'upplat').setScale(0.25).refreshBody();

      player = this.physics.add.sprite(100, 475, 'dude').setScale(0.15,0.15)
      player.setBounce(0);
      player.setCollideWorldBounds(true);
      player.body.onWorldBounds = true;

      enemy = this.physics.add.image(1000, 350, 'enemy')
      .setImmovable(true);
      enemy.body.setAllowGravity(false)

      scoreText = this.add.text(16, 16, 'Dash: ' + dash, { fontSize: '32px', fill: '#000' })
      scoreText.setScrollFactor(0) //sørger for at teksten følger kamera

      this.physics.world.bounds.width = boundariesW;
    //  this.physics.world.bounds.height = 300;
      this.cameras.main.setBounds(0, 0, boundariesW, 600);
      this.cameras.main.startFollow(player);

      this.anims.create({
          key: 'left',
          frames: this.anims.generateFrameNumbers('dude', { start: 1, end: 4 }),
          frameRate: 10,
          repeat: -1
      });

      this.anims.create({
          key: 'turn',
          frames: [ { key: 'dude', frame: 0 } ],
          frameRate: 20
      });


      this.anims.create({
          key: 'right',
          frames: this.anims.generateFrameNumbers('dude', { start: 1, end: 4 }),
          frameRate: 20,
          repeat: -1
      });

      this.anims.create({
          key: 'dashed',
            frames: [ { key: 'dude', frame: 5 } ],
          frameRate: 20,

      });
      this.anims.create({
          key: 'dashed-side',
          frames: this.anims.generateFrameNumbers('dude', { start: 6, end: 9 }),
          frameRate: 10,
          repeat: -1

      });

      cursors = this.input.keyboard.createCursorKeys();

      stars = this.physics.add.group({
          key: 'star',
          setXY: { x: 1100, y: 0 }
      });

      this.physics.add.collider(player, platforms);
      this.physics.add.collider(stars, platforms);

      this.physics.add.overlap(player, stars, collectStar, null, this);
      this.physics.add.overlap(player, enemy, enemyhit, null, this);


      var block = this.physics.add.image(300, 500, 'block')
        .setScale(0.1)
        .setImmovable(true)
      block.body.setAllowGravity(false)//sørger for at "block" ikke faller nedover

      this.tweens.timeline({
        targets: block.body.velocity,
        loop: -1,
        tweens: [
          { x:    0, y: 0, duration: 1000, ease: 'Stepped' },
          { x:    50, y:    0, duration: 4000, ease: 'Stepped' },
          { x:    0, y: 0, duration: 1000, ease: 'Stepped' },
          { x:    0, y:    -50, duration: 4000, ease: 'Stepped' },
          { x:    0, y: 0, duration: 1000, ease: 'Stepped' },
          { x:    -50, y: 0, duration: 4000, ease: 'Stepped' },
          { x:    0, y: 0, duration: 1000, ease: 'Stepped' },
          { x:    0, y:  50, duration: 4000, ease: 'Stepped' },



        ]
      },
      );
      var enemymove = this.tweens.add({
      targets: [ enemy ],
      x: 100,
      y: '+=0',
      duration: 4000,
      ease: 'Power3',
      loop: -1
  })
      this.physics.add.collider(enemy, platforms);
      this.physics.add.collider(block, player);



/*  this.time.addEvent({
      delay: 3000,
      loop: false,
      callback: () => {
        this.scene.start("SceneTwo", {
          "message": "Game Over"
});
      }
  })*/
    },


    update: function(time) {

      controlscheme(time);



      }







});
