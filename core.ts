import { Database } from "bun:sqlite";

const db = new Database("database.sqlite");

db.run(`
  CREATE TABLE IF NOT EXISTS items (
    id    INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL
  )
`);

const querySelectItems = db.prepare("SELECT * FROM items");
const queryInsertItem  = db.prepare("INSERT INTO items (title) VALUES (?)");
const queryDeleteItem  = db.prepare("DELETE FROM items WHERE id = ?");
const queryUpdateItem  = db.prepare("UPDATE items SET title = ? WHERE id = ?");

class Item {
  constructor(public title: string) {}
}

class TodoList {
  // get
  getItems() {
    return querySelectItems.all();
  }

  // add
  addItem(item: Item) {
    queryInsertItem.run(item.title);
  }

  // delete
  deleteItem(id: number) {
    queryDeleteItem.run(id);
  }

  // update
  updateItem(id: number, newTitle: string) {
    queryUpdateItem.run(newTitle, id);
  }
}

const lista = new TodoList();

lista.addItem(new Item("estudar typescript"));
lista.addItem(new Item("fazer a atividade"));
lista.addItem(new Item("commitar no github"));

console.log("getItems:", lista.getItems());

lista.updateItem(1, "estudar typescript e bun");
console.log("após updateItem:", lista.getItems());

lista.deleteItem(2);
console.log("após deleteItem:", lista.getItems());