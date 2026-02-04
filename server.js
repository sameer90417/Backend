const express = require("express");

const app = express();
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("🚀 Welcome Doulat! Express Server is Running!");
});

app.get("/api/users", (req, res) => {
  res.json([
    { id: 1, name: "Doulat Ram" },
    { id: 2, name: "MERN Developer" },
  ]);
});

app.post("/api/users", (req, res) => {
  const user = req.body;

  res.json({
    message: "User created successfully!",
    user,
  });
});


// Start Server
app.listen(5000, () => {
  console.log("Server started on http://localhost:5000");
});
