let video, poseNet, pose, skeleton, brain, targetLabel
i=0,
count = 0;
state = 'waiting', 
poseLabel = "0",
move = '';

keyPressed = () => {
  switch (key) {
    case 't':
      state = 'training';
      console.log('starting training');
      brain.loadData('up-down dataset/up-down.json', dataReady);
      break;
    case 's':
      brain.saveData('up-down');
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
        }, 10000);
      }, 5000);
      state = 'collecting';
      break;
  }
}

gotResults = (errors, results) => {
  if(results){
    // const confidence  = results[0].confidence
    poseLabel = results[0].label;
    // if(results[0].confidence > 0.75){
      if(poseLabel == 1){
        if(move == 'down'){
          count += 1;
        }
        move = 'up';
      } else{
        move = 'down'
      }
      if(results[0].label == 2){
      }
      classifyPose();
    // }
    // console.log('label : ',results[0].label, " confidence : ", results[0].confidence);
  }
  if(errors){
    console.log('error : ', errors)
  }
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
    brain.classify(inputs, gotResults);
  } 
  else{
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
    learningRate: 0.1
  }

  brain = ml5.neuralNetwork(options);
  const modelInfo = {
    model: 'up-down model/model.json',
    metadata: 'up-down model/model_meta.json',
    weights: 'up-down model/model.weights.bin'
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

    // fill(255,0,0)
    // ellipse(pose.nose.x, pose.nose.y, d);
    // ellipse(pose.rightWrist.x, pose.rightWrist.y, 30);
    // ellipse(pose.leftWrist.x, pose.leftWrist.y, 30);
    // for(let i=0; i< pose.keypoints.length; i++){
    //   let x = pose.keypoints[i].position.x;
    //   let y = pose.keypoints[i].position.y;
    //   // fill(0,255,0);
    //   // ellipse(x,y,10,10)
    // }

    // for(let i=0; i< skeleton.length; i++){
    //   let a = skeleton[i][0];
    //   let b = skeleton[i][1];
    //   strokeWeight(2);
    //   stroke(255);
    //   line(a.position.x, a.position.y, b.position.x, b.position.y);
    // }
  }

  pop();
  fill(255, 255, 0);
  noStroke();
  textSize(50);
  textAlign(CENTER, CENTER);
  text(((poseLabel== 1 ? 'up ' : 'down ')+ (" - count : " + count)), width/2, height/1.05);

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