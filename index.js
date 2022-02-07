// width and height allocated to element containing the app in the DOM
const winWidth = window.innerWidth;
const winHeight = window.innerHeight * 0.901;

// Create element to attach app to DOM
const canvas = document.querySelector("#app");

// Aliases
const Application = PIXI.Application,
  Container = PIXI.Container,
  ParticleContainer = PIXI.ParticleContainer,
  Loader = PIXI.Loader.shared,
  Resources = PIXI.Loader.shared.resources,
  TextureCache = PIXI.utils.TextureCache,
  Sprite = PIXI.Sprite,
  Rectangle = PIXI.Rectangle;

// Create the application helper
const app = new Application({
  width: winWidth,
  height: winHeight,
  backgroundColor: 1117219,
  resolution: window.devicePixelRatio,
  autoDensity: true,
});

// Make the app view responsive to window resizing
window.addEventListener("resize", () => {
  app.renderer.resize(window.innerWidth, window.innerHeight * 0.901);
});

// Add the app to the DOM
canvas.appendChild(app.view);

// load tileset JSON file and run the `setup` function when it's done
Loader.add("frontend-test/showdown/showdown-tileset.json").load(setup);

// Create container
const container = new Container();

// Define variables that might be used in more than one function
let id,
  boltOff,
  bolt,
  d,
  h,
  header,
  mustDrop,
  n,
  o1,
  o2,
  s,
  showdownOff,
  slots,
  vegas,
  w1,
  w2,
  showdownSprites;

