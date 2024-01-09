# node-js-kitra

### How to run
1. Clone the repository.
2. Run `npm i` from the project root directory.
3. Make sure that you have a postgresql in your local machine.
4. Run sequelize migration `npx sequelize-cli db:migrate`.
5. Run seeder `npx sequelize-cli db:seed:all`.
6. Run `npm run test` to start development environment.
7. Postman collection is included to the project root directory, use it to test the API.