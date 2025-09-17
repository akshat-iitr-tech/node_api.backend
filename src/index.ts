import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

let users: { id: number; name: string; job: string }[] = [
  { id: 1, name: "Alice", job: "Engineer" },
  { id: 2, name: "Bob", job: "Designer" }
];

// GET all users
app.get("/users", (req: Request, res: Response) => {
  res.json(users);
});

// POST create new user
app.post("/users", (req: Request, res: Response) => {
  const newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT update user
app.put("/users/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ message: "User not found" });

  Object.assign(user, req.body);
  res.json(user);
});

// DELETE user
app.delete("/users/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  users = users.filter(u => u.id !== id);
  res.json({ message: "User deleted" });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});