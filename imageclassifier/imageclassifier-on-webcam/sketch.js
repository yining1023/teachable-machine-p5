const modelURL = "https://teachablemachine.withgoogle.com/models/Sga1Yzuzx/";
// the json file (model topology) has a reference to the bin file (model weights)
const checkpointURL = modelURL + "model.json";
// the metatadata json file contains the text labels of your model and additional information
const metadataURL = modelURL + "metadata.json";

const size = 300;

let vidContainer = document.getElementById('vidContainer');
let webcam;
let model;
let totalClasses;

let weights = document.getElementById('weights');
let json = document.getElementById('json');

weights.onchange = function(e) {
  loadFiles();
}

json.onchange = function(e) {
  loadFiles()
}

// A function that loads the model from the checkpoint
async function load() {
  model = await tmImage.load(checkpointURL, metadataURL);
  totalClasses = model.getTotalClasses();
  console.log("Number of classes, ", totalClasses);
}

// A function that loads the model from user-uploaded files
async function loadFiles() {
  let jsonFile = json.files[0];
  let weightsFile = weights.files[0];

  if(jsonFile != undefined && weightsFile != undefined) {
    console.log("model loaded from uploaded files");
    model = await tmImage.loadFromFiles(json.files[0], weights.files[0]);
    console.log("Number of classes, ", model.getTotalClasses());
  }
}

async function loadWebcam() {
  webcam = new tmImage.Webcam(size, size); // can change width and height
  await webcam.setup();
  await webcam.play();
  window.requestAnimationFrame(loopWebcam);
}

async function loopWebcam(timestamp) {
  webcam.update(); // update the webcam frame
  await predict();
  window.requestAnimationFrame(loopWebcam);
}

async function setup() {
  myCanvas = createCanvas(size, size);
  ctx = myCanvas.elt.getContext("2d");
  // Call the load function, wait until it finishes loading
  await load();
  await loadWebcam();
}

async function predict() {
  // in this case we set the flip variable to true since webcam 
  // was only flipped in CSS 
  const prediction = await model.predict(webcam.canvas, true, totalClasses);

  // Sort prediction array by probability
  // So the first classname will have the highest probability
  const sortedPrediction = prediction.sort((a, b) => - a.probability + b.probability);

  // Show the result
  const res = select('#res'); // select <span id="res">
  res.html(sortedPrediction[0].className);

  // Show the probability
  const prob = select('#prob'); // select <span id="prob">
  prob.html(sortedPrediction[0].probability.toFixed(2));

  if (webcam.canvas) {
    ctx.drawImage(webcam.canvas, 0, 0);
  }
}
