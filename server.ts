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
  getItems() {
    return querySelectItems.all();
  }
  addItem(item: Item) {
    queryInsertItem.run(item.title);
  }
  deleteItem(id: number) {
    queryDeleteItem.run(id);
  }
  updateItem(id: number, newTitle: string) {
    queryUpdateItem.run(newTitle, id);
  }
}

const lista = new TodoList();

Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);

    // gte /items
    if (req.method === "GET" && url.pathname === "/items") {
      return Response.json(lista.getItems());
    }

    // post /items
    if (req.method === "POST" && url.pathname === "/items") {
      const body = await req.json();
      lista.addItem(new Item(body.title));
      return Response.json({ success: true }, { status: 201 });
    }

    // put /items/:id
    if (req.method === "PUT" && url.pathname.startsWith("/items/")) {
      const id = Number(url.pathname.split("/")[2]);
      const body = await req.json();
      lista.updateItem(id, body.title);
      return Response.json({ success: true });
    }

    // delete /items/:id
    if (req.method === "DELETE" && url.pathname.startsWith("/items/")) {
      const id = Number(url.pathname.split("/")[2]);
      lista.deleteItem(id);
      return Response.json({ success: true });
    }

    return Response.json({ error: "rota não encontrada" }, { status: 404 });
  },
});

console.log("Servidor rodando em http://localhost:3000");