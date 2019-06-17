// the json file (model topology) has a reference to the bin file (model weights)
const checkpointURL = 'https://storage.googleapis.com/tm-mobilenet/testirene/model.json';
// the metatadata json file contains the text labels of your model and additional information
const metadataURL = 'https://storage.googleapis.com/tm-mobilenet/testirene/metadata.json';

const size = 300;
const serviceUuid = "19b10000-e8f2-537e-4f6c-d104768a1214";

let model;
let totalClasses;
let webcamEl;
let predictedClass;
let goodbyeImg;
let helloImg;
let myCharacteristic;
let myBLE;

// A function that loads the model from the checkpoint
async function load() {
  model = await tm.mobilenet.load(checkpointURL, metadataURL);
  totalClasses = model.getTotalClasses();
  console.log("Number of classes, ", totalClasses);
}

async function loadWebcam() {
  webcamEl = await tm.getWebcam(size, size); // can change width and height
  webcamEl.play();
}

async function setup() {
  // Call the load function, wait until it finishes loading
  await load();
  await loadWebcam();

  // myBLE = new p5ble();

  // Create a 'Connect' button
  const connectButton = createButton('Connect')
  connectButton.mousePressed(connectToBle);
  connectButton.position(20, 20);

  createCanvas(displayWidth, displayHeight);
  textAlign(CENTER, CENTER);
  textSize(128);

  goodbyeImg = select('#goodbye');
  helloImg = select('#hello');
}

function draw() {
  predictVideo(webcamEl);
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

async function predictVideo(image) {
  if (image) {
    const prediction = await model.predict(image, totalClasses);
    if (prediction && prediction[0]) {
      const result = prediction[0];
      const { className, probability } = result;
      if (probability > 0.8) {
        predictedClass = className;
      }
      // Show results on the canvas
      updateView();
    }
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
  if (!myCharacteristic) return;
  // Write the value of the input to the myCharacteristic
  myBLE.write(myCharacteristic, inputValue);
}
