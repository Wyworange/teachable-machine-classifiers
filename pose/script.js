// Adapted from the user-provided Teachable Machine export demo.
(() => {
  "use strict";
  const MODEL_URL = "https://teachablemachine.withgoogle.com/models/NoDtY6F3G/";
  const start = document.getElementById("start");
  const stop = document.getElementById("stop");
  const status = document.getElementById("status");
  const labels = document.getElementById("labels");
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  let model, camera, library, frame, active = false, busy = false, generation = 0;

  function stopCamera() {
    active = false;
    generation++;
    cancelAnimationFrame(frame);
    if (camera) camera.stop();
    start.disabled = busy;
    stop.disabled = true;
    status.textContent = "Stopped";
  }
  function fail(error) {
    stopCamera();
    console.error(error);
    status.textContent = "Unable to run: " + error.message + ". Check your network connection and webcam permissions, and open the page via localhost or HTTPS.";
  }
  async function loop(token) {
    if (!active || token !== generation) return;
    try {
      camera.update();
      const { pose, posenetOutput } = await model.estimatePose(camera.canvas);
      const predictions = await model.predict(posenetOutput);
      if (!active || token !== generation) return;
      ctx.drawImage(camera.canvas, 0, 0);
      if (pose) {
        library.drawKeypoints(pose.keypoints, 0.5, ctx);
        library.drawSkeleton(pose.keypoints, 0.5, ctx);
      }
      predictions.forEach((prediction, i) => {
        labels.children[i].textContent = `${prediction.className}: ${(prediction.probability * 100).toFixed(1)}%`;
      });
      frame = requestAnimationFrame(() => loop(token));
    } catch (error) {
      if (token === generation) fail(error);
    }
  }
  start.addEventListener("click", async () => {
    if (active || busy) return;
    busy = true;
    start.disabled = true;
    const token = ++generation;
    status.textContent = "Loading model and webcam…";
    try {
      library = window.tmPose;
      if (!library || !window.tf) throw new Error("Model dependencies did not load");
      if (!navigator.mediaDevices?.getUserMedia) throw new Error("The browser cannot access the webcam");
      model = model || await library.load(MODEL_URL + "model.json", MODEL_URL + "metadata.json");
      if (token !== generation) return;
      camera = new library.Webcam(200, 200, true);
      await camera.setup();
      if (token !== generation) { camera.stop(); return; }
      await camera.play();
      if (token !== generation) { camera.stop(); return; }
      labels.replaceChildren(...Array.from({ length: model.getTotalClasses() }, () => document.createElement("p")));
      active = true;
      stop.disabled = false;
      status.textContent = "Classifying";
      frame = requestAnimationFrame(() => loop(token));
    } catch (error) {
      if (token === generation) fail(error);
    } finally {
      busy = false;
      start.disabled = active;
    }
  });
  stop.addEventListener("click", stopCamera);
  window.addEventListener("pagehide", stopCamera);
})();
