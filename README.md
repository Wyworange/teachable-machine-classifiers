# Teachable Machine classifiers

两个独立的 HTML/JavaScript 摄像头分类示例，由用户提供的 Teachable Machine 导出代码整理。

| 分类器 | 模型 | 用途 |
| --- | --- | --- |
| Pose | [NoDtY6F3G](https://teachablemachine.withgoogle.com/models/NoDtY6F3G/) | 先估计人体关键点，再进行姿态分类；预览中绘制关键点与骨架。 |
| Object | [Q4WK7tkBG](https://teachablemachine.withgoogle.com/models/Q4WK7tkBG/) | 对摄像头整张画面进行物体图像分类；不输出检测框或物体位置。 |

类别名称自动从模型读取。Class 1 / Class 2 的具体语义尚未提供，保留原始类别编号，不推测标签含义。

## 目录结构

```text
teachable-machine-classifiers/
├── README.md
├── index.html
├── styles.css
├── samples-manifest.json
├── pose/
│   ├── README.md
│   ├── index.html
│   ├── script.js
│   └── samples/
│       ├── README.md
│       ├── class-1/   # 139 张
│       └── class-2/   # 152 张
└── object/
    ├── README.md
    ├── index.html
    ├── script.js
    └── samples/
        ├── README.md
        ├── class-1/   # 154 张
        └── class-2/   # 160 张
```

## 本地运行

安装 Python 3 后，在仓库根目录运行：

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

打开 <http://localhost:8000/>，选择分类器，点击「开始」并允许摄像头访问。
也可以直接访问 <http://localhost:8000/pose/> 或 <http://localhost:8000/object/>。
点击「停止」释放摄像头。退出页面也会停止摄像头。

无需 npm 或构建步骤。建议使用近期的 Chrome 或 Edge。摄像头需要 localhost 或 HTTPS 安全上下文；不要通过双击 HTML 或普通远程 HTTP 地址运行。

## 依赖与行为

- 两个页面分别运行，脚本内部作用域隔离，避免原始 demo 的全局变量冲突。
- 固定 TensorFlow.js 1.3.1、Teachable Machine Pose 0.8.3 / Image 0.8.5，使用与经典导出示例配套的版本。
- 需要联网加载 CDN 脚本与远程模型；本仓库不包含模型权重的离线副本。
- 推理在浏览器内运行；示例代码不会上传摄像头画面，也不会自动读取或上传 samples 文件。
- 概率只表示模型对已有类别的判断，不代表经过独立评估的准确率。
- 无法启动时，检查网络、摄像头是否被占用、站点摄像头权限和页面上的错误提示。

## 样本来源

四个用户提供的 ZIP 已解压，原文件名与图片内容保留。合计 605 张图片。
Pose 样本已补齐，因此原先计划的占位目录现在包含实际样本。
`samples-manifest.json` 记录每个样本的路径、字节数与 SHA-256，便于检查完整性。
样本用于归档、对照与后续重新训练；示例运行时使用已发布的模型，不会自动重训。

## 参考

- [官方 Pose 库与导出示例](https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/pose)
- [官方 Image 库与导出示例](https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image)

代码与样本未指定再分发许可。
