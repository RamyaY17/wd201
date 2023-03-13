const todoList = () => {
  all = [];
  const add = (todoItem) => {
    all.push(todoItem);
  };
  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    const a1 = all.filter(
      (item) => item.dueDate.split("-")[2] < new Date().getDate()
    );
    return a1;
  };

  const dueToday = () => {
    const b1 = all.filter(
      (item) => item.dueDate.split("-")[2] === String(new Date().getDate())
    );
    return b1;
  };

  const dueLater = () => {
    const b1 = all.filter(
      (item) => item.dueDate.split("-")[2] > new Date().getDate()
    );
    return b1;
  };

  const toDisplayableList = (list) => {
    const result1 = list.map(
      (item) =>
        `${item.completed ? "[x]" : "[ ]"} ${item.title} ${
          item.dueDate.split("-")[2] === String(new Date().getDate())
            ? ""
            : item.dueDate
        }`
    );

    return result1.join("\n");
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};
module.exports = todoList;
