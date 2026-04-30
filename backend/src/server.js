import dns from "dns";
// Workaround for local DNS resolver refusing MongoDB Atlas SRV lookup.
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import express from "express";
import dotenv from "dotenv";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
  });
});
