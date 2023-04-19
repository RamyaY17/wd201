const request = require("supertest");
const db = require("../models/index");
const app = require("../app");
var cheerio = require("cheerio");
const e = require("express");

let server, agent;
function extractCsrfToken(res) {
  var $ = cheerio.load(res.text);
  return $("[name=_csrf]").val();
}
describe("Todo App", function () {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    server = app.listen(4000, () => {});
    agent = request.agent(server);
  });

  afterAll(async () => {
    try {
      await db.sequelize.close();
      await server.close();
    } catch (error) {
      console.log(error);
    }
  });

  test("Marks a todo as complete", async () => {
    let res = await agent.get("/");
    let csrfToken = extractCsrfToken(res);
    await agent.post("/todos").send({
      title: "Buy Sunglasses",
      dueDate: new Date().toISOString(),
      completed: false,
      "_csrf": csrfToken, // prettier-ignore
    });

    test("Creates a new todo", async () => {
      let res = await agent.get("/");
      let csrfToken = extractCsrfToken(res);
      const response = await agent.post("/todos").send({
        title: "Buy milk",
        dueDate: new Date().toISOString(),
        completed: false,
        "_csrf": csrfToken, // prettier-ignore
      });
      expect(response.statusCode).toBe(302);
    });

    const groupedTodosResponse = await agent
      .get("/")
      .set("Accept", "application/json");
    const parsedGroupedResponse = JSON.parse(groupedTodosResponse.text);
    const dueTodayCount = parsedGroupedResponse.duetodayTodoList.length;
    const lasttodo = parsedGroupedResponse.duetodayTodoList[dueTodayCount - 1];

    res = await agent.get("/");
    csrfToken = extractCsrfToken(res);

    const markCompleteResponse = await agent.put(`/todos/${lasttodo.id}`).send({
      completed: true,
      "_csrf": csrfToken, // prettier-ignore
    });
    const parsedUpdateResponse = JSON.parse(markCompleteResponse.text);
    expect(parsedUpdateResponse.completed).toBe(true);
  });

  test("Deletes a todo", async () => {
    let res = await agent.get("/");
    let csrfToken = extractCsrfToken(res);
    await agent.post("/todos").send({
      title: "Run 5km",
      dueDate: new Date().toISOString(),
      completed: false,
      "_csrf": csrfToken, // prettier-ignore
    });

    const groupedTodosResponse = await agent
      .get("/")
      .set("Accept", "application/json");

    const parsedResponse = JSON.parse(groupedTodosResponse.text);
    const todoid = parsedResponse.duetodayTodoList.length;
    const lasttodo = parsedResponse.duetodayTodoList[todoid - 1];

    res = await agent.get("/");
    csrfToken = extractCsrfToken(res);

    const deleteResponse = await agent.delete(`/todos/${lasttodo.id}`).send({
      "_csrf": csrfToken, // prettier-ignore
    });
    const parsedUpdateResponse = JSON.parse(deleteResponse.text);
    expect(parsedUpdateResponse).toBe(true); //prettier-ignore
  });
});
