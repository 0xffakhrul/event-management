import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import users, { authenticateToken } from "./routes/users";
import events from "./routes/events";
import { AuthenticatedRequest } from "./types";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("YOOOO");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use("/users", users);
app.use("/events", events);

app.get("/protected", authenticateToken, (req: AuthenticatedRequest, res) => {
  res.json({ message: "Protected route accessed", userId: req.userId });
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit();
});
