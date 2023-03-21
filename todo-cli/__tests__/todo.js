const todoList = require("../todo");
const { all, markAsComplete, add, overdue, dueLater, dueToday } = todoList();

describe("Todo New Test Suite", () => {
  beforeAll(() => {
    add({
      title: "Test",
      completed: false,
      dueDate: new Date(new Date().setDate(new Date().getDate() - 1))
        .toISOString()
        .slice(0, 10),
    });
    add({
      title: "Wonderlaa",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    add({
      title: "Kerala IV",
      completed: false,
      dueDate: new Date(new Date().setDate(new Date().getDate() + 1))
        .toISOString()
        .slice(0, 10),
    });
  });
  test("add new One", () => {
    const todoItemsCounts = all.length;
    add([
      {
        title: "Overdue",
        completed: false,
        dueDate: new Date(new Date().setDate(new Date().getDate() - 1))
          .toISOString()
          .slice(0, 10),
      },
    ]);
    expect(all.length).toBe(todoItemsCounts + 1);
  });

  test("marktodo as done", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("retreival Overdue", () => {
    expect(overdue().length).toBe(1);
    add({
      title: "Wagamon",
      completed: false,
      dueDate: new Date(new Date().setDate(new Date().getDate() - 1))
        .toISOString()
        .slice(0, 10),
    });
    expect(overdue().length).toBe(2);
  });

  test("retreival due today", () => {
    expect(dueToday().length).toBe(1);
    add({
      title: "Kochin",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    expect(dueToday().length).toBe(2);
  });

  test("retreival dueLater", () => {
    expect(dueLater().length).toBe(1);
    add({
      title: "Checkin",
      completed: false,
      dueDate: new Date(new Date().setDate(new Date().getDate() + 1))
        .toISOString()
        .slice(0, 10),
    });
    expect(dueLater().length).toBe(2);
  });
});
