import Task from "../models/task.model.js";

// get task
export async function getTask(req, res) {
  try {
    const taskId = req.params.id;
    const userId = req.user._id;
    let tasks = await Task.findOne({ userId: userId, _id: taskId });
    if (!tasks) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(tasks);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

// get all tasks
export async function getTaskList(req, res) {
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

// create new task
export async function createTask(req, res) {
  try {
    const { title, description, dueDate, status } = req.body;
    const userId = req.user._id;
    if (!title) {
      return res.status(400).json({ error: "A task must have an title" });
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

// update task
export async function updateTask(req, res) {
  try {
    const taskId = req.params.id;
    const userId = req.user._id;
    const { title, description, dueDate, status } = req.body;

    const prevTask = await Task.findOne({ _id: taskId, userId: userId });
    if (!prevTask) {
      return res.status(400).json({ error: "Task not found" });
    }
    const updatedTask = {
      title: title || prevTask.title,
      description: description || prevTask.description,
      status: status || prevTask.status,
    };

    if (dueDate && !isNaN(Date.parse(dueDate))) {
      updatedTask.dueDate = new Date(dueDate);
    }

    await Task.findOneAndUpdate({ userId: userId, _id: taskId }, updatedTask,);
    res.status(200).json(updatedTask);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

// delete task
export async function deleteTask(req, res) {
  try {
    const taskId = req.params.id;
    const userId = req.user._id;
    const deleted = await Task.deleteOne({ _id: taskId, userId: userId });

    if (deleted.deletedCount === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}
