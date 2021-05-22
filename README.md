# Pose Detection in the Browser: PoseNet Model
This Package contains a standalone model called PoseNet, as well as some demos, for running real-time pose estimation
in the browser using TensorFlow.js.

# Inroduction

PoseNet can be used to estimate either a single pose or multiple poses, meaning there is a version of the algorithm
that can detect only one person in an image/video and one version that can detect multiple persons in an image/video. So far we
will use the single person's Image/video to estimate the pose.

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
we will get total 34 coorinates form the PoseNet Model as output in 17 pairs with their probability laying between 0-1.

Example output:
```
[
  {
    score: 0.8,
    keypoints: [
      {x: 230, y: 220, score: 0.9, name: "nose"},
      {x: 212, y: 190, score: 0.8, name: "left_eye"},
      ...
    ]
  }
]
```



### Classifier

Her we will use the ml5 classiffier and In this step our all coordinates that we have recieved from PoseNet Model will
be fed to our classifier which will help us to identify the labeled pose from the classifier. 

#### Final Output

Since our classifier will help us to classify the pose under 3 labels "1", "2", "3" which we fed as an output layer
So as a final output our model will tell us which pose is this. 

-----------------------------------------------------------------------------------------------------





