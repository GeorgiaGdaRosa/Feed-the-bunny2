const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var solo
var corda, corda2, corda3
var fruta
var link1, link2, link3
var backgroundImg
var frutaImg
var coelhoImg
var bunny
var botao, botao2, botao3
var blink
var eating
var sad
var backgroundSound
var eatingSound
var ropeCut
var sadSound
var airSound
var botaoAr, botaoAr2
var botaoMutar

function preload(){

    backgroundImg = loadImage("./assets/background.png")
    frutaImg = loadImage("./assets/melon.png")
    coelhoImg= loadImage("./assets/Rabbit-01.png")
    blink = loadAnimation("./assets/blink_1.png","./assets/blink_2.png","./assets/blink_3.png")
    eating = loadAnimation("./assets/eat_0.png", "./assets/eat_1.png", "./assets/eat_2.png", "./assets/eat_3.png", "./assets/eat_4.png")
    sad = loadAnimation("./assets/sad_1.png", "./assets/sad_2.png", "./assets/sad_3.png")
    blink.playing = true
    blink.looping = true
    eating.playing = true
    eating.looping = false
    sad.playing = true 
    sad.looping = false 
    backgroundSound = loadSound("./assets/sounds/sound1.mp3")
    eatingSound = loadSound("./assets/sounds/eating_sound.mp3")
    ropeCut = loadSound("./assets/sounds/rope_cut.mp3")
    sadSound = loadSound("./assets/sounds/sad.wav")
    airSound = loadSound("./assets/sounds/air.wav")


}

function setup() 
{
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;


  solo = Bodies.rectangle(200,690,600,20,{isStatic:true})
  World.add(world,solo)

  corda = new Rope(8,{x:40,y:30})
  corda2 = new Rope(7,{x:370, y:40})
  corda3 = new Rope(4,{x:400, y:225})

  fruta = Bodies.circle(300,300,15)
  Composite.add(corda.body,fruta)

  link1 = new Link(corda,fruta)
  link2 = new Link(corda2,fruta)
  link3 = new Link(corda3,fruta)

  blink.frameDelay = 20
  eating.frameDelay = 20
  sad.frameDelay = 20
  bunny = createSprite(400,600,100,100)
  bunny.addAnimation("blink",blink)
  bunny.addAnimation("eating",eating)
  bunny.addAnimation("sad",sad)
  bunny.scale = 0.2

  botao = createImg("./assets/cut_btn.png")
  botao.size(50,50)
  botao.position(20,30)
  botao.mouseClicked(drop)

  botao2 = createImg("./assets/cut_btn.png")
  botao2.size(50,50)
  botao2.position(340,35)
  botao2.mouseClicked(drop2)

  botao3 = createImg("./assets/cut_btn.png")
  botao3.size(50,50)
  botao3.position(370,220)
  botao3.mouseClicked(drop3)

  botaoAr = createImg("./assets/balloon.png")
  botaoAr.size(150,100)
  botaoAr.position(10,360)
  botaoAr.mouseClicked(pressionarAr)

  botaoAr2 = createImg("./assets/balloon.png")
  botaoAr2.size(150,100)
  botaoAr2.position(10,250)
  botaoAr2.mouseClicked(pressionarAr2)

  botaoMutar = createImg("./assets/mute.png")
  botaoMutar.size(50,50)
  botaoMutar.position(450,20)
  botaoMutar.mouseClicked(mutar)

  backgroundSound.play()
  backgroundSound.setVolume(0.5)


 
  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  textSize(50)
}

function draw() 
{
  background(51);
  image(backgroundImg,width/2,height/2,width,height)
  Engine.update(engine);
  rect(solo.position.x,solo.position.y,600,20)
  corda.show()
  corda2.show()
  corda3.show()
  if(fruta!= null){
    image(frutaImg, fruta.position.x,fruta.position.y,60,60)
  }
  if(collide(fruta,bunny)){
    bunny.changeAnimation("eating")
    eatingSound.play()
  }

  if(fruta != null && fruta.position.y > bunny.position.y){
    bunny.changeAnimation("sad")
    sadSound.play()
    fruta = null
  }
   drawSprites()
}

function drop(){
  corda.break()
  link1.detach()
  link1 = null
  ropeCut.play()

}

function drop2(){
  corda2.break()
  link2.detach()
  link2 = null
  ropeCut.play()
}

function drop3(){
  corda3.break()
  link3.detach()
  link3 = null
  ropeCut.play()
}

function collide(body,sprite){
  if(body != null){
    var distance = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
    if(distance<= 80){
      World.remove(world,fruta)
      fruta = null
      return true
    } else{
      return false
    }
  }
}

function pressionarAr(){
  Matter.Body.applyForce(fruta,{x:0,y:0},{x:0.01,y:0})
  airSound.play()
}

function pressionarAr2(){
  Matter.Body.applyForce(fruta,{x:0,y:0},{x:-0.01,y:0})
  airSound.play()
}


function mutar(){
 if(backgroundSound.isPlaying()){
  backgroundSound.stop()
 }else{ 
  backgroundSound.play()
 }
}


