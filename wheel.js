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
  backgroundColor: 16777215,
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
Loader.add("frontend-test/wheel/wheel-tileset.json").load(setup);

// Define variables that might be used in more than one function
let state, id, btnSpin, marker, wheel, canRotate, num, time;

// Game state
state = play;

// Define the `setup` function
function setup() {
  // Create an alias for all the texture atlas frames
  id = Resources["frontend-test/wheel/wheel-tileset.json"].textures;

  // Create container
  const container = new Container();

  // Create the wheel sprite
  wheel = new Sprite(id["wheel.png"]);
  wheel.scale.set(0.9, 0.9);
  wheel.x = app.screen.width / 2;
  wheel.y = app.screen.height / 2 - 25;
  wheel.anchor.set(0.5);

  // Boolean to control wheel rotation
  canRotate = true;

  // Create the marker sprite
  marker = new Sprite(id["marker.png"]);
  marker.x = app.screen.width / 2 + 125;
  marker.y = app.screen.height / 2 - 150;
  marker.anchor.set(0.5);
  marker.alpha = 0;

  // Create the spin button
  btnSpin = new Sprite(id["btn-spin.png"]);
  btnSpin.scale.set(0.8, 0.8);
  btnSpin.x = app.screen.width / 2;
  btnSpin.y = app.screen.height / 2 + 300;
  btnSpin.anchor.set(0.5);
  btnSpin.interactive = true;
  btnSpin.buttonMode = true;

  // Start the game loop on button click
  btnSpin.on("click", () => {
    if (canRotate) {
      canRotate = !canRotate;
      gameLoop();
    } else {
      alert("Please wait for the wheel to stop spinning");
      return;
    }
  });

  // Add sprites to container
  container.addChild(wheel);
  container.addChild(marker);
  container.addChild(btnSpin);

  // Add container to the stage
  app.stage.addChild(container);
}

function gameLoop() {
  // Spin the wheel and stop on a random number based on position data
  fetch("frontend-test/wheel/positions.json", { mode: "no-cors" })
    .then((res) => res.json())
    .then((data) => {
      num = data[Math.floor(Math.random() * data.length)];
      console.log(data, num.position);

      state();
    })
    .catch((error) => console.error(error));
}

function play() {
  time = 3000 * num.position;
  btnSpin.alpha = 0.5;

  // Spin the wheel
  app.ticker.add(() => {
    wheel.rotation += 0.2;
  });

  // Stop the wheel
  setTimeout(() => {
    btnSpin.alpha = 1;
    marker.alpha = 1;
    canRotate = !canRotate;
    console.log(canRotate);
    app.ticker.stop();
  }, time);
}

//The `randomInt` helper function
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
