import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import connectDB from "./config/db.js";
import colors from "colors";
import authrouter from "./routes/authRoutes.js";
import blogrouter from "./routes/blogroutes.js";
import categoryrouter from "./routes/categoryRoutes.js";
import contactRouter from "./routes/contactRoutes.js";
import connectRouter from "./routes/connectRoutes.js";
import cors from "cors";

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middlewares
// Log HTTP requests in development mode
app.use(morgan("dev"));
app.use(express.json());
// Enable Cross-Origin Resource Sharing (CORS) for all routes
app.use(cors());
// for deployment
import path from "path";
import { fileURLToPath } from "url";

// es6 fix we can't use __dirname in es6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
1;

// for deployment
// app.use(express.static(path.join(__dirname, "./frontend/build")));

// Routes
app.use("/api/v1/auth", authrouter);
app.use("/api/v1/blog", blogrouter);
app.use("/api/v1/category", categoryrouter);
app.use("/api/v1/contact", contactRouter);
app.use("/api/v1/connect", connectRouter);

// rest api deployment
app.use("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./frontend/build/index.html"))
})


const PORT = process.env.PORT || 5000;
//Connect to the database before listening
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("listening for requests");
  });
});
