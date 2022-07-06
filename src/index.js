const express = require("express");
const routes = require("./routes");
const connection = require("./config/connection");
// const { Category } = require("./models");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
const init = async () => {
  try {
    // connect to DB
    await connection.sync({ force: false });

    // const promises = categories.map((category) => {
    //   return Category.create(category)

    //   await Promise.all(promises)

    //   process.exit(0)
    // })

    // server listen on PORT
    app.listen(PORT, () => {
      console.log(`App listening on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`[ERROR]: Failed to start server | ${error.message}`);
  }
};

init();
