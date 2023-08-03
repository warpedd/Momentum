let express = require("express");
const rateLimit = require("express-rate-limit");

let apiv1 = express();

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,    // 15 minutes window
    max: 1000                    // max number of requests
});

// Get file paths for the routers
let userRouter = require("./routes/userRoutes");
let taskRouter = require("./routes/taskRoutes");

// Set relative paths for the routers
apiv1.use('/users', apiLimiter, userRouter);
apiv1.use('/tasks', apiLimiter, taskRouter);

module.exports = apiv1; 