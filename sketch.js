

//QUESTIONS!!! HOW DO I CHANGE THE DEFAULT FLOW OF MESSAGES? WANT TO STOP THE REPETITION OF MESSAGE 1, WANT TO ALTER MESSAGE PLACEMENT - MAKE MESSAGES APPEAR AT DIFFERENT PLACES ON THE CANVAS TO DRAW USER ATTENTION IN DIFFERENT DIRECTIONS. ALSO, HOW DO I PLAY WITH THE PACING AND CHANGE THE RATE OF WHEN MESSAGES SHOW? https://p5js.org/examples/simulate-multiple-particle-systems.html want this at end
//WHAT IS ANIMATION CENTER?

// let bgmSound;
// let drop1Sound, drop2Sound, drop3Sound;
// let suzu1Sound,suzu2Sound, suzu3Sound;
// let mokumokuSound, basabasa1Sound, basabasa2Sound;
// let walk1Sound, walk2Sound;


let isLoading = false;
let assetNumber = 12;
let assetCounter = 0;

let alpha = 0;
let txtAlpha = 0;

let isStarted;
let isTapped;
let isPlayScreen;

let randomNumber;


let newSize;
let h1, h2, h3, h4;


let angle = 0;


let animations = [];
let messages = [];


let bkCol, shapeCol, goldCol, txtCol;


let input = 3;
let messageList = [
//  'How do you know what you think?',
"where does your mind go when it wanders?",
"try to follow it here.",
'can you catch it?',
"tap around the screen or type in your response to the prompts",
"where is your mind now?",
'how often are you in ecstasy?',
'can you find temper in the place where you lose it?',
"are forgotten memories less real than dreams you remember? ",
'what controls your attention?',
'are you aware of your attention ',
'how do you know what you know?',
'do you believe what you see more than what you hear? less or more the same than what you think?',
'do you think its easier to feel anger than acknowledge fear?',
'where is its center?',
'can you see it?',
'tap the screen',
'how well do you handle disappointment?',
'when was the last time you danced in the rain?',
'when you are all alone in silence where do your thoughts go?',
'How do you know what you think?',
'Where does a new thought come from?',
'When does an old thought end?',
'Can you catch it?',
'who chose the thoughts are you thinking right now?',
'tap the screen',

'What do you hear when you listen to your voice?',
  'Where do you keep your laughter when you are not using it?',

  'Why are you angry?',
 'why are you angry?',
 'why are you angry?',
  'Where do you hide your secrets',
  'Who are trying to impress?',
  
  'type...............',

  , '........tap.......',
 
  '',
  '.',
  'Try tapping the screen.',
  'Try typing on the keyboard.',
  '.',
  'Try tapping on the top or bottom.',
  'Try tapping on the Left or Right.',
  'Try tapping on the Center.',
  'If you type the "ESC" key, to save Canvas',
  'Why did you tap the screen?',
  'Dont think about it',
];

let socket = io();
socket.on("connect",()=>{
  console.log('connected!');
})



function loadAsset() {
 
  textFont('Poiret One');
  

  // bgmSound = loadSound('data/quiet-room-1.mp3', assetLoaded);
  // drop1Sound = loadSound('data/drop1.mp3', assetLoaded);
  // drop2Sound = loadSound('data/drop2.mp3', assetLoaded);
  // drop3Sound = loadSound('data/drop3.mp3', assetLoaded);
  // suzu1Sound = loadSound('data/suzu1.mp3', assetLoaded);
  // suzu2Sound = loadSound('data/suzu2.mp3', assetLoaded);
  // suzu3Sound = loadSound('data/suzu3.mp3', assetLoaded);
  // mokumokuSound = loadSound('data/mokumoku.mp3', assetLoaded);
  // basabasa1Sound = loadSound('data/basabasa1.mp3', assetLoaded);
  // basabasa2Sound = loadSound('data/basabasa2.mp3', assetLoaded);
  // walk1Sound = loadSound('data/walk1.mp3', assetLoaded);
  // walk2Sound = loadSound('data/walk2.mp3', assetLoaded);
  

  function assetLoaded() {
    // assetCounter++;
    // if(assetCounter == assetNumber) {
      isLoading = false;
    // }
  }
}

