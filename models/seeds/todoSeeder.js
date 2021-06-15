const mongoose = require("mongoose");
const Todo = require("../todo"); // 載入 todo model

mongoose.connect("mongodb://localhost/todo-list", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodb error!");
});

db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < 10; i++) {
    Todo.create({ name: 'name-' + i })
  }
  console.log('done')
})

db.once("open", () => {
  let todoData = [];
  for (let i = 0; i < 10; i++) {
    todoData.push({ name: "name-" + i });
  }

  Todo.create(todoData)
    .then(() => {
      console.log(`insert todo done...`);
      return db.close();
    })
    .then(() => {
      console.log(`database connection close...`);
    });
});
