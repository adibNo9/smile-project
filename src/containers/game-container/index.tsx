import "video-react/dist/video-react.css";

import { useEffect, useState } from "react";

import { RecordRTCPromisesHandler } from "recordrtc";

import { ScoreSvg } from "../../assets/icons/score-svg";
import FinalFormModal from "../../components/FinalFormModal";
import GameCounter from "../../components/Game/GameCounter";
import GameMediaRecorder from "../../components/Game/GameMediaRecorder";
import GameTurntable from "../../components/Game/GameTurntable";
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
          <GameTurntable />
        </div>
        <div className={styles["game-media-recorder"]}>
          <GameMediaRecorder videoBlob={videoBlob} />
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
