const express = require("express");
const mysql = require("mysql2");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "todolist",
});

app.get("/", (req, res) => {
  connection.query("SELECT * FROM todo", (error, results) => {
    if (error) {
      console.log(error);
    }
    res.render("index.ejs", { items: results });
  });
});

app.get("/create", (req, res) => {
  res.render("create.ejs");
});

app.post("/store", (req, res) => {
  connection.query(
    "INSERT INTO todo (name) VALUES (?)",
    [req.body.todoName],
    (error, results) => {
      if (error) {
        console.log(error);
      }
      res.redirect("/");
    }
  );
});

app.get("/edit/:id", (req, res) => {
  connection.query(
    "SELECT * FROM todo WHERE id = (?)",
    [req.params.id],
    (error, results) => {
      if (error) {
        console.log(error);
      }
      res.render("edit.ejs", { item: results[0] });
    }
  );
});

app.post("/update/:id", (req, res) => {
    connection.query(
        "UPDATE todo SET name = ? WHERE id = ?",
        [req.body.todoName, req.params.id],
        (error, results) => {
            if (error) {
                console.log(error);
            }
            res.redirect("/");
        }
    )
});

app.post("/delete/:id", (req, res) => {
  connection.query(
    "DELETE FROM todo WHERE id = ?",
    [req.params.id],
    (error, results) => {
      if (error) {
        console.log(error);
      }
      res.redirect("/");
    }
  );
});

app.listen(3000);
