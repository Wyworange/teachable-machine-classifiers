# Pose classifier

模型：https://teachablemachine.withgoogle.com/models/NoDtY6F3G/

从仓库根目录启动 `python3 -m http.server 8000 --bind 127.0.0.1`，访问 http://localhost:8000/pose/ 。

点击「开始」授权摄像头，查看实时类别概率；点击「停止」释放摄像头。

Pose 先提取人体关键点，再分类姿态，并绘制骨架。

样本在 `samples/class-1/` 和 `samples/class-2/`；类别语义待补充。
