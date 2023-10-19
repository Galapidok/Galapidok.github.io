var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["b348483f-67b5-4f21-b7d8-4b674243caa9"],"propsByKey":{"b348483f-67b5-4f21-b7d8-4b674243caa9":{"name":"rac","sourceUrl":null,"frameSize":{"x":15,"y":20},"frameCount":6,"looping":true,"frameDelay":12,"version":"HvTTQY1Z38XLrRUsPybtUUN6KImzHpFv","loadedFromSource":true,"saved":true,"sourceSize":{"x":45,"y":40},"rootRelativePath":"assets/b348483f-67b5-4f21-b7d8-4b674243caa9.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

// Knockout

var queue = ["j", "f", "k", "d", "j", "f", "k", "d", "j", "f", "k", "d", "j", "f", "k", "d"];
var doubleQueue = ["j", "j", "j", "j", "j", "j", "j", "j", "j", "j", "j", "j", "j", "j", "j", "j"];

var ind = 0;
var loop = 0;

var timeTaken = -1;
var notesPressed = -1;
var KPS = -1;

var startTime = 0;

var lastCursorY = 800;

function titleScreen()
{
  background("black");
  textSize(21);
  fill(rgb(55, 0, 250));
  if (timeTaken!=-1)
  {
    text("Last KPS: ", 0, 40);
    text(Math.round(KPS), 100, 40);
  }
  textSize(30);
  fill("blue");
  text("KNOCKOUT", 110, 100);
  fill(rgb(0, 10, 235));
  textSize(25);
  text("MODE SELECT", 105, 175);
  text("CREDITS", 135, 225);
  
  if (World.mouseX>100&&World.mouseX<300&&World.mouseY>150&&World.mouseY<185)
  {
    lastCursorY = 168;
    if (mouseWentDown("left"))
    {
      state = modeSelect;
    }
  }
  
  if (World.mouseX>100&&World.mouseX<300&&World.mouseY>210)
  {
    lastCursorY = 215;
    if (mouseWentDown("left"))
    {
      state = credits;
    }
  }
  
  fill(rgb(0, 1, 100));
  ellipse(300, lastCursorY, 15, 15);
}

function modeSelect()
{
  background("black");
  fill(rgb(0, 10, 235));
  textSize(30);
  text("STANDARD", 105, 155);
  text("Coming Soon...", 90, 255);
  
  if (World.mouseX>100&&World.mouseX<300&&World.mouseY>130&&World.mouseY<165)
  {
    lastCursorY = 145;
    if (mouseWentDown("left"))
    {
      state = standard;
      startTime = World.seconds;
    }
  }
  
  if (keyWentDown("space"))
  {
    state = double;
  }
  
  fill(rgb(0, 1, 100));
  ellipse(300, lastCursorY, 15, 15);
}

function credits()
{
  background("black");
  textSize(21);
  text("'Game' by Bryson Burnett\n\n(Though we all know this \nis a glorified Osu trainer)", 50, 150);
  
  text("Current World Champion: \nAvery Moseley", 50, 300);
  
  if (mouseWentDown("left"))
  {
    state = titleScreen;
  }
}

function standard()
{
  background("black");
  var nextLetter = queue[ind];
  
  console.log(startTime);
  
  if (keyWentDown(nextLetter))
  {
    ind++;
    if (ind>queue.length-1)
    {
      ind = 0;
      loop++;
    }
  }
  
  if (loop>3)
  {
    timeTaken = World.seconds - startTime;
    state = endScreen;
  }
  
  var y = 400;
  for (var cS = ind; cS < queue.length; cS++)
  {
    var x;
    if (queue[cS] == "d")
    {
      x = 0;
      fill("red");
    }
    if (queue[cS] == "f")
    {
      x = 100;
      fill("green");
    }
    if (queue[cS] == "j")
    {
      x = 200;
      fill("yellow");
    }
    if (queue[cS] == "k")
    {
      x = 300;
      fill("blue");
    }
    y-=25;
    rect(x, y, 100, 20);
  }
}

function double()
{
  background("pink");
  var nextLetter = doubleQueue[ind];
  
  console.log(startTime);
  
  if (keyWentDown(nextLetter))
  {
    ind++;
    if (ind>doubleQueue.length-1)
    {
      ind = 0;
      loop++;
    }
  }
  
  if (loop>3)
  {
    timeTaken = World.seconds - startTime;
    state = endScreen;
  }
  
  var y = 400;
  for (var cS = ind; cS < queue.length; cS++)
  {
    var x;
    if (doubleQueue[cS] == "d")
    {
      x = 0;
      fill("red");
    }
    if (doubleQueue[cS] == "f")
    {
      x = 100;
      fill("green");
    }
    if (doubleQueue[cS] == "j")
    {
      x = 200;
      fill("yellow");
    }
    if (doubleQueue[cS] == "k")
    {
      x = 300;
      fill("blue");
    }
    y-=25;
    rect(x, y, 100, 20);
  } 
}

function endScreen()
{
  background("black");
  notesPressed = queue.length*loop;
  KPS = notesPressed/timeTaken;
  
  console.log(notesPressed);
  console.log(timeTaken);
  
  textSize(30);
  fill("cyan");
  text(KPS, 200, 200);
  
  if (mouseWentDown("left"))
  {
    state = titleScreen;
  }
}

var state = titleScreen;

function draw()
{
  state();
}
// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
