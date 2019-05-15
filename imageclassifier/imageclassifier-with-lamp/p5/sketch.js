const checkpoint = 'https://storage.googleapis.com/tm-pro-a6966.appspot.com/Yining-image-example/model.json';
const maxPredictions = 2;
const size = 400;
const serviceUuid = "19b10000-e8f2-537e-4f6c-d104768a1214";

let model;
let video;
let predictedClass;
let goodbyeImg;
let helloImg;
let myCharacteristic;
let myBLE;

// A function that loads the model from the checkpoint
async function load() {
  model = await tm.mobilenet.load(checkpoint);
}

async function setup() {
  // Call the load function, wait until it finishes loading
  await load();

  myBLE = new p5ble();

  // Create a 'Connect' button
  const connectButton = createButton('Connect')
  connectButton.mousePressed(connectToBle);
  connectButton.position(20, 20);

  setupVideo();

  createCanvas(displayWidth, displayHeight);
  textAlign(CENTER, CENTER);
  textSize(128);

  goodbyeImg = select('#goodbye');
  helloImg = select('#hello');
}

function updateView() {
  if (!predictedClass || predictedClass === 0) {
    writeToBle(0);
    background('#2196F3');
    text('Goodbye!', width / 2, 100);
    goodbyeImg.style('display', 'block');
    helloImg.style('display', 'none');
  } else if (predictedClass && predictedClass === 1) {
    writeToBle(1);
    background('#4CAF50');
    text('Hello!', width / 2, 100);
    helloImg.style('display', 'block');
    goodbyeImg.style('display', 'none');
  }
}

function setupVideo() {
  // has to be a square video and image feed
  const constraints = {
    video: {
      width: size,
      height: size,
      aspectRatio: 1
    } 
  };

  // Get videos from webcam
  video = createCapture(VIDEO, constraints, videoReady);

  // Hide the video
  video.hide()
}

function videoReady() {
  // Make a prediction from square canvas
  predictVideo(video.elt);
}

async function predictVideo(image) {
  const prediction = await model.predict(image, maxPredictions);
  if (prediction && prediction[0]) {
    const result = prediction[0];
    const { className, probability } = result;
    if (probability > 0.8) {
      predictedClass = className;
    }
    // Show results on the canvas
    updateView();
    // Continue predicting
    predictVideo(video.elt);
  }
}

function connectToBle() {
  // Connect to a device by passing the service UUID
  myBLE.connect(serviceUuid, gotCharacteristics);
}

function gotCharacteristics(error, characteristics) {
  if (error) console.log('error: ', error);
  console.log('characteristics: ', characteristics);
  // Set the first characteristic as myCharacteristic
  myCharacteristic = characteristics[0];
}

function writeToBle(inputValue) {
  // Write the value of the input to the myCharacteristic
  myBLE.write(myCharacteristic, inputValue);
}
