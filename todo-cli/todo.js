const todoList = () => {
  all = [];
  const add = (todoItem) => {
    all.push(todoItem);
  };
  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    const overdue_item = all.filter(
      (item) => item.dueDate < new Date().toLocaleDateString("en-CA")
    );
    return overdue_item;
  };

  const dueToday = () => {
    const dueyoday_item = all.filter(
      (item) => item.dueDate === new Date().toLocaleDateString("en-CA")
    );
    return dueyoday_item;
  };

  const dueLater = () => {
    const duelater_fun = all.filter(
      (item) => item.dueDate > new Date().toLocaleDateString("en-CA")
    );
    return duelater_fun;
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
