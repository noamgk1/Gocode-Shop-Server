//console.log(process);
//console.log(process.argv);

/*http.createServer((req,res)=>
res.writeHead(200);
res.end("Hi");

app.get("/home", (req, res) => {
  console.log("hello");
  res.send("hi");
});

)*/

const express = require("express");
const app = express();

const fs = require("fs");
app.get("/", (req, res) => {
  console.log("hi");
  res.send("Hi Client");
});

app.get("/products", (req, res) => {
  console.log("hi");
  fs.readFile("./products.json", "utf8", (err, data) => {
    if (err) {
      res.send("Hi, ");
    } else {
      res.send(JSON.parse(data));
    }
  });
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  fs.readFile("./products.json", "utf8", (err, data) => {
    const products = JSON.parse(data);
    const product = products.find((a) => a.id == id);
    res.send(product);
  });
});
app.listen(8080);
