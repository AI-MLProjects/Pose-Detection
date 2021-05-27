let video, poseNet, pose, skeleton, brain, targetLabel
i=0,
state = 'waiting', poseLabel = "1";

keyPressed = () => {
  switch (key) {
    case 't':
      state = 'training';
      console.log('starting training');
      brain.loadData('123.json', dataReady);
      break;
    case 's':
      brain.saveData('123');
      break;  
    default:
      targetLabel = key;
      console.log(targetLabel);
      setTimeout(() => {
        console.log('collecting...');
        state = 'collecting';
        setTimeout(() => {
          console.log('not collecting...');
          state = 'waiting';
        }, 5000);
      }, 3000);
      state = 'collecting';
      break;
  }
}

gotResults = (errors, results) => {
  poseLabel = results[0].label;
  console.log(results[0].confidence);
  classifyPose();
}

classifyPose = () => {
  if(pose){
    let inputs = [];
    for(let i=0; i< pose.keypoints.length; i++){
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      inputs.push(x);
      inputs.push(y);
    }
  } else{
    setTimeout(classifyPose, 100);
  }
}

brainLoaded =() =>{
  console.log("Pose classification Ready");
  classifyPose();
}



setup = () => {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded)

  // on pose event of poseNet
  poseNet.on('pose', gotPoses);

  let options = {
    inputs: 34,
    outputs: 2,
    task: 'classification',
    debug: true,
    learningRate: 0.5
  }

  brain = ml5.neuralNetwork(options);
  const modelInfo = {
    model: 'model.json',
    metadata: 'model_meta.json',
    weights: 'model.weights.bin'
  }
  brain.load(modelInfo, brainLoaded);
  // brain.loadData('123.json', dataReady);
}



dataReady = () => {
  brain.normalizeData();
  brain.train({epochs:200}, finished);
}

finished = () => {
  console.log('model trained');
  brain.save();
}


gotPoses = (poses) => {
    if(poses.length){
      pose = poses[0].pose
      skeleton = poses[0].skeleton;
      if(state == 'collecting'){
        let inputs = [];
        for(let i=0; i< pose.keypoints.length; i++){
          let x = pose.keypoints[i].position.x;
          let y = pose.keypoints[i].position.y;
          inputs.push(x);
          inputs.push(y);
        }
        let target = [targetLabel]
        brain.addData(inputs, target);
      }
    }
    // console.log(i , ": poses : ", pose)
}

modelLoaded = () =>{
  console.log("poseNet is ready")
}

draw = () =>{
  push();
  // this is the code to mirror the image
  translate(video.width, 0);
  scale(-1, 1);
  image(video, 0, 0, video.width, video.height);


  if(pose){// if pose is available then this code will execute
    let eyeR = pose.rightEye,
    eyeL = pose.leftEye,
    d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y)

    fill(255,0,0)
    ellipse(pose.nose.x, pose.nose.y, d);
    ellipse(pose.rightWrist.x, pose.rightWrist.y, 30);
    ellipse(pose.leftWrist.x, pose.leftWrist.y, 30);
    for(let i=0; i< pose.keypoints.length; i++){
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      fill(0,255,0);
      ellipse(x,y,10,10)
    }

    for(let i=0; i< skeleton.length; i++){
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(2);
      stroke(255);
      line(a.position.x, a.position.y, b.position.x, b.position.y);
    }
  }

  pop();
  fill(255, 0, 255);
  noStroke();
  textSize(200);
  textAlign(CENTER, CENTER);
  text(poseLabel, width/2, height/2);

}


// ml5.js: Pose Estimation with PoseNet
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/ml5/7.1-posenet.html
// https://youtu.be/OIo-DIOkNVg
// https://editor.p5js.org/codingtrain/sketches/ULA97pJXR
/*

let video;
let poseNet;
let pose;
let skeleton;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
  //console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded() {
  console.log('poseNet ready');
}

function draw() {
  image(video, 0, 0);

  if (pose) {
    let eyeR = pose.rightEye;
    let eyeL = pose.leftEye;
    let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
    fill(255, 0, 0);
    ellipse(pose.nose.x, pose.nose.y, d);
    fill(0, 0, 255);
    ellipse(pose.rightWrist.x, pose.rightWrist.y, 32);
    ellipse(pose.leftWrist.x, pose.leftWrist.y, 32);

    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      fill(0, 255, 0);
      ellipse(x, y, 16, 16);
    }

    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(2);
      stroke(255);
      line(a.position.x, a.position.y, b.position.x, b.position.y);
    }
  }
}

*/