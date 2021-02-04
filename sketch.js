//global variables
var trex, trex_running, edges,trex_collider;
var groundImage
var ground;
var invisibleground
var cloud, cloudImage
var cactus,cactus1,cactus2,cactus3,cactus4,cactus5,cactus6;
var score=0
var cactusgroup,cloudgroup
var PLAY=1
var END=0
var gamestate=PLAY
var background1
var backgroundImage
var gameover,gameoverImage,restart,restartImage
var sun,sunImage
var checkpoint,die,jump



function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  groundImage = loadImage("ground2.png")
  cloudImage=loadImage("cloud1.png")
  cactus1=loadImage("obstacle1.png")
  cactus2=loadImage("obstacle2.png")
  cactus3=loadImage("obstacle3.png")
  cactus4=loadImage("obstacle4.png")
  cactus5=loadImage("obstacle5.png")
  cactus6=loadImage("obstacle6.png")
  backgroundImage=loadImage("desert.jpg")
  trex_collider=loadImage("trex_collided.png")
  gameoverImage=loadImage("gameover2.png")
  restartImage=loadImage("restart.png")
  sunImage=loadImage("sun.png")
  checkpoint=loadSound("checkPoint.mp3")
  jump=loadSound("jump.mp3")
  die=loadSound("die.mp3")
}




function setup(){
  createCanvas(600,200);
  background1=createSprite(80,0,600,200)
  background1.addImage("background",backgroundImage)
  background1.scale=1.6
 
  
  
  // creating trex
  trex = createSprite(50,160,20,50);
    trex.addAnimation("running", trex_running);
  trex.addImage("stand", trex_collider);
  edges = createEdgeSprites();
  
  //adding scale and position to trex
  trex.scale = 0.5;
  trex.x = 50
  ground=createSprite(50,180,600,5)
  ground.addImage("moving",groundImage)
  
  invisibleground=createSprite(50,185,600,5)
  invisibleground.visible=false
  cactusgroup=new Group()
  cloudgroup=new Group()
  trex.debug=false
  trex.setCollider("circle",0,0,40)
  gameover=createSprite(300,80,20,30)
  gameover.addImage("text",gameoverImage)
  gameover.scale=0.2
    restart=createSprite(300,120,20,30)
  restart.addImage("end",restartImage)
  restart.scale=0.3
  sun=createSprite(30,25,20,30)
  sun.addImage("sun",sunImage)
  sun.scale=0.1
  
}


function draw(){
  //set background color 
  background("SkyBlue");
  // local variables
   var message="hi"
console.log(message)
  
  if(gamestate===PLAY){
     score=score+Math.round(frameCount/250)
    if (score>0&&score%100===0){
      checkpoint.play();
    }
   //jump when space key is pressed
  if(keyDown("space")&&trex.y>=100){
    trex.velocityY = -10;   
    jump.play();
  }
  // foreground
  ground.velocityX=-(5+3*score/100)
  if(ground.x<0){
    ground.x=ground.width/2
  }
  // Gravity for trex
  trex.velocityY = trex.velocityY + 0.5; 
   spawnCloud();
  spawnCactus(); 
   gameover.visible=false
  restart.visible=false
    
  if(cactusgroup.isTouching(trex)){
   gamestate=END
    trex.velocityY=-10
    die.play();
  }  
    
  }
  else if(gamestate===END){
  ground.velocityX=0
  cactusgroup.setVelocityXEach(0)  
  cloudgroup. setVelocityXEach(0)  
  cactusgroup.setLifetimeEach(-5)
  cloudgroup.setLifetimeEach(-5)
  trex.changeAnimation("stand",trex_collider)
  trex.velocityY=0  
  gameover.visible=true
  restart.visible=true
  if(
  mousePressedOver(restart)
  
  
  )  {
   console.log("reset") 
reset();
  }
    
    
    
  }
  
  
  
  //logging the y position of the trex
   // console.log(trex.y)
  
  
  //stop trex from falling down
  trex.collide(invisibleground)
  
  
  
  drawSprites() ;
  
  text("distance:"+score,500,50)
}


function spawnCloud(){
  if(frameCount%50===0){
 cloud=createSprite(600,100,40,10) 
 cloud.velocityX=-5;
 cloud.addImage("moving",cloudImage)   
 cloud.y=Math.round(random(10,60))
 console.log(cloud.depth)
 cloud.depth=trex.depth   
 trex.depth=trex.depth+1   
 cloud.lifetime=125
 cloudgroup.add(cloud)
 cloud.scale=0.05
  }
  
}


function spawnCactus(){
 if(frameCount%50===0) {
 cactus=createSprite(600,165,40,10)
 cactus.velocityX=-(5+3*score/100) 
 var rand=Math.round(random(1,6))  
 switch(rand){
   case 1:cactus.addImage(cactus1)
   break;
   case 2:cactus.addImage(cactus2)
   break;
   case 3:cactus.addImage(cactus3)
   break;
   case 4:cactus.addImage(cactus4)
   break;
   case 5:cactus.addImage(cactus5)
   break;
   case 6:cactus.addImage(cactus6)
   break;
   default:break;
   }  
  cactus.scale=0.5
  cactus.lifetime=125 
  cactusgroup.add(cactus) 
 }
  
 }  
  function reset(){
    gamestate=PLAY
    cactusgroup.destroyEach();
    cloudgroup.destroyEach();
    score=0
    trex.changeAnimation("running",trex_running)
    
    
    
    
    
  }
  
  
  
  




