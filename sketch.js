
var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;
var heart1I, heart2I, heart3I, heart1, heart2, heart3;

var zombieGroup

var bullets = 70;
var gameState = "fight"

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
  zombieImg = loadImage("assets/zombie.png")
  heart1I = loadImage("assets/heart_1.png")
  heart2I = loadImage("assets/heart_2.png")
  heart3I = loadImage("assets/heart_3.png")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

   

   heart3 = createSprite(1200,50,20,20)
   heart3.addImage(heart3I)
   heart3.scale = 0.2;

   heart2 = createSprite(1180,50,20,20)
   heart2.addImage(heart2I)
   heart2.scale = 0.2;
   heart2.visible = false

   heart1 = createSprite(1160,50,20,20)
   heart1.addImage(heart1I)
   heart1.scale = 0.2;
   heart1.visible = false

   zombieGroup = createGroup();
   bulletGroup = createGroup();

}

function draw() {
  background(0); 

  if(gameState === "fight"){


  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){

  bullet = createSprite(displayWidth-1150,player.y-30,20,10)
  bullet.velocityX = 20
  
  bulletGroup.add(bullet)
  player.depth = bullet.depth
  player.depth = player.depth+2
  player.addImage(shooter_shooting)
  bullets = bullets-1
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

if(zombieGroup.isTouching(bulletGroup)){
  for(var i=0;i<zombieGroup.length;i++){     
      
   if(zombieGroup[i].isTouching(bulletGroup)){
        zombieGroup[i].destroy()
        bulletGroup.destroyEach()
       
        } 
  
  }
}

if(zombieGroup.isTouching(player)){
  for(var i=0;i<zombieGroup.length;i++){     
      
    if(zombieGroup[i].isTouching(player)){
         zombieGroup[i].destroy()
         } 
   
   }
}


spawnZombies();
}

drawSprites();

if(gameState == "lost"){
  
  textSize(100)
  fill("red")
  text("You Lost ",400,400)
  zombieGroup.destroyEach();
  player.destroy();

}

else if(gameState == "won"){
 
  textSize(100)
  fill("yellow")
  text("You Won ",400,400)
  zombieGroup.destroyEach();
  player.destroy();

}

else if(gameState == "bullet"){
 
  textSize(50)
  fill("yellow")
  text("You ran out of bullets!!!",470,410)
  zombieGroup.destroyEach();
  player.destroy();
  bulletGroup.destroyEach();

}

}

function spawnZombies(){
  if (frameCount % 50 === 0){
    zombie = createSprite(random(800,1200),random(200,800),20,20)
    zombie.addImage(zombieImg)
    zombie.scale = 0.13
    zombie.debug = true
    zombie.velocityX = -3
    zombie.setCollider("rectangle",0,0,400,400)

    zombie.lifetime = 400
    zombieGroup.add(zombie);
  }
}