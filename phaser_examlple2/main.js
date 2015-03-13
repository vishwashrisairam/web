var main={
    preload:function(){
        game.load.image('paddle','assets/paddle.png');
        game.load.image('brick','assets/brick.png');
        game.load.image('ball','assets/ball.png');
    },
    create:function(){
         game.physics.startSystem(Phaser.Physics.ARCADE);
        this.cursor=game.input.keyboard.createCursorKeys();
        this.paddle=game.add.sprite(350,500,'paddle');
        game.physics.arcade.enable(this.paddle);
        this.paddle.body.immovable=true;
        
        this.bricks=game.add.group();
        this.bricks.enableBody=true;
        
        for(var i=0;i<12;i++){
            for(var j=0;j<5;j++){
                 game.add.sprite(55+i*60,55+j*35,'brick',0,this.bricks);
            }
        }
        this.bricks.setAll('body.immovable',true);
        
        this.ball=game.add.sprite(200,300,'ball');
        game.physics.arcade.enable(this.ball);
        
        this.ball.body.velocity.x=200;
        this.ball.body.velocity.y=200;
        
        this.ball.body.collideWorldBounds=true;
        this.ball.body.bounce.x=1;
        this.body.body.bounce.y=1;
    },
    update:function(){
           if(this.cursor.right.isDown)
                 this.paddle.body.velocity.x=250;
            else if(this.cursor.left.isDown)
                  this.paddle.body.velocity.x=-250;
            else 
                this.paddle.body.velocity.x=0;
        
        
          game.physics.arcade.collide(this.paddle,this.ball,this.bounce,null);
        
     //  game.physics.arcade.colllide(this.ball,this.bricks,this.hit,null);
    
    },
    bounce:function(paddle,ball){
        this.ball.body.bounce=200;
       this.ball.body.velocity.y=200;
    },
    hit:function(ball,brick){
         this.ball.body.velocity.y=200;  
         this.brick.kill();
    },//
};

var game=new Phaser.Game(800,600,Phaser.AUTO,'gameDiv');
game.state.add('main',main);
game.state.start('main');