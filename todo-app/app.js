const express = require("express");
const app = express();
const { Todo } = require("./models");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", function (request, response) {
  response.send("Hello World");
});

app.get("/todos", async function (_request, response) {
  try {
    const todoItems = await Todo.getTodo();
    return response.json(todoItems);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.post("/todos", async function (request, response) {
  try {
    const todoItems = await Todo.addTodo(request.body);
    return response.json(todoItems);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.get("/todos/:id", async function (request, response) {
  try {
    const todoItems = await Todo.findByPk(request.params.id);
    return response.json(todoItems);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.delete("/todos/:id", async function (request, response) {
  const todoItems = await Todo.findByPk(request.params.id);
  try {
    const deleteTodo = await todoItems.deleteTodo({ todo: request.params.id });
    return response.send(true);
  } catch (error) {
    console.log(error);
    return response.send(false);
  }
});

app.put("/todos/:id/markAsCompleted", async function (request, response) {
  const todoItems = await Todo.findByPk(request.params.id);
  try {
    const updatedTodo = await todoItems.markAsCompleted();
    return response.json(updatedTodo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

module.exports = app;
