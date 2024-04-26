import express from "express";
import dotenv from "dotenv";

dotenv.config({ path: "./config/config.env" });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.listen(PORT, () =>
    console.log(
        `Server running on port ${PORT}, in ${process.env.NODE_ENV} mode.`
    )
);
