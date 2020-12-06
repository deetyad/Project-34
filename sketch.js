var dogImg;
var happyDogImg;

var dog;
var database;
var foodS;
var foodStock;

function preload(){
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(800, 800);

  database = firebase.database();
  
  dog = createSprite(400, 400);
  dog.scale=0.5;
  dog.addImage("dog", dogImg);
  dog.addImage("happyDog", happyDogImg);

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
}


function draw() { 
  background(46, 139, 87);
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.changeImage("happyDog",happyDogImg);
  }


  drawSprites();

  textSize(30);
  fill("white");
  stroke(3);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!", 20, 50);


}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  } else {
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}
