import { useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";

import { StartBackgroundSvg } from "../../assets/icons/start-background-svg";
import Steps from "../../components/Steps";
import { useUserId } from "../../contexts/useUserId";
import styles from "./styles.module.css";

const StartContainer = () => {
  const webcamRef = useRef<Webcam | null>(null); // Specify the correct type for webcamRef
  const navigate = useNavigate();
  const { setUserId } = useUserId();
  const [imgSrc, setImgSrc] = useState<string | null | undefined>("");
  const [text, setText] = useState(
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Verovoluptatibus accusantium quidem placeat voluptates expedita a est quis fuga.",
  );

  interface Response {
    id?: number;
    result?: string;
    status?: string;
  }

  async function capture() {
    const imageSrc = webcamRef.current?.getScreenshot();

    setImgSrc(imageSrc);

    // try {
    //   await axios
    //     .post<Response>("/recognition", { file: imageSrc })
    //     .then((response) => {
    //       if (response.data.result === "Recognized") {
    //         setUserId(response.data.id);
    //         navigate("/game");
    //       } else if (response.data.result === "Repeated") {
    //         setText("Repeat user!");
    //       } else {
    //          setText("No Face in view, Try Again!");
    //       }
    //     })
    //     .catch((error) => console.log(error));
    //   console.log("Image sent to server.");
    // } catch (error) {
    //   console.error("Error sending image to server:", error);
    // }
  }
  return (
    <div className={styles["start-container"]}>
      <StartBackgroundSvg className={styles["background-svg"]} />
      <div className={styles["content-wrapper"]}>
        <p className={styles.description}>{text}</p>
        <button
          className={styles["start-button"]}
          onClick={() => {
            capture();
            navigate("/game");
          }}
        >
          Start
        </button>
        <Steps />
      </div>
      <div className={styles["start-webcam"]}>
        <Webcam
          screenshotFormat="image/jpeg"
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
            width: 400,
            height: 400,
          }}
        />
      </div>
      <div>
        {imgSrc !== "" && !!imgSrc && (
          <div style={{ marginTop: "20px" }}>
            <h2>Captured Image</h2>
            <img src={imgSrc} alt="Captured" style={{ marginTop: "10px" }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StartContainer;
