import { createConnection } from "mysql";

let con = createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "mydb",
  multipleStatements: true,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("1 record inserted");
});

let sql = `SELECT * from birds WHERE habitat = ?; SELECT * from ingredients WHERE id = ?`;
var values = ["1", "2"];

con.query(sql, values, function (err, result) {
  if (err) throw err;
  console.log("1 record inserted");
  console.log(result);
});
