const mysql = require("mysql");
const express = require("express");
const cors = require("cors");
const PORT = 4000;

const app = express();

const corsOptions = {
  origin: "http://localhost:4000",
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Add Access Control Allow Origin headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "*Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept*"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// ROOT ENDPOINT
app.get("/", (req, res, next) => {
  res.json({ message: "Ok" });
});

let mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Admin@123",
  database: "saguna",
});

mysqlConnection.connect((err) => {
  if (err) console.log(`Database connection is failed \n Error: ${err}`);
  else console.log("Database is connected!");
});

app.listen(PORT, () => {
  console.log(`listening at ${PORT} port!`);
});

app.post("/add", (req, res) => {
  const data = req.body;
  console.log(data.associate);

  const sql1 = `INSERT INTO saguna.associates_master (AssociateName,Phone,Address) VALUES (?,?,?);`;

  const params = [
    data.associate.name,
    data.associate.phone,
    data.associate.address,
  ];
  mysqlConnection.query(sql1, params, function (err, result) {
    if (err) {
      throw err;
    } else {
      console.log(
        "associates_master Number of records inserted: " + result.affectedRows
      );

      data.skills.forEach((item) => {
        const sql2 =
          "INSERT INTO saguna.associatesspecialization_master (AssId,SpId) VALUES (" +
          '"' +
          result.insertId +
          '", "' +
          item +
          '")';
        mysqlConnection.query(sql2, function (err, result) {
          if (err) {
            throw err;
          } else {
            console.log(
              "associatesspecialization_master Number of records inserted: " +
                result.affectedRows
            );
          }
        });
      });
    }
  });
});

app.get("/list/associates", (req, res, next) => {
  const query =
    "SELECT AssociateId, AssociateName, Phone, Address, GROUP_CONCAT(sm.SpecializationName) AS SpecializationName FROM saguna.associates_master am " +
    "LEFT JOIN saguna.associatesspecialization_master asm ON am.AssociateId = asm.AssId " +
    "JOIN saguna.specialization_master sm ON asm.SpId = sm.SpecializationId  GROUP BY am.AssociateId;";

  mysqlConnection.query(query, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200);
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// GET ONE EMPLOYEE BY ID
app.get("/associates/:id", (req, res, next) => {
  const query =
    "SELECT AssociateId, AssociateName, Phone, Address, GROUP_CONCAT(sm.SpecializationName) AS SpecializationName FROM saguna.associates_master am " +
    "LEFT JOIN saguna.associatesspecialization_master asm ON am.AssociateId = asm.AssId " +
    "JOIN saguna.specialization_master sm ON asm.SpId = sm.SpecializationId  WHERE am.AssociateId = ?;";
  const params = [req.params.id];
  mysqlConnection.query(query, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200);
    res.json({
      message: "success",
      data: rows,
    });
  });
});
