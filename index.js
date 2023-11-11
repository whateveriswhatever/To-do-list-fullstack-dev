const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const tasks = require("./routes/tasks");
const connectToDB = require("./db/connectToDB");
const cors = require("cors");

// middleware for CORS
app.use(cors());

// Routes for handling tasks
app.use("/api/v1/tasks", tasks);

app.get("/", (req, res) => {
  res.send("Hello");
});

const server = async () => {
  try {
    // connect to database
    await connectToDB();

    // connect to server
    app.listen(PORT, () =>
      console.log(`App is running on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.log(err);
  }
};

server();

// app.listen(PORT, () =>
//   console.log(`App is running on http://localhost:${PORT}`)
// );
