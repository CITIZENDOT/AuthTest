# AuthTest

## Features

- User registration
- User Login
- Persisting user for 1 hour (can be changed)
- Changing Password

## TechStack

- MySQL
- Node.JS
- React.JS

## Local Development (Linux)

- Start MySQL Server.

  ```bash
  $ sudo systemctl start mysql
  ```

  - Run [create-database.sql](server/create-database.sql) as root.
  - Create a user named **`scot`** and password **`tiger`**. Grant all privileges on AuthTest database to **`scot`**.

- Install dependencies (in both server and client) as shown below.

  ```bash
  $ cd server && yarn && cd ../client && yarn && cd ..
  ```

- Start server and react dev server (as shown below).

  ```bash
  $ cd server
  $ yarn run devStart
  ```
