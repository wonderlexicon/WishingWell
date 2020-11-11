//QUESTIONS!!! HOW DO I CHANGE THE DEFAULT FLOW OF MESSAGES? WANT TO STOP THE REPETITION OF MESSAGE 1, WANT TO ALTER MESSAGE PLACEMENT - MAKE MESSAGES APPEAR AT DIFFERENT PLACES ON THE CANVAS TO DRAW USER ATTENTION IN DIFFERENT DIRECTIONS. ALSO, HOW DO I PLAY WITH THE PACING AND CHANGE THE RATE OF WHEN MESSAGES SHOW? https://p5js.org/examples/simulate-multiple-particle-systems.html want this at end

//want to set a color range for shapeCol and text col

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

let lastAnimationFrame;
let animations = [];
let messages = [];

let bkCol, shapeCol, goldCol, introTxtCol, circleCol, userTypedColor;

let dragCircleCol, dragCircleAlpha;
let dragStrokeWeight;

//CREATE LIST OF POSITIONS ON JAMBOARD

let messageList = [
  // 'this is a mirror of your mind',
  // 'explore the space',
  // 'experience the questions',
'this is a metaphor',
  'a metaphor \n is something \n used to represent \n something else',
  "this is a projection",
  "a projection is an inference \n about the present or future \n derived from \n knowledge or assumptions \n from the past.",
  // 'experience the questions',
  "this is a concept ",
  "a concept \n is a directly conceived \n or intuited object \n of thought", 
  "this is a reflection",
  "a reflection \n is something that \n is a consequence of \n or arises from \n something else.",
  "this is a trick",
  "a trick is an indirect means to gain an end",
  'a mirror is a reflective surface',
  "this is a mirror",
  "is a mirror a projection \n or \n a reflection?",
  "are forgotten memories \n more \n or less \n real \n than dreams \n you remember? ",
  "what is the source of an unformed thought?",
  "does uncertainty have a weight?",
  "this is a microcosm",
  'a microcosm is a small version of something much larger',
  "where does your mind go \n when it wanders?",
  "what makes will free?",
  "do you feel your thoughts \n or think your feelings?",
  "who chose \n the thoughts you are thinking \n right now?",
  // "try to follow it here.",
  
  'this is an invitation',
  "why are you lonely?",
  // "tap around the screen \n or \n type in your response to the prompts",
  //   "where is your mind now?",
  // 'how often are you in ecstasy?',
  "can you find temper in the place where you lose it?",
  "what controls your attention?",
  // 'why are you sad?',
  "how do you know what you know?",
  "do you believe what you see \n more or less n than what you hear? \n less or more n than what you think?",
  "do you think its easier to feel anger or acknowledge fear?",
  "how do you know the difference between right and wrong?",
  "what does your attention think?",
  "where is its center?",
  // 'what do you see when you look in the mirror',
  // 'how well do you handle disappointment?',
  "when was the last time you danced in the rain?",
  "when you are all alone in silence where do your thoughts go?",
  "How do you know what you think?",
  "Where does a new thought come from?",
  "When does an old thought end?",
  // 'Can you catch it?',
  "what fills your mind when you imagine emptiness?",
  "What do you hear when you listen to your voice?",
  "Where do you keep your n \laughter when you are not using it?",
  "why are you angry?",
  "Where do you hide your secrets",
  // 'Who are trying to impress?',
  // 'are you paying attention?',
  // 'hello?',
  "how do you change when someone else is watching",
  "do you use your credentials to hide?",
  'If you type the "ESC" key, to save Canvas',
  "Why did you tap the screen?",
  "Dont think about it"
];

let socket = io();
socket.on("connect", () => {
  console.log("connected!");
});

function loadAsset() {
  textFont("Poiret One");

  function assetLoaded() {
    // assetCounter++;
    // if(assetCounter == assetNumber) {
    isLoading = false;
    // }
  }
}

let startTime = new Date().getTime()/1000;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 100; i++) {
    let x = random(width);
    let y = random(height);
    console.log(x, y);
    // boids[i] = new Boid(x,y);
  }

  pixelDensity(2);

  colorMode(RGB, 100);

  loadAsset();

  textAlign(CENTER);

  isStarted = false;
  isTapped = true;
  isPlayScreen = false;

  sizeList();

  colorList(0, 0);
  socket.on("data", data => {
    console.log("key: " + data["key"]);
  });
  socket.on("touchData", touchData => {
    for (let i = 0 ; i<8;i++){
      animations.push(new AnimationTouch0(width / 2, height / 2, i));  
    }
   
    console.log("touchData:" + touchData);
  });
}