function setup(){

  createCanvas(windowWidth, windowHeight);


  pixelDensity(2);

  colorMode(HSB, 360, 100, 100, 100);


  loadAsset();


  textAlign(CENTER);

  
  isStarted = false;
  isTapped = true;
  isPlayScreen = false;


  sizeList();


  colorList(0, 0);
socket.on("data",(data)=>{
  console.log("key: "+data["key"]);
})

}


// txt = intro font color, shapeCol = automated shapes and font, goldCol=user text
function colorList(H, S) {
  bkCol = color(0, 0, 8);
 // shapeCol = color(H, S, 100);
 shapeCol = color('gold');
  goldCol = color(20, 170, 5);
  // txtCol = color(H, S, 100);
  txtCol = color('beige');

}

function sizeList() {

  newSize = min(width, height);

  h1 = newSize * 0.07;
  h2 = h1 * 0.8;
  h3 = h1 * 0.4;
  h4 = h1 * 0.3;
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  sizeList();
}


function draw(){
  
  if (isLoading == true) {
    background(bkCol);
    noStroke();
    fill(txtCol);
    textSize(h4);
    text('Loading', width / 2, height / 2);

    noFill();
    stroke(shapeCol);
    arc(width / 2, height / 2, newSize/5, newSize/5,
       0, map(assetCounter, 0, assetNumber-1, 0, TAU));
  }


  else if (isLoading == false) {
    introduction();
    isStarted = true;
  }


  if(isPlayScreen == true && frameCount % 600 == 0){
    input < messageList.length ? input++ : input = 4;
    messages.push(new Message1(input));
  }

  if (animations.length > 0) {

    for (let i = 0; i < animations.length; i++) {
   
      push();
      animations[i].draw();
      pop();
   
      if (animations[i].lifetime < 0) {
     
        animations.splice(i--, 1);
      }
    }
  }

  if (messages.length > 0) {
    for (let i = 0; i < messages.length ; i++) {
      messages[i].draw();
      if (messages[i].lifetime < 0) {
     
        messages.splice(i, 1);
      }
    }
  }

//  noStroke();
//  fill(255);
//  textSize(h1);
//  text(messageList[0], width / 2, height / 2-h1);
//  textSize(h3);
//  text(messageList[4], width / 2, height / 2 + h1*2);
}


function introduction(){
  if(isTapped == true && txtAlpha < 100){
    txtAlpha++;
  }else if(txtAlpha >= 100){
    txtAlpha = 100;
  }

  if(isTapped == false && txtAlpha > 0){
    txtAlpha-= 5;

    // bgmSound.loop();
    // bgmSound.amp(0.2);

  }else if(isTapped == false && txtAlpha < 0){
    txtAlpha = 0;
  }

  background(bkCol);


  noStroke();
  textSize(h1);
  txtCol.setAlpha(txtAlpha);
  fill(txtCol);
  text(messageList[0], width/2, height/2-h1*2);

  textSize(h3);
  text(messageList[1], width/2, height/2 );
  text(messageList[2], width/2, height/2 + h1);
  text(messageList[3], width/2, height/2 + h1*2);
  
  textSize(h4);
  text(messageList[4], width/2, height/2 + h1*4);
}



