var game=new Phaser.Game(800,600,Phaser.AUTO,'',{preload:preload,create:create,update:update});

function preload(){
    game.load.image('star','assets/star.png');
    game.load.image('sky','assets/sky.png');
    game.load.image('ground','assets/platform.png');
    game.load.spritesheet('dude','assets/dude.png',32,48);
}
var platforms;
var player;
var star;
var score=0;
var scoreText;

function create(){
     
   star=game.add.sprite(0,0,'sky');
    game.add.sprite(0,0,'star');
    
    platforms=game.add.group();
    var ground=platforms.create(0,game.world.height-60,'ground');
    ground.scale.setTo(2,2);
    ground.body.immovable=true;
    player=game.add.sprite(32,game.world.height-150,'dude');
    
    //ledge properties
    var ledge=platforms.create(400,400,'ground');
    ledge.body.immovable=true;
    
    ledge=platforms.create(-150,400,'ground');
    ledge.body.immovable=true;
    
    ledge=platforms.create(200,175,'ground');
    
    ledge.body.immovable=true;
    
    //player properties
    player.body.bounce.y=0.2;
    player.body.gravity.y=10;
    player.body.collideWorldBounds=true;
    
    player.animations.add('left',[0,1,2,3],10,true);
    player.animations.add('right',[5,6,7,8],10,true);
    
    //stars
    star=game.add.group();
    
    for(var i=0;i<20;i++){
            var stars=star.create(i*40,0,'star');
            stars.body.gravity.y=6;
            stars.body.bounce.y=0.7+Math.random()*0.2;
    }
    //cursor control
     cursors=game.input.keyboard.createCursorKeys();
    
    //scorecard
    scoreText=game.add.text(16,16,'Score:0',{fontSize:'32px',fill:'#720'});
}

function update(){
    game.physics.collide(player,platforms); 
    game.physics.collide(star,platforms);
    
    //if plater and star overlap collectStar function is called
    game.physics.overlap(player,star,collectStar,null,this);
    
    //reset velocity of player
    player.body.velocity.x=0;
    
    if(cursors.left.isDown){
         player.body.velocity.x=-150;
          player.animations.play('left');
    }
    else if(cursors.right.isDown){
          player.body.velocity.x=150;
           player.animations.play('right');
    }
    else{
       player.animations.stop();
       player.frame=4;
    }
    
    
    if(cursors.up.isDown ){
        player.body.velocity.y=-400;
    }
    
}

function collectStar(player,star){
       star.kill();
    
       score+=10;
      scoreText.content='Score:'+score;
}