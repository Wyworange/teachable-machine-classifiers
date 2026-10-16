# Teachable Machine classifiers

Two independent HTML/JavaScript webcam classification examples adapted from user-provided Teachable Machine export code.

| Classifier | Model | Purpose |
| --- | --- | --- |
| Pose | [NoDtY6F3G](https://teachablemachine.withgoogle.com/models/NoDtY6F3G/) | Estimates body keypoints, then classifies poses; draws keypoints and a skeleton in the preview. |
| Object | [Q4WK7tkBG](https://teachablemachine.withgoogle.com/models/Q4WK7tkBG/) | Classifies the entire webcam image; does not produce bounding boxes or object locations. |

Class names are read automatically from each model. The meanings of Class 1 / Class 2 have not been provided, so the original class numbers are preserved without inferring labels.

## Object classifier submission materials

| Requirement | Current location | Status |
| --- | --- | --- |
| A trained object classifier and shared link | [Published object classifier](https://teachablemachine.withgoogle.com/models/Q4WK7tkBG/) | Referenced by the object demo; offline model weights are not bundled in this repository. |
| Training data | [Object samples](object/samples/) | 314 archived images: 154 in Class 1 and 160 in Class 2. Their class meanings are unconfirmed. |
| JSON describing the data | [Sample manifest](samples-manifest.json) | Records sample paths, byte sizes, and SHA-256 hashes for both classifiers; it does not describe class meanings or training settings. |
| Google Drive folder containing the model, training data, and data description | No Drive link is recorded in this repository. | This submission item still needs a supplied folder link and confirmation of its contents. |

See the [object classifier README](object/README.md) for the model export endpoints and remaining submission details.

## Directory structure

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
│       ├── class-1/   # 139 images
│       └── class-2/   # 152 images
└── object/
    ├── README.md
    ├── index.html
    ├── script.js
    └── samples/
        ├── README.md
        ├── class-1/   # 154 images
        └── class-2/   # 160 images
```

## Run locally

With Python 3 installed, run this command from the repository root:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open <http://localhost:8000/>, select a classifier, click **Start**, and allow webcam access.
You can also open <http://localhost:8000/pose/> or <http://localhost:8000/object/> directly.
Click **Stop** to release the webcam. Leaving the page also stops the webcam.

No npm installation or build step is required. A recent version of Chrome or Edge is recommended. Webcam access requires a secure context such as localhost or HTTPS; do not run by double-clicking the HTML file or using a plain remote HTTP address.

## Dependencies and behavior

- The two pages run independently, with scripts scoped separately to avoid global variable conflicts in the original demos.
- TensorFlow.js 1.3.1 and Teachable Machine Pose 0.8.3 / Image 0.8.5 are pinned to match the classic export examples.
- An internet connection is required to load CDN scripts and remote models; this repository does not include offline copies of model weights.
- Inference runs in the browser. The example code does not upload webcam frames or automatically read or upload sample files.
- Probabilities express the model's predictions for its existing classes; they are not independently evaluated accuracy scores.
- If startup fails, check the network connection, whether another application is using the webcam, site webcam permissions, and the error message on the page.

## Sample sources

Four user-provided ZIP archives have been extracted, preserving the original filenames and image contents. There are 605 images in total.
The Pose samples have been added, so the previously planned placeholder directories now contain actual samples.
`samples-manifest.json` records each sample's path, size in bytes, and SHA-256 hash for integrity checks.
Samples are included for archiving, comparison, and future retraining. The examples use published models at runtime and do not automatically retrain them.

## References

- [Official Pose library and export example](https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/pose)
- [Official Image library and export example](https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image)

No redistribution license has been specified for the code or samples.
