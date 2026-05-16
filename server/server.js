import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import adminRouter from "./routes/adminRoutes.js";

const app = express();
const PORT = process.env.PORT || 4001;

//connection
await connectDB();

//Middlewares
app.use(cors());
app.use(express.json());

//Endpoints
app.use("/api/admin" , adminRouter);

app.get("/", (req, res) => {
  res.send("The Server is working well");
});

app.listen(PORT, () => {
  console.log(`Server is runnig on port: http://localhost:4000`);
});

export default app;