function touchStarted() {

  if(isStarted == true){
    isTapped = false;
  }
  
  if(isTapped == false && txtAlpha == 0){
    isPlayScreen = true;
  }

  if(isPlayScreen == true){
    colorList(0, 0);

    if(mouseY < height / 10){
      // suzu2Sound.play();
      // suzu2Sound.amp(0.1);
      for(let i = 0; i < 30; i++){
        animations.push(new AnimationTop(i));
      }
    }
 
    else if(mouseY > height / 10 * 9){
      // mokumokuSound.play();
      // mokumokuSound.amp(0.1);
      for(let i = 0; i < 10; i++){
        animations.push(new AnimationBottom(mouseX, i));
      }
    }

    else if(mouseX < width / 10){
      // basabasa2Sound.play();
      // basabasa2Sound.amp(0.2);
      for(let i = 0; i < 20; i++){
        animations.push(new AnimationLeft(i));
      }
    }

    else if(mouseX > width / 10 * 9){
      // basabasa1Sound.play();
      // basabasa1Sound.amp(0.2);
      for(let i = 0; i < 5; i++){
        animations.push(new AnimationRight(i));
      }
    }

//ANIMATION CENTER?
    // else if (mouseX > width / 2 - 10 && mouseX < width / 2 + 10 && mouseY > height / 2 - 10 &&  mouseY < height / 2 + 10){
    //   // drop3Sound.play();
    //   // drop3Sound.amp(0.1);
    //   for(let i = 0; i < 10; i++){
    //     random(2)>1?
    //     animations.push(new AnimationCenter1(i)):
    //     animations.push(new AnimationCenter2(i));
    //     }
    //   }
    
   
    randomNumber = floor(random(11));

    //ANIMATION0
    // for(let i = 0; i < 3; i++){
    //   animations.push(new AnimationTouch0(mouseX, mouseY, i));
    // }

      if (randomNumber == 0) {
        // drop1Sound.play();
        // drop1Sound.amp(0.1);
        for(let i = 0; i < 3; i++){
          animations.push(new AnimationTouch0(mouseX, mouseY, i));
        }

      }

      //ANIMATION1
      else if (randomNumber == 1) {
        // drop3Sound.play();
        // drop3Sound.amp(0.1);
        for(let i = 0; i < 10; i++){
          animations.push(new AnimationTouch1(mouseX, mouseY));
        }
      }

      //ANIMATION2
      else if (randomNumber == 2) {
        // drop2Sound.play();
        // drop2Sound.amp(0.1);
        for(let i = 0; i < 3; i++){
          animations.push(new AnimationTouch2(mouseX, mouseY, i));
        }
      }

      //ANIMATION3
      else if (randomNumber == 3) {
        // basabasa1Sound.play();
        // basabasa1Sound.amp(0.2);
        animations.push(new AnimationTouch3());
      }

      //ANIMATION4 
      else if (randomNumber == 4) {
        // walk2Sound.play();
        // walk2Sound.amp(0.1);
        animations.push(new AnimationTouch4(mouseY));
      }

      //ANIMATION 5
      else if (randomNumber == 5) {
        // suzu1Sound.play();
        // suzu1Sound.amp(0.1);
        let n = random(50, 200);
        for(let i = 0; i < 5; i++){
        animations.push(new AnimationTouch5(mouseX, mouseY, i, n));
        }
      }
      //ANIMATION 6
      else if (randomNumber == 6) {
        // suzu2Sound.play();
        // suzu2Sound.amp(0.1);
        for(let i = 0; i < 20; i++){
          animations.push(new AnimationTouch6(mouseX, mouseY, i));
        }
      }

      //ANIMATION7
      else if (randomNumber == 7) {
        // suzu3Sound.play();
        // suzu3Sound.amp(0.1);
        for(let i = 0; i < 10; i++){
          animations.push(new AnimationTouch7(mouseX, mouseY, i));
        }
      }

      //ANIMATION8
      else if (randomNumber == 8) {
        // walk2Sound.play();
        // walk2Sound.amp(0.1);
        animations.push(new AnimationTouch8(mouseX));
      }

      //ANIMATION9
      else if (randomNumber == 9) {
        // drop1Sound.play();
        // drop1Sound.amp(0.1);
        for(let i = 0; i <10; i++){
          animations.push(new AnimationTouch9());
        }
      }

      //ANIMATION10
      else if (randomNumber == 10) {
        // basabasa1Sound.play();
        // basabasa1Sound.amp(0.2);
        animations.push(new AnimationTouch10());
  
      }
      console.log("new AnimationTouch"+randomNumber)
  }
}

