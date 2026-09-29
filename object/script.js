// Adapted from the user-provided Teachable Machine export demo.
(() => {
  "use strict";
  const MODEL_URL = "https://teachablemachine.withgoogle.com/models/Q4WK7tkBG/";
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
    status.textContent = "已停止";
  }
  function fail(error) {
    stopCamera();
    console.error(error);
    status.textContent = "无法运行：" + error.message + "。请检查网络、摄像头权限，并通过 localhost 或 HTTPS 打开页面。";
  }
  async function loop(token) {
    if (!active || token !== generation) return;
    try {
      camera.update();
      const predictions = await model.predict(camera.canvas);
      if (!active || token !== generation) return;
      ctx.drawImage(camera.canvas, 0, 0);
      
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
    status.textContent = "正在加载模型与摄像头…";
    try {
      library = window.tmImage;
      if (!library || !window.tf) throw new Error("模型依赖未加载");
      if (!navigator.mediaDevices?.getUserMedia) throw new Error("浏览器无法访问摄像头");
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
      status.textContent = "正在识别";
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
