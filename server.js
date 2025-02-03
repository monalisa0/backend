const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const taskRoutes = require("./routes/taskRoutes");  // Import routes


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/mernapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

  // Use the task routes
app.use("/", taskRoutes);  

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.listen(5001, () => console.log("Server running on port 5001"));
