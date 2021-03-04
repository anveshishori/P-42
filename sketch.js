
var monkey , monkey_running, monkey_collided, bg;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var food, stone;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var scene, sceneImage;

var life = 2;

function preload(){
  
  
  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png","Monkey_09.png", "Monkey_10.png");
  
  monkey_collided = loadAnimation("Monkey_01.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
 sceneImage = loadImage("jungle2.png");
}



function setup() {
  createCanvas (600,600);
  scene = createSprite(300,300,800,600);
  scene.addImage("jungle",sceneImage);
 
  scene.scale = 1;
  
  monkey = createSprite(150,550, 20,20);
  monkey.addAnimation("bandar",monkey_running);
  monkey.addAnimation( "takkar",monkey_collided);
  monkey.scale = 0.1
  
  ground = createSprite(300,570,1200,20);
 
  ground.visible = false;
  
  
  
  foodGroup = new Group();
  obstacleGroup = new Group();

  
}


function draw() {
background("white")
  
  console.log (life);
  
   if(scene.x<0){
    scene.x = scene.width/2;
    
  }
 
  if (gameState === PLAY){
  
   scene.velocityX = -3;
  monkey.velocityY = monkey.velocityY + 0.8;
  
    if(keyDown("space")){
  monkey.velocityY = -15;
  }   
 
    appearfood();
    appearobstacle();
    
    if (foodGroup.isTouching(monkey)){
      
      score = score +2;
      foodGroup.destroyEach();
      scaleupmonkey();
    }
    
    
    if (monkey.isTouching(obstacleGroup)){
      
      life = life-1;
       gameState = 'pause';
      }
      
      if (life === 0 && monkey.isTouching(obstacleGroup)) {
      gameState = END;
    }
    
  }
if (gameState === END){

   scene.velocityX = 0;
    monkey.velocityY = 0;
   
   foodGroup.destroyEach()
   foodGroup.setVelocityXEach(0);
   obstacleGroup.setVelocityXEach(0);

   foodGroup.setLifetimeEach(-1);
   obstacleGroup.setLifetimeEach(-1);

   monkey.changeAnimation("takkar", monkey_collided);
   
  }
  
  
  if(gameState === 'pause'){
    
    scene.velocityX = 0;
    monkey.velocityY = 0;
   
   foodGroup.destroyEach()
   foodGroup.setVelocityXEach(0);
   obstacleGroup.setVelocityXEach(0);

   foodGroup.setLifetimeEach(-1);
   obstacleGroup.setLifetimeEach(-1);
    
    
    
    if(keyDown("space")){
  gameState = PLAY;
   foodGroup.destroyEach();
    obstacleGroup.destroyEach();
  }
    
    
  }
  monkey.collide(ground);
  drawSprites();
  
  
  if(gameState === 'pause'){
    
    fill("white");
    textSize (20);
   text ("Press Space to Continue", 150,200);
  }
  
  if (gameState === END){
    fill ("white");
    textSize(40);
    text("GAME OVER!!!!!",200,300)
    
    
  }
  fill("White");
  textSize (20);
  text ("Score:" + score, 200, 50);
  
}

function appearfood(){
   if (frameCount % 100 ===0){
     food = createSprite(600,100,20,20);
     food.addImage("kela",bananaImage);
     food.y = Math.round(random(20,300))
     food.velocityX = -5;
     food.scale = 0.1;
     
     food.lifetime = 300;
     food.depth = monkey.depth;
     monkey.depth = monkey.depth + 1;
     foodGroup.add(food);
     
   }
  
  
  
  
}

function appearobstacle(){
   if (frameCount % 300 ===0){
     stone = createSprite(800,550,20,20);
     stone.addImage("stone",obstacleImage);
     stone.velocityX = -5;
     stone.scale = 0.2;
     
     stone.lifetime = 400;
     
     obstacleGroup.add(stone);
   }
  
   
  
}

function scaleupmonkey(){
  
  switch (score){
      
    case 10: monkey.scale = 0.12;
      break;
    case 20: monkey.scale = 0.14;
      break;
    case 30: monkey.scale = 0.16;
      break;
    case 40: monkey.scale = 0.18;
      break;
    case 50: monkey.scale = 0.20;
      break;
    default : break;
      
      
  }
  
  
}


