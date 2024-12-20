import  { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';

const Appp = () => {
  const [isModelsLoaded, setIsModelsLoaded] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [verificationResult, setVerificationResult] = useState("");
  const webcamRef = useRef(null);
  const uploadedImageRef = useRef(null);

  // Load FaceAPI models
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models'; // Adjusted for simplicity
      await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      setIsModelsLoaded(true);
    };
    loadModels();
  }, []);

  // Capture webcam image
  const capture = async () => {
    if (!isModelsLoaded) return;

    const webcamImage = webcamRef.current.getScreenshot();
    const webcamBlob = await fetch(webcamImage).then(res => res.blob());
    const webcamImageBitmap = await faceapi.bufferToImage(webcamBlob);

    const uploadedImageElement = uploadedImageRef.current;
    const uploadedImageDetection = await faceapi.detectSingleFace(uploadedImageElement).withFaceLandmarks().withFaceDescriptor();
    const webcamDetection = await faceapi.detectSingleFace(webcamImageBitmap).withFaceLandmarks().withFaceDescriptor();

    if (uploadedImageDetection && webcamDetection) {
      const distance = faceapi.euclideanDistance(uploadedImageDetection.descriptor, webcamDetection.descriptor);
      setVerificationResult(distance < 0.6 ? "Face Verified Successfully!" : "Face Verification Failed");
    } else {
      setVerificationResult("Unable to detect face in one or both images.");
    }
  };

  return (
    <div>
      <h1>Face Verification</h1>
      <div>
        <h3>Upload Your Image</h3>
        <input
          type="file"
          accept="image/*"
          onChange={e => {
            const file = e.target.files[0];
            const url = URL.createObjectURL(file);
            setUploadedImage(url);
          }}
        />
        {uploadedImage && (
          <img
            src={uploadedImage}
            ref={uploadedImageRef}
            alt="Uploaded"
            style={{ width: "200px", height: "200px" }}
          />
        )}
      </div>
      <div>
        <h3>Live Webcam</h3>
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          style={{ width: "300px", height: "300px" }}
        />
        <button onClick={capture}>Verify Face</button>
      </div>
      {verificationResult && <h3>{verificationResult}</h3>}
    </div>
  );
};

export default Appp;
