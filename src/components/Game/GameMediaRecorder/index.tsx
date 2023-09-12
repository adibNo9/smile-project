import React, { useEffect, useRef } from "react"; // Import React

import Webcam from "react-webcam";

import * as cam from "@mediapipe/camera_utils";
import * as Facemesh from "@mediapipe/face_mesh";
import { FaceMesh, Results as mpFaceMeshResults } from "@mediapipe/face_mesh"; // Import Results from the correct location

interface IVideoBlob {
  videoBlob?: Blob | null;
}

const GameMediaRecorder: React.FC<IVideoBlob> = () => {
  // Specify React.FC type
  const webcamRef = useRef<Webcam | null>(null); // Specify the correct type for webcamRef
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const connect = window?.drawConnectors;
  let camera: cam.Camera | null = null; // Specify the correct type for the camera variable

  function onResults(results: mpFaceMeshResults): void {
    const videoWidth = webcamRef?.current?.video?.videoWidth; // Use optional chaining here
    const videoHeight = webcamRef?.current?.video?.videoHeight; // Use optional chaining here

    if (!!canvasRef.current) {
      // Set canvas width
      canvasRef.current.width = videoWidth || 0; // Provide a default value
      canvasRef.current.height = videoHeight || 0; // Provide a default value

      const canvasElement = canvasRef.current;
      const canvasCtx = canvasElement?.getContext("2d");
      canvasCtx?.save();
      canvasCtx?.clearRect(
        0,
        0,
        canvasElement?.width || 0,
        canvasElement?.height || 0,
      ); // Provide default values
      canvasCtx?.drawImage(
        results.image,
        0,
        0,
        canvasElement?.width || 0,
        canvasElement?.height || 0,
      );
      if (results.multiFaceLandmarks) {
        for (const landmarks of results.multiFaceLandmarks) {
          connect(canvasCtx, landmarks, Facemesh.FACEMESH_TESSELATION, {
            color: "#C0C0C070",
            lineWidth: 1,
          });
          connect(canvasCtx, landmarks, Facemesh.FACEMESH_RIGHT_EYE, {
            color: "#FF3030",
          });
          connect(canvasCtx, landmarks, Facemesh.FACEMESH_RIGHT_EYEBROW, {
            color: "#FF3030",
          });
          connect(canvasCtx, landmarks, Facemesh.FACEMESH_LEFT_EYE, {
            color: "#30FF30",
          });
          connect(canvasCtx, landmarks, Facemesh.FACEMESH_LEFT_EYEBROW, {
            color: "#30FF30",
          });
          connect(canvasCtx, landmarks, Facemesh.FACEMESH_FACE_OVAL, {
            color: "#E0E0E0",
          });
          connect(canvasCtx, landmarks, Facemesh.FACEMESH_LIPS, {
            color: "#E0E0E0",
          });
        }
      }
      canvasCtx?.restore();
    }
  }

  useEffect(() => {
    const faceMesh = new FaceMesh({
      locateFile: (file: string) => {
        // Specify the correct type for the argument
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
      },
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    faceMesh.onResults(onResults);

    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null
    ) {
      camera = new cam.Camera(webcamRef.current.video!, {
        // Use non-null assertion operator here
        onFrame: async () => {
          await faceMesh.send({ image: webcamRef?.current?.video }); // Use optional chaining here
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }
  }, []);

  return (
    <center>
      <div className="App">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 9,
            width: 640,
            height: 480,
          }}
        />
        <canvas
          ref={canvasRef}
          className="output_canvas"
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 9,
            width: 640,
            height: 480,
          }}
        ></canvas>
      </div>
    </center>
  );
};

export default GameMediaRecorder;
