import express from "express";

const app = express();

app.get("/api/notes", (req, res) => {
  res.status(200).send("you got 5 note");
});

app.post("/api/notes", (req, res) => {
  res.status(201).json({ message: "post created" });
});

app.put("/api/notes/:id", (req, res) => {
  res.status(200).json({ message: "post updated" });
});

app.delete("/api/notes/:id", (req, res) => {
  res.status(200).json({ message: "post deleted" });
});

app.listen(5001, () => {
  console.log("Server started on port: 5001");
});
