# Pose Detection in the Browser: PoseNet Model
Pose Detection by using Web (Mobile / Laptop) Camera

# Inroduction

PoseNet can be used to estimate either a single pose or multiple poses, meaning there is a version of the algorithm
that can detect only one person in an image/video and one version that can detect multiple persons in an image/video. So far we
will use the single person's Image/video to estimate the pose.

# How it Works 

####Input

In the first step of pose estimation, we will give an input to the posenet model. This input will be fed
through an image or a camera.This Input will be the base or our model.

####Pre Trained Model

In Next step the pre trained model that we have selected will take the input to process it further and will help us to identify the Key points
human body i.e Right Eye, Left Eye, Right wrist, Left Wrist etc.

####Output of pre Traines Model 

Since the PoseNet model will help us to find the Key points and we will get this output in X,Y coordinates so
we will get total 34 coorinates form the PoseNet Model as output in 17 pairs with their probability laying between 0-1.

####Classifier

Her we will use the ml5 classiffier and In this step our all coordinates that we have recieved from PoseNet Model will
be fed to the classifier which will help us to identify the labeled pose from the classifier. 

####Final Output

Since our classifier will help us to classify the pose under 3 labels "1", "2", "3" which we fed as an output layer
So as a final output our model will tell us which pose is this. 







