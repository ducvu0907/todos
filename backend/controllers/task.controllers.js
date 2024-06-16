import Task from "../models/task.model.js";

// get a task from an user
export async function getTask(req, res) {
  try {
    const taskId = req.param.id;
    const userId = req.user._id;
    let tasks = await Task.findOne({ userId: userId, _id: taskId });
    if (!tasks) {
      return res.status(200).json("No task found");
    }
    res.status(200).json(tasks);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

// get user's tasks list
export async function getTasksList(req, res) {
  try {
    const userId = req.user._id;
    let tasks = await Task.find({ userId: userId });
    if (!tasks) {
      return res.status(200).json([]);
    }
    res.status(200).json(tasks);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

// create a task
export async function createTask(req, res) {
  try {
    const { title, description, dueDate, status } = req.body;
    const userId = req.user._id;
    if (!title) {
      return res.status(400).json({ error: "A task should have an title" });
    }

    const newTask = new Task({
      userId,
      title: title,
      description: description || "",
      dueDate: dueDate || null,
      status: status || "todo",
    });

    await newTask.save();
    res.status(201).json(newTask);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}