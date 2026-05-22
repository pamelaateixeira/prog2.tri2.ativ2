# prog2.tri2.ativ2

## Como funciona

O projeto usa **Bun** como runtime e **SQLite** como banco de dados (via `bun:sqlite`).

As 4 funções estão dentro da classe `TodoList` no arquivo `core.ts`:

| Função | O que faz |
|--------|-----------|
| `addItem(item)` | Insere um item no banco |
| `getItems()` | Retorna todos os itens do banco |
| `deleteItem(id)` | Deleta um item pelo id |
| `updateItem(id, newTitle)` | Atualiza o título de um item pelo id |

O banco `database.sqlite` é criado automaticamente na primeira execução.

## Como rodar

**1. Instalar o Bun** (caso não tenha)
```bash
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc
```

**2. Rodar o projeto**
```bash
bun run core.ts
```