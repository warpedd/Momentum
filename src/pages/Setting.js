import React, { useEffect, useRef, useState } from "react";
import { IconContext } from "react-icons";
import { CgClose } from "react-icons/cg";
import "../styles/Setting.css";


const Setting = ( {closeSettings, 
                   pomodoroDur,   setPomodoroDur,
                   shortBreakDur,  setShortBreakDur,
                   longBreakDur,   setLongBreakDur,
                   autoStartBreak, setAutoStartBreak,
                   autoSwitchTask, setAutoSwitchTask,
                   autoStartPomodoro, setAutoStartPomodoro} ) => {

  console.log("Settings")

  const SettingLabels = [
    "Auto Start Breaks",
    "Auto Start Pomodoros",
    "Auto Switch Task",
    "Pomodoro Timer",
    "Short Break Interval",
    "Long Break Interval",
  ];


  const dropdownRef = useRef(null);

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
        <button className="close-button">
        <IconContext.Provider value={{ color: "white", className: "settingsCloseIcon" }}>
          <CgClose />
        </IconContext.Provider>
        </button>
        <div className="setting-content">

          <div className="top">
            Settings
          </div>
          {SettingLabels.map((label) =>
            label === "Pomodoro Timer" ? (
              <div className="setting-item" key={label}>
                <span className="setting-label">{label}</span>
                <input
                  type="number"
                  className="interval-input"
                  value={pomodoroDur}
                  onChange={(e) => setPomodoroDur(e.target.value)}
                />
                <span>mins</span>
              </div>
            ) : label === "Short Break Interval" ? (
              <div className="setting-item" key={label}>
                <span className="setting-label">{label}</span>
                <input
                  type="number"
                  className="interval-input"
                  value={shortBreakDur}
                  onChange={(e) => setShortBreakDur(e.target.value)}
                />
                <span>mins</span>
              </div>
            ) : label === "Long Break Interval" ? (
              <div className="setting-item" key={label}>
                <span className="setting-label">{label}</span>
                <input
                  type="number"
                  className="interval-input"
                  value={longBreakDur}
                  onChange={(e) => setLongBreakDur(e.target.value)}
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
