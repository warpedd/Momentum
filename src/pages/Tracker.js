import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";
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
        } else {
            console.log("did not fetch tasks; user is not logged in.");
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
            { name: "Remaining", value: incTasks.length },
            { name: "Completed", value: compTasks.length },
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
            <div className="Tracker">
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
                <div className="chart-section">
                    <PieChart width={400} height={400}>
                        <Pie
                            dataKey="value"
                            isAnimationActive={false}
                            data={chartData}
                            cx={200}
                            cy={200}
                            outerRadius={80}
                            fill="#8884d8"
                            label
                        >
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={["#FF0000", "#00D100"][index % 2]}
                                />
                            ))}
                        </Pie>
                    </PieChart>
                </div>
            </div>
        </div>
    );
};

export default Tracker;