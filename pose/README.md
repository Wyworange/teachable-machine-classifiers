# Pose classifier

Model: https://teachablemachine.withgoogle.com/models/NoDtY6F3G/

From the repository root, run `python3 -m http.server 8000 --bind 127.0.0.1`, then open http://localhost:8000/pose/.

Click **Start** and allow webcam access to see live class probabilities. Click **Stop** to release the webcam.

Pose extracts body keypoints, classifies the pose, and draws a skeleton.

Samples are in `samples/class-1/` and `samples/class-2/`. Class meanings have not yet been provided.
