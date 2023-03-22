/* eslint-disable no-undef */
const db = require("../models");

const getJSDate = (days) => {
  if (!Number.isInteger(days)) {
    throw new Error("Need to pass an integer as days");
  }
  const today = new Date();
  const oneDay = 60 * 60 * 24 * 1000;
  return new Date(today.getTime() + days * oneDay);
};

describe("Test list of items", function () {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  test("Add overdue item", async () => {
    const todo = await db.Todo.addTask({
      title: "This is a sample item",
      dueDate: getJSDate(-2),
      completed: false,
    });
    const items = await db.Todo.overdue();
    expect(items.length).toBe(1);
  });

  test("Add due today item", async () => {
    const dueToday_items = await db.Todo.dueToday();
    const todo = await db.Todo.addTask({
      title: "This is a sample item",
      dueDate: getJSDate(0),
      completed: false,
    });
    const items = await db.Todo.dueToday();
    expect(items.length).toBe(dueToday_items.length + 1);
  });

  test("Add due later item", async () => {
    const dueLaterItems = await db.Todo.dueLater();
    const todo = await db.Todo.addTask({
      title: "This is a sample item",
      dueDate: getJSDate(2),
      completed: false,
    });
    const items = await db.Todo.dueLater();
    expect(items.length).toBe(dueLaterItems.length + 1);
  });

  test("Mark as complete functionality", async () => {
    const overdueItems = await db.Todo.overdue();
    const Todo = overdueItems[0];
    expect(Todo.completed).toBe(false);
    await db.Todo.markAsComplete(Todo.id);
    await Todo.reload();

    expect(Todo.completed).toBe(true);
  });

  test("displayable string", async () => {
    const overdueItems = await db.Todo.overdue();
    const Todo = overdueItems[0];
    expect(Todo.completed).toBe(true);
    const display = Todo.displayableString();
    expect(display).toBe(
      `${Todo.id}. [x] ${Todo.title} ${Todo.dueDate}`
    );
  });

  test("displayable string", async () => {
    const dueLaterItems = await db.Todo.dueLater();
    const Todo = dueLaterItems[0];
    expect(Todo.completed).toBe(false);
    const display = Todo.displayableString();
    expect(display).toBe(
      `${Todo.id}. [ ] ${Todo.title} ${Todo.dueDate}`
    );
  });

  test("dueToday displayable", async () => {
    const due_items = await db.Todo.dueToday();
    const Todo = due_items[0];
    expect(Todo.completed).toBe(false);
    const display = Todo.displayableString();
    expect(display).toBe(`${Todo.id}. [ ] ${Todo.title}`);
  });

  test("Test completed dueToday displayable string", async () => {
    const due_items = await db.Todo.dueToday();
    const Todo = due_items[0];
    expect(Todo.completed).toBe(false);
    await db.Todo.markAsComplete(Todo.id);
    await Todo.reload();
    const display = Todo.displayableString();
    expect(display).toBe(`${Todo.id}. [x] ${Todo.title}`);
  });
});