// Define the `setup` function
function setup() {
  // Create an alias for all the texture atlas frames
  id = Resources["frontend-test/showdown/showdown-tileset.json"].textures;

  // Create the header sprite
  header = new Sprite(id["header.png"]);
  header.x = app.screen.width / 2;
  header.y = app.screen.height / 2;
  header.anchor.set(0.5);

  // Create the showdown-off sprite
  showdownOff = new Sprite(id["showdown-off.png"]);
  showdownOff.x = app.screen.width / 2;
  showdownOff.y = app.screen.height / 2;
  showdownOff.anchor.set(0.5);
  showdownOff.scale.set(1.5, 1.5);

  // Create the vegas sprite
  vegas = new Sprite(id["vegas@2x.png"]);
  vegas.scale.set(0.75, 0.75);
  vegas.anchor.set(0.5);
  vegas.position.set(
    app.screen.width / 2 - vegas.width / 2.25,
    app.screen.height / 2 - vegas.height / 1.15
  );
  vegas.alpha = 0;

  // Create the slots sprite
  slots = new Sprite(id["slots@2x.png"]);
  slots.scale.set(0.75, 0.75);
  slots.anchor.set(0.5);
  slots.position.set(
    app.screen.width / 2 + slots.width / 1.65,
    app.screen.height / 2 - slots.height / 1.15
  );
  slots.alpha = 0;

  // Create the bolt sprite
  bolt = new Sprite(id["bolt@2x.png"]);
  bolt.scale.set(0.75, 0.75);
  bolt.anchor.set(0.5);
  bolt.position.set(
    app.screen.width / 2 + bolt.width / 7,
    app.screen.height / 2 - bolt.height / 1.5
  );
  bolt.alpha = 0;

  // Create the showdown bright letters sprites
  s = new Sprite(id["s@2x.png"]);
  s.scale.set(0.75, 0.75);
  s.anchor.set(0.5);
  s.position.set(
    app.screen.width / 2 - s.width / 0.7,
    app.screen.height / 2 + s.height / 11
  );
  s.alpha = 0;
  h = new Sprite(id["h@2x.png"]);
  h.scale.set(0.75, 0.75);
  h.anchor.set(0.5);
  h.position.set(
    app.screen.width / 2 - h.width / 1.05,
    app.screen.height / 2 + h.height / 11
  );
  h.alpha = 0;
  o1 = new Sprite(id["o-1@2x.png"]);
  o1.scale.set(0.75, 0.75);
  o1.anchor.set(0.5);
  o1.position.set(
    app.screen.width / 2 - o1.width / 0.6,
    app.screen.height / 2 + o1.height / 11
  );
  o1.alpha = 0;
  w1 = new Sprite(id["w-1@2x.png"]);
  w1.scale.set(0.75, 0.75);
  w1.anchor.set(0.5);
  w1.position.set(
    app.screen.width / 2 - w1.width / 4,
    app.screen.height / 2 + w1.height / 14.5
  );
  w1.alpha = 0;
  d = new Sprite(id["d@2x.png"]);
  d.scale.set(0.75, 0.75);
  d.anchor.set(0.5);
  d.position.set(
    app.screen.width / 2 + d.width / 3.75,
    app.screen.height / 2 + d.height / 19
  );
  d.alpha = 0;
  o2 = new Sprite(id["o-2@2x.png"]);
  o2.scale.set(0.73, 0.73);
  o2.anchor.set(0.5);
  o2.position.set(
    app.screen.width / 2 + o2.width / 1.5,
    app.screen.height / 2 + o2.height / 19
  );
  o2.alpha = 0;
  w2 = new Sprite(id["w-2@2x.png"]);
  w2.scale.set(0.75, 0.75);
  w2.anchor.set(0.5);
  w2.position.set(
    app.screen.width / 2 + w2.width / 0.97,
    app.screen.height / 2 + w2.height / 11
  );
  w2.alpha = 0;
  n = new Sprite(id["n@2x.png"]);
  n.scale.set(0.73, 0.73);
  n.anchor.set(0.5);
  n.position.set(
    app.screen.width / 2 + n.width / 0.73,
    app.screen.height / 2 + n.height / 11
  );
  n.alpha = 0;

  // Create array of showdown sprites
  showdownSprites = [s, h, o1, w1, d, o2, w2, n];

  // Create the "must drop" sprite
  mustDrop = new Sprite(id["must_drop.png"]);
  mustDrop.anchor.set(0.5);
  mustDrop.position.set(
    app.screen.width / 2,
    app.screen.height / 2 + mustDrop.height / 1.35
  );
  mustDrop.alpha = 0;

  // Add sprites to container
  container.addChild(header);
  container.addChild(showdownOff);
  container.addChild(vegas);
  container.addChild(slots);
  container.addChild(bolt);
  showdownSprites.forEach((sprite) => container.addChild(sprite));
  container.addChild(mustDrop);

  // Add container to the stage
  app.stage.addChild(container);

  function animate() {
    // Show vegas and slots sprites
    TweenMax.to([vegas, slots], 0.1, { alpha: 1 }).delay(1);
    TweenMax.to([vegas, slots], 0.1, { alpha: 0 }).delay(1.5);
    TweenMax.to([vegas, slots], 0.1, { alpha: 1 }).delay(1.6);
    TweenMax.to([vegas, slots], 0.1, { alpha: 0 }).delay(1.7);
    TweenMax.to([vegas, slots], 0.1, { alpha: 1 }).delay(1.8);

    // Show bolt sprite
    TweenMax.to(bolt, 0.5, { alpha: 1 }).delay(3);

    // flickering effect on bolt sprite
    app.ticker.add(() => {
      setTimeout(() => {
        bolt.alpha = randomInt(0, 1) + 0.1;
      }, 3000);
    });

    // Show showdown sprites
    TweenMax.to(s, 0.25, { alpha: 1 }).delay(2.5);
    TweenMax.to(h, 0.25, { alpha: 1 }).delay(2.75);
    TweenMax.to(o1, 0.25, { alpha: 1 }).delay(3);
    TweenMax.to(w1, 0.25, { alpha: 1 }).delay(3.25);
    TweenMax.to(d, 0.25, { alpha: 1 }).delay(3.5);
    TweenMax.to(o2, 0.25, { alpha: 1 }).delay(3.75);
    TweenMax.to(w2, 0.25, { alpha: 1 }).delay(4);
    TweenMax.to(n, 0.25, { alpha: 1 }).delay(4.25);

    // Show "must drop" sprite
    TweenMax.to(mustDrop, 0.1, { alpha: 1 }).delay(5);
    TweenMax.to(mustDrop, 0.1, { alpha: 0 }).delay(5.5);
    TweenMax.to(mustDrop, 0.1, { alpha: 1 }).delay(5.6);
    TweenMax.to(mustDrop, 0.1, { alpha: 0 }).delay(5.7);
    TweenMax.to(mustDrop, 0.1, { alpha: 1 }).delay(5.8);
  }

  animate();
}

//The `randomInt` helper function
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
