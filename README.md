# Pose Detection in the Browser: PoseNet Model
This Package contains a standalone model called PoseNet, as well as some demos, for running real-time pose estimation
in the browser using TensorFlow.js.

Below are the 3 Pose Estimation Pre trained Model We can go in details by using below link In our model we will go with PoseNet Model: 

#### MoveNet
[Demo](https://storage.googleapis.com/tfjs-models/demos/pose-detection/index.html?model=movenet)

MoveNet is an ultra fast and accurate model that detects 17 keypoints of a body.
It can run at 50+ fps on modern laptop and phones.

#### BlazePose:
[Demo](https://storage.googleapis.com/tfjs-models/demos/pose-detection/index.html?model=blazepose)

MediaPipe BlazePose can detect 33 keypoints, in addition to the 17 COCO keypoints,
it provides additional keypoints for face, hands and feet.

#### PoseNet
[Demo](https://storage.googleapis.com/tfjs-models/demos/pose-detection/index.html?model=posenet)

PoseNet can detect multiple poses, each pose contains 17 keypoints.

# Introduction

PoseNet can be used to estimate either a single pose or multiple poses, meaning there is a version of the algorithm
that can detect only one person in an image/video and one version that can detect multiple persons in an image/video. So far we
will use the single person's Image/video to estimate the pose.

See the project live at: [https://posedetectionmodel.netlify.app]

------------------------------------------------------------------------

## How it Works 

### Input

In the first step of pose estimation, we will give an input to the posenet model. This input will be fed
through an image or a camera.This Input will be the base or our model.

### Pre Trained Model

In Next step the pre trained model that we have selected will take the input to process it further and will help us to identify the Key points
human body i.e Right Eye, Left Eye, Right wrist, Left Wrist etc.

![image](https://user-images.githubusercontent.com/36468856/119214473-c2e48c80-bae4-11eb-928c-554dbd371691.png)

0: nose  \
1: left_eye  \
2: right_eye  \
3: left_ear  \
4: right_ear  \
5: left_shoulder  \
6: right_shoulder  \
7: left_elbow  \
8: right_elbow  \
9: left_wrist  \
10: right_wrist  \
11: left_hip  \
12: right_hip  \
13: left_knee  \
14: right_knee  \
15: left_ankle  \
16: right_ankle

### Output of PoseNet Model

Since the PoseNet model will help us to find the Key points and we will get this output in X,Y coordinates so
we will get  as output in 17 detection points with their X,Y coordinates value and probability which lying between 0-1.

![image](https://user-images.githubusercontent.com/36468856/119215104-37b9c580-bae9-11eb-842a-9f37b8efaa87.png)



### Classifier

The output that we have recieved from PoseNet Model in 2D array will convert into 1D array, In our case our out of 17 2d Array will get convert into 34 1D array,
and provide to ml5 classifier which will help us to identify the labeled pose from the classifier. 



![image](https://user-images.githubusercontent.com/36468856/119215296-7a2fd200-baea-11eb-9a97-e0c825604ccd.png)




#### Final Output

Since our classifier will help us to classify the pose under 3 labels "Namaste", "Salute", "Hi 5" which we fed as an output layer
So as a final output our model will tell us which pose is this. 

-----------------------------------------------------------------------------------------------------

Resources 
-----------------------------------------------------------------------------------------------------
We have used below resources to create our model

## How Pose Estimation Model Working

https://www.youtube.com/watch?v=OIo-DIOkNVg&list=PLRqwX-V7Uu6YPSwT06y_AEYTqIwbeam3y&index=22

## How to create a Pose Estimation Model

https://www.youtube.com/watch?v=FYgYyq-xqAw&list=PLRqwX-V7Uu6YPSwT06y_AEYTqIwbeam3y&index=23

## How Pose Estimation Model used as a Yoga Trainer

https://www.youtube.com/watch?v=FYgYyq-xqAw&list=PLRqwX-V7Uu6YPSwT06y_AEYTqIwbeam3y&index=23

## How Pose Estimation Using the PoseNet Model

https://heartbeat.fritz.ai/human-pose-estimation-using-tensorflows-posenet-model-e5770f0a0a31

## Live URL: 
https://posedetectionmodel.netlify.app/






