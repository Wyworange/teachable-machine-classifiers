# Object classifier

模型：https://teachablemachine.withgoogle.com/models/Q4WK7tkBG/

从仓库根目录启动 `python3 -m http.server 8000 --bind 127.0.0.1`，访问 http://localhost:8000/object/ 。

点击「开始」授权摄像头，查看实时类别概率；点击「停止」释放摄像头。

Object 对完整图像进行分类，不进行带检测框的目标定位。

样本在 `samples/class-1/` 和 `samples/class-2/`；类别语义待补充。
