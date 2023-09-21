import { FC, useCallback, useEffect, useRef, useState } from "react"; // Import React

import cls from "classnames";
import Webcam from "react-webcam";
import io from "socket.io-client";

import { useWorker, WORKER_STATUS } from "@koale/useworker";

// import { useSocket } from "../../../hooks/useSocket";
import styles from "./styles.module.css";

// const videoConstraints = {
//   frameRate: { ideal: 20, max: 25 },
// };

interface IGameRecorder {
  className: string;
  onIncreaseBackendScore: (value: string) => void;
  gameCounter?: boolean;
}

const GameRecorder: FC<IGameRecorder> = ({
  className,
  gameCounter,
  onIncreaseBackendScore,
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const webcamRef = useRef<Webcam | null>(null);
  const [userImg, setUserImg] = useState<string | null>(null);

  const socket = io("http://127.0.0.1:5000/", { transports: ["websocket"] });

  const stream = useCallback(() => {
    const interval = setInterval(() => {
      const imageSrc = webcamRef.current?.getScreenshot();
      setUserImg("" + imageSrc);
      socket.emit("message", { file: imageSrc });
    }, 33);

    setTimeout(() => {
      clearInterval(interval);
    }, 50000);
  }, [socket]);

  const [streamWorker, { status: streamWorkerStatus }] = useWorker(stream);

  // useEffect(() => {

  //   socket.on('connect',()=> {
  //     console.log("connected to socket.io")
  //   })
  // }, []);

  // const sendImg = useCallback(() => {
  //   const imageSrc = webcamRef.current?.getScreenshot();
  //   // setUserImg('' + imageSrc);
  //   socket.emit('message', { file: imageSrc });
  // }, [socket,gameCounter]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const imageSrc = webcamRef.current?.getScreenshot();
  //     setUserImg("" + imageSrc);
  //     socket.emit("message", { file: imageSrc });
  //   }, 150);
  //   return () => clearInterval(interval);
  // }, [socket, gameCounter]);

  // useEffect(() => {
  //   gameCounter && sendImg();
  // }, [sendImg, gameCounter]);

  useEffect(() => {
    console.log(WORKER_STATUS);
    console.log("WORKER:", streamWorkerStatus);
    gameCounter &&
      streamWorker().then((result) => {
        console.log("streaming Done! useWorker()", result);
      });
  }, [gameCounter, streamWorker, streamWorkerStatus]);

  useEffect(() => {
    socket.on("message", (data) => {
      var rec = data.split("#");
      onIncreaseBackendScore(rec[1]);
      // setUserImg(rec[2]);
    });
  }, [socket, onIncreaseBackendScore]);

  return (
    <div
      className={cls(
        styles["webcam-wrapper"],
        styles["game-wrapper"],
        className
      )}
      ref={wrapperRef}
    >
      {gameCounter && (
        <Webcam
          screenshotFormat="image/jpeg"
          // videoConstraints={videoConstraints}
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
      )}
      {userImg ? (
        <img
          src={userImg}
          alt="user-img"
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
      ) : (
        <></>
      )}
    </div>
  );
};

export default GameRecorder;