let userTypedMessage =null;
function keyTyped() {
  // console.log("keytyped");
  if(isPlayScreen == true){
  //  let userTypedMessage = new Message1(key);
  //  userTypedMessage.draw();
  text('Loading', width / 2, height / 2);
 socket.emit("data", {key:key});


    // walk1Sound.play();
    // walk1Sound.amp(0.1);
 
    if (userTypedMessage === null) {
      userTypedMessage =new AnimationType(key);
      animations.push(userTypedMessage);
    } else {
      userTypedMessage.myMessage = userTypedMessage.myMessage + key;
    }

    // colorList(floor(random(360)), 100);
  }
}

function keyPressed() {
  if(keyCode === ESCAPE){
    saveCanvas('YOU WERE HERE.', 'png');
  }
}

class AnimationTouch0 {
  constructor(x, y, i) {
    this.alpha = random(50);
    this.switch = 0;
    this.lifetime = 200;
    this.p = createVector(x, y);
    this.d = random(100);
    this.weight = i + 1;
  }
  draw() {
    if(this.switch == 0 && this.alpha < 100){
      this.alpha++;
    }else if(this.switch == 0 && this.alpha >= 100){
      this.alpha = 100;
      this.switch = 1;
    }

    if(this.switch == 1 && this.alpha > 0){
      this.alpha--;
    }else if(this.switch == 1 && this.alpha <= 0){
      this.alpha = 0;
    }
    this.d+= 2;
    this.lifetime--;

    noFill();
    shapeCol.setAlpha(this.alpha);
    stroke(shapeCol);
    strokeWeight(this.weight);
    circle(this.p.x, this.p.y, this.d);
  }
}

//ANIMATION 1
class AnimationTouch1 {
  constructor(x, y) {
    this.alpha = random(50);
    this.switch = 0;
    this.p = createVector(x, y);
    this.v = p5.Vector.random2D();
    this.d = random(3, 20);
    this.lifetime = 200;
  }
  draw() {
    if(this.switch == 0 && this.alpha < 100){
      this.alpha++;
    }else if(this.switch == 0 && this.alpha >= 100){
      this.alpha = 100;
      this.switch = 1;
    }

    if(this.switch == 1 && this.alpha > 0){
      this.alpha--;
    }else if(this.switch == 1 && this.alpha <= 0){
      this.alpha = 0;
    }

    this.p.add(this.v);
    this.lifetime--;

    noStroke();
    shapeCol.setAlpha(this.alpha);
    fill(shapeCol);
    circle(this.p.x, this.p.y, this.d);
  }
}


//ANIMATION 2
class AnimationTouch2 {
  constructor(x, y, i) {
    this.alpha = random(50);
    this.switch = 0;
    this.p = createVector(x, y);
    this.v =  i + 1;
    this.speed = random(0.001, 0.008);
    this.d = random(10, 100);
    this.lifetime = 200;
  }
  draw() {
    if(this.switch == 0 && this.alpha < 80){
      this.alpha++;
    }else if(this.switch == 0 && this.alpha >= 80){
      this.alpha = 80;
      this.switch = 1;
    }

    if(this.switch == 1 && this.alpha > 0){
      this.alpha--;
    }else if(this.switch == 1 && this.alpha <= 0){
      this.alpha = 0;
    }

    this.v -= this.speed;
    this.p.y += this.v;
    this.lifetime--;

    noStroke();
    shapeCol.setAlpha(this.alpha);
    fill(shapeCol);
    circle(this.p.x, this.p.y, this.d);
  }
}

//ANIMATION 3
class AnimationTouch3 {
  constructor() {
    this.alpha = random(50);
    this.switch = 0;
    this.p = createVector(width / 2, height);
    this.d = 0;
    this.lifetime = 300;
  }
  draw() {
    if(this.switch == 0 && this.alpha < 50){
      this.alpha++;
    }else if(this.switch == 0 && this.alpha >= 50){
      this.alpha = 50;
      this.switch = 1;
    }

    if(this.switch == 1 && this.alpha > 0){
      this.alpha -= 0.5;
    }else if(this.switch == 1 && this.alpha <= 0){
      this.alpha = 0;
    }
    this.d += 10;
    this.lifetime--;

    noStroke();
    shapeCol.setAlpha(this.alpha);
    fill(shapeCol);
    circle(this.p.x, this.p.y, this.d);
  }
}


