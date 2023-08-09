import React, { useEffect, useRef } from "react";
import { IconContext } from "react-icons";
import { CgClose } from "react-icons/cg";
import "../styles/Setting.css";

const Setting = ({
  closeSettings,
  pomodoroDur,
  setPomodoroDur,
  shortBreakDur,
  setShortBreakDur,
  longBreakDur,
  setLongBreakDur,
  autoStartBreak,
  setAutoStartBreak,
  autoSwitchTask,
  setAutoSwitchTask,
  autoStartPomodoro,
  setAutoStartPomodoro,
  pomodorosBeforeLongBreak,
  setPomodorosBeforeLongBreak
}) => {
  console.log("Settings");

  const SettingLabels = [
    { label: "Set your timer for", settings: ["Pomodoro", "Short Break", "Long Break"] },
    { label: "Do you want to", settings: ["Auto Start Breaks?", "Auto Start Pomodoros?", "Auto Switch Task?"] },
    { label: "How many pomodoros", settings: ["Before Long Break?"] }
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

          {SettingLabels.map((section) => (
          <div className="subheading" key={section.label}> 
          {section.label}
          {section.settings.map((label) => (
          <div className="setting-item" key={label}>
            <span className="setting-label">{label}</span>
            {label === "Pomodoro" && (
            <div>
              <input
              type="number"
              className="interval-input"
              value={pomodoroDur}
              onChange={(e) => setPomodoroDur(e.target.value)}
              />
              <span>mins</span>
              </div>
              )}
              
              {label === "Short Break" && (
              <div>
                <input
                type="number"
                className="interval-input"
                value={shortBreakDur}
                onChange={(e) => setShortBreakDur(e.target.value)}
                />
                <span>mins</span>
                </div>
                )}
                
                {label === "Long Break" && (
                <div>
                  <input
                  type="number"
                  className="interval-input"
                  value={longBreakDur}
                  onChange={(e) => setLongBreakDur(e.target.value)}
                  />
                  <span>mins</span>
                </div>
                  )}
                    
                    {label === "Before Long Break?" && (
                    <div>
                      <input
                      type="number"
                      className="interval-input"
                      value={pomodorosBeforeLongBreak}
                      onChange={(e) => setPomodorosBeforeLongBreak(e.target.value)}
                      />
                      <span>poms</span>
                    </div>
                      )}
                      
                      {label !== "Pomodoro" && label !== "Short Break" && label !== "Long Break" && label !== "Before Short Break?" && label !== "Before Long Break?" && (
                      <div className="toggle-switch">
                        <input
                        type="checkbox"
                        className="checkbox"
                        name={label}
                        id={label}
                        checked={label === "Auto Start Breaks?" ? autoStartBreak :
                                 label === "Auto Switch Task?" ? autoSwitchTask :
                                 label === "Auto Start Pomodoros?" ? autoStartPomodoro : false
                                }
                                onChange={() => {
                                  if (label === "Auto Start Breaks?") {
                                    setAutoStartBreak(!autoStartBreak);
                                  } else if (label === "Auto Switch Task?") {
                                    setAutoSwitchTask(!autoSwitchTask);
                                  } else if (label === "Auto Start Pomodoros?") {
                                    setAutoStartPomodoro(!autoStartPomodoro);
                                  }
                                }}
                                />
                                <label className="label" htmlFor={label}>
                                  <span className="inner" />
                                  <span className="switch" />
                                  </label>
                             </div>
                            )}
                          </div>
                        ))}
                     </div>
                    ))}
                </div>
            </div>
        </div>
     );
  };

export default Setting;