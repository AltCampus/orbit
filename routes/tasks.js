const express = require("express");
const router = express.Router();

const Task = require("../models/Task");

router.get("/one", function(req, res, next) {
  res.json({ isOk: true });
});

router.post("/save", async (res, req) => {
  let { url } = req.body;
  const task = {
    taskUrl: url,
    submitTime: Date.now()
  };
  try {
    const createTask = await Task.create(task);
    res
      .status(201)
      .json({ status: true, message: "task submit", task }, createTask);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
