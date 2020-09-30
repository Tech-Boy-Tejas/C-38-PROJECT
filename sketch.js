var gameState = "startStage";

var monkey,monkeyAnimation;
var foodsGroup,obstaclesGroup;
var startScreen,startButton,startScreenImg,startButtonImg;
var gameOver,restart,gameOverImg,restartImg;
var ground,groundImg;
var obstacleImg,foodImg;
var xforFoodandObstacles;
var bgImg;
//var jungle,jungleImg;

function preload(){
  monkeyAnimation = loadImage("MONKEY0.png");
  
  startScreenImg = loadImage("START SCREEN0.png");
  startButtonImg = loadImage("PLAY BUTTON0.png");
  
  gameOverImg = loadImage("GAME OVER SCREEN0.png");
  restartImg = loadImage("RESTART BUTTON0.png");
  
  groundImg = loadImage("GROUND0.png");
  
  foodImg = loadImage("BANANA0.png");
  obstacleImg = loadImage("STONE0.png");
  bgImg = loadImage("BG.png");

  //jungleImg = loadImage("jungle.jpg");
}

function setup(){
  createCanvas(displayWidth - 20,displayHeight - 60);
    
  //jungle = createSprite(200,200);
  //jungle.addImage(jungleImg);
  
  monkey = createSprite(displayWidth/2 + 2,displayHeight - 220);
  monkey.addImage(monkeyAnimation);
  monkey.scale = 0.12;

  startScreen = createSprite(displayWidth/2,displayHeight/2 - 200);
  startScreen.addImage(startScreenImg);
  startButton = createSprite(displayWidth/2 - 10,displayHeight/2 + 130);
  startButton.addImage(startButtonImg);
  startButton.scale = 0.07;
  startButton.setCollider("circle",0,0,106);
  
  gameOver = createSprite(displayWidth/2 + 260,displayHeight/2 - 120);
  restart = createSprite(displayWidth/2 + 260,displayHeight/2 - 20);

  
  gameOver.addImage(gameOverImg);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.05;
  restart.scale = 0.4;
  
  gameOver.visible = false;
  restart.visible = false;

  
  foodsGroup = createGroup();
  obstaclesGroup = createGroup();
  
  ground = createSprite(displayWidth/2,displayHeight - 170);
  ground.addImage(groundImg);
  ground.setCollider("rectangle",0,0,4000,1,0);
  ground.x = ground.width/2;
  score = 0;
}

function draw() {
  background(bgImg);
  
  gameOver.visible = false;
  restart.visible = false;
  
  //jungle.visible = false;
  
    if(gameState === "startStage"){
      startScreen.visible = true;
      startButton.visible = true;
      
      if(mousePressedOver(startButton)){
        gameState = "playStage";
      }
      
    }
    else if(gameState === "playStage"){
      
      //jungle.visible = true;

      score = score + Math.round(getFrameRate()/60);
      
      startScreen.visible = false;
      startButton.visible = false;

      monkey.velocityX = 3;
      camera.position.x  = monkey.x;
      xforFoodandObstacles = monkey.x + 10;
    
      //ground.velocityX = -(3 + score/100);
        if(keyDown("space") && monkey.y >= 336){
          monkey.velocityY = -10;
        }
    
      spawnFood();
      spawnObstacles();
    
        if(foodsGroup.isTouching(monkey)){
          foodsGroup.destroyEach();
          score += 50;
        }
        if(obstaclesGroup.isTouching(monkey)){
          gameState = "overStage";
        }
        if(obstaclesGroup.isTouching(monkey) && foodsGroup.isTouching(monkey)){
          gameState = "overStage";
        }
        if(monkey.x >= 3980){
          gameState = "overStage";
          monkey.velocityX = 0;
          monkey.x = 780;
        }
    }
    else if(gameState === "overStage"){
      gameOver.visible = true;
      restart.visible = true;
      
      obstaclesGroup.destroyEach();
      foodsGroup.destroyEach();

      monkey.velocityX = 0;
      monkey.x = displayWidth/2 + 2;
      camera.position.x = displayWidth/2 + 2;
      
      if(mousePressedOver(restart)){
        gameState = "startStage";
        score = 0;
      }
    }
    
  monkey.velocityY = monkey.velocityY + 0.5;
  //console.log(monkey.x);
  //console.log(xforFoodandObstacles);
  console.log(displayHeight);
  monkey.collide(ground);
  
  drawSprites();
  
  if(gameState === "playStage"){
    text("SCORE: " + score,camera.position.x,130);
  }
  
}

function spawnFood(){
  if(xforFoodandObstacles % 270 === 0){
    var food = createSprite(xforFoodandObstacles + 100,200);
    food.addImage(foodImg);
    food.scale = 0.07;
    
    food.y = random(300,500);
    
    foodsGroup.add(food);
    
  }
}
function spawnObstacles(){
  if(xforFoodandObstacles % 540 === 0){
    var obstacle = createSprite(xforFoodandObstacles + 170,200);
    obstacle.addImage(obstacleImg);
    obstacle.scale = 0.1;

    obstacle.y = random(300,500);
    
    obstaclesGroup.add(obstacle);
  }
}




  
