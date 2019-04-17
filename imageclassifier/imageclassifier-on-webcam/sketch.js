const checkpoint = 'https://storage.googleapis.com/tm-pro-a6966.appspot.com/Yining-image-example/model.json';
const maxPredictions = 2;
const size = 400;

let model;
let video;
let canvas;

// for resizing and positioning of video image on canvas
let resizeWidth;
let resizeHeight;
let moveX;
let moveY;

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
  model = await tm.mobilenet.load(checkpoint);
  console.log("Number of classes, ", getNumberOfClasses());
}

// A function that loads the model from user-uploaded files
async function loadFiles() {
  let jsonFile = json.files[0];
  let weightsFile = weights.files[0];

  if(jsonFile != undefined && weightsFile != undefined) {
    console.log("model loaded from uploaded files");
    model = await tm.mobilenet.loadFromFiles(json.files[0], weights.files[0]);
    console.log("Number of classes, ", getNumberOfClasses());
  }
}

function getNumberOfClasses() {
  return model.model.outputShape[1];
}

async function setup() {
  // Call the load function, wait util it finishes loading
  await load();

  setupVideo();

  canvas = createCanvas(size,size);
}

function setupVideo() {
// Get videos from webcam
  video = createCapture(VIDEO);

  // get ratio for resizing and cropping the video
  let w = video.width; 
  let h = video.height;
  let ratio;

  if(w > h) {
    ratio  = size / h;
  }
  else {
    ratio = size / w;
  }

  resizeWidth = ratio * w;
  resizeHeight = ratio * h;
  moveX = - (resizeWidth - size) / 2;
  moveY = - (resizeHeight - size) / 2;

  // does not change actual video constraints to square, for that we need to draw to canvas
  video.size(size, size);

  video.hide()
}

function draw() {
  if(video != undefined) {
    // we need to flip the webcam view 
    translate(size,0); // move to far corner
    scale(-1.0,1.0);    // flip x-axis backwards

    // draw the image from the video
    image(video, moveX, moveY, resizeWidth, resizeHeight);

    // Make a prediction from square canvas
    predictVideo(canvas.elt);
  }
}

async function predictVideo(image) {
  const prediction = await model.predict(image, maxPredictions);
  // console.log(prediction);

  // Show the result
  const res = select('#res'); // select <span id="res">
  res.html(prediction[0].className);

  // Show the probability
  const prob = select('#prob'); // select <span id="prob">
  prob.html(prediction[0].probability);
}
