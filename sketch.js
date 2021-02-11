var dog,happyDog,database,foodS,foodStock;
var dogImage,happyDogImage;
var database;

function preload()
{
  dogImage = loadImage("images/dogImg.png");
  happyDogImage = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  
  dog = createSprite(250,250,70,50);
  dog.addImage(dogImage);
  dog.scale = 0.2;
  
  foodStock=database.ref('Food');
  foodStock.on("value", readStock);

}

function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImage);
  }
  drawSprites();
  textSize(15);
  fill(0,0,0);
  stroke(1);
  text("Press the up arrow key to feed Drago milk!",60,20);
  text("Food Remaining => "+foodS,175,150)
}


function readStock(data)
{
  foodS=data.val();
}

function writeStock(x) 
{
  if(x<0){
  x=0;
  }
  else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}

