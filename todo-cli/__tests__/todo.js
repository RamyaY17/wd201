const todoList = require("../todo");

const { add, markAsComplete, overdue, dueToday, dueLater } = todoList();
var d = new Date();
const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};
var dateToday = new Date();
const today = formattedDate(dateToday);
const yesterday = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() - 1))
);
const tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1))
);
describe("TodoList Test Suite", () => {
  beforeAll(() => {
    add({
      title: "Task Todo",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
  });
  test("Should add new todo", () => {
    const todoItemsCount = all.length;
    add({
      title: "Submit assignment",
      dueDate: yesterday,
      completed: false,
    });
    expect(all.length).toBe(todoItemsCount + 1);
  });

  test("Should mark as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
  test("retrive the overdue data", () => {
    add({ title: "finish wd201 l2", dueDate: yesterday, completed: false });
    expect(overdue().length).toBe(2);
  });
  test("retrive the dueToday data", () => {
    add({ title: "finish wd201 l1", dueDate: today, completed: true });
    expect(dueToday().length).toBe(1);
  });
  test("retrive the dueLater data", () => {
    add({ title: "wd210 leve1 1", dueDate: tomorrow, completed: false });
    add({ title: "wd210 leve1 2", dueDate: tomorrow, completed: false });
    add({ title: "wd210 leve1 3", dueDate: tomorrow, completed: false });
    add({ title: "wd210 leve1 4", dueDate: tomorrow, completed: false });
    expect(dueLater().length).toBe(4);
  });
});
