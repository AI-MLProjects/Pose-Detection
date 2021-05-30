let video;
let poseNet;
let pose;
let skeleton;

let brain;
let state = 'waiting';
let debugState = true;
let targetLabel;
let poseLabel = '';
const poseEnum = {'1': 'Namaskar', '2': 'Salute', '3': 'Tree', '4': 'Flying'};

function keyPressed() {
  if(key.length > 1) {
    return;
  }
  console.log(key);
  if(key === 's' || key === 'S') { // Save Data
    brain.saveData('posedata');
  } if (key === 't' || key === 'T') { // Load dataset, Train model and Save Model
    brain.loadData('posedata.json', dataReady);
  } if(key === 'l' || key === 'L') { // Load Saved Model Model
    loadBrain();
  } else {
    updateAddDataState(key);
  }
}

function updateDebugState() {
  console.log('updateDebugState is called ----- ')
  setTimeout(() => {
    debugState = false;
    console.log('updateDebugState is called ----- ', debugState)
  }, 4000)
}

function loadBrain() {
  const modelInfo = {
    model: 'model/model.json',
    metadata: 'model/model_meta.json',
    weights: 'model/model.weights.bin'
  };
  brain.load(modelInfo, brainLoaded);
  updateDebugState();
}
function brainLoaded() {
  console.log('Brain Loaded');
  classifyPose();
}
function classifyPose() {
  if(pose) {
    const inputs = [];
    for (let i = 0; i < pose.keypoints.length; i++) {
      const x = pose.keypoints[i].position.x;
      const y = pose.keypoints[i].position.y;
      inputs.push(x);
      inputs.push(y);
    }
    brain.classify(inputs, gotResult);
  } else {
    setTimeout(() => {
      classifyPose();
    }, 100)
  }
}

function gotResult(error, results) {
  if(error) {

  }
  customLog(`results -- ${JSON.stringify(results)}`);
  if(results) {
    const confidence = results[0].confidence;
    if(confidence > 0.80) {
      poseLabel = poseEnum[results[0].label];
      // console.log(`Label: ${results[0].label}, Confidence : ${confidence}`);
    }
  }
  classifyPose();
}

function dataReady() {
  brain.normalizeData();
  brain.train({epochs: 50}, finished);
}

function finished() {
  console.log('Model trained');
  brain.save();
}

function updateAddDataState(key) {
  targetLabel = key;
  console.log(`targetLabel : ${targetLabel}`);
  setTimeout(() => {
    state = 'collecting';
    console.log(`state : ${state}`);
    setTimeout(() => {
      state = 'waiting';
      console.log(`state : ${state}`);
    }, 20000)
  }, 3000)
}

function setup() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  createCanvas(width, window.innerHeight);
  video = createCapture(VIDEO);
  video.size(width, height)
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}
function initBrain() {
  const options = {
    inputs: 34,
    outputs: 4,
    task: 'classification',
    debug: true
  };
  brain = ml5.neuralNetwork(options);
  loadBrain();
}

function gotPoses(poses) {
  //console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
    addData();
  }
}

function addData() {
  if(state === 'collecting') {
    const inputs = [];
    for (let i = 0; i < pose.keypoints.length; i++) {
      const x = pose.keypoints[i].position.x;
      const y = pose.keypoints[i].position.y;
      inputs.push(x);
      inputs.push(y);
    }
    const target = [targetLabel];
    brain.addData(inputs, target);
  }
}

function modelLoaded() {
  console.log('poseNet ready');
  initBrain();
}

function draw() {
  image(video, 0, 0);

  if (pose) {
    // drawNose();
    // drawPose();
    // drawSkelton();
    drawPoseLabel();
  }
}

function drawNose() {
  const eyeL = pose.leftEye;
  const eyeR = pose.rightEye;
  const nose = pose.nose;
  const d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
  fill(255,0,0);
  ellipse(nose.x, nose.y, d);
}

function drawPose() {
  for (let i = 0; i < pose.keypoints.length; i++) {
    let x = pose.keypoints[i].position.x;
    let y = pose.keypoints[i].position.y;
    fill(0, 255, 0);
    ellipse(x, y, 16, 16);
  }
}

function drawSkelton() {
  for (let i = 0; i < skeleton.length; i++) {
    let a = skeleton[i][0];
    let b = skeleton[i][1];
    strokeWeight(2);
    stroke(255);
    line(a.position.x, a.position.y, b.position.x, b.position.y);
  }
}

function drawPoseLabel() {
  fill(255, 255,0);
  noStroke();
  textSize(100);
  textAlign(CENTER, CENTER);
  text(poseLabel, width/2, height-50);
}
function customLog(message) {
  if(debugState) {
    console.log(message);
  }
}
