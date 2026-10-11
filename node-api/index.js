import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = Number(process.env.PORT) || 3000;

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

await connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});