import { createWriteStream, unlink } from 'fs';
import { get } from 'https';

const MODEL_URL = 'https://github.com/justadudewhohacks/face-api.js-models/raw/master/weights/';
const MODELS = [
  'ssd_mobilenetv1_model-weights_manifest.json',
  'ssd_mobilenetv1_model-weights.bin',
  'face_landmark_68_model-weights_manifest.json',
  'face_landmark_68_model-weights.bin',
  'face_recognition_model-weights_manifest.json',
  'face_recognition_model-weights.bin'
];

const downloadModel = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(dest);
    get(url, response => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', err => {
      unlink(dest, () => {}); // Safely unlink on error
      reject(err);
    });
  });
};

const downloadModels = async () => {
  for (const model of MODELS) {
    const url = `${MODEL_URL}${model}`;
    const dest = `public/models/${model}`;
    console.log(`Downloading ${model}...`);
    await downloadModel(url, dest);
    console.log(`${model} downloaded.`);
  }
  console.log('All models downloaded!');
};

downloadModels().catch(err => console.error('Error downloading models:', err));
