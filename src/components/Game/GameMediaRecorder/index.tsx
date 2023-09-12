import { useCallback, useEffect, useRef } from "react"; // Import React

import Webcam from "react-webcam";

import * as cam from "@mediapipe/camera_utils";
import { drawConnectors } from "@mediapipe/drawing_utils"; // Import the drawConnectors function
import * as Facemesh from "@mediapipe/face_mesh";
import { FaceMesh, Results as mpFaceMeshResults } from "@mediapipe/face_mesh"; // Import Results from the correct location

import styles from "./styles.module.css";

const GameMediaRecorder = () => {
  // Specify React.FC type
  const webcamRef = useRef<Webcam | null>(null); // Specify the correct type for webcamRef
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const camera = useRef<cam.Camera | null>(null);
  const connect = drawConnectors;

  const onResults = useCallback(
    (results: mpFaceMeshResults) => {
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
        if (results.multiFaceLandmarks && canvasCtx) {
          for (const landmarks of results.multiFaceLandmarks) {
            connect(canvasCtx, landmarks, Facemesh.FACEMESH_TESSELATION, {
              color: "#C0C0C070",
              lineWidth: 1,
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
    },
    [connect],
  );

  useEffect(() => {
    const faceMesh = new FaceMesh({
      locateFile: (file: string) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
      },
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
      selfieMode: true,
    });

    faceMesh.onResults(onResults);

    const vid = webcamRef.current?.video;

    if (typeof vid !== "undefined" && vid !== null) {
      // Use useRef to set the camera variable
      camera.current = new cam.Camera(vid!, {
        onFrame: async () => {
          await faceMesh.send({ image: vid });
        },
        width: 640,
        height: 480,
      });
      camera.current.start();
    }

    // Cleanup: Stop the camera when the component unmounts
    return () => {
      if (camera.current) {
        camera.current.stop();
      }
    };
  }, [onResults]);

  return (
    <div className={styles["webcam-wrapper"]}>
      <Webcam
        audio={false}
        ref={webcamRef}
        style={{
          position: "absolute",
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
  );
};

export default GameMediaRecorder;