//ANIMATION 4
class AnimationTouch4 {
  constructor(y) {
    this.alpha = random(50);
    this.switch = 0;
    this.d = random(newSize / 10, newSize / 2);
    this.p1 = createVector(-this.d, y);
    this.p2 = createVector(width +  this.d, y);
    this.v = createVector(random(10, 20), 0);
    this.lifetime = 200;
  }
  draw() {
    if(this.switch == 0 && this.alpha < 80){
      this.alpha++;
    }else if(this.switch == 0 && this.alpha >= 80){
      this.alpha = 80;
      this.switch = 1;
    }

    if(this.switch == 1 && this.alpha > 0){
      this.alpha--;
    }else if(this.switch == 1 && this.alpha <= 0){
      this.alpha = 0;
    }

    this.lifetime--;
    this.p1.add(this.v);
    this.p2.sub(this.v);
    noStroke();
    shapeCol.setAlpha(this.alpha);
    fill(shapeCol);
    circle(this.p1.x, this.p1.y, this.d);
    circle(this.p2.x, this.p2.y, this.d);
  }
}

//ANIMATION 5
class AnimationTouch5 {
  constructor(x, y, i, n) {
    this.alpha = random(50);
    this.switch = 0;
    this.d = map(i, 0, 5, newSize / 50,  newSize / 30);
    this.p = createVector(x, y);
    this.r = n;
    this.a = i;
    this.dif = map(i, 0, 5, 3, 1);
    this.lifetime = 200;
  }
  draw() {
    this.a += 0.025 * this.dif;
  
    if(this.switch == 0 && this.alpha < 80){
      this.alpha++;
    }else if(this.switch == 0 && this.alpha >= 80){
      this.alpha = 80;
      this.switch = 1;
    }

    if(this.switch == 1 && this.alpha > 0){
      this.alpha-=2;
    }else if(this.switch == 1 && this.alpha <= 0){
      this.alpha = 0;
    }

    this.lifetime--;

    noStroke();
    shapeCol.setAlpha(this.alpha);
    fill(shapeCol);
    circle(cos(this.a) * this.r + this.p.x, 
            sin(this.a) * this.r + this.p.y, this.d);
  }
}


//ANIMATION 6
class AnimationTouch6 {
  constructor(x, y, i) {
    this.alpha = random(50);
    this.switch = 0;
    this.d = random(5);
    this.p = createVector(x, y);
    this.r = newSize / 5;
    this.a = i;
    this.dif = map(i, 0, 20, 3, 1);
    this.lifetime = 200;
  }
  draw() {
    this.a += 0.05 * this.dif;

    if(this.switch == 0 && this.alpha < 80){
      this.alpha++;
    }else if(this.switch == 0 && this.alpha >= 80){
      this.alpha = 80;
      this.switch = 1;
    }

    if(this.switch == 1 && this.alpha > 0){
      this.alpha--;
    }else if(this.switch == 1 && this.alpha <= 0){
      this.alpha = 0;
    }

    this.lifetime--;

    noStroke();
    shapeCol.setAlpha(this.alpha);
    fill(shapeCol);
    circle(cos(this.a * 0.3) * this.r + this.p.x,
            sin(-this.a * 0.7) * this.r / 3 + this.p.y, this.d);
  }
}


//ANIMATION 7
class AnimationTouch7 {
  constructor(x, y, i) {
    this.alpha = random(50);
    this.switch = 0;
    this.d = random(5);
    this.p = createVector(random(x-10, x+10), random(y-10, y+10));
    this.a = 0;
    this.step_1 = 0.157 / 2;
    this.step_2 = -0.157 / 2;
    this.step = this.step_1;
    this.limit = 1.57;
    this.count = this.limit;
    this.dif = i;
    this.lifetime = 300;
  }
  draw() {
    if(this.count == this.limit){
      this.count = 0;
      this.step = random(2)>1 ? this.step_1 : this.step_2;
    }

    if(this.switch == 0 && this.alpha < 80){
      this.alpha++;
    }else if(this.switch == 0 && this.alpha >= 80){
      this.alpha = 80;
      this.switch = 1;
    }

    if(this.switch == 1 && this.alpha > 0){
      this.alpha -=0.5;
    }else if(this.switch == 1 && this.alpha <= 0){
      this.alpha = 0;
    }

    this.lifetime--;

    this.count += this.step_1;
    this.a += this.step;

    this.p.add(cos(this.a + this.dif), sin(this.a + this.dif));
    noStroke();
    shapeCol.setAlpha(this.alpha);
    fill(shapeCol);
    circle(this.p.x, this.p.y, this.d);
  }
}

