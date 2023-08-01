import React, { useState } from "react";

const Tracker = () => {
	const [task, setTask] = useState("");
	const [tasks, setTasks] = useState([]);
	const [completedTasks, setCompletedTasks] = useState([]);

	const handleInputChange = (event) => {
		setTask(event.target.value);
	};

	const handleAddTask = () => {
		if (task !== "") {
			setTasks([...tasks, task]);
			setTask("");
		}
	};

	const handleCompleteTask = (index) => {
		const newTasks = [...tasks];
		const completedTask = newTasks.splice(index, 1);
		setTasks(newTasks);
		setCompletedTasks([...completedTasks, ...completedTask]);
	};

	return (
		<div className="Tracker">
			<h1>Tracker</h1>
			<input
				type="text"
				value={task}
				onChange={handleInputChange}
				placeholder="Task Name"
			/>
			<button onClick={handleAddTask}>Add Task</button>
			<h2>Remaining</h2>
			<ul>
				{tasks.map((task, index) => (
					<li key={index}>
						{task}
						<input type="checkbox" onChange={() => handleCompleteTask(index)} />
					</li>
				))}
			</ul>
			<h2>Completed</h2>
			<ul>
				{completedTasks.map((task, index) => (
					<li key={index}>{task}</li>
				))}
			</ul>
		</div>
	);
};

export default Tracker;
