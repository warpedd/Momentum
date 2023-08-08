import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";

const Tracker = () => {
	const [task, setTask] = useState("");
	const [tasks, setTasks] = useState([]);
	const [completedTasks, setCompletedTasks] = useState([]);
	const [chartData, setChartData] = useState([]);

	useEffect(() => {
		setChartData([
			{ name: "Remaining", value: tasks.length },
			{ name: "Completed", value: completedTasks.length },
		]);
	}, [tasks, completedTasks]);

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
		<div className="tracker-container">
			<div className="Tracker">
				<div className="tasks-section">
					<h1>Remaining</h1>
					<ul>
						{tasks.map((task, index) => (
							<li key={index}>
								{task}
								<input
									type="checkbox"
									onChange={() => handleCompleteTask(index)}
								/>
							</li>
						))}
					</ul>
					<h1>Completed</h1>
					<ul>
						{completedTasks.map((task, index) => (
							<li key={index}>{task}</li>
						))}
					</ul>

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

					<div className="add-task-section">
						<h1>Add Task</h1>
						<input
							type="text"
							value={task}
							onChange={handleInputChange}
							placeholder="Task Name"
						/>
						<button onClick={handleAddTask}>Add Task</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Tracker;

// import React, { useState, useEffect } from "react";
// import { PieChart, Pie, Cell } from "recharts";

// const Tracker = () => {
// 	const [task, setTask] = useState("");
// 	const [tasks, setTasks] = useState([]);
// 	const [completedTasks, setCompletedTasks] = useState([]);
// 	const [chartData, setChartData] = useState([]);

// 	useEffect(() => {
// 		setChartData([
// 			{ name: "Remaining", value: tasks.length },
// 			{ name: "Completed", value: completedTasks.length },
// 		]);
// 	}, [tasks, completedTasks]);

// 	const handleInputChange = (event) => {
// 		setTask(event.target.value);
// 	};

// 	const handleAddTask = () => {
// 		if (task !== "") {
// 			setTasks([...tasks, task]);
// 			setTask("");
// 		}
// 	};

// 	const handleCompleteTask = (index) => {
// 		const newTasks = [...tasks];
// 		const completedTask = newTasks.splice(index, 1);
// 		setTasks(newTasks);
// 		setCompletedTasks([...completedTasks, ...completedTask]);
// 	};

// 	return (
// 		<div className="tracker-container">
// 			<div className="Tracker">
// 				<div className="tasks-section">
// 					<h1>Remaining</h1>
// 					<ul>
// 						{tasks.map((task, index) => (
// 							<li key={index}>
// 								{task}
// 								<input
// 									type="checkbox"
// 									onChange={() => handleCompleteTask(index)}
// 								/>
// 							</li>
// 						))}
// 					</ul>
// 					<h1>Completed</h1>
// 					<ul>
// 						{completedTasks.map((task, index) => (
// 							<li key={index}>{task}</li>
// 						))}
// 					</ul>
// 				</div>
// 			</div>
// 			<div className="chart-section">
// 				<PieChart width={400} height={400}>
// 					<Pie
// 						dataKey="value"
// 						isAnimationActive={false}
// 						data={chartData}
// 						cx={200}
// 						cy={200}
// 						outerRadius={80}
// 						fill="#8884d8"
// 						label
// 					>
// 						{chartData.map((entry, index) => (
// 							<Cell
// 								key={`cell-${index}`}
// 								fill={["#FF0000", "#00D100"][index % 2]}
// 							/>
// 						))}
// 					</Pie>
// 				</PieChart>
// 			</div>

// 			<div className="add-task-section">
// 				<h1>Add Task</h1>
// 				<input
// 					type="text"
// 					value={task}
// 					onChange={handleInputChange}
// 					placeholder="Task Name"
// 				/>
// 				<button onClick={handleAddTask}>Add Task</button>
// 			</div>
// 		</div>
// 	);
// };

// export default Tracker;
