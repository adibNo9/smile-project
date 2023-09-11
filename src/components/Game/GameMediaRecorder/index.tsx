import { FC } from "react";

// @ts-ignore
import { ControlBar, Player } from "video-react";

import styles from "./styles.module.css";

interface IVideoBlob {
  videoBlob?: Blob | null;
}

const GameMediaRecorder: FC<IVideoBlob> = ({ videoBlob }) => {
  return (
    <>
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
    </>
  );
};

export default GameMediaRecorder;
