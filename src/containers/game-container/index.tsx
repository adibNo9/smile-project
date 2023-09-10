import "video-react/dist/video-react.css";

import { useEffect, useState } from "react";

import { RecordRTCPromisesHandler } from "recordrtc";
// @ts-ignore
import { ControlBar, Player } from "video-react";

import { ArrowTurntable } from "../../assets/icons/arrow-turntable";
import { GamePlaceSvg } from "../../assets/icons/game-place-svg";
import { GiftTurntable } from "../../assets/icons/gift-turntable";
import { MainGameSvg } from "../../assets/icons/main-game-svg";
import { ScoreSvg } from "../../assets/icons/score-svg";
import FinalFormModal from "../../components/FinalFormModal";
import GameCounter from "../../components/GameCounter";
import styles from "./styles.module.css";

const GameContainer = () => {
  const [isShowForm, setIsShowForm] = useState(false);
  const [recorder, setRecorder] = useState<any>();
  const [videoBlob, setVideoUrlBlob] = useState<Blob | null>();

  console.log(videoBlob);

  const startRecording = async () => {
    const mediaDevices = navigator.mediaDevices;
    const stream: MediaStream = await mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    const recorder = new RecordRTCPromisesHandler(stream, {
      type: "video",
    });

    await recorder.startRecording();
    setRecorder(recorder);
    setVideoUrlBlob(null);
  };

  useEffect(() => {
    startRecording();
  }, []);

  const stopRecording = async () => {
    if (recorder) {
      await recorder.stopRecording();
      const blob: Blob = await recorder.getBlob();

      setVideoUrlBlob(blob);

      setRecorder(null);
    }
  };

  const showFormHandler = () => {
    // setIsShowForm(true);
     setIsShowForm(false);
    stopRecording();
  };

  console.log(videoBlob);

  return (
    <div className={styles["game-container"]}>
      <div className={styles["content-wrapper"]}>
        <div className={styles["score-wrapper"]}>
          <ScoreSvg />
        </div>
        <div className={styles["game-wrapper"]}>
          <div className={styles["turntable-game"]}>
            <div className={styles["arrow-turntable"]}>
              <ArrowTurntable />
            </div>
            <div className={styles["gift-turntable"]}>
              <GiftTurntable />
            </div>
            <MainGameSvg />
          </div>

          <div className={styles["turntable-place"]}>
            <GamePlaceSvg />
          </div>
        </div>
        <div className={styles["face-smile-wrapper"]}>
          {!!videoBlob && (
            <Player
              width={245}
              height={290}
              src={window.URL.createObjectURL(videoBlob)}
              autoPlay
            >
              <ControlBar className={styles["video-control"]} />
            </Player>
          )}
        </div>
      </div>
      <div className={styles["game-couter"]}>
        <GameCounter
          seconds={10}
          size={200}
          strokeBgColor="#fff"
          strokeColor="#F8A61F"
          strokeWidth={4}
          onShowForm={showFormHandler}
        />
      </div>
      {isShowForm && <FinalFormModal />}
    </div>
  );
};

export default GameContainer;
