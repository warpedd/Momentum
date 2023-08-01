import React, { useEffect, useRef, useState } from "react";
import "../styles/Setting.css";

const Setting = ({ closeSettings }) => {
  const SettingLabels = [
    "Auto Start Breaks",
    "Auto Start Pomodoros",
    "Auto Switch Task",
    "Pomodoro Timer",
    "Short Break Interval",
    "Long Break Interval",
  ];

  const dropdownRef = useRef(null);

  const [pomodoroTimer, setPomodoroTimer] = useState(25);
  const [shortBreakInterval, setShortBreakInterval] = useState(5);
  const [longBreakInterval, setLongBreakInterval] = useState(15);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeSettings();
      }
    };

    const closeButton = document.querySelector(".close-button");
    closeButton.addEventListener("click", closeSettings);

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      closeButton.removeEventListener("click", closeSettings);
    };
  }, [closeSettings]);

  return (
    <div className="overlay-container">
      <div className="setting-box" ref={dropdownRef}>
        <button className="close-button">X</button>
        <div className="setting-content">
          <div className="top">Settings</div>
          {SettingLabels.map((label) =>
            label === "Pomodoro Timer" ? (
              <div className="setting-item" key={label}>
                <span className="setting-label">{label}</span>
                <input
                  type="number"
                  className="interval-input"
                  value={pomodoroTimer}
                  onChange={(e) => setPomodoroTimer(e.target.value)}
                />
                <span>mins</span>
              </div>
            ) : label === "Short Break Interval" ? (
              <div className="setting-item" key={label}>
                <span className="setting-label">{label}</span>
                <input
                  type="number"
                  className="interval-input"
                  value={shortBreakInterval}
                  onChange={(e) => setShortBreakInterval(e.target.value)}
                />
                <span>mins</span>
              </div>
            ) : label === "Long Break Interval" ? (
              <div className="setting-item" key={label}>
                <span className="setting-label">{label}</span>
                <input
                  type="number"
                  className="interval-input"
                  value={longBreakInterval}
                  onChange={(e) => setLongBreakInterval(e.target.value)}
                />
                <span>mins</span>
              </div>
            ) : (
              <div className="setting-item" key={label}>
                <span className="setting-label">{label}</span>
                <div className="toggle-switch">
                  <input
                    type="checkbox"
                    className="checkbox"
                    name={label}
                    id={label}
                  />
                  <label className="label" htmlFor={label}>
                    <span className="inner" />
                    <span className="switch" />
                  </label>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Setting;
