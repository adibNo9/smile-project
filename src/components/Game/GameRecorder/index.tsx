import { FC, useCallback, useEffect, useRef, useState } from "react"; // Import React

import axios from "axios";
import cls from "classnames";
import Webcam from "react-webcam";

import styles from "./styles.module.css";

interface IGameRecorder {
  className: string;
  onStartGame: () => void;
  gameCounter?: boolean;
  onIncreaseScore: (value: number) => void;
  onScreenshot: (value: string | null) => void;
  onIncreaseBackendScore: (value: string) => void;
}

interface Response {
  id?: number;
  result?: string;
  status?: string;
  result_prob: string;
  result_img: string;
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
  const [userImg, setUserImg] = useState<string | null>(null);

  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current?.getScreenshot();

    try {
      await axios
        .post<Response>("/smile", { file: imageSrc })
        .then((response) => {
          onStartGame();
          if (response.data.status === "200") {
            onIncreaseBackendScore(response.data.result_prob);
            onScreenshot(response.data.result_prob);
            setUserImg(response.data.result_img);
          } else {
            console.log(response.data.result);
          }
        })
        .catch((error) => console.log(error));
      console.log("Image sent to server.");
    } catch (error) {
      console.error("Error sending image to server:", error);
    } finally {
      capture();
    }
  }, [onIncreaseBackendScore, onScreenshot, onStartGame]);

  useEffect(() => {
    capture();
  }, [capture]);

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
