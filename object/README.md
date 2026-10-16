# Object classifier

Model: https://teachablemachine.withgoogle.com/models/Q4WK7tkBG/

From the repository root, run `python3 -m http.server 8000 --bind 127.0.0.1`, then open http://localhost:8000/object/.

Click **Start** and allow webcam access to see live class probabilities. Click **Stop** to release the webcam.

Object classifies the entire image; it does not locate objects using bounding boxes.

Samples are in `samples/class-1/` and `samples/class-2/`. Class meanings have not yet been provided.

## Submission materials

| Requirement | Current location | Status |
| --- | --- | --- |
| Trained classifier and shared link | [Published object classifier](https://teachablemachine.withgoogle.com/models/Q4WK7tkBG/) | The demo loads this hosted model; offline model weights are not bundled. |
| Training data | [Class 1 samples](samples/class-1/) and [Class 2 samples](samples/class-2/) | 314 archived images: 154 and 160 respectively. Class meanings remain unconfirmed. |
| JSON describing the data | [Sample manifest](../samples-manifest.json) | Includes paths, byte sizes, and SHA-256 hashes; it does not document class meanings or training settings. |
| Google Drive folder with all required materials | No link recorded | A folder link and confirmation of its contents are still needed. |

The published model's export URLs are [model.json](https://teachablemachine.withgoogle.com/models/Q4WK7tkBG/model.json) and [metadata.json](https://teachablemachine.withgoogle.com/models/Q4WK7tkBG/metadata.json). These links are provided for locating the hosted export; they have not been downloaded or validated here. A complete offline model export also requires the weight files referenced by `model.json`.

To complete the Drive submission, include the full exported model, the object training images, and a data description that explains what each class represents and how the images were collected. The existing integrity manifest alone does not supply that description.
