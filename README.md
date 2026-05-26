# prog2.tri2.ativ2 - ToDo List com SQLite

## Descrição

Migração do ToDo List da atividade anterior, que salvava dados em arquivo JSON,
para usar um banco de dados SQLite. O projeto possui dois arquivos principais:
`core.ts` para testar as funções diretamente, e `server.ts` para expor as
operações via API REST.

---

## Como rodar

### Pré-requisitos

- [Bun](https://bun.sh) instalado

---

## `core.ts`

Testa as 4 operações do banco de dados diretamente no terminal, sem servidor.
Usa banco em memória (`:memory:`), então os dados são apagados a cada execução.

### Como rodar

```bash
bun run core.ts
```

### Resultado esperado
getItems: [ { id: 1, title: "estudar ts" }, ... ]
após updateItem: [ { id: 1, title: "estudar typescript e bun" }, ... ]
após deleteItem: [ { id: 1, title: "estudar typescript e bun" }, { id: 3, ... } ]

---

## `server.ts`

Sobe um servidor HTTP na porta 3000 com 4 rotas para gerenciar as tarefas.
Os dados são salvos no arquivo `database.sqlite`.

### Como rodar

```bash
bun run server.ts
```

### Rotas disponíveis

| Método | Rota        | Descrição           |
|--------|-------------|---------------------|
| GET    | /items      | lista todas tarefas |
| POST   | /items      | adiciona tarefa     |
| PUT    | /items/:id  | atualiza tarefa     |
| DELETE | /items/:id  | deleta tarefa       |

### Como testar as rotas

```bash
# listar todos os itens
curl http://localhost:3000/items

# adicionar item
curl -X POST http://localhost:3000/items \
  -H "Content-Type: application/json" \
  -d '{"title": "estudar typescript"}'

# atualizar item (substitua 1 pelo id desejado)
curl -X PUT http://localhost:3000/items/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "estudar typescript e bun"}'

# deletar item (substitua 1 pelo id desejado)
curl -X DELETE http://localhost:3000/items/1
```

---

## Funções implementadas

| Função | SQL |
|---|---|
| `getItems()` | `SELECT * FROM items` |
| `addItem(item)` | `INSERT INTO items (title) VALUES (?)` |
| `deleteItem(id)` | `DELETE FROM items WHERE id = ?` |
| `updateItem(id, title)` | `UPDATE items SET title = ? WHERE id = ?` |
