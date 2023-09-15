import { FC, useCallback, useEffect, useRef } from "react"; // Import React

import cls from "classnames";
import Webcam from "react-webcam";

import * as cam from "@mediapipe/camera_utils";
import { FaceMesh, Results as mpFaceMeshResults } from "@mediapipe/face_mesh"; // Import Results from the correct location

import styles from "./styles.module.css";

interface IGameRecorder {
  className: string;
  onStartGame: () => void;
  gameCounter?: boolean;
  onIncreaseScore: (value: number) => void;
  onScreenshot: (value: string | null) => void;
  onIncreaseBackendScore: (value: string) => void;
}

const GameRecorder: FC<IGameRecorder> = ({
  className,
  onStartGame,
  gameCounter,
  onIncreaseScore,
  onScreenshot,
  onIncreaseBackendScore,
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const webcamRef = useRef<Webcam | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const camera = useRef<cam.Camera | null>(null);

  const onResults = useCallback((results: mpFaceMeshResults) => {
    const videoWidth = webcamRef?.current?.video?.videoWidth;
    const videoHeight = webcamRef?.current?.video?.videoHeight;

    if (results) {
      // try {
      //   await axios
      //     .post<Response>("/smile", { file: imageSrc })
      //     .then((response) => {
      //       if (response.data.status === "200") {
      //         onIncreaseBackendScore(response.data.result_prob);
      //       } else {
      //         console.log(response.data.result);
      //     })
      //     .catch((error) => console.log(error));
      //   console.log("Image sent to server.");
      // } catch (error) {
      //   console.error("Error sending image to server:", error);
      // }
    }

    results && onIncreaseScore(0.01);
    results &&
      webcamRef.current &&
      onScreenshot(webcamRef.current?.getScreenshot());

    if (!!canvasRef.current) {
      canvasRef.current.width = videoWidth || 0;
      canvasRef.current.height = videoHeight || 0;

      const canvasElement = canvasRef.current;
      const canvasCtx = canvasElement?.getContext("2d");

      if (results.multiFaceLandmarks && canvasCtx) {
        for (const landmarks of results.multiFaceLandmarks) {
          const index = [
            61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291, 146, 91, 181, 84,
            17, 314, 405, 321, 375, 291, 78, 191, 80, 81, 82, 13, 312, 311, 310,
            415, 308, 78, 95, 88, 178, 87, 14, 317, 402, 318, 324, 308,
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
  }, []);

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
        screenshotFormat="image/png"
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
