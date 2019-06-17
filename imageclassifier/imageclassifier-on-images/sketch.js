// the json file (model topology) has a reference to the bin file (model weights)
const checkpointURL = 'https://storage.googleapis.com/tm-mobilenet/testirene/model.json';
// the metatadata json file contains the text labels of your model and additional information
const metadataURL = 'https://storage.googleapis.com/tm-mobilenet/testirene/metadata.json';

let totalClasses;
let img1;
let img2;
let model;

// A function that loads the model
async function load() {
  model = await tm.mobilenet.load(checkpointURL, metadataURL);
  totalClasses = model.getTotalClasses();
  console.log("Number of classes, ", totalClasses);
}

async function setup() {
  // Call the load function, wait until it finishes loading
  await load();

  // Get the image html element id: image1 (p5.dom library)
  img1 = select('#image1').elt;
  // Make a prediction  on image1
  predictImage(img1, 1);

  // Get the image html element id: image2 (p5.dom library)
  img2 = select('#image2').elt;
  // Make a prediction  on image2
  predictImage(img2, 2);
}

async function predictImage(image, id) {
  const prediction = await model.predict(image, totalClasses);
  console.log('prediction: ', prediction)

  // Show the result
  const res = select(`#res${id}`); // select either <span id="res1"> or <span id="res2">
  res.html(prediction[0].className);

  // Show the probability
  const prob = select(`#prob${id}`); // select either <span id="prob1"> or <span id="prob2">
  prob.html(prediction[0].probability.toFixed(2));
}