//ANIMATION 8

class AnimationTouch8 {
  constructor(x) {
    this.alpha = random(50);
    this.switch = 0;
    this.d = random(newSize / 10, newSize / 5);
    this.p1 = createVector(x, -this.d);
    this.p2 = createVector(x, height +  this.d);
    this.v = createVector(0, random(10, 20));
    this.lifetime = 200;
  }
  draw() {
    if(this.switch == 0 && this.alpha < 80){
      this.alpha++;
    }else if(this.switch == 0 && this.alpha >= 80){
      this.alpha = 80;
      this.switch = 1;
    }

    if(this.switch == 1 && this.alpha > 0){
      this.alpha--;
    }else if(this.switch == 1 && this.alpha <= 0){
      this.alpha = 0;
    }

    this.lifetime--;
    this.p1.add(this.v);
    this.p2.sub(this.v);
    noFill();
    shapeCol.setAlpha(this.alpha);
    stroke(shapeCol);
    strokeWeight(10);
    circle(this.p1.x, this.p1.y, this.d);
    circle(this.p2.x, this.p2.y, this.d);
  }
}

//ANIMATION 9

class AnimationTouch9 {
  constructor(x) {
    this.alpha = random(50);
    this.switch = 0;
    this.d = random(newSize / 10, newSize / 5);
    this.p = createVector(random(this.d/2, width - this.d/2), random(this.d/2, height - this.d/2));
    this.c = random(2)>1?0:1;
    this.lifetime = 200;
  }
  draw() {
    if(this.switch == 0 && this.alpha < 80){
      this.alpha++;
    }else if(this.switch == 0 && this.alpha >= 80){
      this.alpha = 80;
      this.switch = 1;
    }

    if(this.switch == 1 && this.alpha > 0){
      this.alpha--;
    }else if(this.switch == 1 && this.alpha <= 0){
      this.alpha = 0;
    }

    this.lifetime--;
     this.d--;
    if(this.c == 0){
      noStroke();
      shapeCol.setAlpha(this.alpha);
      fill(shapeCol);
    }else if(this.c == 1){
      noFill();
      shapeCol.setAlpha(this.alpha);
      stroke(shapeCol);
      strokeWeight(3);
    }
    circle(this.p.x, this.p.y, this.d);
  }
}

//ANIMATION 10
class AnimationTouch10 {
  constructor() {
    this.alpha = random(50);
    this.switch = 0;
    this.p1 = createVector(0, height);
    this.p2 = createVector(width, height);
    this.p = random(2)>1 ? this.p1 : this.p2;
    this.d = 0;
    this.lifetime = 300;
  }
  draw() {
    if(this.switch == 0 && this.alpha < 50){
      this.alpha++;
    }else if(this.switch == 0 && this.alpha >= 50){
      this.alpha = 50;
      this.switch = 1;
    }

    if(this.switch == 1 && this.alpha > 0){
      this.alpha -= 0.5;
    }else if(this.switch == 1 && this.alpha <= 0){
      this.alpha = 0;
    }
    this.d += 15;
    this.lifetime--;

    noStroke();
    shapeCol.setAlpha(this.alpha);
    fill(shapeCol);
    circle(this.p.x, this.p.y, this.d);
  }
}


