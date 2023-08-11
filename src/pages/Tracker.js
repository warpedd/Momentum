import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";
import axios from 'axios';
import useUser from '../hooks/useUser'
import TaskList from "../components/TaskList";

import "../styles/Tracker.css";

const Tracker = () => {
    const [chartData, setChartData] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [tasksChanged, setTasksChanged] = useState(false);
    const [compTasks, setCompTasks] = useState([]);
    const [incTasks, setIncTasks] = useState([]);

    const { user } = useUser();

    useEffect(() => {
        const loadTaskInfo = async () => {
            const token = await user?.getIdToken();
            const headers = token ? { authtoken: token } : {};
            const response = await axios.get("http://localhost:5000/apiv1/tasks/", { headers });
            const newTaskList = response.data;
            setTasks(newTaskList);
        }

        if (user || tasksChanged) {
            loadTaskInfo();
            setTasksChanged(false);
        }
    }, [user, tasksChanged]);

    useEffect(() => {
        // After the tasks state has been updated, recalculate completed and incomplete tasks
        completedTaskList();
        incompleteTaskList();
    }, [tasks]);

    useEffect(() => {
        // After completed and incomplete tasks have been updated, update the chart data
        setChartData([
            { name: "Tasks Remaining", value: incTasks.length },
            { name: "Tasks Completed", value: compTasks.length },
        ]);
    }, [compTasks, incTasks]);

    function completedTaskList() {
        let completeTasks = tasks.filter((elem) => elem.isCompleted)
        setCompTasks(completeTasks);
    }

    function incompleteTaskList() {
        let incompleteTasks = tasks.filter((elem) => !elem.isCompleted)
        setIncTasks(incompleteTasks);
    }

    // Callback for triggering update of the task list.
    function updateTasksChanged() {
        setTasksChanged(true);
    }

    return (
        <div className="tracker-container">
            <div className="tracker">
                <div className="chart-section">
                    <h2>Progress</h2>
                    <PieChart width={400} height={400} padding={{ right: 0, left: 0, top: 0, bottom: 0 }}>
                        <Pie
                            dataKey="value"
                            isAnimationActive={false}
                            data={chartData}
                            cx={200}
                            cy={200}
                            outerRadius={80}
                            fill="#8884d8"
                            label={true}
                            legend
                            legendType="diamond"

                        >
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={["#FF0000", "#00D100"][index % 2]}
                                />
                            ))}
                        </Pie>
                        <Legend verticalAlign="top" height={36} layout="vertical" />
                    </PieChart>
                </div>
                <div className="tasks-section">
                    <div className="tracker-task-list">
                        <header>
                            <h1>Tasks Remaining</h1>
                        </header>
                        <TaskList tasks={incTasks} markChange={updateTasksChanged} />
                    </div>
                    <div className="tracker-task-list">
                        <header>
                            <h1>Completed</h1>
                        </header>
                        <TaskList tasks={compTasks} markChange={updateTasksChanged} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tracker;