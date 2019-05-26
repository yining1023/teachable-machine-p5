const checkpoint = 'https://storage.googleapis.com/tm-pro-a6966.appspot.com/Yining-image-example/model.json';
const size = 300;

let vidContainer = document.getElementById('vidContainer');
let webcamEl;
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
  model = await tm.mobilenet.load(checkpoint);
  totalClasses = model.getTotalClasses();
  console.log("Number of classes, ", totalClasses);
}

// A function that loads the model from user-uploaded files
async function loadFiles() {
  let jsonFile = json.files[0];
  let weightsFile = weights.files[0];

  if(jsonFile != undefined && weightsFile != undefined) {
    console.log("model loaded from uploaded files");
    model = await tm.mobilenet.loadFromFiles(json.files[0], weights.files[0]);
    console.log("Number of classes, ", model.getTotalClasses());
  }
}

async function loadWebcam() {
  const vidContainerEl = document.getElementById('vidContainer');
  webcamEl = await tm.getWebcam(size, size); // can change width and height
  webcamEl.play();
  vidContainerEl.append(webcamEl);
}

async function setup() {
  // Call the load function, wait until it finishes loading
  await load();
  await loadWebcam();
}

function draw() {
  predictVideo(webcamEl);
}

async function predictVideo(image) {
  if (image) {
    // in this case we set the flip variable to true since webcam 
    // was only flipped in CSS 
    const prediction = await model.predict(image, true, totalClasses);

    // Show the result
    const res = select('#res'); // select <span id="res">
    res.html(prediction[0].className);
  
    // Show the probability
    const prob = select('#prob'); // select <span id="prob">
    prob.html(prediction[0].probability.toFixed(2));
  }
}