class AnimationCenter1 {
  constructor(i) {
    this.alpha = random(50);
    this.switch = 0;
    this.lifetime = 600;
    this.p = createVector(width / 2, height / 2);
    this.r = newSize / 3;
    this.d = random(20);
    this.a = i;
  }
  draw() {
    this.a += 0.025;

    if(this.switch == 0 && this.alpha < 80){
      this.alpha++;
    }else if(this.switch == 0 && this.alpha >= 80){
      this.alpha = 80;
      this.switch = 1;
    }

    if(this.switch == 1 && this.alpha > 0){
      this.alpha -= 0.2;
    }else if(this.switch == 1 && this.alpha <= 0){
      this.alpha = 0;
    }
    this.r-=0.1;
    this.lifetime--;

    noStroke();
    shapeCol.setAlpha(this.alpha);
    fill(shapeCol);
    circle(cos(this.a) * this.r + this.p.x, sin(this.a) * this.r + this.p.y, this.d);
  }
}

class AnimationCenter2 {
  constructor(i) {
    this.alpha = random(50);
    this.switch = 0;
    this.lifetime = 600;
    this.p = createVector(width / 2, height / 2);
    this.r = newSize / 3;
    this.d = random(20);
    this.a = i;
  }
  draw() {
    this.a += 0.025;

    if(this.switch == 0 && this.alpha < 80){
      this.alpha++;
    }else if(this.switch == 0 && this.alpha >= 80){
      this.alpha = 80;
      this.switch = 1;
    }

    if(this.switch == 1 && this.alpha > 0){
      this.alpha -= 0.2;
    }else if(this.switch == 1 && this.alpha <= 0){
      this.alpha = 0;
    }
    this.r-=0.1;
    this.lifetime--;

    noFill();
    shapeCol.setAlpha(this.alpha);
    stroke(shapeCol);
    circle(cos(-this.a) * this.r + this.p.x, sin(-this.a) * this.r + this.p.y, this.d);
  }
}

class AnimationTop {
    constructor(i) {
      this.alpha = random(50);
      this.switch = 0;
      this.lifetime = 200;
      this. cell = width / 30;
      this.p = createVector(i * this.cell + this.cell / 2 , 0);
      this.d = random(3, 10);
      this.v = createVector(0, random(10));
    }
    draw() {
      if(this.switch == 0 && this.alpha < 100){
        this.alpha++;
      }else if(this.switch == 0 && this.alpha >= 100){
        this.alpha = 100;
        this.switch = 1;
      }

      if(this.switch == 1 && this.alpha > 0){
        this.alpha--;
      }else if(this.switch == 1 && this.alpha <= 0){
        this.alpha = 0;
      }

      this.p.add(this.v);
      this.lifetime--;
      noStroke();
      shapeCol.setAlpha(this.alpha);
      fill(shapeCol);
      circle(this.p.x, this.p.y + this.d, this.d / 3);
      circle(this.p.x, this.p.y + this.d * 2, this.d / 2);
      circle(this.p.x, this.p.y + this.d* 4, this.d);
    }
  }

class AnimationBottom {
  constructor(x, i) {
    this.alpha = random(20);
    this.switch = 0;
    this.lifetime = 300;
    this.p = createVector(random(x-30,x + 30) , height);
    this.d = random(3, 20);
    this.v = createVector(0, random(0.5, 6));
    this.a = 0;
    this.cF;
    this.cS;
    this.c = random(2)>1?0:1;
  }
  draw() {
    this.a += 0.04;

    if(this.switch == 0 && this.alpha < 100){
      this.alpha++;
    }else if(this.switch == 0 && this.alpha >= 100){
      this.alpha = 100;
      this.switch = 1;
    }

    if(this.switch == 1 && this.alpha > 0){
      this.alpha-= 0.5;
    }else if(this.switch == 1 && this.alpha <= 0){
      this.alpha = 0;
    }

    this.p.sub(this.v);
    this.lifetime--;

    if(this.c == 0){
      noStroke();
      shapeCol.setAlpha(this.alpha);
      fill(shapeCol);
    }else if(this.c == 1){
      noFill();
      shapeCol.setAlpha(this.alpha);
      stroke(shapeCol);
    }

    circle(sin(this.a * this.v.y) * 3 + this.p.x, this.p.y, this.d);
  }
}

