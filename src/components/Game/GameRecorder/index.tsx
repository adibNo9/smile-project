import { useCallback, useEffect, useRef } from "react"; // Import React

import cls from "classnames";
import Webcam from "react-webcam";

import * as cam from "@mediapipe/camera_utils";
import { drawConnectors } from "@mediapipe/drawing_utils"; // Import the drawConnectors function
import { FaceMesh, Results as mpFaceMeshResults } from "@mediapipe/face_mesh"; // Import Results from the correct location

import styles from "./styles.module.css";

const GameRecorder = ({ className }: { className: string }) => {
  // Specify React.FC type
  const wrapperRef = useRef<HTMLDivElement | null>(null);
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
            const index = [
              61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291, 146, 91, 181, 84,
              17, 314, 405, 321, 375, 291, 78, 191, 80, 81, 82, 13, 312, 311,
              310, 415, 308, 78, 95, 88, 178, 87, 14, 317, 402, 318, 324, 308,
            ];
            const points = [];
            for (let i = 0; i < 43; i++) {
              points.push({
                x: landmarks[index[i]].x * canvasElement.width,
                y: landmarks[index[i]].y * canvasElement.height,
              });
            }
            const drawPoint = (point: any) => {
              canvasCtx.beginPath();
              canvasCtx.arc(point.x, point.y, 1, 0, 2 * Math.PI);
              canvasCtx.fillStyle = "rgb(0,255,0)";
              canvasCtx.fill();
            };
            points.forEach((point) => {
              drawPoint(point);
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
        width: wrapperRef.current?.clientWidth,
        height: wrapperRef.current?.clientHeight,
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
    <div
      className={cls(
        styles["webcam-wrapper"],
        styles["game-wrapper"],
        className,
      )}
      ref={wrapperRef}
    >
      <Webcam
        screenshotFormat="image/webp"
        mirrored={true}
        imageSmoothing={true}
        audio={false}
        ref={webcamRef}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: wrapperRef.current?.clientWidth,
          height: wrapperRef.current?.clientHeight,
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
          width: wrapperRef.current?.clientWidth,
          height: wrapperRef.current?.clientHeight,
        }}
      ></canvas>
    </div>
  );
};

export default GameRecorder;
