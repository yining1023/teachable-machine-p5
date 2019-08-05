// the json file (model topology) has a reference to the bin file (model weights)
const checkpointURL =
  "https://storage.googleapis.com/tm-mobilenet/yiningimageexample2019071241636/model.json";
// the metatadata json file contains the text labels of your model and additional information
const metadataURL =
  "https://storage.googleapis.com/tm-mobilenet/yiningimageexample2019071241636/metadata.json";

let totalClasses;
let myImg;
let input;
let model;
let myBtn;

// A function that loads the model
async function load() {
  model = await tm.mobilenet.load(checkpointURL, metadataURL);
  totalClasses = model.getTotalClasses();
  console.log("Number of classes, ", totalClasses);
}

async function setup() {
  // Call the load function, wait until it finishes loading
  await load();

  input = createFileInput(handleFile);
  input.parent('input-container');
}

async function handleFile(file) {
  print(file);
  if (file.type === "image") {
    myImg = await createImg(file.data);
    myImg.parent('image-container'); //  Pistion the img into a Div element whose id is image-container
    predictImage(myImg.elt);
  }
}

async function predictImage(image) {
  const prediction = await model.predict(image, totalClasses);
  console.log("prediction: ", prediction);

  // Show the result
  const res = select('#res'); // select either <span id="res1"> or <span id="res2">
  res.html(prediction[0].className);

  // Show the probability
  const prob = select('#prob'); // select either <span id="prob1"> or <span id="prob2">
  prob.html(prediction[0].probability.toFixed(2));
}
