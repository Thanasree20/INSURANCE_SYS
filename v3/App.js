const express=require("express");
const bodyParser=require("body-parser");
const fs=require("fs");

const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

const FILE = "../claims.json";

app.get("/", (req, res) => {
let claims = [];

if (fs.existsSync(FILE)) {
  claims = JSON.parse(fs.readFileSync(FILE));
}

let output = `<html><head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="/style.css">
</head><body>

<div class="bg-shape shape1"></div>
<div class="bg-shape shape2"></div>

<div class="navbar">
<h2>Insurance Portal</h2>
<div class="nav-links">
<a href="http://localhost:3001">Add</a>
<a href="http://localhost:3002">View</a>
<a href="/">Update</a>
</div>
</div>

<div class="container"><h2>Update Claims</h2>`;

claims.forEach(c => {
output += `<div class="card">
<form method="POST" action="/update">
<b>${c.name}</b><br/>
Status: ${c.status}
<input type="hidden" name="id" value="${c.id}"/>
<input name="status" placeholder="New Status"/>
<button>Update</button>
</form>
</div>`;
});

output += `</div></body></html>`;
res.send(output);
});

app.post("/update", (req, res) => {
let claims = JSON.parse(fs.readFileSync(FILE));

claims = claims.map(c => {
if (c.id == req.body.id) {
c.status = req.body.status;
}
return c;
});

fs.writeFileSync(FILE, JSON.stringify(claims, null, 2));

res.send("Updated Successfully!");
});

app.listen(3003);