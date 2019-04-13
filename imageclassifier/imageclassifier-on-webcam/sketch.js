const checkpoint = 'https://storage.googleapis.com/tm-pro-a6966.appspot.com/Yining-image-example/model.json';
const maxPredictions = 2;

let model;
let video;

// A function that loads the model
async function load() {
  model = await tm.mobilenet.load(checkpoint);
}

async function setup() {
  // Call the load function, wait util it finishes loading
  await load();

  // Get videos from webcam
  video = createCapture(VIDEO);
  video.size(400, 300);

  noCanvas();

  // Make a prediction on video
  predictVideo(video.elt);
}


async function predictVideo(image) {
  const prediction = await model.predict(image, maxPredictions);
  console.log('prediction: ', prediction)

  // Show the result
  const res = select('#res'); // select <span id="res">
  res.html(prediction[0].className);

  // Show the probability
  const prob = select('#prob'); // select <span id="prob">
  prob.html(prediction[0].probability);

  // Continue to predict the video
  predictVideo(video.elt);
}
