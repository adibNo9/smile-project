import { FC, useCallback, useEffect, useRef, useState } from "react"; // Import React

import cls from "classnames";
import Webcam from "react-webcam";

import { useSocket } from "../../../hooks/useSocket";
import styles from "./styles.module.css";

const videoConstraints = {
  frameRate: { ideal: 30, max: 60 },
};

interface IGameRecorder {
  className: string;
  onIncreaseBackendScore: (value: string) => void;
  gameCounter?: boolean;
}

interface Response {
  result_prob: string;
  result_img: string;
}

const GameRecorder: FC<IGameRecorder> = ({
  className,
  gameCounter,
  onIncreaseBackendScore,
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const webcamRef = useRef<Webcam | null>(null);
  const [userImg, setUserImg] = useState<string | null>(null);
  const socket = useSocket("http://localhost:5000/smile", {
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    autoConnect: false,
  });

  const sendImg = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();

    socket.emit("send_image", { file: imageSrc });
  }, [socket]);

  useEffect(() => {
    gameCounter && sendImg();
  }, [sendImg, userImg, gameCounter]);

  useEffect(() => {
    socket.on("receive_data", (data: Response) => {
      onIncreaseBackendScore(data.result_prob);
      setUserImg(data.result_img);
    });
  }, [socket, onIncreaseBackendScore]);

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
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
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