class AnimationLeft {
  constructor(i) {
    this.alpha = random(50);
    this.switch = 0;
    this.lifetime = 300;
    this. cell = height / 20;
    this.d = random(3, 10);
    this.p = createVector(this.d / 2, i * this.cell + this.cell / 2);
    this.v = createVector(random(0.5, 8), 0);
  }
  draw() {
    if(this.switch == 0 && this.alpha < 80){
      this.alpha++;
    }else if(this.switch == 0 && this.alpha >= 80){
      this.alpha = 80;
      this.switch = 1;
    }

    if(this.switch == 1 && this.alpha > 0){
      this.alpha-= 0.5;
    }else if(this.switch == 1 && this.alpha <= 0){
      this.alpha = 0;
    }
    
    this.p.add(this.v);
  
    if(this.p.x > width - this.d / 2){
      this.v.mult(-1, 0);
    } else if(this.p.x < this.d / 2){
      this.v.mult(-1, 0);
    }

    this.lifetime--;
    noStroke();
    shapeCol.setAlpha(this.alpha);
    fill(shapeCol);
    circle(this.p.x, this.p.y, this.d);
  }
}

class AnimationRight {
  constructor(i) {
    this.alpha = random(50);
    this.switch = 0;
    this.lifetime = 200;
    this. cell = height / 5;
    this.p = createVector(width - this. cell / 2, i * this.cell + this.cell / 2);
    this.v = createVector(random(1, 5), 0);
    this.speed = createVector(random(1.01, 1.1), 0);
  }
  draw() {
    if(this.switch == 0 && this.alpha < 80){
      this.alpha++;
    }else if(this.switch == 0 && this.alpha >= 80){
      this.alpha = 80;
      this.switch = 1;
    }

    if(this.switch == 1 && this.alpha > 0){
      this.alpha--;
    }else if(this.switch == 1 && this.alpha <= 0){
      this.alpha = 0;
    }
    
    this.v.sub(this.speed);
    this.p.add(this.v);

    this.lifetime--;
    noStroke();
    shapeCol.setAlpha(this.alpha);
    fill(shapeCol);
    circle(this.p.x, this.p.y, this.cell / 4);
  }
}

class AnimationType {
  constructor(inputMessage) {
    this.alpha = random(50);
    this.switch = 0;
    this.lifetime = 2000;
    this.d = 0;
    this.p = createVector(width/2, height/2);
    this.myMessage = inputMessage;
  }
  draw() {
    if(this.switch == 0 && this.alpha < 100){
      this.alpha++;
    }else if(this.switch == 0 && this.alpha >= 100){
      this.alpha = 100;
      this.switch = 1;
    }

    // if(this.switch == 1 && this.alpha > 0){
    //   this.alpha--;
    // }else if(this.switch == 1 && this.alpha <= 0){
    //   this.alpha = 0;
    // }
    this.d++;
    this.lifetime--;

    noStroke();
    goldCol.setAlpha(this.alpha);
    fill(goldCol);
    textSize(this.d);
    text(this.myMessage,this.p.x, this.p.y);
  }
}

class Message1 {
  constructor(input) {
    this.alpha = 0;
    this.switch = 0;
    this.lifetime = 400;
    this.p = createVector(width / 2, height / 2);
    this.message = messageList[input];
  }
  draw() {
    if(this.switch == 0 && this.alpha < 300){
      this.alpha++;
    }else if(this.switch == 0 && this.alpha >= 300){
      this.alpha = 100;
      this.switch = 1;
    }

    if(this.switch == 1 && this.alpha > 0){
      this.alpha --;
    }else if(this.switch == 1 && this.alpha <= 0){
      this.alpha = 0;
    }
    this.lifetime--;

    noStroke();
    shapeCol.setAlpha(this.alpha);
    fill(shapeCol);
    textSize(h2);
    text(messageList[0],this.p.x, this.p.y - h1);
    
    textSize(h3);
    text(this.message,this.p.x, this.p.y + h1);
  }
}

//function mousePressed() {
//  if(isRecording == true){
//    stopRecording();
//  } else{
//    startRecording();
//    }
//    isRecording = !isRecording;
//}