const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  getTaskBasedOnName,
  erectTask,
  updateTask,
  deleteTaskBasedOnID,
  deleteTaskByOnTaskName,
} = require("../controllers/tasks");

// GET method : retrieve all tasks from storage
// router.get('/', express.json(), (req, res) => {
//   res.status(200).json({ status: 'success', data: 'empty' });
// });

router.get("/", express.json(), getAllTasks);

// GET method : perceive a specific task based on suppelmented name
router.get("/:taskName", express.json(), getTaskBasedOnName);

// POST method: create a new task to the storage
router.post("/", express.json(), erectTask);

// PUT method: update a new task from the storage based on id
// router.put("/:taskNameParams", express.json(), updateTask);
router.put("/:taskIDParams", express.json(), updateTask);

// DELETE method : delete a task from the storage based on id
router.delete("/:taskIDParams", express.json(), deleteTaskBasedOnID);

// DELETE method: delete a task from the database based on Task's name
router.delete("/", express.json(), deleteTaskByOnTaskName);

module.exports = router;
