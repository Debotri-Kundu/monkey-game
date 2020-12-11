var monkey , monkey_running,ground,groundImage;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup
var score=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
}



function setup() {
  createCanvas(600,400);

  
  monkey = createSprite(80,380,20,50);
  monkey.addAnimation("running",monkey_running );
  monkey.scale = 0.15;
  
  ground = createSprite(300,390,1200,20);
 
 //create Obstacle and food Groups
  obstaclesGroup = createGroup();
  FoodsGroup = createGroup();

  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
 
  
  score = 0;
  
}


function draw() {
  background("white");
  //displaying score
  text("Score: "+ score, 500,50);
  
  if(obstaclesGroup.isTouching(monkey)){
    ground.velocityX=0
    monkey.velocityY=0
    obstaclesGroup.setVelocityXEach(0)
    FoodsGroup.setVelocityXEach(0)
    obstaclesGroup.setLifetimeEach(-1)
    FoodsGroup.setLifetimeEach(-1)
  }
  else {
  ground.velocityX=-2
  if(ground.x<0){
    ground.x=ground.width/2
  }
  
  //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
        
    }
    
    //add gravity
   monkey.velocityY = monkey.velocityY + 0.45
   monkey.collide(ground)
    
    foods();
  
    //spawn obstacles on the ground
    spawnObstacles();
    score = score + Math.round(frameCount/240);
    
  
  }

  drawSprites();
}
function spawnObstacles(){
 if (frameCount % 300 === 0){
    obstacle = createSprite(600,350,10,40);
    obstacle.addImage(obstacleImage)
   obstacle.velocityX = -3
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.15;
    obstacle.lifetime = 200;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function foods() {
  //write code here to spawn the foods
  if (frameCount % 80 === 0) {
    banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(60,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each food to the group
    FoodsGroup.add(banana);
  }
}