// txt = intro font color, shapeCol = automated shapes and font, goldCol=user text
function colorList(R, G, B) {
  bkCol = color(0, 0, 17);
  // shapeCol = color(H, S, 100);
  shapeCol = color("ivory");
  goldCol = color("white");
 userTypedColor = color("green");
  // txtCol = color(H, S, 29);
  introTxtCol = color("water");
  circleCol = color("fog");
  circleCol.setAlpha(200);
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

let input = -1;
let index = 0;
let dragX;
let dragY;
function draw() {
  if (isLoading == true) {
   
    background(bkCol);
    noStroke();
    fill(introTxtCol);
    textSize(h4);
    text("Loading", width / 2, height / 2);

    noFill();
    stroke(shapeCol);
    arc(
      width / 2,
      height / 2,
      newSize / 5,
      newSize / 5,
      0,
      map(assetCounter, 0, assetNumber - 1, 0, TAU)
    );
  } else if (isLoading == false) {
    //  let currentTime = new Date ().getTime()/1000;
    // if (currentTime - startTime < 120){
    //   console.log(frameCount);
    // }
    
   
    introduction();

    //CIRCLE SIZE CREATE
    stroke("beige");
    strokeWeight(8);
    noFill(circleCol);
    circle(
      windowWidth / 2,
      windowHeight / 2,
      0.9 * min(windowWidth, windowHeight)
    );
    isStarted = true;

    //DRAGGING CIRCLE
    dragCircleCol = color("navy");
    dragCircleAlpha -= 5;
    dragCircleCol.setAlpha(dragCircleAlpha);
    if (dragStrokeWeight > 0) {
      dragStrokeWeight -= 0.1;
      strokeWeight(dragStrokeWeight);
      stroke("white");
    } else {
      noStroke();
    }

    fill(dragCircleCol);
    if (dragX && dragY) {
      ellipse(dragX, dragY, 50, 50);
    }
  }

  if (isPlayScreen == true && frameCount % 300 == 0) {
    input < messageList.length ? input++ : (input = 0);
    // messages.push(new MessageCustom("nicoleta", width/2, height/2));
    // messages.push(new Message1(input));
    messages.push(
      new MessageCustom(messageList[input], width / 2, height / 2, 600)
    );
  }
  let textShowTime;
  if (isPlayScreen == true) {
    // console.log(frameCount);
    textShowTime = 25;
    if (frameCount == textShowTime) {
      let myText = "YO";

      let textX = 200;

      //POSITION TEXT - MAKE SURE TEXT AND TEXT Y ARE > 0
      // let textX = width/4-200;
      // let textY = height/4;
      let textY = 300;
      let textLifetime = 600;
      messages.push(new MessageCustom(myText, textX, textY, textLifetime));
    }

    textShowTime = 100;
    if (frameCount == textShowTime) {
      let myText = "WAKEUP";

      let textX = 400;

      //POSITION TEXT - MAKE SURE TEXT AND TEXT Y ARE > 0
      // let textX = width/4-200;
      // let textY = height/4;
      let textY = 300;
      let textLifetime = 60;
      messages.push(new MessageCustom(myText, textX, textY, textLifetime));
    }

    textShowTime = 2000;
    if (frameCount == textShowTime) {
      let myText = "BULLSHIT";

      let textX = windowWidth - 200;

      //POSITION TEXT - MAKE SURE TEXT AND TEXT Y ARE > 0
      // let textX = width/4-200;
      // let textY = height/4;
      let textY = 300;
      let textLifetime = 30;
      messages.push(new MessageCustom(myText, textX, textY, textLifetime));
    }

    textShowTime = 6000;
    if (frameCount == textShowTime) {
      let myText = "TRUTH";

      let textX = windowWidth - 300;

      //POSITION TEXT - MAKE SURE TEXT AND TEXT Y ARE > 0
      // let textX = width/4-200;
      // let textY = height/4;
      let textY = 300;
      let textLifetime = 30;
      messages.push(new MessageCustom(myText, textX, textY, textLifetime));
    }
    // let textShowTime =1000;
    // if (frameCount == textShowTime){
    //   let myText = "simon?";

    //   let textX = 200;
    //   //MAKE SURE TEXT AND TEXT Y ARE > 0
    //   // let textX = width/4-200;
    //   // let textY = height/4;
    //   let textY = 200;
    //   let textLifetime = 600;
    //   messages.push(new MessageCustom(myText, textX, textY, textLifetime));

    //   }
  }

  //Random loop of text through message list

  //   if(isPlayScreen == true && frameCount % 300 == 0){
  //     let myText = messageList[index];
  //     let textX = random(0, width);
  //     //MAKE SURE TEXT AND TEXT Y ARE > 0
  //     // let textX = width/4-200;
  //     // let textY = height/4;
  //     let textY = random(0, height);
  //     let textLifetime = 60;
  //     messages.push(new MessageCustom(myText, textX, textY, textLifetime));
  // index++;
  //   }

  //RANDOM WORD REPEAT horizontal line on top (only random x)
  // if(isPlayScreen == true && frameCount % 10 == 0){
  //   let myText = "nIcoleta";
  //   let textX = random(0, width);
  //   //MAKE SURE TEXT AND TEXT Y ARE > 0
  //   // let textX = width/4-200;
  //   let textY = height/4;
  //   messages.push(new MessageCustom(myText, textX, textY));
  // }

  //random word repeat x,y around the screen
  // if(isPlayScreen == true && frameCount % 10 == 0){
  //   let myText = "nIcoleta";
  //   let textX = random(0, width);
  //   //MAKE SURE TEXT AND TEXT Y ARE > 0
  //   // let textX = width/4-200;
  //   // let textY = height/4;
  //   let textY = random(0, height);
  //   messages.push(new MessageCustom(myText, textX, textY));
  // }

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
    for (let i = 0; i < messages.length; i++) {
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

//INTRO TEXT GROUP

let introTextList = [
  // "THIS IS A MICROCOSM",
  // "MIRROR \n \n PROJECTION",
  // "of",
  // "deception, cause, effect, you, me, them, us, dreams, truth, stillness, nature, then, now, \n betrayal, pretense, profundity, past, future, illusion, longing, provokation, propriety, \n truth, sensation, simplicity, pleasure, shame, sacrifice, irritation, tradition, \n preference, sex, wonder, absurdity, sanctuary, culture, emptiness, mayhem, attention, bullshit, \n discernment, entertainment, thinking, essence, stumbling, learning, \n quality, morality, dogma, science, ego, scrutiny, thought, consideration, \n liberation, debate, beginning, nihilism, recognition, bypassing, \n regard, insight, materialism, cultivation, wisdom, awareness, concern, \n contemplation, stupidity, distraction, assiduity, \n inner, outer, deliberation, diligence, circuiuty, immersion, paradox \n absorption, study, illusion, heedfulness, \n discursiveness, interdependence",
];

function introduction() {
  if (isTapped == true && txtAlpha < 100) {
    txtAlpha++;
  } else if (txtAlpha >= 100) {
    txtAlpha = 100;
  }

  if (isTapped == false && txtAlpha > 0) {
    txtAlpha -= 5;
  } else if (isTapped == false && txtAlpha < 0) {
    txtAlpha = 0;
  }

  background(bkCol);

  //INTRO TEXT SETUP
  noStroke();
  textSize(h1);
  introTxtCol.setAlpha(txtAlpha);
  fill(introTxtCol);
  text(introTextList[0], width / 2, height / 2 - h1 * 1.5);
  // text(introTextList[2], width/2, height/2-h3*2);

  textSize(h2); 
  // introTxtCol.setAlpha(txtAlpha-200);
  fill(goldCol);
  text(introTextList[1], width / 2, height / 2 - h1 * 2.5);
  text(introTextList[2], width / 2, height / 2 + h1);
  

  textSize(h3);
  // text(introTextList[1], width / 2, height / 2 - h1 * 2.5);
  // text(introTextList[2], width / 2, height / 2 + h1);
  text(introTextList[3], width / 2, height / 2 + h1 * 2);

  textSize(h4);
  text(introTextList[4], width / 2, height / 2 + h1 * 4);
  // text(introTextList[5], width/2, height/2);
}

function mouseDragged() {
  console.log("dragging?");
  dragX = mouseX;
  dragY = mouseY;
  dragCircleAlpha = 100;
  dragStrokeWeight = 4;

  // prevent default
  return false;
}

function touchStarted() {
  if (isStarted == true) {
    isTapped = false;
  }

  if (isTapped == false && txtAlpha == 0) {
    isPlayScreen = true;
  }

  if (isPlayScreen == true) {
    colorList(0, 0);

    if (mouseY < height / 10) {
      for (let i = 0; i < 30; i++) {
        animations.push(new AnimationTop(i));
      }
    } else if (mouseY > (height / 10) * 9) {
      animations.push(new AnimationTouch3());
    } else if (mouseX < width / 10) {
      for (let i = 0; i < 20; i++) {
        animations.push(new AnimationLeft(i));
      }
    } else if (mouseX > (width / 10) * 9) {
      for (let i = 0; i < 5; i++) {
        // animations.push(new AnimationRight(i));
      }
    }

    //ANIMATION CENTER?
    // else if (mouseX > width / 2 - 10 && mouseX < width / 2 + 10 && mouseY > height / 2 - 10 &&  mouseY < height / 2 + 10){

    //   for(let i = 0; i < 10; i++){
    //     random(2)>1?
    //     animations.push(new AnimationCenter1(i)):
    //     animations.push(new AnimationCenter2(i));
    //     }
    //   }

    // GO HERE TO SEE ANIMATION DISTINCTIONS !!!( change from 0-10) no ,4,6,8,9, maybe 10 LILL 7 9 shrink 8 recolor 10
    //0 = circle ripples *** slow down, increase stroke weight
    //1 = bubbles radiating outward
    //2= circles radiating downwards ***
    //3= quiet reverberation from bottom (question: how do I distinguish between this and bottom animation?)
    //5 = bubbles radiating outward more prounounced and bigger than 1
    //6 = infinity fireflies
    //7

    //clicktop = rain, click left outward dots, click bottom = quiet radiance, click right?
  

    let coolDownTime = 75;
    if (lastAnimationFrame > frameCount - coolDownTime) {
      return;
    }
    lastAnimationFrame = frameCount;
    socket.emit("touchData", { mouseX: mouseX, mouseY: mouseY });

// randomNumber = 7
    randomNumber = floor(random(10));
    //ANIMATION0
    // for(let i = 0; i < 3; i++){
    //   animations.push(new AnimationTouch0(mouseX, mouseY, i));
    // }

    if (randomNumber == 0) {
      for (let i = 0; i < 3; i++) {
        animations.push(new AnimationTouch0(mouseX, mouseY, i));
      }
    }

    //ANIMATION1
    else if (randomNumber == 1) {
      //   // Add an initial set of boids into the system
      for (let i = 0; i < 10; i++) {
        animations.push(new AnimationTouch1(mouseX, mouseY));
      }
      // }

      // function draw() {
      //  background(51);
      // // Run all the boids
      // for (let i = 0; i < boids.length; i++) {
      //    boids[i].run(boids);
      //  }
    }

    //ANIMATION2
    else if (randomNumber == 2) {
      for (let i = 0; i < 3; i++) {
        animations.push(new AnimationTouch2(mouseX, mouseY, i));
      }
    }

    //ANIMATION3
    else if (randomNumber == 3) {
      animations.push(new AnimationTouch3());
    }

    // //ANIMATION4
     else if (randomNumber == 4) {

     animations.push(new AnimationTouch4(mouseY));
     }

    //ANIMATION 5
    else if (randomNumber == 5) {
      let n = random(50, 200);
      for (let i = 0; i < 5; i++) {
        animations.push(new AnimationTouch5(mouseX, mouseY, i, n));
      }
    }
    //ANIMATION 6
    else if (randomNumber == 6) {
      for (let i = 0; i < 20; i++) {
        animations.push(new AnimationTouch6(mouseX, mouseY, i));
      }
    }

    //ANIMATION7
    else if (randomNumber == 7) {
      animations.push(new AnimationTouch10());
    }

    //ANIMATION8
    else if (randomNumber == 8) {
      animations.push(new AnimationTouch8(mouseX));
    }

    //ANIMATION9
    else if (randomNumber == 9) {
      for (let i = 0; i < 10; i++) {
        animations.push(new AnimationTouch9());
      }
    }

   
    console.log("new AnimationTouch" + randomNumber);
  }
}

let userTypedMessage = null;

function keyTyped() {
  // console.log("keytyped");
  if (isPlayScreen == true) {
    //  let userTypedMessage = new Message1(key);
    //  userTypedMessage.draw();
    text("Loading", width / 2, height / 2);
    socket.emit("data", { key: key });

//     if (userTypedMessage === null) {

//       userTypedMessage = new AnimationType(key);
//       animations.push(userTypedMessage);
//     } else {
//       userTypedMessage.myMessage = userTypedMessage.myMessage + key;
//     }
//      fill (userTypedColor);
    // colorList(floor(random(360)), 100);
  }
}


function keyPressed() {
  if (keyCode === ESCAPE) {
    saveCanvas("YOU WERE HERE.", "png");
  }
}

class AnimationTouch0 {
  constructor(x, y, i) {
    this.maxAlpha = 30;
    this.alpha = random(this.maxAlpha);
    
    this.switch = 0;
    this.lifetime = 600;
    this.p = createVector(x, y);
    this.d = random(100);
    this.weight = i + 1;
  }
  draw() {
    if (this.switch == 0 && this.alpha < this.maxAlpha) {
      this.alpha++;
    } else if (this.switch == 0 && this.alpha >= this.maxAlpha) {
      this.alpha = this.maxAlpha;
      this.switch = 1;
    }

    if (this.switch == 1 && this.alpha > 0) {
      this.alpha--;
    } else if (this.switch == 1 && this.alpha <= 0) {
      this.alpha = 0;
    }
    this.d += 3;
    this.lifetime--;

    noFill();
    shapeCol.setAlpha(this.alpha);
    fill(shapeCol);
    stroke(shapeCol);
    strokeWeight(this.weight);
    strokeWeight(1);
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
    this.d = random(2, 10);
    this.lifetime = 200;
  }
  draw() {
    if (this.switch == 0 && this.alpha < 100) {
      this.alpha++;
    } else if (this.switch == 0 && this.alpha >= 100) {
      this.alpha = 100;
      this.switch = 1;
    }

    if (this.switch == 1 && this.alpha > 0) {
      this.alpha--;
    } else if (this.switch == 1 && this.alpha <= 0) {
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
    this.v = i + 1;
    this.speed = random(0.001, 0.008);
    this.d = random(10, 100);
    this.lifetime = 200;
  }
  draw() {
    if (this.switch == 0 && this.alpha < 80) {
      this.alpha++;
    } else if (this.switch == 0 && this.alpha >= 80) {
      this.alpha = 80;
      this.switch = 1;
    }

    if (this.switch == 1 && this.alpha > 0) {
      this.alpha--;
    } else if (this.switch == 1 && this.alpha <= 0) {
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
    //higher alpha more opaque
    this.alpha = random(1);
    this.maxAlpha = 30;
    this.switch = 0;
    this.p = createVector(width / 2, height);
    this.d = 0;
    this.lifetime = 300;
  }
  draw() {
    if (this.switch == 0 && this.alpha < this.maxAlpha) {
      this.alpha++;
    } else if (this.switch == 0 && this.alpha >= this.maxAlpha) {
      this.alpha = this.maxAlpha;
      this.switch = 1;
    }

    if (this.switch == 1 && this.alpha > 0) {
      this.alpha -= 0.5;
    } else if (this.switch == 1 && this.alpha <= 0) {
      this.alpha = 0;
    }
    //pace of diameter growing !!
    if (frameCount % 2) {
      this.d += 10;
    }
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
    this.d = random(newSize / 1, newSize / 2);
    this.p1 = createVector(-this.d, y);
    this.p2 = createVector(width + this.d, y);
    this.v = createVector(random(5, 8), 0);
    this.lifetime = 200;
    this.color = color("black");
  }
  draw() {
    if (this.switch == 0 && this.alpha < 80) {
      this.alpha++;
    } else if (this.switch == 0 && this.alpha >= 80) {
      this.alpha = 80;
      this.switch = 1;
    }

    if (this.switch == 1 && this.alpha > 0) {
      this.alpha--;
    } else if (this.switch == 1 && this.alpha <= 0) {
      this.alpha = 0;
    }

    this.lifetime--;
    this.p1.add(this.v);
    this.p2.sub(this.v);
    noStroke();
    this.color.setAlpha(this.alpha);
    fill(this.color);
    circle(this.p1.x, this.p1.y, this.d);
    circle(this.p2.x, this.p2.y, this.d);
  }
}

//ANIMATION 5
class AnimationTouch5 {
  constructor(x, y, i, n) {
    this.alpha = random(50);
    this.switch = 0;
    this.d = map(i, 0, 5, newSize / 50, newSize / 30);
    this.p = createVector(x, y);
    this.r = n;
    this.a = i;
    this.dif = map(i, 0, 5, 3, 1);
    this.lifetime = 200;
  }
  draw() {
    this.a += 0.025 * this.dif;

    if (this.switch == 0 && this.alpha < 80) {
      this.alpha++;
    } else if (this.switch == 0 && this.alpha >= 80) {
      this.alpha = 80;
      this.switch = 1;
    }

    if (this.switch == 1 && this.alpha > 0) {
      this.alpha -= 2;
    } else if (this.switch == 1 && this.alpha <= 0) {
      this.alpha = 0;
    }

    this.lifetime--;

    noStroke();
    shapeCol.setAlpha(this.alpha);
    fill(shapeCol);
    circle(
      cos(this.a) * this.r + this.p.x,
      sin(this.a) * this.r + this.p.y,
      this.d
    );
  }
}

//ANIMATION 6: infinity fireflies (made bigger and brighter w shorter lifetime)
class AnimationTouch6 {
  constructor(x, y, i) {
    this.alpha = random(100);
    this.switch = 0;
    this.d = random(5);
    this.p = createVector(x, y);
    this.r = newSize / 1;
    this.a = i;
    this.dif = map(i, 0, 20, 3, 1);
    this.lifetime = 20;
  }
  draw() {
    this.a += 0.05 * this.dif;

    if (this.switch == 0 && this.alpha < 80) {
      this.alpha++;
    } else if (this.switch == 0 && this.alpha >= 80) {
      this.alpha = 80;
      this.switch = 1;
    }

    if (this.switch == 1 && this.alpha > 0) {
      this.alpha--;
    } else if (this.switch == 1 && this.alpha <= 0) {
      this.alpha = 0;
    }

    this.lifetime--;

    noStroke();
    shapeCol.setAlpha(this.alpha);
    fill(shapeCol);
    circle(
      cos(this.a * 0.3) * this.r + this.p.x,
      (sin(-this.a * 0.7) * this.r) / 3 + this.p.y,
      this.d
    );
  }
}

//ANIMATION 7: hovering fireflies !!!! only want this to show up very seldom!
class AnimationTouch7 {
  constructor(x, y, i) {
    this.alpha = random(50);
    this.switch = 0;
    this.d = random(2);
    this.p = createVector(random(x - 10, x + 10), random(y - 10, y + 10));
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
    if (this.count == this.limit) {
      this.count = 0;
      this.step = random(2) > 1 ? this.step_1 : this.step_2;
    }

    if (this.switch == 0 && this.alpha < 80) {
      this.alpha++;
    } else if (this.switch == 0 && this.alpha >= 80) {
      this.alpha = 80;
      this.switch = 1;
    }

    if (this.switch == 1 && this.alpha > 0) {
      this.alpha -= 0.5;
    } else if (this.switch == 1 && this.alpha <= 0) {
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

//ANIMATION 8: center circles up and down

class AnimationTouch8 {
  constructor(x) {
    this.alpha = random(50);
    this.switch = 0;
    this.d = random(newSize / 10, newSize / 5);
    this.p1 = createVector(x, -this.d);
    this.p2 = createVector(x, height + this.d);
    this.v = createVector(0, random(10, 20));
    this.lifetime = 25;
  }
  draw() {
    if (this.switch == 0 && this.alpha < 80) {
      this.alpha++;
    } else if (this.switch == 0 && this.alpha >= 80) {
      this.alpha = 80;
      this.switch = 1;
    }

    if (this.switch == 1 && this.alpha > 0) {
      this.alpha--;
    } else if (this.switch == 1 && this.alpha <= 0) {
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

//ANIMATION 9: circles throughout (changed to black)

class AnimationTouch9 {
  constructor(x) {
    this.alpha = random(10);
    this.switch = 0;
    this.d = random(newSize / 2, newSize / 5);
    this.p = createVector(
      random(this.d / 2, width - this.d / 2),
      random(this.d / 2, height - this.d / 2)
    );
    this.c = random(2) > 1 ? 0 : 1;
    this.lifetime = 200;
    this.color = color("black");
  }
  draw() {
    if (this.switch == 0 && this.alpha < 80) {
      this.alpha++;
    } else if (this.switch == 0 && this.alpha >= 80) {
      this.alpha = 80;
      this.switch = 1;
    }

    if (this.switch == 1 && this.alpha > 0) {
      this.alpha--;
    } else if (this.switch == 1 && this.alpha <= 0) {
      this.alpha = 0;
    }

    this.lifetime--;
    this.d--;
    if (this.c == 0) {
      noStroke();
      this.color.setAlpha(this.alpha);
      fill(this.color);
    } else if (this.c == 1) {
      noFill();
      this.color.setAlpha(this.alpha);
      stroke(this.color);
      strokeWeight(5);
    }
    circle(this.p.x, this.p.y, this.d);
  }
}

//ANIMATION 10: black eclipse cirlces (want to make more transparent)
class AnimationTouch10 {
  constructor() {
    this.alpha = random(10);
    this.switch = 0;
    this.p1 = createVector(0, height);
    this.p2 = createVector(width, height);
    this.p = random(2) > 1 ? this.p1 : this.p2;
    this.d = 0;
    this.lifetime = 200;
  }
  draw() {
    let maxAlpha = 100;
    if (this.switch == 0 && this.alpha < maxAlpha) {
      this.alpha++;
    } else if (this.switch == 0 && this.alpha >= maxAlpha) {
      this.alpha = maxAlpha;
      this.switch = 1;
    }

    if (this.switch == 1 && this.alpha > 0) {
      this.alpha -= 0.5;
    } else if (this.switch == 1 && this.alpha <= 0) {
      this.alpha = 0;
    }
    this.d += 15;
    this.lifetime--;

    noStroke();
    let cornerCircleColor = color("black");
    cornerCircleColor.setAlpha(this.alpha);
    fill(cornerCircleColor);
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

    if (this.switch == 0 && this.alpha < 80) {
      this.alpha++;
    } else if (this.switch == 0 && this.alpha >= 80) {
      this.alpha = 80;
      this.switch = 1;
    }

    if (this.switch == 1 && this.alpha > 0) {
      this.alpha -= 0.2;
    } else if (this.switch == 1 && this.alpha <= 0) {
      this.alpha = 0;
    }
    this.r -= 0.1;
    this.lifetime--;

    noStroke();
    shapeCol.setAlpha(this.alpha);
    fill("taupe");
    circle(
      cos(this.a) * this.r + this.p.x,
      sin(this.a) * this.r + this.p.y,
      this.d
    );
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

    if (this.switch == 0 && this.alpha < 80) {
      this.alpha++;
    } else if (this.switch == 0 && this.alpha >= 80) {
      this.alpha = 80;
      this.switch = 1;
    }

    if (this.switch == 1 && this.alpha > 0) {
      this.alpha -= 0.2;
    } else if (this.switch == 1 && this.alpha <= 0) {
      this.alpha = 0;
    }
    this.r -= 0.1;
    this.lifetime--;

    noFill();
    shapeCol.setAlpha(this.alpha);
    stroke(shapeCol);
    circle(
      cos(-this.a) * this.r + this.p.x,
      sin(-this.a) * this.r + this.p.y,
      this.d
    );
  }
}

class AnimationTop {
  constructor(i) {
    this.alpha = random(50);
    this.switch = 0;
    this.lifetime = 200;
    this.cell = width / 30;
    this.p = createVector(i * this.cell + this.cell / 2, 0);
    this.d = random(1, 3);
    this.v = createVector(0, random(10));
  }
  draw() {
    if (this.switch == 0 && this.alpha < 100) {
      this.alpha++;
    } else if (this.switch == 0 && this.alpha >= 100) {
      this.alpha = 100;
      this.switch = 1;
    }

    if (this.switch == 1 && this.alpha > 0) {
      this.alpha--;
    } else if (this.switch == 1 && this.alpha <= 0) {
      this.alpha = 0;
    }

    this.p.add(this.v);
    this.lifetime--;
    noStroke();
    shapeCol.setAlpha(this.alpha);
    fill(shapeCol);
    circle(this.p.x, this.p.y + this.d, this.d / 3);
    circle(this.p.x, this.p.y + this.d * 2, this.d / 2);
    circle(this.p.x, this.p.y + this.d * 4, this.d);
  }
}

class AnimationBottom {
  constructor(x, i) {
    this.alpha = random(20);
    this.switch = 0;
    this.lifetime = 300;
    this.p = createVector(random(x - 30, x + 30), height);
    this.d = random(3, 20);
    this.v = createVector(0, random(0.5, 6));
    this.a = 0;
    this.cF;
    this.cS;
    this.c = random(2) > 1 ? 0 : 1;
  }
  draw() {
    this.a += 0.04;

    if (this.switch == 0 && this.alpha < 100) {
      this.alpha++;
    } else if (this.switch == 0 && this.alpha >= 100) {
      this.alpha = 100;
      this.switch = 1;
    }

    if (this.switch == 1 && this.alpha > 0) {
      this.alpha -= 0.5;
    } else if (this.switch == 1 && this.alpha <= 0) {
      this.alpha = 0;
    }

    this.p.sub(this.v);
    this.lifetime--;

    if (this.c == 0) {
      noStroke();
      shapeCol.setAlpha(this.alpha);
      fill(shapeCol);
    } else if (this.c == 1) {
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
    this.cell = height / 20;
    this.d = random(1, 2);
    this.p = createVector(this.d / 2, i * this.cell + this.cell / 2);
    this.v = createVector(random(0.5, 8), 0);
  }
  draw() {
    if (this.switch == 0 && this.alpha < 80) {
      this.alpha++;
    } else if (this.switch == 0 && this.alpha >= 80) {
      this.alpha = 80;
      this.switch = 1;
    }

    if (this.switch == 1 && this.alpha > 0) {
      this.alpha -= 0.5;
    } else if (this.switch == 1 && this.alpha <= 0) {
      this.alpha = 0;
    }

    this.p.add(this.v);

    if (this.p.x > width - this.d / 2) {
      this.v.mult(-1, 0);
    } else if (this.p.x < this.d / 2) {
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
    this.cell = height / 5;
    this.p = createVector(width - this.cell / 2, i * this.cell + this.cell / 2);
    this.v = createVector(random(1, 5), 0);
    this.speed = createVector(random(1.01, 1.1), 0);
  }
  draw() {
    if (this.switch == 0 && this.alpha < 80) {
      this.alpha++;
    } else if (this.switch == 0 && this.alpha >= 80) {
      this.alpha = 80;
      this.switch = 1;
    }

    if (this.switch == 1 && this.alpha > 0) {
      this.alpha--;
    } else if (this.switch == 1 && this.alpha <= 0) {
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
    this.p = createVector(width / 2, height / 2);
    this.myMessage = inputMessage;
  }
  draw() {
    if (this.switch == 0 && this.alpha < 100) {
      this.alpha++;
    } else if (this.switch == 0 && this.alpha >= 100) {
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
    text(this.myMessage, this.p.x, this.p.y);
  }
}

//BOTTOM TXT
class Message1 {
  constructor(input) {
    this.alpha = 0;
    this.switch = 0;
    this.lifetime = 400;
    this.p = createVector(width / 2, height / 2);
    this.topText = messageList[input];
    this.bottomText = messageList[input + 1];

    // this.message =
  }

  //
  draw() {
    //fading in logic for all text other than intro
    if (this.switch == 0 && this.alpha < 300) {
      this.alpha++;
      //after fully faded in, start fading out
    } else if (this.switch == 0 && this.alpha >= 300) {
      this.alpha = 100;
      this.switch = 1;
    }
    //fading out logic for other than intro
    if (this.switch == 1 && this.alpha > 0) {
      this.alpha--;
    } else if (this.switch == 1 && this.alpha <= 0) {
      this.alpha = 0;
    }

    shapeCol.setAlpha(this.alpha);
    fill(shapeCol);
    //time text is on screen
    this.lifetime--;

    noStroke();

    //TEXT SIZE
    textSize(h2);
    text(this.topText, this.p.x, this.p.y - h1);

    textSize(h3);
    text(this.bottomText, this.p.x, this.p.y + h1);
  }
}

//custom message
class MessageCustom {
  constructor(text, x, y, lifetime) {
    this.alpha = 0;
    this.switch = 0;
    this.lifetime = lifetime;
    this.p = createVector(x, y);
    this.topText = text;

    // this.message =
  }

  //
  draw() {
    //fading in logic for all text other than intro
    // TODO: NOTE NEED TO CREATE FADE OUT LOGIC IN PROPORTION WITH CUSTOM LIFETIME VALUE
    if (this.switch == 0 && this.alpha < 300) {
      this.alpha++;
      //after fully faded in, start fading out
    } else if (this.switch == 0 && this.alpha >= 300) {
      this.alpha = 100;
      this.switch = 1;
    }
    //fading out logic for other than intro
    if (this.switch == 1 && this.alpha > 0) {
      this.alpha--;
    } else if (this.switch == 1 && this.alpha <= 0) {
      this.alpha = 0;
    }

    shapeCol.setAlpha(this.alpha);
    fill(shapeCol);
    //time text is on screen
    this.lifetime--;

    noStroke();

    //TEXT SIZE
    textSize(h2);
    text(this.topText, this.p.x, this.p.y - h1);
  }
}
//function mousePressed() {
//  if(isRecording == true){
//    stopRecording();
//  } else{
//    startRecording();
//    }
//    isRecording = !isRecording;
// //}

// let boids = [];

// // function setup() {
// //   createCanvas(720, 400);

// //   // Add an initial set of boids into the system
// //   for (let i = 0; i < 100; i++) {
// //     boids[i] = new Boid(random(width), random(height));
// //   }
// // }

// // function draw() {
// //   background(51);
// //   // Run all the boids
// //   for (let i = 0; i < boids.length; i++) {
// //     boids[i].run(boids);
// //   }
// // }

// // Boid class
// // Methods for Separation, Cohesion, Alignment added
// class Boid {
//   constructor(x, y) {
//     this.acceleration = createVector(0, 0);
//     this.velocity = p5.Vector.random2D();
//     this.position = createVector(x, y);
//     this.r = 3.0;
//     this.maxspeed = 3;    // Maximum speed
//     this.maxforce = 0.05; // Maximum steering force
//   }

//   run(boids) {
//     this.flock(boids);
//     this.update();
//     this.borders();
//     this.render();
//   }

//   // Forces go into acceleration
//   applyForce(force) {
//     this.acceleration.add(force);
//   }

//   // We accumulate a new acceleration each time based on three rules
//   flock(boids) {
//     let sep = this.separate(boids); // Separation
//     let ali = this.align(boids);    // Alignment
//     let coh = this.cohesion(boids); // Cohesion
//     // Arbitrarily weight these forces
//     sep.mult(2.5);
//     ali.mult(1.0);
//     coh.mult(1.0);
//     // Add the force vectors to acceleration
//     this.applyForce(sep);
//     this.applyForce(ali);
//     this.applyForce(coh);
//   }

//   // Method to update location
//   update() {
//     // Update velocity
//     this.velocity.add(this.acceleration);
//     // Limit speed
//     this.velocity.limit(this.maxspeed);
//     this.position.add(this.velocity);
//     // Reset acceleration to 0 each cycle
//     this.acceleration.mult(0);
//   }

//   // A method that calculates and applies a steering force towards a target
//   // STEER = DESIRED MINUS VELOCITY
//   seek(target) {
//     let desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target
//     // Normalize desired and scale to maximum speed
//     desired.normalize();
//     desired.mult(this.maxspeed);
//     // Steering = Desired minus Velocity
//     let steer = p5.Vector.sub(desired, this.velocity);
//     steer.limit(this.maxforce); // Limit to maximum steering force
//     return steer;
//   }

//   // Draw boid as a circle
//   render() {
//     fill(127, 127);
//     stroke(200);
//     ellipse(this.position.x, this.position.y, 16, 16);
//   }

//   // Wraparound
//   borders() {
//     if (this.position.x < -this.r) this.position.x = width + this.r;
//     if (this.position.y < -this.r) this.position.y = height + this.r;
//     if (this.position.x > width + this.r) this.position.x = -this.r;
//     if (this.position.y > height + this.r) this.position.y = -this.r;
//   }

//   // Separation
//   // Method checks for nearby boids and steers away
//   separate(boids) {
//     let desiredseparation = 25.0;
//     let steer = createVector(0, 0);
//     let count = 0;
//     // For every boid in the system, check if it's too close
//     for (let i = 0; i < boids.length; i++) {
//       let d = p5.Vector.dist(this.position, boids[i].position);
//       // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
//       if ((d > 0) && (d < desiredseparation)) {
//         // Calculate vector pointing away from neighbor
//         let diff = p5.Vector.sub(this.position, boids[i].position);
//         diff.normalize();
//         diff.div(d); // Weight by distance
//         steer.add(diff);
//         count++; // Keep track of how many
//       }
//     }
//     // Average -- divide by how many
//     if (count > 0) {
//       steer.div(count);
//     }

//     // As long as the vector is greater than 0
//     if (steer.mag() > 0) {
//       // Implement Reynolds: Steering = Desired - Velocity
//       steer.normalize();
//       steer.mult(this.maxspeed);
//       steer.sub(this.velocity);
//       steer.limit(this.maxforce);
//     }
//     return steer;
//   }

//   // Alignment
//   // For every nearby boid in the system, calculate the average velocity
//   align(boids) {
//     let neighbordist = 50;
//     let sum = createVector(0, 0);
//     let count = 0;
//     for (let i = 0; i < boids.length; i++) {
//       let d = p5.Vector.dist(this.position, boids[i].position);
//       if ((d > 0) && (d < neighbordist)) {
//         sum.add(boids[i].velocity);
//         count++;
//       }
//     }
//     if (count > 0) {
//       sum.div(count);
//       sum.normalize();
//       sum.mult(this.maxspeed);
//       let steer = p5.Vector.sub(sum, this.velocity);
//       steer.limit(this.maxforce);
//       return steer;
//     } else {
//       return createVector(0, 0);
//     }
//   }

//   // Cohesion
//   // For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
//   cohesion(boids) {
//     let neighbordist = 50;
//     let sum = createVector(0, 0); // Start with empty vector to accumulate all locations
//     let count = 0;
//     for (let i = 0; i < boids.length; i++) {
//       let d = p5.Vector.dist(this.position, boids[i].position);
//       if ((d > 0) && (d < neighbordist)) {
//         sum.add(boids[i].position); // Add location
//         count++;
//       }
//     }
//     if (count > 0) {
//       sum.div(count);
//       return this.seek(sum); // Steer towards the location
//     } else {
//       return createVector(0, 0);
//     }
//   }
// }
