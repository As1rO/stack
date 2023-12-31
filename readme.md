# stack

### Prerequisites

- Node.js
- Yarn (optional, npm can also be used)
- PostgreSQL

## Installation

To set up the application, follow these steps:

1. Clone the Repository:

```bash
git clone https://github.com/As1rO/stack.git
```

3. cd into the server folder

```bash
cd stack
```

3. yarn install

```bash
yarn install # or npm install
```

4. copy and rename the .env.example file to .env and add the necessary environment variables.

```bash
cp .env.example .env
```

5. Execute Prisma migrations:

```bash
yarn run migrate
```

6. Optionally, seed the database with initial data:

```bash
yarn run seed
```

7. Start the Server:

```bash
yarn run dev
```

After starting the server, you can access the GraphQL API at http://localhost:4000/graphql.
