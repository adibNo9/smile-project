import React, { useEffect, useState } from "react";

interface CountdownTimerProps {
  seconds: number;
  size: number;
  strokeBgColor: string;
  strokeColor: string;
  strokeWidth: number;
  isCounterStart?: boolean;
  onStopCounter: () => void;
}

const GameCounter: React.FC<CountdownTimerProps> = ({
  seconds,
  size,
  strokeBgColor,
  strokeColor,
  strokeWidth,
  isCounterStart,
  onStopCounter,
}) => {
  const milliseconds = seconds * 1000;
  const radius = size / 2;
  const circumference = size * Math.PI;
  const [countdown, setCountdown] = useState(milliseconds);
  const strokeDashoffset = () =>
    circumference - (countdown / milliseconds) * circumference;

  useEffect(() => {
    if (isCounterStart) {
      const interval = setInterval(() => {
        setCountdown((prevCountdown) =>
          prevCountdown <= 0 ? milliseconds : prevCountdown - 10,
        );

        if (countdown <= 0) {
          clearInterval(interval);
          onStopCounter();
          setCountdown(0);
        }
      }, 10);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isCounterStart, countdown, milliseconds, onStopCounter]);
  const countdownSizeStyles = {
    height: size,
    width: size,
  };

  const textStyles = {
    width: "100%",
    color: "#FFF",
    textShadow: "0px 0px 10.914302825927734px #7FF",
    fontSize: " 2.8rem",
    fontWeight: 800,
  };

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const seconds = totalSeconds % 60;
    const millisecondsFormatted = (milliseconds % 1000)
      .toString()
      .slice(0, 2)
      .padStart(2, "0");
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "0.47fr auto 0.47fr",
          justifyContent: "center",
          gap: "0.5rem",
          width: "90%",
          margin: "auto",
        }}
      >
        <span style={{ width: "2rem" }}>
          {seconds.toString().padStart(2, "0")}
        </span>
        <span style={{ width: "auto" }}>:</span>
        <span style={{ width: "2rem" }}>{millisecondsFormatted}</span>
      </div>
    );
  };

  const timeWithMilliseconds = formatTime(countdown);

  return (
    <>
      <div
        style={{
          pointerEvents: isCounterStart ? "none" : "all",
          opacity: isCounterStart ? 0.4 : 1,
        }}
      ></div>
      <div style={{ ...styles.countdownContainer, ...countdownSizeStyles }}>
        <div style={textStyles}>{timeWithMilliseconds}</div>
        <svg style={styles.svg}>
          <circle
            cx={radius}
            cy={radius}
            r={radius}
            fill="none"
            stroke={strokeBgColor}
            strokeWidth={2}
            strokeDasharray="2 6"
          ></circle>
        </svg>
        <svg style={styles.svg}>
          <circle
            strokeDasharray={circumference}
            strokeDashoffset={isCounterStart ? strokeDashoffset() : 470}
            r={radius}
            cx={radius}
            cy={radius}
            fill="none"
            strokeLinecap="round"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          ></circle>
        </svg>
      </div>
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  countdownContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    margin: "auto",
  },
  svg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    transform: "rotateY(-180deg) rotateZ(-90deg)",
    overflow: "visible",
  },
};

export default GameCounter;
