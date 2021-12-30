var aeroplane, aeroplaneImg;
var rocket1, rocket1Img;
var rocket2, rocket2Img;
var bg, bgImg;
var cloud, cloudImg;
var gamestate = "play";
var score = 0;
var lives = 7;

function preload(){
  aeroplaneImg = loadImage("aeroplane.png");
  rocket1Img = loadImage("rocket1.png");
  rocket2Img = loadImage("rocket2.png");
  bgImg = loadImage("background.jpg");
  cloudImg = loadImage("cloud.png");

}

function setup() {
  createCanvas(800,400);
  createSprite(400, 200, 50, 50);

  bg = createSprite(0,0,110,220);
  bg.addImage(bgImg);
  bg.scale = 4.1


  aeroplane = createSprite(200,100,50,50)
  aeroplane.addImage(aeroplaneImg)
  aeroplane.scale = .2
  

  rocket1Group = new Group();
  rocket2Group = new Group();
  cloudGroup = new Group();
  
}

function draw() {
  background(255,255,255);
  
  if(keyDown("UP_ARROW")){
    aeroplane.y = aeroplane.y-30
  }
  if(keyDown("DOWN_ARROW")||touches.length>0){
   aeroplane.y = aeroplane.y+30
  }

  if(gamestate === "play"){
    
    if(rocket1Group.isTouching(aeroplane)) {
      rocket1Group.destroyEach();
      lives = lives - 1;
    }
    if(rocket2Group.isTouching(aeroplane)) {
      rocket2Group.destroyEach();
      lives = lives - 2;
    }
    if(lives === 0){
      gamestate = "end"
    }
    /*if(rocket1||rocket2.lifeTime === 0){
      score = score + 1
    }*/ 
  } 
  
  if(gamestate === "end"){
    textSize(50);
    fill("white")
    text("You lost!!!",400,200)
    rocket1Group.destroyEach();
    rocket2Group.destroyEach();
    
  }

  
  textSize(20)
  fill("white")
  text("score: "+score, 100, 300)
  text("lives: "+lives,100,310)

  drawSprites();
  spawnrocket1();
  spawnrocket2();
  spawnclouds();

}

function spawnrocket1(){
  if(frameCount%100 === 0){
    rocket1 = createSprite(random(650,800), random(100, 700), 50, 50);
    rocket1.addImage(rocket1Img)
    rocket1.scale = 0.1
    rocket1.velocityX = -5
    rocket1.lifeTime = 400
    rocket1Group.add(rocket1);
   }
}

function spawnrocket2(){
  if(frameCount%100 === 0){
    rocket2 = createSprite(random(650,800), random(100, 400), 50, 50);
    rocket2.addImage(rocket2Img)
    rocket2.scale = 0.2
    rocket2.velocityX = -3.5
    rocket2.lifeTime = 400
    rocket2Group.add(rocket2);
   }
}

function spawnclouds(){
  if(frameCount%50 === 0){
    cloud = createSprite(random(650,800), random(100, 400), 50, 50);
    cloud.addImage(cloudImg)
    cloud.scale = 0.2
    cloud.velocityX = -2
    cloud.lifeTime = 400
    cloud.depth = aeroplane.depth;
    aeroplane.depth = aeroplane.depth + 1;
    cloudGroup.add(cloud);
   }
}