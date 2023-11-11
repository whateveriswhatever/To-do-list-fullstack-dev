let storage = require("../storage");
const TaskModel = require("../models/Task");

const getAllTasks = async (req, res) => {
  try {
    const allTasks = await TaskModel.find({});

    res.status(200).json({
      status: "success",
      msg: "Retrive all tasks from the database",
      data: allTasks,
    });
  } catch (err) {
    console.log(
      `Oops !. There must be something went wrong -> Check here: ${err}`
    );
    res.status(500).json({
      status: "success",
      msg: "Failed to perceive all tasks from the database",
    });
  }
};

const erectTask = async (req, res) => {
  try {
    const { taskName } = req.body;
    const { isDone } = req.body;
    const { name } = req.body;
    console.log(req.body);
    console.log(`task : ${taskName}`);
    console.log(`name : ${name}`);

    // const newTask = await TaskModel.create({ name: taskName, completed: isDone });
    const newTask = await TaskModel.create({
      name: name,
    });

    // res.status(200).json({
    //   status: "success",
    //   msg: "Added a new task",
    //   data: [...storage, { taskName: taskName, isDOne: isDone }],
    // });
    res.status(200).json({
      status: "success",
      msg: "Added a new task",
      data: newTask,
    });
  } catch (err) {
    console.log(
      `Oops !. There must be something went wrong -> Check here: ${err}`
    );
    res.status(500).json({ status: "failed", msg: err });
  }
};

const updateTask = async (req, res) => {
  try {
    const { taskNameParams } = req.params;
    const { updatedTaskName, updateTaskStatus } = req.body;
    console.log(req.params);
    console.log(`taskNameParams : ${taskNameParams}`);
    console.log(
      `updatedTaskName: ${updatedTaskName} >><< updatedTaskStatus: ${updateTaskStatus}`
    );

    if (!taskNameParams) {
      return res.status(404).send("The provided task name doesn't exist !");
    }

    let findOne = await TaskModel.findOne({ name: taskNameParams }).exec();

    console.log(`findOne : ${findOne}`);

    if (findOne === null) {
      return res
        .status(404)
        .send("There is no task that matched your search !");
    }

    const newOne = await TaskModel.findOneAndUpdate(
      { name: taskNameParams },
      { name: updatedTaskName, completed: updateTaskStatus }
    );

    res.status(200).json({
      status: "success",
      msg: "Updated successfully !",
      data: newOne,
    });
  } catch (err) {
    console.log(
      `Oops !. There must be something went wrong -> Check here: ${err}`
    );
    res.status(500).json({ status: "failed", msg: err });
  }
};

const deleteTaskBasedOnID = async (req, res) => {
  try {
    const { taskIDParams } = req.params;
    console.log(`taskIDParams: ${taskIDParams}`);

    //const { taskNameBody } = req.body;

    // if (!taskNameParams || !taskNameBody) {
    //   return res.status(404).send("Please provide task name");
    // }

    // const findOne = TaskModel.findOne({ name: taskNameBody }).exec();
    const findOne = TaskModel.findById(taskIDParams).exec();

    console.log(`findOne : ${findOne}`);

    if (!findOne) {
      return res.status(404).json({
        success: false,
        msg: `Oops !. There is no existed task with the id : ${taskIDParams}`,
      });
    }

    // await TaskModel.findOneAndDelete({ id: taskNameParams });
    await TaskModel.findByIdAndDelete(taskIDParams);

    res.status(200).json({
      success: true,
      msg: "Deleted successfully !",
      dataDeleted: findOne,
    });
  } catch (err) {
    console.log(
      `Oops !. There must be something went wrong -> Check here: ${err}`
    );
    res.status(500).json({ status: "failed", msg: err });
  }
};

const deleteTaskByOnTaskName = async (req, res) => {
  try {
    const { taskNameBody } = req.body;

    const findOne = await TaskModel.findOne({ name: taskNameBody }).exec();

    if (!findOne) {
      return res.status(404).json({
        success: false,
        msg: `Oops !. There is no existed task with the name : ${taskNameBody}`,
      });
    }

    await TaskModel.findOneAndDelete({ name: taskNameBody });
    res.status(200).json({
      success: true,
      msg: "Deleted successfully !",
      dataDeleted: findOne,
    });
  } catch (err) {
    console.log(
      `Oops !. There must be something went wrong -> Check here: ${err}`
    );
    res.status(500).json({ status: "failed", msg: err });
  }
};

module.exports = {
  getAllTasks,
  erectTask,
  updateTask,
  deleteTaskBasedOnID,
  deleteTaskByOnTaskName,
};
