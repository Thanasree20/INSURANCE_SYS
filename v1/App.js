const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const FILE = "../claims.json";

// HOME
app.get("/", (req, res) => {
res.send(`
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="/style.css">
<link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">
</head>

<body>

<div class="bg-shape shape1"></div>
<div class="bg-shape shape2"></div>

<div class="navbar">
<h2>Insurance Portal</h2>
<div class="nav-links">
<a href="/">Add</a>
<a href="http://localhost:3002">View</a>
<a href="http://localhost:3003">Update</a>
</div>
</div>

<div class="container">
<div class="card">
<h2>Add Claim</h2>
<form method="POST" action="/add">
<input name="name" placeholder="Customer Name" required/>
<input name="amount" placeholder="Claim Amount" required/>
<button>Submit</button>
</form>
</div>
</div>

</body>
</html>
`);
});

// SAVE
app.post("/add", (req, res) => {
let claims = [];

if (!fs.existsSync(FILE)) {
  fs.writeFileSync(FILE, "[]");
}

claims = JSON.parse(fs.readFileSync(FILE));

claims.push({
  id: Date.now(),
  name: req.body.name,
  amount: req.body.amount,
  status: "Pending"
});

fs.writeFileSync(FILE, JSON.stringify(claims, null, 2));

res.send("Claim Added Successfully!");
});

app.listen(3001, () => console.log("v1 running"));